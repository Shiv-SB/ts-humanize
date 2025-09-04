[**ts-humanize v0.2.2**](../README.md)

***

[ts-humanize](../README.md) / bigBytes

# Function: bigBytes()

> **bigBytes**(`bytes`): `string`

Defined in: [bytes/bigBytes.ts:70](https://github.com/Shiv-SB/ts-humanize/blob/58c6d39c670b3b3862b4035998e27d57f6c37c48/src/bytes/bigBytes.ts#L70)

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
