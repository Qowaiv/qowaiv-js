import { DateOnly } from "./DateOnly";

/**
 * Static (testable) clock.
 */
export class Clock {

    public static generator = () => new Date();

    /**
     * @returns now as date-time.
     */
    public static now(): Date {
        return Clock.generator();
    }

    /**
     * @returns today as a date-only.
     */
    public static today(): DateOnly {
        const now = Clock.now();
        return new DateOnly(now.getFullYear(), now.getMonth(), now.getDate());
    }
}