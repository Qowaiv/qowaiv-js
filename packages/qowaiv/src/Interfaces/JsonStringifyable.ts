/**
 * To support JSON.stringify()
 */
export interface JsonStringifyable {

    /** 
     * @returns a JSON representation of the object.
     */
    toJSON(): any;
}
