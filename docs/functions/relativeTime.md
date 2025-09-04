[**ts-humanize v0.2.2**](../README.md)

***

[ts-humanize](../README.md) / relativeTime

# Function: relativeTime()

> **relativeTime**(`timeInPast`, `timeInFuture`): `string`

Defined in: [time/time.ts:25](https://github.com/Shiv-SB/ts-humanize/blob/e6098dcb907b4be2eadfed4406ac92a00e666b5f/src/time/time.ts#L25)

Returns a human-readable relative time string between two dates/times.

## Parameters

### timeInPast

The earlier time (Date or Dayjs instance).

`Dayjs` | `Date`

### timeInFuture

The later time (Date or Dayjs instance).

`Dayjs` | `Date`

## Returns

`string`

A string describing the relative time (e.g., "2 hours ago", "in 5 minutes").

## Examples

```ts
relativeTime(new Date('2024-06-01T10:00:00Z'), new Date('2024-06-01T12:00:00Z'));
// => "2 hours ago"
```

```ts
relativeTime(dayjs().subtract(1, 'day'), dayjs());
// => "a day ago"
```

```ts
relativeTime(dayjs(), dayjs().add(3, 'days'));
// => "in 3 days"
```
