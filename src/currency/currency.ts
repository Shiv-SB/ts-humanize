import { currencyMap, type ISO_4217_Code } from '../units/currency.units';

type CurrencyOptions = {
    includeSpace?: boolean;
}

// A lightweight wrapper around toLocaleString which provides type and runtime safety.
export function currency(amount: number, currencyCode: ISO_4217_Code, options?: CurrencyOptions): string | undefined {
    if (typeof amount !== "number") return undefined;
    const curr = currencyMap.get(currencyCode);
    if (!curr) return undefined;

    const {
        includeSpace = false,
    } = options || {};

    if (curr.isNonStandardCurrency) {
        const value = amount.toFixed(curr.decimalPlaces);
        return `${curr.symbol}${includeSpace ? " " : ""}${value}`;
    }

    const formatter = Intl.NumberFormat(curr.localeCode, {
        maximumFractionDigits: curr.decimalPlaces,
        style: "currency",
        currency: currencyCode,
    });

    const parts = formatter.formatToParts(amount);
    const pLen = parts.length;
    let value = "";

    for (let i = 0; i < pLen; i++) {
        const part = parts[i]!;
        console.log("part", part.type);

        switch (part.type) {
            case "currency":
                value += `${part.value}${includeSpace ? " " : ""}`
                break;
            default:
                value += part.value;
                break;
        }
    }

    return value;
}
