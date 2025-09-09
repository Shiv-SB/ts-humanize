[**ts-humanize v0.5.0**](../README.md)

***

[ts-humanize](../README.md) / formatSentance

# Function: formatSentance()

> **formatSentance**(`sentence`, `options?`): `string`

Defined in: [formatting/strings.ts:135](https://github.com/Shiv-SB/ts-humanize/blob/b20c339cae69f529f20e775917f6cd1ea59de3d9/src/formatting/strings.ts#L135)

Formats a sentence by capitalizing the first word (or all words if capitalizeAllWords is true),
removing extra spaces, and normalizing words to lowercase unless specified in the preserve list.

## Parameters

### sentence

`string`

The sentence to format.

### options?

`FormatSentanceOpts`

Formatting options.

## Returns

`string`

The formatted sentence.

## Examples

```ts
formatSentance("  hElLo   wOrLD  "); // "Hello world"
```

```ts
formatSentance("API HTTP Response", { preserve: ["HTTP"] }); // "Api HTTP response"
```
