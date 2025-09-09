[**ts-humanize v0.5.0**](../README.md)

***

[ts-humanize](../README.md) / bigBytes

# Function: bigBytes()

> **bigBytes**(`bytes`): `string`

Defined in: [bytes/bigBytes.ts:70](https://github.com/Shiv-SB/ts-humanize/blob/b20c339cae69f529f20e775917f6cd1ea59de3d9/src/bytes/bigBytes.ts#L70)

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
