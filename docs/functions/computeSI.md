[**ts-humanize v0.2.2**](../README.md)

***

[ts-humanize](../README.md) / computeSI

# Function: computeSI()

> **computeSI**(`input`): \[`number`, `SI_PREFIXES`\]

Defined in: [SI-Units/SI.ts:18](https://github.com/Shiv-SB/ts-humanize/blob/58c6d39c670b3b3862b4035998e27d57f6c37c48/src/SI-Units/SI.ts#L18)

Finds the most appropriate SI prefix for the given number
and returns the prefix along with the value adjusted to be within
that prefix

Will round to 6 decimal places.

See also: SI, parseSI

## Parameters

### input

`number`

## Returns

\[`number`, `SI_PREFIXES`\]

## Example

```ts
computeSI(2.2345e-12) // [2.2345, "p"]
```
