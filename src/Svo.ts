/**
 * Single Value Object base.
 */
export class Svo {

    /**
     * Unifies an input string.
     * @param {string} s the
     * @param {boolean} lowercase indicates if the string should be lower- or uppercase.
     * @returns {string} a string without formatting.
     */
    public static unify(s: string, lowercase?: true): string {
        const u = s.replace(/[_\-\s\.]/g, '');
        return lowercase
            ? u.toLowerCase()
            : u.toUpperCase();
    }
}
