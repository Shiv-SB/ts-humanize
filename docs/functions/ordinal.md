[**ts-humanize v0.3.0**](../README.md)

***

[ts-humanize](../README.md) / ordinal

# Function: ordinal()

> **ordinal**(`x`): `string`

Defined in: [ordinals/ordinals.ts:12](https://github.com/Shiv-SB/ts-humanize/blob/9bcd5691bb2e0fd42cdb53f92863e87ba5754d6e/src/ordinals/ordinals.ts#L12)

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
