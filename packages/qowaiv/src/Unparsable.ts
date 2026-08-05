export class Unparsable extends Error {

    constructor(
        message: string,
        attemptedValue: unknown) {

        super(message);
        this.attemptedValue = attemptedValue;
    }

    public readonly attemptedValue: unknown;
}
