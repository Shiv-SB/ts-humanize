[**ts-humanize v0.2.2**](../README.md)

***

[ts-humanize](../README.md) / bigBytes

# Function: bigBytes()

> **bigBytes**(`bytes`): `string`

Defined in: [bytes/bigBytes.ts:70](https://github.com/Shiv-SB/ts-humanize/blob/e6098dcb907b4be2eadfed4406ac92a00e666b5f/src/bytes/bigBytes.ts#L70)

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
