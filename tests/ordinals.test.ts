import { describe, expect, test } from "bun:test";
import { ordinal } from "../src/ordinals/ordinals";

describe("ordinal", () => {
    const baseCases: [number, string][] = [
        [0, "0th"],
        [1, "1st"],
        [2, "2nd"],
        [3, "3rd"],
        [4, "4th"],
        [10, "10th"],
        [11, "11th"],
        [12, "12th"],
        [13, "13th"],
        [21, "21st"],
        [32, "32nd"],
        [43, "43rd"],
        [101, "101st"],
        [102, "102nd"],
        [103, "103rd"],
        [111, "111th"],
        [112, "112th"],
        [113, "113th"],
        [121, "121st"],
    ];

    test.each(baseCases)("integer %p → %p", (num, expected) => {
        expect(ordinal(num)).toBe(expected);
    });

    describe("rounding of decimals", () => {
        const decimalCases: [number, string][] = [
            [0.5, "1st"],
            [12.4, "12th"],
            [12.5, "13th"],
            [21.6, "22nd"],
            [1003.35, "1003rd"],
        ];

        test.each(decimalCases)("decimal %p → %p", (num, expected) => {
            expect(ordinal(num)).toBe(expected);
        });
    });

    describe("commify", () => {
        const commifyCases: [number, string][] = [
            [1000, "1,000th"],
            [1001, "1,001st"],
            [1234567, "1,234,567th"],
            [1234567.4, "1,234,567th"], // rounds down
            [1234567.6, "1,234,568th"], // rounds up
        ];

        test.each(commifyCases)("commify %p → %p", (num, expected) => {
            expect(ordinal(num, { commify: true })).toBe(expected);
        });
    });

    describe("negative numbers", () => {
        const negativeCases: [number, string][] = [
            [-1, "-1st"],
            [-2, "-2nd"],
            [-3, "-3rd"],
            [-4, "-4th"],
            [-10, "-10th"],
            [-11, "-11th"],
            [-12, "-12th"],
            [-13, "-13th"],
            [-21, "-21st"],
            [-22, "-22nd"],
            [-23, "-23rd"],
            [-101, "-101st"],
            [-102, "-102nd"],
            [-103, "-103rd"],
            [-111, "-111th"],
            [-112, "-112th"],
            [-113, "-113th"],
            [-121, "-121st"],
        ];

        test.each(negativeCases)("negative %p → %p", (num, expected) => {
            expect(ordinal(num)).toBe(expected);
        });
    });

    describe("negative numbers with commify", () => {
        const negativeCommifyCases: [number, string][] = [
            [-1000, "-1,000th"],
            [-1001, "-1,001st"],
            [-1234567, "-1,234,567th"],
            [-1234567.5, "-1,234,567th"],
        ];

        test.each(negativeCommifyCases)("commify negative %p → %p", (num, expected) => {
            expect(ordinal(num, { commify: true })).toBe(expected);
        });
    });
});
