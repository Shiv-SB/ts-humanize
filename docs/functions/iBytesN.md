[**ts-humanize v0.3.0**](../README.md)

***

[ts-humanize](../README.md) / iBytesN

# Function: iBytesN()

> **iBytesN**(`bytes`, `numberOfDigits`): `string`

Defined in: [bytes/bytes.ts:99](https://github.com/Shiv-SB/ts-humanize/blob/919e20c5062ab422c95ea4551ce3ee99cc497132/src/bytes/bytes.ts#L99)

Produces a human-readable representation of an IEC size.

If `numberOfDigits` is less than or equal to the number of digits in `bytes`, the decimal part will be ommited.

See also: parseBytes

## Parameters

### bytes

`number`

### numberOfDigits

`number`

Specifies the total number of digits to output, including the decimal part.

## Returns

`string`

## Example

```ts
IBytesN(82854982, 4) // "79.02 MiB"
IBytesN(123456789, 3) // "118 MiB"
IBytesN(123456789, 6) // "117.738 MiB"
```
