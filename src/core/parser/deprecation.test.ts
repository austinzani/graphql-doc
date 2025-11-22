import { describe, it, expect } from 'vitest';
import { SchemaParser } from './schema-parser';
import { TypeCollector } from './type-collector';
import { buildSchema } from 'graphql';

describe('Deprecation Support', () => {
  it('should extract standard deprecation from operations', () => {
    const sdl = `
      type Query {
        oldField: String @deprecated(reason: "Use newField")
      }
    `;
    const schema = buildSchema(sdl);
    const parser = new SchemaParser();
    const result = parser.parse(schema);
    const op = result.operations.find((o) => o.name === 'oldField');

    expect(op?.isDeprecated).toBe(true);
    expect(op?.deprecationReason).toBe('Use newField');
  });

  it('should extract standard deprecation from object fields', () => {
    const sdl = `
      type User {
        oldName: String @deprecated(reason: "Use name")
      }
      type Query {
        user: User
      }
    `;
    const schema = buildSchema(sdl);
    const collector = new TypeCollector();
    const userType = schema.getType('User')!;

    collector.collect(userType);
    const types = collector.getTypes();
    const user = types.find((t) => t.name === 'User');
    const field = user?.fields?.find((f) => f.name === 'oldName');

    expect(field?.isDeprecated).toBe(true);
    expect(field?.deprecationReason).toBe('Use name');
  });

  it('should extract standard deprecation from enum values', () => {
    const sdl = `
      enum Role {
        OLD_ADMIN @deprecated(reason: "Use ADMIN")
        ADMIN
      }
      type Query {
        role: Role
      }
    `;
    const schema = buildSchema(sdl);
    const collector = new TypeCollector();
    const roleType = schema.getType('Role')!;

    collector.collect(roleType);
    const types = collector.getTypes();
    const role = types.find((t) => t.name === 'Role');
    const value = role?.enumValues?.find((v) => v.name === 'OLD_ADMIN');

    expect(value?.isDeprecated).toBe(true);
    expect(value?.deprecationReason).toBe('Use ADMIN');
  });
});
