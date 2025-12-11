# Playground

This directory contains a local development environment for previewing and testing the component library in isolation.

## Usage

Run the playground with Vite:

```bash
npx vite
```

Then navigate to `http://localhost:5173/playground/` in your browser.

## Structure

- `index.html`: Entry point.
- `main.tsx`: React application rendering the `TypeViewer` with expandable context.
- `mocks.ts`: Contains mock `ExpandedType` data (Scalars, Enums, Objects, Lists) for testing different rendering scenarios.

## Purpose

This playground allows for rapid iteration on component styling and functionality without needing to generate a full documentation site. Use the dropdown to switch between different mock types to verify rendering behavior.
