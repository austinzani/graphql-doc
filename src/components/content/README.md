# Content Components

This directory contains components responsible for rendering the content of the GraphQL documentation.

## Components

### `TypeViewer`

The `TypeViewer` is a recursive component that renders `ExpandedType` objects. It handles the visualization of complex GraphQL types, including nested objects, lists, and unions.

**Features:**

- Recursive rendering with depth control (`maxDepth`, `defaultExpandedLevels`).
- Expandable/collapsible sections for Objects, Unions, and Enums.
- Handles circular references gracefully.
- Proper visualization of Lists (e.g., `[Type]`).
- Themed styling using `graphql-docs.css`.

**Usage:**

```tsx
import { TypeViewer } from './TypeViewer';
import { ExpandedType } from '../../core/transformer/types';

const myType: ExpandedType = { ... };

<TypeViewer
  type={myType}
  depth={0}
  defaultExpandedLevels={2}
  maxDepth={5}
/>
```

**Props:**

- `type` (`ExpandedType`): The type definition to render.
- `depth` (`number`): Current recursion depth (default: 0).
- `defaultExpandedLevels` (`number`): How many levels deep to expand initially (default: 2).
- `maxDepth` (`number`): Maximum recursion depth before truncating (default: 10).
- `path` (`string`): Unique path identifier for expansion state tracking (default: 'root').
