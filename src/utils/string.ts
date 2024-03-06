/**
 * Reverses the casing of a string, swapping lower-case letters for upper-case and vice versa.
 * @param {string} stringToRevert - the string to revert
 * @returns the reversed string
 */
export function invertCase(stringToRevert: string): string {
  return stringToRevert.replace(/([A-Z])/g, ' $1').replace(/^./, str => {
    return str.toUpperCase();
  });
}
