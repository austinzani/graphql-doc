import { describe, it, expect } from 'vitest';
import { hello } from './index.js';

describe('hello', () => {
  it('returns greeting', () => {
    expect(hello()).toBe('Hello from graphql-docs-generator!');
  });
});
