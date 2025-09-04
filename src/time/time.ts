import dayjs, { Dayjs } from "dayjs";
import * as _relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(_relativeTime.default);

/**
 * Returns a human-readable relative time string between two dates/times.
 *
 * @param timeInPast - The earlier time (Date or Dayjs instance).
 * @param timeInFuture - The later time (Date or Dayjs instance).
 * @returns A string describing the relative time (e.g., "2 hours ago", "in 5 minutes").
 *
 * @example
 * relativeTime(new Date('2024-06-01T10:00:00Z'), new Date('2024-06-01T12:00:00Z'));
 * // => "2 hours ago"
 *
 * @example
 * relativeTime(dayjs().subtract(1, 'day'), dayjs());
 * // => "a day ago"
 *
 * @example
 * relativeTime(dayjs(), dayjs().add(3, 'days'));
 * // => "in 3 days"
 */
export function relativeTime(timeInPast: Date | Dayjs, timeInFuture: Date | Dayjs): string {
    return dayjs(timeInPast).from(timeInFuture);
}

type DifferenceOpts = {
    roundResult?: boolean;
}

/**
 * Calculates the difference between two dates/times in the specified unit.
 *
 * @param date1 - The first date (Date or Dayjs instance).
 * @param date2 - The second date (Date or Dayjs instance).
 * @param unit - The unit of measurement for the difference (e.g., "days", "hours", "ms"). Defaults to "ms".
 * @param opts - Optional settings.
 * @property roundResult - If true, rounds the result to the nearest integer. If false, returns a floating point value. Defaults to true.
 * @returns The difference between date1 and date2 in the specified unit.
 *
 * @example
 * difference(new Date('2024-06-01T12:00:00Z'), new Date('2024-06-01T10:00:00Z'), "hours", { roundResult: true });
 * // => 2
 *
 * @example
 * difference(dayjs(), dayjs().subtract(1, 'day'), "days", { roundResult: false });
 * // => 1
 *
 * @example
 * difference(dayjs(), dayjs().add(90, 'minutes'), "minutes");
 * // => -90
 */
export function difference(date1: Date | Dayjs, date2: Date | Dayjs, unit: dayjs.QUnitType | dayjs.OpUnitType = "ms", opts?: DifferenceOpts) {
    const {
        roundResult = true,
    } = opts || {};

    return dayjs(date1).diff(date2, unit, !roundResult);
}