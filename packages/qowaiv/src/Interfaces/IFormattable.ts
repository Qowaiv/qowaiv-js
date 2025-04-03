/**
 * Provides functionality to format the value of an object into a string representation.
 */
interface IFormattable<TOptions> {
    /**
     * Returns a string that represents the object.
     * @returns string.
     */
    toString(): string;

     /**
     * Returns a formatted string that represents the object.
     * @param options An object that contains one or more properties that specify comparison options.
     * @returns formatted string.
     */
     format(options?: TOptions): string;
}
