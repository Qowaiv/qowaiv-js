/**
 * To support JSON.stringify()
 */
interface JsonStringifyable {

    /** 
     * @returns a JSON representation of the object.
     */
    toJSON(): any;
}
