[**ts-humanize v1.0.0**](../README.md)

***

[ts-humanize](../README.md) / pluralWord

# Function: pluralWord()

> **pluralWord**(`quantity`, `singular`, `plural?`): `string`

Defined in: [english/words.ts:37](https://github.com/Shiv-SB/ts-humanize/blob/540ea280fbbffb4f02169023da1f5402482baf2b/src/english/words.ts#L37)

pluralWord builds the plural form of an English word.

The simple English rules of regular pluralization will be used
if the plural arg is empty/undefined.

## Parameters

### quantity

`number`

The number of things of the singular.

### singular

`string`

The string to to be converted.

### plural?

`string`

The optional plural case.

## Returns

`string`

## Example

```ts
pluralWord(1, "cat"); // returns "cat"
pluralWord(2, "cat"); // returns "cats"
pluralWord(2, "index"); // returns "indices"
pluralWord(2, "baby"); // returns "babies"
```
