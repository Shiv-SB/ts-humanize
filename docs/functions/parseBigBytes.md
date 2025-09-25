[**ts-humanize v1.0.0**](../README.md)

***

[ts-humanize](../README.md) / parseBigBytes

# Function: parseBigBytes()

> **parseBigBytes**(`bytes`): `undefined` \| `bigint`

Defined in: [bytes/bigBytes.ts:103](https://github.com/Shiv-SB/ts-humanize/blob/540ea280fbbffb4f02169023da1f5402482baf2b/src/bytes/bigBytes.ts#L103)

Parses a string representation of big bytes into the number of bytes it represents as BigInt.

Will return `undefined` if unable to parse bytes.

See also: bigBytes, bigIBytes

## Parameters

### bytes

`string`

## Returns

`undefined` \| `bigint`

## Example

```ts
parseBigBytes("42 MB") // 42000000n
parseBigBytes("42 mib") // 44040192n
```
