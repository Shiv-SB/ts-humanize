const WHITESPACE_CODES: number[] = [
    9, 10, 11, 12, 13, 32, 133, 160, 5760, 8192, 8193, 8194, 8195, 8196, 8197,
    8198, 8199, 8200, 8201, 8202, 8232, 8233, 8239, 8287, 12288,
];

/**
 * 
 * @param str 
 * @returns 
 * @private
 */
function isWhiteSpace(str: string): boolean {
    if (!str) return false;
    if (str.length !== 1) return false;
    return WHITESPACE_CODES.includes(str.charCodeAt(0));
}

/**
 * Normalizes a word to lowercase unless it's in the preserve list.
 * @private
 */
function normalizeWord(word: string, preserve?: string[]): string {
    if (!word) return "";
    if (preserve && preserve.includes(word)) return word;
    return word.toLowerCase();
}

/**
 * Capitalizes the first character of a string, preserving any leading whitespace.
 * If the string starts with whitespace, capitalizes the first non-whitespace character after each whitespace.
 *
 * @param {string} str - The string to capitalize.
 * @returns {string} The capitalized string.
 *
 * @example
 * capitalizeWord("hello world"); // "Hello world"
 * @example
 * capitalizeWord("  hello"); // "  Hello"
 */
export function capitalizeWord(str: string): string {
    if (!str) return "";

    // Early return case for if the word doesnt start with a whitespace
    if (!isWhiteSpace(str[0]!)) {
        const firstLetter = str[0]!.toUpperCase();
        return `${firstLetter}${str.slice(1)}`;
    }

    const len = str.length;
    let output: string[] = [];

    for (let i = 0; i < len; i++) {
        const char = str[i]!;
        output[i] = char;
        if (isWhiteSpace(str[i - 1]!)) {
            output[i] = char.toUpperCase();
        }
    }
    return output.join("");
}

/**
 * Capitalizes the first character of a sentence, or the first character after each whitespace if capitalizeAllWords is true.
 * Preserves all original whitespace and does not normalize letter casing except for capitalization.
 *
 * See formatSentance to trim and clean whitespace.
 * 
 * @param {string} sentence - The sentence to capitalize.
 * @param {boolean} [capitalizeAllWords=false] - Whether to capitalize every word in the sentence.
 * @returns {string} The capitalized sentence.
 *
 * @example
 * capitalizeSentence("hello world"); // "Hello world"
 * @example
 * capitalizeSentence("hello   world", true); // "Hello   World"
 */
export function capitalizeSentence(
    sentence: string,
    capitalizeAllWords: boolean = false
): string {
    if (!sentence) return "";

    const len = sentence.length;
    let output: string[] = [];
    let shouldCapitalize = true;

    for (let i = 0; i < len; i++) {
        const char = sentence[i]!;
        if (isWhiteSpace(char)) {
            output[i] = char;
            shouldCapitalize = capitalizeAllWords ? true : shouldCapitalize;
            continue;
        }
        if (shouldCapitalize) {
            output[i] = char.toUpperCase();
            shouldCapitalize = false;
        } else {
            output[i] = char;
        }
    }
    return output.join("");
}

type FormatSentanceOpts = {
    /**
     * An optional list of strings to preserve formatting.
     * Very useful to prevent lowercasing of acronyms.
     *
     * @type {?string[]}
     */
    preserve?: string[];
    
    /**
     * If true, will capitalize all words in the sentance, otherwise, just the first word.
     *
     * @type {boolean}
     * @default {false}
     */
    capitalizeAllWords: boolean;
};

/**
 * Formats a sentence by capitalizing the first word (or all words if capitalizeAllWords is true),
 * removing extra spaces, and normalizing words to lowercase unless specified in the preserve list.
 *
 * @param {string} sentence - The sentence to format.
 * @param {FormatSentanceOpts} [options] - Formatting options.
 * @returns {string} The formatted sentence.
 *
 * @example
 * formatSentance("  hElLo   wOrLD  "); // "Hello world"
 * @example
 * formatSentance("api HTTP response", { preserve: ["HTTP"] }); // "Api HTTP response"
 */
export function formatSentance(
    sentence: string,
    options?: FormatSentanceOpts
) {
    if (!sentence) return "";
    const { preserve, capitalizeAllWords = false } = options || {};

    const words = sentence.trim().split(/\s+/);

    const formattedWords = words.map((word, idx) => {
        const normalized = normalizeWord(word, preserve);
        if (idx === 0 || capitalizeAllWords) {
            return normalized.charAt(0).toUpperCase() + normalized.slice(1);
        }
        return normalized;
    });

    let result = formattedWords.join(" ");
    return result;
}