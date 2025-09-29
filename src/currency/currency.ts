import { currencyMap, type ISO_4217_Code } from '../units/currency.units';

function normalizeCurrencyOutput(input: string): string {
  return input
    .replace(/[\u200e\u200f\u061c\u202A-\u202E]/g, "")  // Remove directionality
    .replace(/\s+/g, "");                               // Remove all spaces (or use trim if you prefer)
}

// A lightweight wrapper around toLocaleString which provides type and runtime safety.
export function currency(amount: number, currencyCode: ISO_4217_Code): string | undefined {
    if (typeof amount !== "number") return undefined;
    const curr = currencyMap.get(currencyCode);
    if (!curr) return undefined;

    if (curr.isNonStandardCurrency) {
        const value = amount.toFixed(curr.decimalPlaces);
        return `${curr.symbol}${value}`;
    }

    const formatter = Intl.NumberFormat(curr.localeCode, {
        maximumFractionDigits: curr.decimalPlaces,
        style: "currency",
        currency: currencyCode,
    });

    const value = formatter.format(amount);
    return normalizeCurrencyOutput(value);
}


