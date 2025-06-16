/**
 * Linear interpolation
 * @param {number} a start
 * @param {number} b end
 * @param {number} t point to perform interpolation
 * @returns {number} - interpolation result
 */
export function lerp(a: number, b: number, t: number): number {
    return (1 - t) * a + t * b
}
