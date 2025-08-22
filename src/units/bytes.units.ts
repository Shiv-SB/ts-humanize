export type IEC_Units =
    "Byte"   |
    "KiByte" |
    "MiByte" |
    "GiByte" |
    "TiByte" |
    "PiByte" |
    "EiByte";

export type SI_Units =
    "Byte"  |
    "Ibyte" |
    "KByte" |
    "MByte" |
    "GByte" |
    "TByte" |
    "PByte" |
    "EByte";

export type Prefixes =
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

export const IEC_BYTES: ReadonlyMap<IEC_Units, bigint> = new Map([
    ["Byte", 1n << (0n * 10n)],     // 1n
    ["KiByte", 1n << (1n * 10n)],   // 1024n
    ["MiByte", 1n << (2n * 10n)],   // 1048576n
    ["GiByte", 1n << (3n * 10n)],   // 1073741824n
    ["TiByte", 1n << (4n * 10n)],   // 1099511627776n
    ["PiByte", 1n << (5n * 10n)],   // 1125899906842624n
    ["EiByte", 1n << (6n * 10n)],   // 1152921504606846976n
]);

export const SI_BYTES: ReadonlyMap<SI_Units, bigint> = new Map([
    ["Byte", 1n],                           // 1
    ["KByte", 1_000n],                      // 1 × 10³
    ["MByte", 1_000_000n],                  // 1 × 10⁶
    ["GByte", 1_000_000_000n],              // 1 × 10⁹
    ["TByte", 1_000_000_000_000n],          // 1 × 10¹²
    ["PByte", 1_000_000_000_000_000n],      // 1 × 10¹⁵
    ["EByte", 1_000_000_000_000_000_000n],  // 1 × 10¹⁸
]);

export const byteSizeTable: ReadonlyMap<Prefixes, bigint> = new Map([
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
