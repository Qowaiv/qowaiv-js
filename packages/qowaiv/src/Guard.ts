export class Guard {

    /**
     * Guards a value to be an integer within the (optional) range.
     * @param value the value to guard.
     * @param min the (optional) minimum allowed value
     * @param max the (optional) maximum allowed value
     * @returns the value when an integer within the specified range.
     */
    public static int(value: unknown, min?: number, max?: number): number {
        if (typeof (value) !== "number") {
            throw new Error(`'${value}' is not a number`);
        }
        if (!Number.isInteger(value)) {
            throw new Error(`${value} is not an integer`);
        }
        if (min !== undefined && value < min) {
            throw new Error(`${value} is smaller then ${min}`);
        }
        if (max !== undefined && value > max) {
            throw new Error(`${value} is larger then ${max}`);
        }
        return value;
    }
}
