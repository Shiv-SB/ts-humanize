[**ts-humanize v0.5.0**](../README.md)

***

[ts-humanize](../README.md) / capitalizeSentence

# Function: capitalizeSentence()

> **capitalizeSentence**(`sentence`, `capitalizeAllWords?`): `string`

Defined in: [formatting/strings.ts:77](https://github.com/Shiv-SB/ts-humanize/blob/b20c339cae69f529f20e775917f6cd1ea59de3d9/src/formatting/strings.ts#L77)

Capitalizes the first character of a sentence, or the first character after each whitespace if capitalizeAllWords is true.
Preserves all original whitespace and does not normalize letter casing except for capitalization.

See formatSentance to trim and clean whitespace.

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
