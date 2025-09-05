import { describe, expect, test } from 'bun:test';
import { computeSI } from '../src/SI-Units/SI';
import type { SI_PREFIXES } from '../src/units/SI.units';

describe("computeSI", () => {
    const testValues: [number, [number, SI_PREFIXES]][] = [
        [1e-30, [1, "q"]],
        [1e-27, [1, "r"]],
        [1e-24, [1, "y"]],
        [1e-21, [1, "z"]],
        [1e-18, [1, "a"]],
        [1e-15, [1, "f"]],
        [1e-12, [1, "p"]],
        [2.2345e-12, [2.2345, "p"]],
        [2.23e-12, [2.23, "p"]],
        [2.23e-11, [22.3, "p"]],
        [2.2e-10, [220, "p"]],
        [2.2e-9, [2.2, "n"]],
        [2.2e-8, [22, "n"]],
        [2.2e-7, [220, "n"]],
        [2.2e-6, [2.2, "µ"]],
        [1e-6, [1, "µ"]],
        [2.2e-5, [22, "µ"]],
        [2.2e-4, [220, "µ"]],
        [2.2e-3, [2.2, "m"]],
        [2.2e-2, [22, "m"]],
        [2.2e-1, [220, "m"]],
        [2.2e-0, [2.2, ""]],
        [2.2, [2.2, ""]],
        [22, [22, ""]],
        [2.2e+1, [22, ""]],
        [0, [0, ""]],
        [2.2e+2, [220, ""]],
        [220, [220, ""]],
        [2.2e+3, [2.2, "k"]],
        [2200, [2.2, "k"]],
        [2.2e+4, [22, "k"]],
        [22000, [22, "k"]],
        [2.2e+5, [220, "k"]],
        [2.2e+6, [2.2, "M"]],
        [1e+6, [1, "M"]],
        [1000 * 1000, [1, "M"]],
        [2.2e+7, [22, "M"]],
        [2.2e+8, [220, "M"]],
        [2.2e+9, [2.2, "G"]],
        [2.2e+10, [22, "G"]],
        [2.2e+11, [220, "G"]],
        [2.2e+12, [2.2, "T"]],
        [2.2e+15, [2.2, "P"]],
        [2.2e+18, [2.2, "E"]],
        [2.2e+21, [2.2, "Z"]],
        [2.2e+24, [2.2, "Y"]],
        [2.2e+27, [2.2, "R"]],
        [2.2e+30, [2.2, "Q"]],
        [-100, [-100, ""]],
    ];

    test.each(testValues)("%p should return %p", (num, output) => {
        const result = computeSI(num);
        expect(result).toStrictEqual(output);
    });

    describe("rounded values", () => {
        const testValues: [number, number, [number, SI_PREFIXES]][] = [
            [1e-30, 6, [1, "q"]],
            [2.23456789e-12, 4, [2.2346, "p"]],
            [2.23456789e-12, 2, [2.23, "p"]],
            [1234567, 2, [1.23, "M"]],
            [1234567, 0, [1, "M"]],
            [2.9999999e3, 3, [3, "k"]],
            [-2.23456789e-12, 3, [-2.235, "p"]],
            [0.000123456, 5, [123.456, "µ"]],
        ];

        test.each(testValues)("%p rounded to %p D.P should return %p", (num, round, output) => {
            const result = computeSI(num, round);
            expect(result).toStrictEqual(output);
        });
    });
});