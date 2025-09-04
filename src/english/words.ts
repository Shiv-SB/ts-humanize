import { commify } from "../formatting";

/**
 * These are included because they are common techincal terms.
 *
 * @type {Map<string, string>}
 */
const specialPlurals: Map<string, string> = new Map([
    ["index", "indices"],
    ["matrix", "matricies"],
    ["vertex", "verticies"],
]);

const sibilantEndings = ["s", "sh", "tch", "x"];

function isVowel(x: string): boolean {
    return ["a", "e", "i", "o", "u"].includes(x.toLowerCase());
}

/**
 * pluralWord builds the plural form of an English word.
 * 
 * The simple English rules of regular pluralization will be used
 * if the plural arg is empty/undefined.
 *
 * @param {number} quantity The number of things of the singular.
 * @param {string} singular The string to to be converted.
 * @param {?string} [plural] The optional plural case.
 * @returns {string} 
 *
 * @example
 * pluralWord(1, "cat"); // returns "cat"
 * pluralWord(2, "cat"); // returns "cats"
 * pluralWord(2, "index"); // returns "indices"
 * pluralWord(2, "baby"); // returns "babies"
 */
export function pluralWord(quantity: number, singular: string, plural?: string): string {
    if (quantity === 1) return singular;
    if (plural) return plural;
    if (specialPlurals.has(singular)) return specialPlurals.get(singular)!;

    // From https://github.com/dustin/go-humanize/blob/master/english/words.go
    // We need to guess what the English plural might be.  Keep this
	// function simple!  It doesn't need to know about every possiblity;
	// only regular rules and the most common special cases.
	//
	// Reference: http://en.wikipedia.org/wiki/English_plural

    for (const ending of sibilantEndings) {
        if (singular.endsWith(ending)) {
            return `${singular}es`;
        }
    }

    const len = singular.length;

    if (len >= 2 && singular[len - 1] === "o" && !isVowel(singular[len -2]!)) {
        return `${singular}es`;
    }

    if (len >= 2 && singular[len - 1] === "y" && !isVowel(singular[len -2]!)) {
        return `${singular.slice(undefined, -1)}ies`;
    }

    return `${singular}s`;
}


/**
 * plural formats an integer and a string into a single pluralized string.
 * 
 * The simple English rules of regular pluralization will be used
 * if the plural form is empty/undefined.
 *
 * @param {number} quantity 
 * @param {string} singular 
 * @param {string} plural 
 * @returns {string}
 */
export function plural(quantity: number, singular: string, plural?: string): string {
    return `${commify(quantity)} ${pluralWord(quantity, singular, plural)}`;
}
