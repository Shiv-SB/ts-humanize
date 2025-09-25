import { describe, expect, test } from "bun:test";
import { currency } from "../src/currency/currency";
import type { ISO_4217_Code } from "../src/units/currency.units";

describe("currency", () => {
    const testList: [number, ISO_4217_Code | string & {}, string][] = [
        // standard western format
        [60000000, "USD", "$60,000,000.00"],
        [60000000, "GBP", "£60,000,000.00"],
        [1234567.89, "EUR", "€1,234,567.89"],
        [12345, "CAD", "$12,345.00"],
        // negative numbers
        [-100, "GBP", "-£100.00"],
        // 
    ];

    test.each(testList)("%p with code %p should format to %p", (num, code, exp) => {
        expect(currency(num, code as ISO_4217_Code)).toBe(exp);
    });

    describe("test all explicit intl symbols", () => {
        const testList: [number, ISO_4217_Code, string][] = [
            // TODO: add in full list from currencyMap
        ];
        
        test.each(testList)("%p with code %p should format to %p", (num, code, exp) => {
            expect(currency(num, code)).toBe(exp);
        });
    });

})