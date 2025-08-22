/**
 * To support JSON.stringify()
 */
interface IJsonStringifyable {

    /** 
     * @returns a JSON representation of the object.
     */
    toJSON(): any;
}
