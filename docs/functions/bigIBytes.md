[**ts-humanize v1.0.0**](../README.md)

***

[ts-humanize](../README.md) / bigIBytes

# Function: bigIBytes()

> **bigIBytes**(`bytes`): `string`

Defined in: [bytes/bigBytes.ts:85](https://github.com/Shiv-SB/ts-humanize/blob/540ea280fbbffb4f02169023da1f5402482baf2b/src/bytes/bigBytes.ts#L85)

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
