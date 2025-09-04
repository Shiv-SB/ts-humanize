[**ts-humanize v0.2.2**](../README.md)

***

[ts-humanize](../README.md) / ordinal

# Function: ordinal()

> **ordinal**(`x`): `string`

Defined in: [ordinals/ordinals.ts:12](https://github.com/Shiv-SB/ts-humanize/blob/58c6d39c670b3b3862b4035998e27d57f6c37c48/src/ordinals/ordinals.ts#L12)

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
