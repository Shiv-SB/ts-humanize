/**
 * Returns the ordinal representation of a number (e.g., 1st, 2nd, 3rd, 4th).
 *
 * @param x - The number to convert to its ordinal string.
 * @returns The ordinal string for the given number.
 *
 * @example
 * ordinal(1); // "1st"
 * ordinal(22); // "22nd"
 * ordinal(13); // "13th"
 */
export function ordinal(x: number): string {
    let suffix = "th";
    switch (x % 10) {
        case 1:
            if (x % 100 !== 11) suffix = "st";
            break;
        case 2:
            if (x % 100 !== 12) suffix = "nd";
            break;
        case 3:
            if (x % 100 !== 13) suffix = "rd";
            break;
        default:
            break;
    }
    return `${x}${suffix}`;
}