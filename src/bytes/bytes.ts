import { type Prefixes, byteSizeTable } from "../units/bytes.units";

function isPrefix(x: string): x is Prefixes {
    return byteSizeTable.has(x as Prefixes);
}

function logn(n: number, base: number): number {
    return Math.log(n) / Math.log(base);
}

function countDigits(n: number): number {
    let digits = 0;
    while (n != 0) {
        n /= 10;
        digits += 1;
    }
    return digits;
}

function humanateBytes(bytes: number, base: number, minDigits: number, sizes: string[]): string {
    if (bytes < 10) return `${bytes} B`;

    const exp: number = Math.floor(logn(bytes, base));
    const suffix: string = sizes[exp]!;
    const rounding: number = Math.pow(10, minDigits - 1);
    const value: number = Math.floor(bytes / Math.pow(base, exp) * rounding + 0.5) / rounding;
    let digits: number = minDigits - countDigits(value);

    if (digits < 0) digits = 0;
    return `${value} ${suffix}`;
}

/**
 * Produces a human-readable representation of an SI size.
 *
 * See also: parseBytes.
 * 
 * @example
 * bytes(82854982) // "83 MB"
 * @export
 * @param {number} bytes 
 * @returns {string} 
 */
export function bytes(bytes: number): string {
    const sizes = ["B", "kB", "MB", "GB", "TB", "PB", "EB"];
    return humanateBytes(bytes, 1000, 2, sizes);
}

/**
 * Produces a human-readable representation of an SI size.
 *
 * If `numberOfDigits` is less than or equal to the number of digits in `bytes`, the decimal part will be ommited.
 * 
 * See also: parseBytes
 * 
 * @example
 * bytesN(82854982, 3) // "82.9 MB"
 * bytesN(82854982, 4) // "82.85 MB"
 * @export
 * @param {number} bytes 
 * @param {number} numberOfDigits Specifies the total number of digits to output, including the decimal part.
 * @returns {string} 
 */
export function bytesN(bytes: number, numberOfDigits: number): string {
    const sizes = ["B", "kB", "MB", "GB", "TB", "PB", "EB"];
    return humanateBytes(bytes, 1000, numberOfDigits, sizes);
}

/**
 * Produces a human-readable representation of an IEC size.
 *
 * See also: parseBytes
 * 
 * @example
 * iBytes(82854982) // "79 MiB"
 * @export
 * @param {number} bytes 
 * @returns {string} 
 */
export function iBytes(bytes: number): string {
    const sizes = ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB"];
    return humanateBytes(bytes, 1024, 2, sizes);
}

/**
 * Produces a human-readable representation of an IEC size.
 * 
 * If `numberOfDigits` is less than or equal to the number of digits in `bytes`, the decimal part will be ommited.
 * 
 * See also: parseBytes
 *
 * @example
 * IBytesN(82854982, 4) // "79.02 MiB"
 * IBytesN(123456789, 3) // "118 MiB"
 * IBytesN(123456789, 6) // "117.738 MiB"
 * @export
 * @param {number} bytes 
 * @param {number} numberOfDigits Specifies the total number of digits to output, including the decimal part.
 * @returns {string} 
 */
export function iBytesN(bytes: number, numberOfDigits: number): string {
    const sizes = ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB"];
    return humanateBytes(bytes, 1024, numberOfDigits, sizes);
}

/**
 * Parses a string representation of bytes into the number of bytes it represents.
 *
 * Will return `undefined` if unable to parse bytes.
 * 
 * See also: bytes, iBytes
 * 
 * @example
 * parseBytes("42 MB") // 42000000
 * parseBytes("42 mib") // 44040192
 * @export
 * @param {string} bytes 
 * @returns {(number | undefined)}
 */
export function parseBytes(bytes: string): number | undefined {
    const len = bytes.length;
    let lastDigit = 0;
    let hasComma = false;
    for (let i = 0; i < len; i++) {
        const digit = bytes[i]!;
        if (!(digit >= "0" && digit <= "9" || digit === "." || digit === ",")) {
            break;
        }
        if (digit === ",") hasComma = true;
        lastDigit++;
    }

    if (lastDigit === 0) return undefined;
    const numStr = hasComma
        ? bytes.slice(0, lastDigit).replaceAll(",", "")
        : bytes.slice(0, lastDigit);

    const extra = bytes.slice(lastDigit).trim().toLowerCase();

    if (!isPrefix(extra)) return undefined;

    const multiplier = byteSizeTable.get(extra);
    if (multiplier === undefined) return undefined;

    let value: number;
    if (numStr.includes(".")) {
        // Decimal: use float math
        const num = Number(numStr);
        value = num * Number(multiplier);
    } else {
        // Integer: use BigInt for safety
        const num = BigInt(numStr);
        const result = num * multiplier;
        if (result >= BigInt(Number.MAX_SAFE_INTEGER)) return undefined;
        value = Number(result);
    }

    return Math.round(value);
}
