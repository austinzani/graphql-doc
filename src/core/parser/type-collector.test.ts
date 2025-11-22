import { describe, it, expect } from 'vitest';
import { TypeCollector } from './type-collector';
import { buildSchema } from 'graphql';

describe('TypeCollector', () => {
  it('should collect scalar types', () => {
    const sdl = `
      type Query {
        hello: String
      }
    `;
    const schema = buildSchema(sdl);
    const collector = new TypeCollector();

    const queryType = schema.getQueryType()!;
    const helloField = queryType.getFields()['hello'];

    collector.collect(helloField.type);
    const types = collector.getTypes();

    const stringType = types.find((t) => t.name === 'String');
    expect(stringType).toBeDefined();
    expect(stringType?.kind).toBe('SCALAR');
  });

  it('should collect object types and their fields', () => {
    const sdl = `
      type User {
        id: ID!
        name: String
      }
      type Query {
        user: User
      }
    `;
    const schema = buildSchema(sdl);
    const collector = new TypeCollector();

    const queryType = schema.getQueryType()!;
    const userField = queryType.getFields()['user'];

    collector.collect(userField.type);
    const types = collector.getTypes();

    const userType = types.find((t) => t.name === 'User');
    expect(userType).toBeDefined();
    expect(userType?.kind).toBe('OBJECT');
    expect(userType?.fields).toHaveLength(2);

    const idField = userType?.fields?.find((f) => f.name === 'id');
    expect(idField?.type).toBe('ID!');
    expect(idField?.isRequired).toBe(true);
  });

  it('should collect enums', () => {
    const sdl = `
      enum Role {
        ADMIN
        USER
      }
      type User {
        role: Role
      }
    `;
    const schema = buildSchema(sdl);
    const collector = new TypeCollector();

    const roleType = schema.getType('Role')!;
    collector.collect(roleType);
    const types = collector.getTypes();

    const enumType = types.find((t) => t.name === 'Role');
    expect(enumType).toBeDefined();
    expect(enumType?.kind).toBe('ENUM');
    expect(enumType?.enumValues).toHaveLength(2);
    expect(enumType?.enumValues?.[0].name).toBe('ADMIN');
    expect(enumType?.enumValues?.[1].name).toBe('USER');
  });

  it('should handle nested types and avoid infinite recursion', () => {
    const sdl = `
      type User {
        friends: [User]
      }
    `;
    const schema = buildSchema(sdl);
    const collector = new TypeCollector();

    const userType = schema.getType('User')!;
    collector.collect(userType);
    const types = collector.getTypes();

    const collectedUser = types.find((t) => t.name === 'User');
    expect(collectedUser).toBeDefined();
    expect(types.length).toBe(1); // Should only collect User once
  });

  it('should collect input objects', () => {
    const sdl = `
      input UserInput {
        name: String!
        age: Int
      }
      type Mutation {
        createUser(input: UserInput): String
      }
    `;
    const schema = buildSchema(sdl);
    const collector = new TypeCollector();

    const mutationType = schema.getMutationType()!;
    const createField = mutationType.getFields()['createUser'];
    const inputArg = createField.args[0];

    collector.collect(inputArg.type);
    const types = collector.getTypes();

    const inputType = types.find((t) => t.name === 'UserInput');
    expect(inputType).toBeDefined();
    expect(inputType?.kind).toBe('INPUT_OBJECT');
    expect(inputType?.fields).toHaveLength(2);
  });
});
