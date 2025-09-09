[**ts-humanize v0.5.0**](../README.md)

***

[ts-humanize](../README.md) / capitalizeWord

# Function: capitalizeWord()

> **capitalizeWord**(`str`): `string`

Defined in: [formatting/strings.ts:40](https://github.com/Shiv-SB/ts-humanize/blob/b20c339cae69f529f20e775917f6cd1ea59de3d9/src/formatting/strings.ts#L40)

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
