import { CHARS } from "./common";

export class BaseToDecimalConverter {
    constructor() { }

    /**
     * Converts A number from the base system to the decimal system.
     * @param {string} value the value to convert from the base system to the decimal system.
     *  __can be fraction__.
     * @param {number} base the base to convert the number to.
     * @returns string
     */
    convert(value: string, base: number): number {
        if (base < 2 || base > 36)
            throw RangeError("the base must be between 2 and 36");
        let data = value.split('.');
        let integers = data[0];
        let fractions = data.length > 1 ? data[1] : "";
        return this.convertIntegersFromBase(integers, base) + this.convertFractionsFromBase(fractions, base);
    }

    /**
     * Converts an integer part of a number from the base system to decimal system.
     * @param {string} integers the integer part of the number to convert from the base system to decimal system.
     * @param {number} base the base to convert the integer from.
     * @returns number.
     */
    private convertIntegersFromBase(integers: string, base: number): number {
        let result = 0;
        for (let i = 0; i < integers.length; i++) {
            let val = CHARS.toUpperCase().indexOf(integers[i].toUpperCase());
            let pos = Math.floor(Math.pow(base, integers.length - i - 1));
            result += (val * pos);
        }
        return result;
    }

    /**
     * Converts a fraction part of a number from the base system to decimal system.
     * @param {string} fractions the fraction part to convert from the base system to the decimal system.
     * @param {number} base the base to convert the fraction to.
     * @returns number.
     */
    private convertFractionsFromBase(fractions: string, base: number): number {
        fractions = fractions.includes(".") ? fractions.substring(fractions.indexOf(".") + 1) : fractions;
        let result = 0;
        for (let i = 0; i < fractions.length; i++) {
            result += CHARS.toUpperCase().indexOf(fractions[i].toUpperCase()) * Math.pow(base, -(i + 1));
        }
        return result;
    }
}
