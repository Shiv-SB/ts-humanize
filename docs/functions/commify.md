[**ts-humanize v0.3.0**](../README.md)

***

[ts-humanize](../README.md) / commify

# Function: commify()

> **commify**(`x`, `locale?`): `string`

Defined in: [formatting/comma.ts:9](https://github.com/Shiv-SB/ts-humanize/blob/919e20c5062ab422c95ea4551ce3ee99cc497132/src/formatting/comma.ts#L9)

Formats a number or bigint with commas as thousands separators, using the specified locale.
Note: Will round the input to 3 decimal places by default.

## Parameters

### x

The number or bigint to format.

`number` | `bigint`

### locale?

`LocalesArgument`

Optional locale string or array of locale strings for formatting.

## Returns

`string`

The formatted string with commas as thousands separators.
