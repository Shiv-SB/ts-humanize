import { describe, expect, test } from "bun:test";
import { currency } from "../src/currency/currency";
import { type ISO_4217_Code } from "../src/units/currency.units";

describe.concurrent("currency", () => {
    const testList: [number, ISO_4217_Code | string & {}, string][] = [
        // standard western format
        [60000000, "USD", "$60,000,000.00"],
        [60000000, "GBP", "£60,000,000.00"],
        [1234567.89, "EUR", "€1,234,567.89"],
        [12345, "CAD", "$12,345.00"],
        // negative numbers
        [-100, "GBP", "-£100.00"],
    ];

    test.each(testList)("%p with code %p should format to %p", (num, code, exp) => {
        expect(currency(num, code as ISO_4217_Code)).toBe(exp);
    });

    test("shouldnt throw errors", () => {
        expect(() => {
            currency(100, "FOO-BAR" as ISO_4217_Code)
        }).not.toThrowError();
    });

    describe("test all explicit intl symbols", () => {
        const val = 100;
        const testList: [ISO_4217_Code, string][] = [
            ["USD", "$100.00"],
            ["EUR", "€100.00"],
            ["GBP", "£100.00"],
            ["JPY", "¥100"],
            ["CNY", "¥100.00"],
            ["CHF", "CHF100.00"],
            ["CAD", "$100.00"],
            ["AUD", "$100.00"],
            ["NZD", "$100.00"],
            ["SEK", "100,00kr"],
            ["NOK", "100,00kr"],
            ["DKK", "100,00kr."],
            ["INR", "₹100.00"],
            ["KRW", "₩100"],
            ["SGD", "$100.00"],
            ["HKD", "HK$100.00"],
            ["THB", "฿100.00"],
            ["MYR", "RM100.00"],
            ["IDR", "Rp100"],
            ["PHP", "₱100.00"],
            ["VND", "100₫"],
            ["TWD", "$100.00"],
            ["AED", "100.00د.إ."],
            ["SAR", "١٠٠٫٠٠ر.س."],
            ["ILS", "100.00₪"],
            ["EGP", "١٠٠٫٠٠ج.م."],
            ["ZAR", "R100,00"],
            ["NGN", "₦100.00"],
            ["KES", "Ksh100.00"],
            ["TRY", "₺100,00"],
            ["MXN", "$100.00"],
            ["BRL", "R$100,00"],
            ["ARS", "$100,00"],
            ["CLP", "$100"],
            ["COP", "$100,00"],
            ["PEN", "S/100.00"],
            ["PLN", "100,00zł"],
            ["CZK", "100,00Kč"],
            ["HUF", "100Ft"],
            ["RON", "100,00RON"],
            ["UAH", "100,00₴"],
            ["BTC", "₿100.00000000"],
            ["ETH", "Ξ100.000000000000000000"],
            ["XAU", "XAU100.0000"],
            ["XAG", "XAG100.0000"],
        ];

        test.each(testList)(`${val} with code %p should format correctly to %p`, (code, exp) => {
            expect(currency(val, code)).toBe(exp);
        });
    });

});

