[**ts-humanize v1.0.0**](../README.md)

***

[ts-humanize](../README.md) / parseBytes

# Function: parseBytes()

> **parseBytes**(`bytes`): `undefined` \| `number`

Defined in: [bytes/bytes.ts:117](https://github.com/Shiv-SB/ts-humanize/blob/540ea280fbbffb4f02169023da1f5402482baf2b/src/bytes/bytes.ts#L117)

Parses a string representation of bytes into the number of bytes it represents.

Will return `undefined` if unable to parse bytes.

See also: bytes, iBytes

## Parameters

### bytes

`string`

## Returns

`undefined` \| `number`

## Example

```ts
parseBytes("42 MB") // 42000000
parseBytes("42 mib") // 44040192
```
