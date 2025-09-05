[**ts-humanize v0.4.0**](../README.md)

***

[ts-humanize](../README.md) / bigIBytes

# Function: bigIBytes()

> **bigIBytes**(`bytes`): `string`

Defined in: [bytes/bigBytes.ts:85](https://github.com/Shiv-SB/ts-humanize/blob/28b6c4fe653b4af34bfa09de7ea701f96d00b0f4/src/bytes/bigBytes.ts#L85)

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
