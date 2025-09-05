[**ts-humanize v0.3.0**](../README.md)

***

[ts-humanize](../README.md) / bigBytes

# Function: bigBytes()

> **bigBytes**(`bytes`): `string`

Defined in: [bytes/bigBytes.ts:70](https://github.com/Shiv-SB/ts-humanize/blob/9bcd5691bb2e0fd42cdb53f92863e87ba5754d6e/src/bytes/bigBytes.ts#L70)

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
