import { CHARS } from "./common";

export class DecimalToBaseConverter {
    constructor() { }

    /**
     * Converts a number from decimal system to base system.
     * @param {number} number the number to convert from decimal to the base system.
     *  __can contain fraction__.
     * @param {number} base the base to convert the number to.
     * @returns string
     */
    convert(number: number, base: number): string {
        if (base < 2 || base > 36)
            throw RangeError("the base must be between 2 and 36");
        const integers = this.convertIntegersToBase(Math.floor(number), base);
        const fractions = this.convertFractionsToBase(parseFloat((number % 1).toPrecision(number.toString().length)), base);
        return `${integers || 0}${(!!fractions ? '.' + fractions : '')}`;
    }

    /**
     * Converts an integer number from decimal system to base system.
     * @param {number} integer the integer number to convert from decimal to base system.
     * @param {number} base the base to convert the integer to.
     * @returns string || null
     */
    private convertIntegersToBase(integer: number, base: number): string {
        let result = "";
        while (integer > 0) {
            result = `${CHARS.toUpperCase()[integer % base]}${result}`;
            integer = Math.floor(integer / base);
        }
        return result;
    }

    /**
     * Converts a fraction from decimal system to [base] system.
     * @param {number} fraction a fraction to convert from decimal to the base system.
     * @param {number} base the base to convert the fraction to.
     * @returns string | null
     */
    private convertFractionsToBase(fraction: number, base: number): string {
        let result = "";
        let counter = 0; // set counter to stop after 100 cycle to prevent infinite loop.
        while (fraction % 1 != 0 && counter < 100) {
            let val = Math.floor(fraction * base);
            result = `${result}${CHARS.toUpperCase()[val]}`;
            fraction = (fraction * base) % 1;
            counter++;
        }
        return result;
    }
}
