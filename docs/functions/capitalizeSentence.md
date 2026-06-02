[**ts-humanize v1.0.2**](../README.md)

***

[ts-humanize](../README.md) / capitalizeSentence

# Function: capitalizeSentence()

> **capitalizeSentence**(`sentence`, `capitalizeAllWords?`): `string`

Defined in: [formatting/strings.ts:77](https://github.com/Shiv-SB/ts-humanize/blob/709cbb94bf4de9ca51ef719ecc2d1553d2da54c5/src/formatting/strings.ts#L77)

Capitalizes the first character of a sentence, or the first character after each whitespace if capitalizeAllWords is true.
Preserves all original whitespace and does not normalize letter casing except for capitalization.

See formatSentence to trim and clean whitespace.

## Parameters

### sentence

`string`

The sentence to capitalize.

### capitalizeAllWords?

`boolean` = `false`

Whether to capitalize every word in the sentence.

## Returns

`string`

The capitalized sentence.

## Examples

```ts
capitalizeSentence("hello world"); // "Hello world"
```

```ts
capitalizeSentence("hello   world", true); // "Hello   World"
```
