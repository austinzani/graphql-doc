import { describe, it, expect } from 'vitest';
import { SchemaParser } from './schema-parser';
import { buildSchema } from 'graphql';

describe('SchemaParser', () => {
  const parser = new SchemaParser();

  it('should extract queries and mutations', () => {
    const sdl = `
      type Query {
        hello: String
      }
      type Mutation {
        createSomething(name: String!): String
      }
    `;
    const schema = buildSchema(sdl);
    const result = parser.parse(schema);
    const operations = result.operations;

    expect(operations).toHaveLength(2);

    const query = operations.find((op) => op.name === 'hello');
    expect(query).toBeDefined();
    expect(query?.operationType).toBe('query');
    expect(query?.returnType).toBe('String');

    const mutation = operations.find((op) => op.name === 'createSomething');
    expect(mutation).toBeDefined();
    expect(mutation?.operationType).toBe('mutation');
    expect(mutation?.arguments).toHaveLength(1);
    expect(mutation?.arguments[0].name).toBe('name');
    expect(mutation?.arguments[0].isRequired).toBe(true);
  });

  it('should extract directives', () => {
    const sdl = `
      directive @docGroup(name: String!, order: Int!) on FIELD_DEFINITION

      type Query {
        users: [String] @docGroup(name: "Users", order: 1)
      }
    `;
    const schema = buildSchema(sdl);
    const result = parser.parse(schema);
    const operations = result.operations;

    const query = operations.find((op) => op.name === 'users');
    expect(query).toBeDefined();
    expect(query?.directives.docGroup).toEqual({
      name: 'Users',
      order: 1,
    });
  });

  it('should handle descriptions', () => {
    const sdl = `
      type Query {
        "Returns hello"
        hello: String
      }
    `;
    const schema = buildSchema(sdl);
    const result = parser.parse(schema);
    const operations = result.operations;

    const query = operations.find((op) => op.name === 'hello');
    expect(query?.description).toBe('Returns hello');
  });
});
