[**ts-humanize v0.4.1**](../README.md)

***

[ts-humanize](../README.md) / bigIBytes

# Function: bigIBytes()

> **bigIBytes**(`bytes`): `string`

Defined in: [bytes/bigBytes.ts:85](https://github.com/Shiv-SB/ts-humanize/blob/0d540451c5699973f9888531eb0bca5d6cf7fae3/src/bytes/bigBytes.ts#L85)

Produces a human-readable representation of a large IEC size using BigInt.

See also: parseBigBytes.

## Parameters

### bytes

`bigint`

## Returns

`string`

## Example

```ts
bigIBytes(82854982000000n) // "75 TiB"
```
