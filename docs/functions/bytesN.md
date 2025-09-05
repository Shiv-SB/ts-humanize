[**ts-humanize v0.4.1**](../README.md)

***

[ts-humanize](../README.md) / bytesN

# Function: bytesN()

> **bytesN**(`bytes`, `numberOfDigits`): `string`

Defined in: [bytes/bytes.ts:64](https://github.com/Shiv-SB/ts-humanize/blob/0d540451c5699973f9888531eb0bca5d6cf7fae3/src/bytes/bytes.ts#L64)

Produces a human-readable representation of an SI size.

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
bytesN(82854982, 3) // "82.9 MB"
bytesN(82854982, 4) // "82.85 MB"
```
