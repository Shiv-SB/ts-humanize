// TODO:
// - optimise all of this
//      - look into bitwise shifts to capitilise

export function capitalizeWord(str: string): string {
    if (!str) return "";
    const firstLetter = str[0]!.toUpperCase();
    return `${firstLetter}${str.slice(1)}`;
}

// Preserves extra spaces and padding
// Does not normalise (e.g hElLo will become HElLo not Hello).
export function capitalizeSentence(sentence: string, capitalizeAllWords: boolean = false): string {
    const len = sentence.length;
    if (!sentence) return "";
    let output: string[] = [];
    for (let i = 0; i < len; i++) {
        const char = sentence[i]!;
        if (i === 0) {
            output[i] = char.toUpperCase();
            continue;
        }
        const isStartOfWord: boolean = sentence[i - 1] === " ";
        if (capitalizeAllWords && isStartOfWord) {
            output[i] = char.toUpperCase();
            continue;
        }
        output[i] = char;
    }
    return output.join("");    
}

type ToPropersentenceOps = {
    
    /**
     * An optional list of strings to preserve formatting.
     * Very useful to prevent lowercasing of acronyms.
     *
     * @type {?string[]}
     */
    preserve?: string[];
    capitalizeAllWords: boolean;
}

// need to think of a good name for this.
// will:
// - capitalise first word
// - remove padding and extra spaces between words
// - normalise words (e.g hElLO -> hello)
export function formatSentance(sentence: string, options?: ToPropersentenceOps) {
    if (!sentence) return "";
    const {
        preserve,
        capitalizeAllWords = false,
    } = options || { }
    const trimmed = sentence.trim();
    const len = trimmed.length;
    let output: string[] = [];

    for (let i = 0; i < len; i++) {
        const char = trimmed[i]!;
        if (i === 0) {
            output[i] = char.toUpperCase();
            continue;
        }
        const isStartOfWord: boolean = trimmed[i - 1] === " ";
        if (capitalizeAllWords && isStartOfWord) {
            output[i] = char.toUpperCase();
            continue;
        }
        if (isStartOfWord && char === " ") {
            continue;
        }
        output[i] = char;
    }
    return output.join("");
}
