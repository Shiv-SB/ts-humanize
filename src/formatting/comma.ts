// Note - will round based the input to 3 decimal places by default
export function commify(x: number | bigint, locale?: Intl.LocalesArgument): string {
    return x.toLocaleString(locale ?? undefined);
}