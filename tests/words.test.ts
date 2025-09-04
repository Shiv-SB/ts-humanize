import { describe, expect, test } from "bun:test";
import { plural, pluralWord, wordSeries } from "../src/english/words";

describe("pluralWord", () => {
    const testlist: [number, string, string | undefined, string][] = [
        [0, "object", undefined, "objects"],
        [1, "object", undefined, "object"],
        [-1, "object", undefined, "objects"],
        [42, "object", undefined, "objects"],
        [2, "vax", "vaxen", "vaxen"],
        
        // special cases
        [2, "index", undefined, "indices"],

        // ending in a sibilant sound
        [2, "bus", undefined, "buses"],
        [2, "bush", undefined, "bushes"],
        [2, "watch", undefined, "watches"],
        [2, "box", undefined, "boxes"],

        // ending with "o" proceded by a consonant
        [2, "hero", undefined, "heroes"],

        // ending with "y" proceded by a consonant
        [2, "lady", undefined, "ladies"],
        [2, "day", undefined, "days"],
    ];

    test.each(testlist)("%p number(s) of %p with optional plural %p should result in %p", (quant, sing, plural, want) =>{
        const result = pluralWord(quant, sing, plural);
        expect(result).toBe(want);
    });
});

describe("plural", () => {
    const testList: [number, string, string | undefined, string][] = [
        [1, "object", "", "1 object"],
        [42, "object", "", "42 objects"],
        [1234567, "object", "", "1,234,567 objects"],

    ];

    test.each(testList)("%p number of %p with optional plural %p should result in %p", (quant, sing, plu, want) => {
        const result = plural(quant, sing, plu);
        expect(result).toBe(want);

    });
});

describe("wordSeries", () => {
    const testList: [string[], string, string][] = [
        [[""], "and", ""],
        [["foo"], "and", "foo"],
        [["foo", "bar"], "and", "foo and bar"],
        [["foo", "bar", "baz"], "and", "foo, bar and baz"],
        [["foo", "bar", "baz"], "or", "foo, bar or baz"],
    ];
    
    test.each(testList)("list %p with conjuction %p should result in %p", (list, conj, want) => {
        const result = wordSeries(list, conj);
        expect(result).toBe(want);
    });
});
