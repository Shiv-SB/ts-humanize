# ts-humanize

A TypeScript library inspired by [Go-Humanize](https://github.com/dustin/go-humanize).  
Fully type-safe and built to run in Node.js, Bun, and browsers!

## Installation

Install with Bun:

```shell
bun add ts-humanize
```

Or with npm:

```shell
npm install ts-humanize
```

## Documentation

Like the original Go-Humanize library, all functionality is provided as standalone functions—no classes or single entry points.  
This design enables optimal tree-shaking.

Functions are grouped by category (bytes, ordinals, etc).

### Bytes

### Formatting

### Ordinals

### SI Units

### Time

## Development


This library was built to be developed in Bun. There are Bun specific tools which will not work in Node or Deno (e.g Buns bundler and test runner).

### Tests

Run all tests:

```shell
bun test
```

Run specific tests (wildcard matching supported):

```shell
bun test bytes # Runs bytes.test.ts
```

Watch mode:

```shell
bun test --watch bytes
```

Code coverage reporting is enabled by default.

### Building

Two scripts are used to build files for NPM:

- Bun's bundler generates `.js` files.
- TypeScript (`tsc`) generates `.d.ts` files.

Run both:

```shell
bun prepublish
```

Output is in the `build` directory.

Generate only `.js` files:

```shell
bun compile
```

Bundler watch mode:

```shell
bun compile --watch
```

Generate only `.d.ts` files:

```shell
bun generate:types
```