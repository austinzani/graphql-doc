# CLI Module

This module contains the Command Line Interface (CLI) implementation for the `graphql-docs` generator.

## Structure

- `index.ts`: The entry point for the CLI. It uses `commander` to define commands and options.

## Commands

### `generate`

The `generate` command is the main entry point for generating documentation. It:

1.  Loads configuration using `src/core/config/loader.ts`.
2.  Instantiates the `Generator` class from `src/core/generator.ts`.
3.  Calls `generator.generate()` with the schema pointer.

## Development

To test the CLI locally:

```bash
# Run using tsx
npx tsx src/cli/index.ts generate --help

# Link the package globally
npm link
graphql-docs generate --help
```
