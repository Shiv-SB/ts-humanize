import { describe, expect, test } from "bun:test";
import { capitalizeSentence, capitalizeWord, formatSentence } from "../src/formatting/strings";

describe("capitalizeWord", () => {
    const testList: [string, string][] = [
        ["foo", "Foo"],
        ["Foo", "Foo"],
        [" foo", " Foo"],
        ["foo  ", "Foo  "],
        ["  foo ", "  Foo "],
        ["\nfoo", "\nFoo"],
        ["foo \n Foo", "Foo \n Foo"],
        ["fFO", "FFO"],
        ["foo foo", "Foo foo"],
        [" ", " "],
    ];

    test.each(testList)("%p should capitalize to %p", (str, expected) => {
        expect(capitalizeWord(str)).toBe(expected);
    });
});

describe("capitalizeSentence", () => {
    const testList: [string, boolean, string][] = [
        ["foo", false, "Foo"],
        [" foo", false, " Foo"],
        ["  foo", false, "  Foo"],
        ["foo bar", false, "Foo bar"],
        ["foo bar", true, "Foo Bar"],
        ["  foo   bar", true, "  Foo   Bar"],
        ["  foo   bar", false, "  Foo   bar"],
        ["fOO bAR", false, "FOO bAR"],
        ["fOO bAR", true, "FOO BAR"],
        ["\nfoo", false, "\nFoo"],
        ["\n  foo", false, "\n  Foo"],
        ["foo\nbar", false, "Foo\nbar"],
        ["foo\nbar", true, "Foo\nBar"],
        ["   ", false, "   "],
        ["", false, ""],
        ["foo  bar  baz", true, "Foo  Bar  Baz"],
        ["foo  bar  baz", false, "Foo  bar  baz"],
    ];

    test.each(testList)(
        "%p which optional arg %p should format to %p",
        (sentace, cap, expected) => {
            expect(capitalizeSentence(sentace, cap)).toBe(expected);
        }
    );
});

describe("formatSentence", () => {
    type Opts = Parameters<typeof formatSentence>[1];
    const testList: [string, string, Opts][] = [
        ["foo", "Foo", undefined],
        ["foo bar", "Foo bar", undefined],
        ["  foo Bar", "Foo bar", undefined],
        ["  foo   bar  ", "Foo bar", undefined],
        ["\nfoo\n\nbar \n ", "Foo bar", undefined],
        ["     foo bar", "Foo bar", undefined],
        ["foo bar     ", "Foo bar", undefined],
        ["\t\tfoo\tbar\t", "Foo bar", undefined],
        ["   FOO bar", "Foo bar", undefined],
        ["foo BAR baz", "Foo bar baz", undefined],
        ["foo NASA BAR", "Foo nasa bar", undefined],
        ["foo NASA bar", "Foo NASA bar", { preserve: ["NASA"], capitalizeAllWords: false }],
        ["foo NASA bar", "Foo NASA Bar", { preserve: ["NASA"], capitalizeAllWords: true }],
        ["foo bar baz", "Foo Bar Baz", { capitalizeAllWords: true }],
        ["   foo   BAR   baz   ", "Foo Bar Baz", { capitalizeAllWords: true }],
        ["   foo   BAR   baz   ", "Foo BAR baz", { preserve: ["BAR"], capitalizeAllWords: false }],
        ["", "", undefined],
        ["   ", "", undefined],
        ["\n", "", undefined],
    ];

    test.each(testList)("%p should format to %p", (sentence, expected, opts) => {
        expect(formatSentence(sentence, opts)).toBe(expected);
    })
});
