/**
 * Formats a number or bigint with commas as thousands separators, using the specified locale.
 * Note: Will round the input to 3 decimal places by default.
 *
 * @param x - The number or bigint to format.
 * @param locale - Optional locale string or array of locale strings for formatting.
 * @returns The formatted string with commas as thousands separators.
 */
export function commify(x: number | bigint, locale?: Intl.LocalesArgument): string {
    return x.toLocaleString(locale ?? undefined);
}