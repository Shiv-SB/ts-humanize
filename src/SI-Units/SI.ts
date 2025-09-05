import { siPrefixTable, type SI_PREFIXES } from "../units/SI.units";

/**
 * Finds the most appropriate SI prefix for the given number
 * and returns the prefix along with the value adjusted to be within
 * that prefix
 * 
 * Will round to a maximum of 6 decimal places.
 * 
 * See also: SI, parseSI
 * 
 * @example
 * computeSI(2.2345e-12) // [2.2345, "p"]
 *
 * @param {number} input 
 * @returns {[number, SI_PREFIXES]} 
 */
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