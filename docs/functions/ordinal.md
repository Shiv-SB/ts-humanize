[**ts-humanize v0.4.1**](../README.md)

***

[ts-humanize](../README.md) / ordinal

# Function: ordinal()

> **ordinal**(`x`): `string`

Defined in: [ordinals/ordinals.ts:12](https://github.com/Shiv-SB/ts-humanize/blob/0d540451c5699973f9888531eb0bca5d6cf7fae3/src/ordinals/ordinals.ts#L12)

Returns the ordinal representation of a number (e.g., 1st, 2nd, 3rd, 4th).

## Parameters

### x

`number`

The number to convert to its ordinal string.

## Returns

`string`

The ordinal string for the given number.

## Example

```ts
ordinal(1); // "1st"
ordinal(22); // "22nd"
ordinal(13); // "13th"
```
