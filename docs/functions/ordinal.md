[**ts-humanize v1.0.0**](../README.md)

***

[ts-humanize](../README.md) / ordinal

# Function: ordinal()

> **ordinal**(`x`, `options?`): `string`

Defined in: [ordinals/ordinals.ts:29](https://github.com/Shiv-SB/ts-humanize/blob/540ea280fbbffb4f02169023da1f5402482baf2b/src/ordinals/ordinals.ts#L29)

Returns the ordinal representation of a number (e.g., 1st, 2nd, 3rd, 4th).
Always rounds to the nearest whole number.

## Parameters

### x

`number`

The number to convert to its ordinal string.

### options?

`OrdinalOptions`

Options for additional formatting such as commifying.

## Returns

`string`

The ordinal string for the given number.

## Example

```ts
ordinal(1); // "1st"
ordinal(22); // "22nd"
ordinal(-13); // "-13th"
ordinal(1234, { commify: true }); // "1,234th"
ordinal(12.7); // "13th"
ordinal(1003.35, { commify: true }); // "1,003rd"
```
