import { siPrefixTable, type SI_PREFIXES } from "../units/SI.units";

export function computeSI(input: number): [number, SI_PREFIXES] {
    if (input === 0) return [0, ""];

    const mag = Math.abs(input);
    let exponent = Math.floor(Math.log10(mag));
    exponent = Math.floor(exponent / 3) * 3;

    let value = mag / Math.pow(10, exponent);

    if (value === 1000) exponent = 3;
    if (input < 0) value *= -1;

    value = Math.round(value * 1e6) / 1e6;

    const prefix = siPrefixTable.get(exponent);
    return [value, prefix!];
}