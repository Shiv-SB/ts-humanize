[**ts-humanize v1.0.2**](../README.md)

***

[ts-humanize](../README.md) / formatSentence

# Function: formatSentence()

> **formatSentence**(`sentence`, `options?`): `string`

Defined in: [formatting/strings.ts:139](https://github.com/Shiv-SB/ts-humanize/blob/709cbb94bf4de9ca51ef719ecc2d1553d2da54c5/src/formatting/strings.ts#L139)

Formats a sentence by capitalizing the first word (or all words if capitalizeAllWords is true),
removing extra spaces, and normalizing words to lowercase unless specified in the preserve list.

## Parameters

### sentence

`string`

The sentence to format.

### options?

`FormatSentenceOpts`

Formatting options.

## Returns

`string`

The formatted sentence.

## Examples

```ts
formatSentence("  hElLo   wOrLD  "); // "Hello world"
```

```ts
formatSentence("API HTTP Response", { preserve: ["HTTP"] }); // "Api HTTP response"
```
