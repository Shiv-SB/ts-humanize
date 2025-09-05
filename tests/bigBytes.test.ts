import { describe, expect, test } from "bun:test";
import { bigBytes, bigIBytes, parseBigBytes } from "../src/bytes/bigBytes";
import { IEC_BYTES, SI_BYTES } from "../src/units/bytes.units";

describe("bigByte Parsing", () => {
    const testValues: [string, bigint][] = [
		["0.4", 0n],
		["0.5", 0n],
		["0.6", 0n],
		["0.99999999999 B", 0n],
        ["42", 42n],
        ["42MB", 42000000n],
		["42mb", 42000000n],
		["42mib", 44040192n],
		["42MIB", 44040192n],
		["42 MB", 42000000n],
		["42 MiB", 44040192n],
		["42 mb", 42000000n],
		["42 mib", 44040192n],
		["42 MIB", 44040192n],
		["42.5MB", 42500000n],
		["42.5MiB", 44564480n],
		["42.5 MB", 42500000n],
		["42.5 MiB", 44564480n],
        ["42M", 42000000n],
		["42Mi", 44040192n],
		["42m", 42000000n],
		["42mi", 44040192n],
		["42MI", 44040192n],
		["42 M", 42000000n],
		["42 Mi", 44040192n],
		["42 m", 42000000n],
		["42 mi", 44040192n],
		["42 MI", 44040192n],
		["42.5M", 42500000n],
		["42.5Mi", 44564480n],
		["42.5 M", 42500000n],
		["42.5 Mi", 44564480n],
		["1,005.03 MB", 1005030000n],
        ["12.5 EB", BigInt(Number(SI_BYTES.get("EByte")!) * 12.5)],
    ];

    test.each(testValues)("%p should parse to %p", (str, num) => {
        expect(parseBigBytes(str)).toBe(num);
    });

    test("should error as expected", () => {
        expect(parseBigBytes("84 JB"), "did not fail on invalid unit").toBeUndefined();
        expect(parseBigBytes(""), "did not fail on empty string").toBeUndefined();
	});

	test("should handle MAX_SAFE_INTEGER", () => {
		expect(parseBigBytes(Number.MAX_SAFE_INTEGER.toString())).toBeDefined();
		expect(parseBigBytes(Number.MAX_SAFE_INTEGER.toString())).toBe(9007199254740991n);
	})
});

describe("bigBytes", () => {
    const testValues: [bigint, string][] = [
        [0n, "0 B"],
        [1n, "1 B"],
        [803n, "803 B"],
        [999n, "999 B"],

		[1024n, "1.0 kB"],
		[SI_BYTES.get("MByte")! - SI_BYTES.get("Byte")!, "1000 kB"],

		[1024n * 1024n, "1.0 MB"],
		[SI_BYTES.get("GByte")! - SI_BYTES.get("KByte")!, "1000 MB"],

		[SI_BYTES.get("GByte")!, "1.0 GB"],
		[SI_BYTES.get("TByte")! - SI_BYTES.get("MByte")!, "1000 GB"],

		[SI_BYTES.get("TByte")!, "1.0 TB"],
		[SI_BYTES.get("PByte")! - SI_BYTES.get("TByte")!, "999 TB"],

		[SI_BYTES.get("PByte")!, "1.0 PB"],
		[SI_BYTES.get("EByte")! - SI_BYTES.get("PByte")!, "999 PB"],

		[SI_BYTES.get("EByte")!, "1.0 EB"],

		[BigInt(Number(SI_BYTES.get("GByte")!) * 5.5), "5.5 GB"],
    ];

    test.each(testValues)("%p should parse to %p", (num, str) => {
        expect(bigBytes(num)).toBe(str);
    });
});

describe("bigIBytes", () => {
	const testValues: [bigint, string][] = [
		[0n, "0 B"],
		[1n, "1 B"],
		[803n, "803 B"],
		[1023n, "1023 B"],

		[1024n, "1.0 KiB"],
		[IEC_BYTES.get("MiByte")! - 1n, "1024 KiB"],

		[1024n * 1024n, "1.0 MiB"],
		[IEC_BYTES.get("GiByte")! - IEC_BYTES.get("KiByte")!, "1024 MiB"],

		[IEC_BYTES.get("GiByte")!, "1.0 GiB"],
		[IEC_BYTES.get("TiByte")! - IEC_BYTES.get("MiByte")!, "1024 GiB"],

		[IEC_BYTES.get("TiByte")!, "1.0 TiB"],
		[IEC_BYTES.get("PiByte")! - IEC_BYTES.get("TiByte")!, "1023 TiB"],

		[IEC_BYTES.get("PiByte")!, "1.0 PiB"],
		
		[BigInt(Number(IEC_BYTES.get("GiByte")!) * 5.5), "5.5 GiB"],

	];

	test.each(testValues)("%p should parse to %p", (num, str) => {
		expect(bigIBytes(num)).toBe(str); 
	});
});

describe("test absurdly large numbers", () => {
	const x = BigInt("16093220510709943573688614912");

	test("bigBytes", () => {
		expect(bigBytes(x)).toBe("16 RB");
	});

	test("bigIBytes", () => {
		expect(bigIBytes(x)).toBe("13 RiB");
	});

	const testValues: [string, string][] = [
		["16 ZB", "16000000000000000000000"],
		["16 ZiB", "18889465931478580854784"],
		["16.5 ZB", "16500000000000000000000"],
		["16.5 ZiB", "19479761741837286506496"],
		["16 Z", "16000000000000000000000"],
		["16 Zi", "18889465931478580854784"],
		["16.5 Z", "16500000000000000000000"],
		["16.5 Zi", "19479761741837286506496"],

		["16 YB", "16000000000000000000000000"],
		["16 YiB", "19342813113834066795298816"],
		["16.5 YB", "16500000000000000000000000"],
		["16.5 YiB", "19947276023641381382651904"],
		["16 Y", "16000000000000000000000000"],
		["16 Yi", "19342813113834066795298816"],
		["16.5 Y", "16500000000000000000000000"],
		["16.5 Yi", "19947276023641381382651904"],
	];

	test.each(testValues)("%p should parse to %p", (input, output) => {
		expect(parseBigBytes(input)?.toString()).toBe(output);
	});
});