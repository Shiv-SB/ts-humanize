import type { Prefixes } from "./bytes.units";

export type IEC_BIG_UNITS = 
    "BigByte"   |
    "BigKiByte" |
    "BigMiByte" |
    "BigGiByte" |
    "BigTiByte" |
    "BigPiByte" |
    "BigEiByte" |
    "BigZiByte" |
    "BigYiByte" |
    "BigRiByte" |
    "BigQiByte";

export type SI_BIG_UNITS =
    "BigSIByte"   |
    "BigKByte" |
    "BigMByte" |
    "BigGByte" |
    "BigTByte" |
    "BigPByte" |
    "BigEByte" |
    "BigZByte" |
    "BigYByte" |
    "BigRByte" |
    "BigQByte";

export type BigPrefixes = Prefixes |
    "zib"   |
    "zb"    |
    "yib"   |
    "yb"    |
    "rib"   |
    "rb"    |
    "qib"   |
    "qb"    |
    // without suffix
    "z"     |
    "zi"    |
    "y"     |
    "yi"    |
    "r"     |
    "ri"    |
    "q"     |
    "qi";

export const IEC_BIG_BYTES: ReadonlyMap<IEC_BIG_UNITS, bigint> = new Map([
    ["BigByte", 1n << (0n * 10n)],     // 1n
    ["BigKiByte", 1n << (1n * 10n)],   // 1024n
    ["BigMiByte", 1n << (2n * 10n)],   // 1048576n
    ["BigGiByte", 1n << (3n * 10n)],   // 1073741824n
    ["BigTiByte", 1n << (4n * 10n)],   // 1099511627776n
    ["BigPiByte", 1n << (5n * 10n)],   // 1125899906842624n
    ["BigEiByte", 1n << (6n * 10n)],   // 1152921504606846976n
    ["BigZiByte", 1n << (7n * 10n)],   // ...
    ["BigYiByte", 1n << (8n * 10n)],
    ["BigRiByte", 1n << (9n * 10n)],
    ["BigQiByte", 1n << (10n * 10n)],
]);

export const SI_BIG_BYTES: ReadonlyMap<SI_BIG_UNITS, bigint> = new Map([
    ["BigSIByte", 1n],          // 1
    ["BigKByte", 10n ** 3n],    // 1 × 10³
    ["BigMByte", 10n ** 6n],    // 1 × 10⁶
    ["BigGByte", 10n ** 9n],    // 1 × 10⁹
    ["BigTByte", 10n ** 12n],   // 1 × 10¹²
    ["BigPByte", 10n ** 15n],   // 1 × 10¹⁵
    ["BigEByte", 10n ** 18n],   // 1 × 10¹⁸
    ["BigZByte", 10n ** 21n],   // ...
    ["BigYByte", 10n ** 24n],
    ["BigRByte", 10n ** 27n],
    ["BigQByte", 10n ** 30n],
]);

export const bigByteSizeTable: ReadonlyMap<BigPrefixes, bigint> = new Map([
    // SI units
    ["b", SI_BIG_BYTES.get("BigSIByte")!],
    ["kb", SI_BIG_BYTES.get("BigKByte")!],
    ["mb", SI_BIG_BYTES.get("BigMByte")!],
    ["gb", SI_BIG_BYTES.get("BigGByte")!],
    ["tb", SI_BIG_BYTES.get("BigTByte")!],
    ["pb", SI_BIG_BYTES.get("BigPByte")!],
    ["eb", SI_BIG_BYTES.get("BigEByte")!],
    ["zb", SI_BIG_BYTES.get("BigZByte")!],
    ["yb", SI_BIG_BYTES.get("BigYByte")!],
    ["rb", SI_BIG_BYTES.get("BigRByte")!],
    ["qb", SI_BIG_BYTES.get("BigQByte")!],
    // IEC units
    ["kib", IEC_BIG_BYTES.get("BigKiByte")!],
    ["mib", IEC_BIG_BYTES.get("BigMiByte")!],
    ["gib", IEC_BIG_BYTES.get("BigGiByte")!],
    ["tib", IEC_BIG_BYTES.get("BigTiByte")!],
    ["pib", IEC_BIG_BYTES.get("BigPiByte")!],
    ["eib", IEC_BIG_BYTES.get("BigEiByte")!],
    ["zib", IEC_BIG_BYTES.get("BigZiByte")!],
    ["yib", IEC_BIG_BYTES.get("BigYiByte")!],
    ["rib", IEC_BIG_BYTES.get("BigRiByte")!],
    ["qib", IEC_BIG_BYTES.get("BigQiByte")!],
    // Without suffix
    ["", SI_BIG_BYTES.get("BigSIByte")!],
    ["k", SI_BIG_BYTES.get("BigKByte")!],
    ["m", SI_BIG_BYTES.get("BigMByte")!],
    ["g", SI_BIG_BYTES.get("BigGByte")!],
    ["t", SI_BIG_BYTES.get("BigTByte")!],
    ["p", SI_BIG_BYTES.get("BigPByte")!],
    ["e", SI_BIG_BYTES.get("BigEByte")!],
    ["z", SI_BIG_BYTES.get("BigZByte")!],
    ["y", SI_BIG_BYTES.get("BigYByte")!],
    ["r", SI_BIG_BYTES.get("BigRByte")!],
    ["q", SI_BIG_BYTES.get("BigQByte")!],
    ["ki", IEC_BIG_BYTES.get("BigKiByte")!],
    ["mi", IEC_BIG_BYTES.get("BigMiByte")!],
    ["gi", IEC_BIG_BYTES.get("BigGiByte")!],
    ["ti", IEC_BIG_BYTES.get("BigTiByte")!],
    ["pi", IEC_BIG_BYTES.get("BigPiByte")!],
    ["ei", IEC_BIG_BYTES.get("BigEiByte")!],
    ["zi", IEC_BIG_BYTES.get("BigZiByte")!],
    ["yi", IEC_BIG_BYTES.get("BigYiByte")!],
    ["ri", IEC_BIG_BYTES.get("BigRiByte")!],
    ["qi", IEC_BIG_BYTES.get("BigQiByte")!],
]);
