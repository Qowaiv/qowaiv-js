/**
 * Defines a generalized method that for determining equality of instances.
 */
interface IEquatable {
    
    /**
     * @param other the object to compare with.
     * @returns true if {other} represents the same value, otherwise false.
     */
    equals(other: unknown): boolean;
}
