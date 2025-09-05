[**ts-humanize v0.4.1**](../README.md)

***

[ts-humanize](../README.md) / computeSI

# Function: computeSI()

> **computeSI**(`input`, `roundTo?`): \[`number`, `SI_PREFIXES`\]

Defined in: [SI-Units/SI.ts:20](https://github.com/Shiv-SB/ts-humanize/blob/0d540451c5699973f9888531eb0bca5d6cf7fae3/src/SI-Units/SI.ts#L20)

Finds the most appropriate SI prefix for the given number
and returns the prefix along with the value adjusted to be within
that prefix

Will round to a maximum of `roundTo` decimal places (default: 6).

See also: SI, parseSI

## Parameters

### input

`number`

### roundTo?

`number` = `6`

Number of decimal places to round to (default: 6)

## Returns

\[`number`, `SI_PREFIXES`\]

## Example

```ts
computeSI(2.2345e-12) // [2.2345, "p"]
computeSI(1234567, 2) // [1.23, "M"]
```
