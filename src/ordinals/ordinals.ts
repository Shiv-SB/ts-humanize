import * as comma from '../formatting/comma';

type CommifyOptions = {
    commify?: true;
    commifyOptions?: Parameters<typeof comma["commify"]>[1]
} | {
    commify?: false;
}

// Can be extended in the future
type OrdinalOptions = {} & CommifyOptions;

/**
 * Returns the ordinal representation of a number (e.g., 1st, 2nd, 3rd, 4th).
 * Always rounds to the nearest whole number.
 *
 * @param x - The number to convert to its ordinal string.
 * @param options - Options for additional formatting such as commifying.
 * @returns The ordinal string for the given number.
 *
 * @example
 * ordinal(1); // "1st"
 * ordinal(22); // "22nd"
 * ordinal(-13); // "-13th"
 * ordinal(1234, { commify: true }); // "1,234th"
 * ordinal(12.7); // "13th"
 * ordinal(1003.35, { commify: true }); // "1,003rd"
 */
export function ordinal(x: number, options?: OrdinalOptions): string {
    const num = Math.round(x);
    const abs = Math.abs(num);
    let suffix = "th";
    
    switch (abs % 10) {
        case 1:
            if (abs % 100 !== 11) suffix = "st";
            break;
        case 2:
            if (abs % 100 !== 12) suffix = "nd";
            break;
        case 3:
            if (abs % 100 !== 13) suffix = "rd";
            break;
    }

    if (options?.commify) {
        return `${comma.commify(num, options.commifyOptions)}${suffix}`;
    }
    return `${num}${suffix}`;
}
