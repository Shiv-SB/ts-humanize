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
export function capitalizeSentance(sentance: string, capitalizeAllWords: boolean = false): string {
    const len = sentance.length;
    if (!sentance) return "";
    let output: string[] = [];
    for (let i = 0; i < len; i++) {
        const char = sentance[i]!;
        if (i === 0) {
            output[i] = char.toUpperCase();
            continue;
        }
        const isStartOfWord: boolean = sentance[i - 1] === " ";
        if (capitalizeAllWords && isStartOfWord) {
            output[i] = char.toUpperCase();
            continue;
        }
        output[i] = char;
    }
    return output.join("");    
}

type ToProperSentanceOps = {
    
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
// - remove padding and extra spaces
// - normalise words (e.g hElLO -> hello)
function toProperSentance(sentance: string, opts?: ToProperSentanceOps) {
    if (!sentance) return "";
    const {
        preserve,
        capitalizeAllWords = false,
    } = opts || { }
    const trimmed = sentance.trim();
    const len = trimmed.length;
    let output: string[] = [];

    for (let i = 0; i < len; i++) {
        const char = trimmed[i];
        if (i === 0) {

        }
        
    }

}

console.log(toProperSentance("  foO Bar.   Baz?  243   "));