/**
 * Formats a number or bigint with commas as thousands separators, using the specified locale.
 * Note: Will round the input to 3 decimal places by default.
 *
 * @param x - The number or bigint to format.
 * @param locale - Optional locale string or array of locale strings for formatting.
 * @returns The formatted string with commas as thousands separators.
 *
 * @example
 * // US English (default)
 * commify(1234567.891); // "1,234,567.891"
 *
 * @example
 * // German (de-DE)
 * commify(1234567.891, 'de-DE'); // "1.234.567,891"
 *
 * @example
 * // French (fr-FR)
 * commify(1234567.891, 'fr-FR'); // "1 234 567,891"
 *
 * @example
 * // Indian English (en-IN)
 * commify(1234567.891, 'en-IN'); // "12,34,567.891"
 *
 * @example
 * // Array of locales
 * commify(1234567.891, ['fr-CA', 'en-US']); // "1 234 567,891"
 */
export function commify(x: number | bigint, locale?: Intl.LocalesArgument): string {
    return x.toLocaleString(locale ?? undefined);
}