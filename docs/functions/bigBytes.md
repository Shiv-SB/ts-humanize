[**ts-humanize v0.3.0**](../README.md)

***

[ts-humanize](../README.md) / bigBytes

# Function: bigBytes()

> **bigBytes**(`bytes`): `string`

Defined in: [bytes/bigBytes.ts:70](https://github.com/Shiv-SB/ts-humanize/blob/919e20c5062ab422c95ea4551ce3ee99cc497132/src/bytes/bigBytes.ts#L70)

Produces a human-readable representation of a large SI size using BigInt.

See also: parseBigBytes.

## Parameters

### bytes

`bigint`

## Returns

`string`

## Example

```ts
bigBytes(82854982000000n) // "83 TB"
```
