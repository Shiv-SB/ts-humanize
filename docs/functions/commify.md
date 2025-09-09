[**ts-humanize v0.5.0**](../README.md)

***

[ts-humanize](../README.md) / commify

# Function: commify()

> **commify**(`x`, `locale?`): `string`

Defined in: [formatting/comma.ts:29](https://github.com/Shiv-SB/ts-humanize/blob/07d80aa56dc5c566d6991c06aec6c42de581579d/src/formatting/comma.ts#L29)

Formats a number or bigint with commas as thousands separators, using the specified locale.
Note: Will round the input to 3 decimal places by default.

## Parameters

### x

The number or bigint to format.

`number` | `bigint`

### locale?

`LocalesArgument`

Optional locale string or array of locale strings for formatting.

## Returns

`string`

The formatted string with commas as thousands separators.

## Examples

```ts
// US English (default)
commify(1234567.891); // "1,234,567.891"
```

```ts
// German (de-DE)
commify(1234567.891, 'de-DE'); // "1.234.567,891"
```

```ts
// French (fr-FR)
commify(1234567.891, 'fr-FR'); // "1 234 567,891"
```

```ts
// Indian English (en-IN)
commify(1234567.891, 'en-IN'); // "12,34,567.891"
```

```ts
// Array of locales
commify(1234567.891, ['fr-CA', 'en-US']); // "1 234 567,891"
```
