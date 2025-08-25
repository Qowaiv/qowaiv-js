import { DateOnly } from "./DateOnly";

export class Clock {

    public static generator = () => new Date();

    /**
     * @returns now as date-time.
     */
    public static now(): Date {
        var now = Clock.generator();
        return now;
    }

    /**
     * @returns today as a date-only.
     */
    public static today(): DateOnly {
        var now = Clock.now();
        return new DateOnly(now.getFullYear(), now.getMonth(), now.getDate());
    }
}