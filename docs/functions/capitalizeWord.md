[**ts-humanize v1.0.0**](../README.md)

***

[ts-humanize](../README.md) / capitalizeWord

# Function: capitalizeWord()

> **capitalizeWord**(`str`): `string`

Defined in: [formatting/strings.ts:40](https://github.com/Shiv-SB/ts-humanize/blob/540ea280fbbffb4f02169023da1f5402482baf2b/src/formatting/strings.ts#L40)

Capitalizes the first character of a string, preserving any leading whitespace.
If the string starts with whitespace, capitalizes the first non-whitespace character after each whitespace.

## Parameters

### str

`string`

The string to capitalize.

## Returns

`string`

The capitalized string.

## Examples

```ts
capitalizeWord("hello world"); // "Hello world"
```

```ts
capitalizeWord("  hello"); // "  Hello"
```
