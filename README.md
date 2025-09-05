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

## Usage

Several import syntaxes can be used.

For example, to import `parseBytes`:

```typescript
// ESM, top level:
import { parseBytes } from "ts-humanize";
// or
// ESM, subpath:
import { parseBytes } from "ts-humanize/bytes";
// or
// CommonJS:
const { parseBytes } = require("ts-humanize");
// or
// ESM, namespace import
import * as humanize from "ts-humanize";

// ...and then:
parseBytes("42 MB"); // 42000000
// or
humanize.parseBytes("42 MB");
```

### Examples

#### Sizes

```typescript
import { bytes } from "humanize-ts";

console.log("This file is:", bytes(82854982)); // This file is 83 MB
```

#### Times

```typescript
import { relativeTime } from "./src";

function subtractDaysFromDate(date: Date, days: number): Date {
    const pastDate = new Date(date);
    pastDate.setDate(pastDate.getDate() - days);
    return pastDate;
}

const pastDate = subtractDaysFromDate(new Date(), 7);
console.log("This was modified", relativeTime(pastDate)); // This was modified 7 days ago
```

## Development

Like the original Go-Humanize library, all functionality is provided as standalone functions—no classes or single entry points.  
This design enables optimal tree-shaking.

Functions are grouped by category (bytes, ordinals, etc).

See [Docs](docs/README.md) for full documentation on each function.

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

There are a few scripts are used to build files for NPM:

- Bun's bundler (`/scripts/build.ts`) generates `.js` files.
- TypeScript (`tsc`) generates `.d.ts` files.
- [TypeDoc](https://typedoc.org/index.html) is used to auto generate documentation.

The bundler will:
1. Generate a barrel import file (`src/index.ts`).
2. Generate `index.ts` files for all folders in `src` except for `/units`.
3. Transpile the typescript files (using all index.ts files as entrypoints) to `.js` files.
4. Updates package.json to include all detected `index.js` and `index.d.ts` files for ESM subpath importing.

```typescript
import { commify } from "ts-humanize/formatting";
```

To run all build scripts in preperation to publish to NPM:

```shell
bun prepare
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

Auto generate documentation:

```shell
bun generate:docs
```

Run tsc to check for type errors:

```shell
bun lint
```
