type IEC_Units =
    "Byte"   |
    "KiByte" |
    "MiByte" |
    "GiByte" |
    "TiByte" |
    "PiByte" |
    "EiByte";

type SI_Units =
    "Byte"  |
    "Ibyte" |
    "KByte" |
    "MByte" |
    "GByte" |
    "TByte" |
    "PByte" |
    "EByte";

type Prefixes =
    "b"     |
    "kib"   |
    "kb"    |
    "mib"   |
    "mb"    |
    "gib"   |
    "gb"    |
    "tib"   |
    "tb"    |
    "pib"   |
    "pb"    |
    "eib"   |
    "eb"    |
    // without suffix
    ""      |
    "ki"    |
    "k"     |
    "mi"    |
    "m"     |
    "gi"    |
    "g"     |
    "ti"    |
    "t"     |
    "pi"    |
    "t"     |
    "pi"    |
    "p"     |
    "ei"    |
    "e";

const IEC_BYTES = new Map<IEC_Units, bigint>([
    ["Byte", 1n << (0n * 10n)],
    ["KiByte", 1n << (1n * 10n)],
    ["MiByte", 1n << (2n * 10n)],
    ["GiByte", 1n << (3n * 10n)],
    ["TiByte", 1n << (4n * 10n)],
    ["PiByte", 1n << (5n * 10n)],
    ["EiByte", 1n << (6n * 10n)],
]);

const SI_BYTES = new Map<SI_Units, bigint>([
    ["Byte", 1n],                  // 1
    ["KByte", 1_000n],               // 1 × 10³
    ["MByte", 1_000_000n],           // 1 × 10⁶
    ["GByte", 1_000_000_000n],       // 1 × 10⁹
    ["TByte", 1_000_000_000_000n],   // 1 × 10¹²
    ["PByte", 1_000_000_000_000_000n], // 1 × 10¹⁵
    ["EByte", 1_000_000_000_000_000_000n], // 1 × 10¹⁸
]);

export const byteSizeTable = new Map<Prefixes, bigint>([
    // SI units
    ["b", SI_BYTES.get("Byte")!],
    ["kb", SI_BYTES.get("KByte")!],
    ["mb", SI_BYTES.get("MByte")!],
    ["gb", SI_BYTES.get("GByte")!],
    ["tb", SI_BYTES.get("TByte")!],
    ["pb", SI_BYTES.get("PByte")!],
    ["eb", SI_BYTES.get("EByte")!],
    // IEC units
    ["kib", IEC_BYTES.get("KiByte")!],
    ["mib", IEC_BYTES.get("MiByte")!],
    ["gib", IEC_BYTES.get("GiByte")!],
    ["tib", IEC_BYTES.get("TiByte")!],
    ["pib", IEC_BYTES.get("PiByte")!],
    ["eib", IEC_BYTES.get("EiByte")!],
    // Without suffix
    ["", SI_BYTES.get("Byte")!],
    ["k", SI_BYTES.get("KByte")!],
    ["m", SI_BYTES.get("MByte")!],
    ["g", SI_BYTES.get("GByte")!],
    ["t", SI_BYTES.get("TByte")!],
    ["p", SI_BYTES.get("PByte")!],
    ["e", SI_BYTES.get("EByte")!],
    ["ki", IEC_BYTES.get("KiByte")!],
    ["mi", IEC_BYTES.get("MiByte")!],
    ["gi", IEC_BYTES.get("GiByte")!],
    ["ti", IEC_BYTES.get("TiByte")!],
    ["pi", IEC_BYTES.get("PiByte")!],
    ["ei", IEC_BYTES.get("EiByte")!],
]);

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

    const num = BigInt(numStr);
    const extra = bytes.slice(lastDigit).trim().toLowerCase();

    if (!isPrefix(extra)) return undefined;

    const multiplier = byteSizeTable.get(extra);
    if (multiplier === undefined) return undefined;

    const value = num * multiplier;
    if (value >= Number.MAX_SAFE_INTEGER) return undefined;
    return Number(value);
}
