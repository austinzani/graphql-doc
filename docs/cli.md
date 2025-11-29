# CLI Reference

The `graphql-docs` CLI is the primary interface for generating documentation from your GraphQL schema.

## Installation

You can install the generator globally or locally in your project.

```bash
# Global installation
npm install -g @graphql-docs/generator

# Local installation
npm install @graphql-docs/generator
```

## Usage

If installed globally:

```bash
graphql-docs generate [options]
```

If installed locally, use `npx`:

```bash
npx graphql-docs generate [options]
```

## Commands

### `generate`

Generates documentation from a GraphQL schema.

**Options:**

- `-s, --schema <path>`: Path to the GraphQL schema file or URL. Defaults to `schema.graphql`.
- `-o, --output <path>`: Directory where the generated documentation will be written. Defaults to `docs/api`.
- `-c, --config <path>`: Path to a configuration file (e.g., `.graphqlrc`, `graphql-docs.config.js`).
- `-h, --help`: Display help for the command.

**Examples:**

Generate from a local file:

```bash
graphql-docs generate -s ./schema.graphql -o ./docs
```

Generate from a URL:

```bash
graphql-docs generate -s https://api.example.com/graphql -o ./docs
```

Use a specific config file:

```bash
graphql-docs generate -c .graphqlrc.dev
```

## Configuration

The CLI supports standard GraphQL configuration files (`.graphqlrc`, `graphql.config.js`) as well as `graphql-docs.config.js`.

Example `.graphqlrc`:

```yaml
schema: schema.graphql
extensions:
  graphql-docs:
    outputDir: ./docs/api
    framework: docusaurus
    metadataDir: ./docs-metadata
```
