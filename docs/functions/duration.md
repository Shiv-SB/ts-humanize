[**ts-humanize v1.0.0**](../README.md)

***

[ts-humanize](../README.md) / duration

# Function: duration()

> **duration**(`dur`, `options?`): `undefined` \| `string`

Defined in: [time/time.ts:101](https://github.com/Shiv-SB/ts-humanize/blob/540ea280fbbffb4f02169023da1f5402482baf2b/src/time/time.ts#L101)

Formats a duration to a human readable string.

Negative numbers will be treated as positives

## Parameters

### dur

`number`

### options?

`DurationOptions`

## Returns

`undefined` \| `string`

## Example

```ts
duration(30_000_000);
// => "8 hours"

duration(3, { unit: "weeks" });
// => "3 weeks"
```
