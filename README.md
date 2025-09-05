# ts-humanize

[![npm version](https://img.shields.io/npm/v/ts-humanize?color=blue)](https://www.npmjs.com/package/ts-humanize)
[![npm downloads](https://img.shields.io/npm/dm/ts-humanize.svg?color=brightgreen)](https://www.npmjs.com/package/ts-humanize)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/ts-humanize?label=unpacked%20size)](https://bundlephobia.com/package/ts-humanize)

A modern, fully type-safe TypeScript library for humanizing numbers, sizes, times, and more—  
inspired very heavily by [Go-Humanize](https://github.com/dustin/go-humanize) and designed for seamless use in Node.js, Bun, and browsers.

**ts-humanize** provides a comprehensive set of standalone utility functions for formatting and parsing data into human-readable strings.  
It is optimized for tree-shaking, supports ESM and CommonJS, and is suitable for both frontend and backend projects.

- Humanizes file sizes, time intervals, ordinals, numbers, and more
- Mininal dependencies, lightweight, and fast
- Works out-of-the-box with Bun, Node.js, and browsers
- ESM subpath imports for optimal bundle size
- Written in TypeScript with full type safety

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

### Imports

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

Below are examples from some of the functions from each category.
See [Docs](docs/README.md) or the `docs` folder for full documentation on each function.

#### Sizes

```typescript
import { bytes } from "humanize-ts";

console.log("This file is:", bytes(82854982)); // This file is 83 MB
```

#### Times

```typescript
import { relativeTime } from "ts-humanize";

function subtractDaysFromDate(date: Date, days: number): Date {
    const pastDate = new Date(date);
    pastDate.setDate(pastDate.getDate() - days);
    return pastDate;
}

const pastDate = subtractDaysFromDate(new Date(), 7);
console.log("This was modified", relativeTime(pastDate)); // This was modified 7 days ago
```

#### Ordinals

```typescript
import { ordinal } from "ts-humanize";

console.log(`You are my ${ordinal(365)} best friend`); // You are my 365th best friend
```

#### Commas

```typescript
import { commify } from "ts-humanize";

console.log(`You owe me £${commify(5_033_482)}`); // You owe me £5,033,482
// With optional locale and bigint support:
console.log(commify(1234567n, "de-DE")) // 1.234.567
```

#### SI Notation

```typescript
import { computeSI } from "ts-humanize";

console.log(computeSI(2.2244001105545e-13)) // [ 222.445, "f" ]
```

#### English Specific Functions

```typescript
import * as english from "ts-humanize/english";

console.log(english.pluralWord(5, "bus")); // 5 buses
console.log(english.wordSeries(["foo", "bar", "baz"], "and")); // foo, bar and baz

```

####

## Development

Like the original Go-Humanize library, all functionality is provided as standalone functions—no classes or single entry points.
In the JS ecosytem this design enables optimal tree-shaking when bundling, especially when using ESM subpath imports.

Functions are grouped by category (bytes, ordinals, etc).

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

The above is automatically handled in the github workflow config. To run the script manually:

```shell
bun run build
```

Output is in the `build` directory.

Generate only `.js` files:

```shell
bun compile
```

Bundler watch mode:

```shell
bun run build --watch
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
