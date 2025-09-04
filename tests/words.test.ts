import { describe, expect, test } from "bun:test";
import { pluralWord } from "../src/english/words";

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