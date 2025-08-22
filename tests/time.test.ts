import { describe, expect, test } from "bun:test";
import { relativeTime, difference } from "../src/time/time";
import dayjs from "dayjs";

describe("relativeMagnitude", () => {
    test("returns 'a few seconds ago' for dates a few seconds apart", () => {
        const now = new Date();
        const past = new Date(now.getTime() - 5000);
        expect(relativeTime(past, now)).toBe("a few seconds ago");
    });

    test("returns 'in a few seconds' for future dates", () => {
        const now = new Date();
        const future = new Date(now.getTime() + 5000);
        expect(relativeTime(future, now)).toBe("in a few seconds");
    });

    test("handles Dayjs instances", () => {
        const now = dayjs();
        const past = now.subtract(1, "minute");
        expect(relativeTime(past, now)).toBe("a minute ago");
    });

    test("returns correct value for hours difference", () => {
        const now = new Date();
        const past = new Date(now.getTime() - 2 * 60 * 60 * 1000);
        expect(relativeTime(past, now)).toBe("2 hours ago");
    });

    test("returns correct value for days difference", () => {
        const now = new Date();
        const past = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
        expect(relativeTime(past, now)).toBe("3 days ago");
    });

    test("returns correct value for months difference", () => {
        const now = dayjs();
        const past = now.subtract(2, "month");
        expect(relativeTime(past, now)).toBe("2 months ago");
    });

    test("returns correct value for years difference", () => {
        const now = dayjs();
        const past = now.subtract(5, "year");
        expect(relativeTime(past, now)).toBe("5 years ago");
    });

    test("returns 'a few seconds ago' when times are equal", () => {
        const now = new Date();
        expect(relativeTime(now, now)).toBe("a few seconds ago");
    });
});

describe("difference", () => {
    test("returns correct difference in milliseconds (default)", () => {
        const now = new Date();
        const past = new Date(now.getTime() - 1500);
        expect(difference(now, past)).toBe(1500);
    });

    test("returns correct difference in seconds", () => {
        const now = new Date();
        const past = new Date(now.getTime() - 3000);
        expect(difference(now, past, "second")).toBe(3);
    });

    test("returns correct difference in minutes", () => {
        const now = new Date();
        const past = new Date(now.getTime() - 2 * 60 * 1000);
        expect(difference(now, past, "minute")).toBe(2);
    });

    test("returns correct difference in hours", () => {
        const now = new Date();
        const past = new Date(now.getTime() - 5 * 60 * 60 * 1000);
        expect(difference(now, past, "hour")).toBe(5);
    });

    test("returns correct difference in days", () => {
        const now = new Date();
        const past = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
        expect(difference(now, past, "day")).toBe(3);
    });

    test("returns correct difference in months", () => {
        const now = dayjs();
        const past = now.subtract(2, "month");
        expect(difference(now, past, "month")).toBe(2);
    });

    test("returns correct difference in years", () => {
        const now = dayjs();
        const past = now.subtract(5, "year");
        expect(difference(now, past, "year")).toBe(5);
    });

    test("returns floating point result when roundResult is false", () => {
        const now = dayjs();
        const past = now.subtract(90, "minute");
        expect(difference(now, past, "hour", { roundResult: false })).toBeCloseTo(1.5);
    });

    test("returns negative difference for future dates", () => {
        const now = new Date();
        const future = new Date(now.getTime() + 2000);
        expect(difference(now, future)).toBe(-2000);
    });

    test("returns zero when dates are equal", () => {
        const now = new Date();
        expect(difference(now, now)).toBe(0);
    });
});

