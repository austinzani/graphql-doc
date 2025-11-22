# Config System

The `src/core/config` module handles configuration loading and validation for the generator.

## Core Components

### 1. Config Schema

**File:** `schema.ts`

- Defines the configuration structure using **Zod**.
- Sets default values for optional fields.
- **Key Options:**
  - `outputDir`: Where to generate docs (default: `./docs/api`).
  - `framework`: Output format (default: `docusaurus`).
  - `singlePage`: Toggle single-page vs multi-page (default: `false`).
  - `metadataDir`: Path to external metadata (default: `./docs-metadata`).
  - `typeExpansion`: Settings for type depth and circular references.

### 2. Config Loader

**File:** `loader.ts`

- Responsible for finding and parsing the configuration.
- **Loading Priority:**
  1.  **GraphQL Config (`.graphqlrc`):** Checks for a `graphql-docs` extension block.
  2.  **Cosmiconfig:** Searches for `graphql-docs.config.js`, `.json`, etc.
  3.  **Defaults:** Falls back to default values defined in the Zod schema.

## Usage

```typescript
import { loadGeneratorConfig } from './core/config/loader';

const config = await loadGeneratorConfig();
console.log(config.outputDir);
```
