import { bigByteSizeTable, type BigPrefixes } from "../units/bigBytes.units";

const SI_exp = 1000n;
const IECE_exp = 1024n;

function isBigPrefix(x: string): x is BigPrefixes {
    return bigByteSizeTable.has(x as BigPrefixes);
}

// spaceship op utility function
function cmp<T extends bigint | number>(x: T, y: T): -1 | 0 | 1 {
    if (x < y) return -1;
    if (x > y) return 1;
    return 0; // x === y
}

// divMod returns [quotient, remainder]
function divMod(x: bigint, y: bigint): [bigint, bigint] {
    return [x / y, x % y];
}

// order of magnitude (scaled value + magnitude index)
function oomm(n: bigint, b: bigint, maxmag: number): [number, number] {
    let mag = 0;
    let quotient = n;
    let remainder = 0n;

    while (cmp(quotient, b) >= 0) {
        [quotient, remainder] = divMod(quotient, b);
        mag++;
        if (mag === maxmag && maxmag >= 0) {
            break;
        }
    }

    const result = Number(quotient) + Number(remainder) / Number(b);

    return [result, mag];
}

function humanateBigBytes(bytes: bigint, base: bigint, sizes: string[]): string {
    if (cmp(bytes, 10n) < 0) {
        return `${bytes} B`;
    }

    const [val, mag] = oomm(bytes, base, sizes.length - 1);
    const suffix = sizes[mag];

    if (val < 10) {
        return `${val.toLocaleString(undefined, { 
            minimumFractionDigits: 1, 
            maximumFractionDigits: 1, 
            useGrouping: false 
        })} ${suffix}`;
    }

    return `${val.toLocaleString(undefined, { maximumFractionDigits: 0, useGrouping: false })} ${suffix}`;
}

export function bigBytes(bytes: bigint): string {
    const sizes = ["B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB", "RB", "QB"];
    return humanateBigBytes(bytes, SI_exp, sizes);
}

export function bigIBytes(bytes: bigint): string {
    const sizes = ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB", "RiB", "QiB"];
    return humanateBigBytes(bytes, IECE_exp, sizes);
}

export function parseBigBytes(bytes: string): bigint | undefined {
    const len = bytes.length;
    let lastDigit = 0;
    let hasComma = false;
    let hasDot = false;
    for (let i = 0; i < len; i++) {
        const digit = bytes[i]!;
        if (!(digit >= "0" && digit <= "9" || digit === "." || digit === ",")) {
            break;
        }
        if (digit === ",") hasComma = true;
        if (digit === ".") hasDot = true;
        lastDigit++;
    }

    if (lastDigit === 0) return undefined;
    const numStr = hasComma
        ? bytes.slice(0, lastDigit).replaceAll(",", "")
        : bytes.slice(0, lastDigit);

    const extra = bytes.slice(lastDigit).trim().toLowerCase();

    if (!isBigPrefix(extra)) return undefined;

    const multiplier = bigByteSizeTable.get(extra);
    if (multiplier === undefined) return undefined;

    if (numStr.includes(".")) {
        const [intPart, fracPart] = numStr.split(".");
        const intVal = intPart ? BigInt(intPart) : 0n;
        const fracLen = fracPart!.length;
        const fracNumerator = BigInt(fracPart!);
        const fracDenominator = BigInt("1" + "0".repeat(fracLen));
        const fracBytes = (fracNumerator * multiplier) / fracDenominator;
        const intBytes = intVal * multiplier;
        const totalBytes = intBytes + fracBytes;
        return totalBytes;
    } else {
        const num = BigInt(numStr);
        const result = num * multiplier;
        return result;
    }
}
