import { create as DateOnly_new, daysPerMonth, DateOnly } from "../src/DateOnly";

/**
 * (Pseudo) random generator.
 */
export class Rnd {

    /**
     * Gets a specified number of random @see Date 's.
     */
    public static nextDates(count: number): ReadonlyArray<Date> {
        return Rnd.nextDateOnlys(count).map(d => {

            const h = Rnd.nextInt(0, 23);
            const M = Rnd.nextInt(0, 59);
            const s = Rnd.nextInt(0, 59);
            const ss = Rnd.nextInt(0, 1000);
            const e = Date.UTC(d.year, d.month - 1, d.day, h, M, s, ss);
            let date = new Date(e);
            // 2k issue with Date.
            date.setUTCFullYear(d.year);
            return date;
        });
    }

    /**
     * Gets a specified number of random @see DateOnly 's.
     */
    public static nextDateOnlys(count: number): ReadonlyArray<DateOnly> {
        const dates = new Array<DateOnly>();

        for (let i = 0; i < count; i++) {
            const y = Rnd.nextInt(1, 9999);
            const m = Rnd.nextInt(1, 12);
            const d = Rnd.nextInt(1, daysPerMonth(y, m));
            dates.push(DateOnly_new(y, m, d));
        }
        return dates;
    }

    /**
     * Gets a random integer number.
     */
    public static nextInt(min?: number, max?: number) {
        min = min ?? 0;
        max = max ?? (Number.MAX_SAFE_INTEGER - 1);
        let rnd = Math.random() * (1 + max - min);
        return Math.floor(rnd + min);
    }
}