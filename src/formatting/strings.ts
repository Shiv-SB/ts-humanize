// TODO:
// - optimise all of this
//      - look into bitwise shifts to capitilise
//      - handle line breaks?

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

// Preserves extra spaces and padding
// Does not normalise (e.g hElLo will become HElLo not Hello).
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
    capitalizeAllWords: boolean;
};

// need to think of a good name for this.
// will:
// - capitalise first word
// - remove padding and extra spaces between words
// - normalise words (e.g hElLO -> hello)
export function formatSentance(
    sentence: string,
    options?: FormatSentanceOpts
) {
    if (!sentence) return "";
    const { preserve, capitalizeAllWords = false } = options || {};
    const trimmed = sentence.trim();
    const len = trimmed.length;
    let output: string[] = [];

    for (let i = 0; i < len; i++) {
        const char = trimmed[i]!;
        if (i === 0) {
            output[i] = char.toUpperCase();
            continue;
        }
        const isStartOfWord: boolean = isWhiteSpace(trimmed[i - 1]!);
        if (capitalizeAllWords && isStartOfWord) {
            output[i] = char.toUpperCase();
            continue;
        }
        if (isStartOfWord && isWhiteSpace(char)) {
            continue;
        }
        output[i] = char;
    }
    return output.join("");
}
