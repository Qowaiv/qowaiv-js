export class Unparsable extends Error {

    constructor(
        message: string,
        attemptedValue: any) {

        super(message);
        this.attemptedValue = attemptedValue;
    }

    public readonly attemptedValue: any;
}
