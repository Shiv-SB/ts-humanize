# ts-humanize

A TypeScript library heavily inspired by [Go-Humanize](https://github.com/dustin/go-humanize)
Fully typesafe and build to run in Node, Bun and Browsers!

## Installation

To install, just run:

```shell
bun add ts-humanize
```

or

```shell
npm add ts-humanize
```

## Documentation

## Development

All PRs for contributions and fixes are welcome!

This library was built to be developed in Bun. There are Bun specific tools which will not work in Node or Deno (e.g Buns bundler and test runner).

### Tests

All exported/public functions should have their own tests. All tests should be included in the `tests` folder. To run all tests:

```shell
bun test
```

Buns test runner supports wildcard matching, so you can easily choose which files to run:

```shell
bun test bytes # Will run bytes.test.ts
```

For watch mode:

```shell
bun test --watch bytes # Will run bytes.test.ts in watch mode
```

Note that code coverage reporting is enabled by default.

### Building

There are two seperate scripts which run to build the files which get published to NPM.
The first uses Buns built in Bundler to generate the .js files.
The second uses tsc to generate the .d.ts files.

The following command will run both of these:

```shell
bun prepublish
```

The files will be outputted to build.

To generate just the .js files:

```shell
bun compile
```

The Bundler can be run in watch mode (This is only a basic watch mode; it will bundle everything on a single file change):

```shell
bun compile --watch
```

To generate just the .d.ts files:

```shell
bun generate:types
```