[**ts-humanize v0.4.0**](../README.md)

***

[ts-humanize](../README.md) / difference

# Function: difference()

> **difference**(`date1`, `date2`, `unit`, `opts?`): `number`

Defined in: [time/time.ts:55](https://github.com/Shiv-SB/ts-humanize/blob/28b6c4fe653b4af34bfa09de7ea701f96d00b0f4/src/time/time.ts#L55)

Calculates the difference between two dates/times in the specified unit.

## Parameters

### date1

The first date (Date or Dayjs instance).

`Dayjs` | `Date`

### date2

The second date (Date or Dayjs instance).

`Dayjs` | `Date`

### unit

The unit of measurement for the difference (e.g., "days", "hours", "ms"). Defaults to "ms".

`"s"` | `"y"` | `"millisecond"` | `"second"` | `"minute"` | `"hour"` | `"day"` | `"month"` | `"year"` | `"date"` | `"milliseconds"` | `"seconds"` | `"minutes"` | `"hours"` | `"days"` | `"months"` | `"years"` | `"dates"` | `"d"` | `"D"` | `"M"` | `"h"` | `"m"` | `"ms"` | `"quarter"` | `"quarters"` | `"Q"` | `"week"` | `"weeks"` | `"w"`

### opts?

`DifferenceOpts`

Optional settings.

## Returns

`number`

The difference between date1 and date2 in the specified unit.

## Examples

```ts
difference(new Date('2024-06-01T12:00:00Z'), new Date('2024-06-01T10:00:00Z'), "hours", { roundResult: true });
// => 2
```

```ts
difference(dayjs(), dayjs().subtract(1, 'day'), "days", { roundResult: false });
// => 1
```

```ts
difference(dayjs(), dayjs().add(90, 'minutes'), "minutes");
// => -90
```
