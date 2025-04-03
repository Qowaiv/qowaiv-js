/**
 * Provides functionality to format the value of an object into a string representation.
 */
interface ILocalizable<TOption> {
    /**
     * Returns a string that represents the object.
     * @returns string.
     */
    toString(): string;

     /**
     * Returns a formatted string that represents the object.
     * @param locales A locale string or array of locale strings that contain one or more language or locale tags. If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale. If you omit this parameter, the default locale of the JavaScript runtime is used.
     * @param options An object that contains one or more properties that specify comparison options.
     * @returns formatted string.
     */
     format(locales?: string | string[], options?: TOption): string;
}
