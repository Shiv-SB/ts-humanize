import { describe, expect, test } from "bun:test";
import { bytes, iBytes, parseBytes, bytesN, iBytesN } from "../src/bytes/bytes";
import { IEC_BYTES } from "../src/units/bytes.units";

describe("parseBytes", () => {
    const testValues: [string, number][] = [
        ["42", 42],
        ["42MB", 42000000],
        ["42MiB", 44040192],
        ["42mb", 42000000],
        ["42mib", 44040192],
        ["42MIB", 44040192],
        ["42 MB", 42000000],
        ["42 MiB", 44040192],
        ["42 mb", 42000000],
        ["42 mib", 44040192],
        ["42 MIB", 44040192],
        ["42.5MB", 42500000],
        ["42.5MiB", 44564480],
        ["42.5 MB", 42500000],
        ["42.5 MiB", 44564480],
        ["42M", 42000000],
        ["42Mi", 44040192],
        ["42m", 42000000],
        ["42mi", 44040192],
        ["42MI", 44040192],
        ["42 M", 42000000],
        ["42 Mi", 44040192],
        ["42 m", 42000000],
        ["42 mi", 44040192],
        ["42 MI", 44040192],
        ["42.5M", 42500000],
        ["42.5Mi", 44564480],
        ["42.5 M", 42500000],
        ["42.5 Mi", 44564480],
        ["1,005.03 MB", 1005030000],

        //["12.5 EB", 12500000000000000000],
        //["12.5 E", 12500000000000000000],
        //["12.5 EiB", 14305561806106624000],
    ];

    test.each(testValues)("%p should parse to %p", (str, num) => {
        expect(parseBytes(str)).toBe(num);
    });

    test("should error as expected", () => {
        expect(parseBytes("84 JB"), "did not fail on invalid unit").toBeUndefined();
        expect(parseBytes(""), "did not fail on empty string").toBeUndefined();
        expect(parseBytes("16 EiB"), "did not fail on number greater than MAX_SAFE_INTEGER").toBeUndefined();
    });
});

describe("bytes", () => {
    const testValues: [number, string][] = [
        [0, "0 B"],
        [1, "1 B"],
        [803, "803 B"],
        [999, "999 B"],

        [1024, "1.0 kB"],
        [9999, "10 kB"],
        [1000000 - 1, "1000 kB"],

        [1024 * 1024, "1.0 MB"],
        [9999 * 1000, "10 MB"],
        [1000000000 - 1000, "1000 MB"],

        [1000000000, "1.0 GB"],
        [2000000000, "2.0 GB"],
        [1000000000000 - 1000000, "1000 GB"],

        [1000000000000, "1.0 TB"],
        [1000000000000000 - 1000000000000, "999 TB"],

        [1000000000000000, "1.0 PB"],
        //[1000000000000000000 - 1000000000000000, "999 PB"],

        //[1000000000000000000, "1.0 EB"],
    ];

    test.each(testValues)("%p should parse to %p", (num, str) => {
        expect(bytes(num)).toBe(str);
    });
});

describe("iBytes", () => {
    const testValues: [number, string][] = [
        [0, "0 B"],
        [1, "1 B"],
        [803, "803 B"],
        [1023, "1023 B"],

        [1024, "1.0 KiB"],
        [Number(IEC_BYTES.get("MiByte")) - 1, "1024 KiB"],
        
        [1024 * 1024, "1.0 MiB"],
        [Number(IEC_BYTES.get("GiByte")! - IEC_BYTES.get("KiByte")!), "1024 MiB"],

        [Number(IEC_BYTES.get("GiByte")), "1.0 GiB"],
        [Number(IEC_BYTES.get("TiByte")! - IEC_BYTES.get("MiByte")!), "1024 GiB"],

        [Number(IEC_BYTES.get("TiByte")), "1.0 TiB"],
        [Number(IEC_BYTES.get("PiByte")! - IEC_BYTES.get("TiByte")!), "1023 TiB"],

        [Number(IEC_BYTES.get("PiByte")), "1.0 PiB"],
        [Number(IEC_BYTES.get("EiByte")! - IEC_BYTES.get("PiByte")!), "1023 PiB"],

        [Number(IEC_BYTES.get("EiByte")), "1.0 EiB"],
    ];

    test.each(testValues)("%p should parse to %p", (num, str) => {
        expect(iBytes(num)).toBe(str);
    });
});

describe("bytesN & iBytesN", () => {
    const bytesNTests: [number, number, string][] = [
        [82854982, 3, "82.8 MB"], // fails: "82.8 MB"
        [82854982, 4, "82.86 MB"], // fails: "82.86 MB"
        [82854982, 2, "83 MB"],
        [999, 2, "999 B"],
        [1000, 2, "1.0 kB"],
        [1000000, 2, "1.0 MB"],
        [1000000, 4, "1.000 MB"],
        [1000000000, 2, "1.0 GB"],
        [1010100001, 2, "1.0 GB"],
        [1000000000, 5, "1.0000 GB"],
        [0, 2, "0 B"],
        [1, 2, "1 B"],
    ];

    test.each(bytesNTests)("bytesN(%p, %p) => %p", (num, digits, expected) => {
        expect(bytesN(num, digits)).toBe(expected);
    });

    const iBytesNTests: [number, number, string][] = [
        [82854982, 4, "79.02 MiB"],
        [123456789, 3, "118 MiB"],
        [123456789, 6, "117.738 MiB"],
        [1024, 2, "1.0 KiB"],
        [1024, 4, "1.000 KiB"],
        [1048576, 2, "1.0 MiB"],
        [1048576, 5, "1.0000 MiB"],
        [0, 2, "0 B"],
        [1, 2, "1 B"],
    ];

    test.each(iBytesNTests)("iBytesN(%p, %p) => %p", (num, digits, expected) => {
        expect(iBytesN(num, digits)).toBe(expected);
    });
});