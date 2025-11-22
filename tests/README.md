# Testing Guide

We use [Vitest](https://vitest.dev/) for testing.

## Running Tests

### Run all tests

```bash
npm test
```

### Run tests in watch mode

```bash
npm test -- --watch
```

### Run a specific test file

```bash
npm test src/path/to/test.ts
```

### Run tests matching a filter

```bash
npm test -t "filter string"
```
