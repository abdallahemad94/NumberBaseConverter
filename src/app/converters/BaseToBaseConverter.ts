import { BaseToDecimalConverter } from "./BaseToDecimalConverter";
import { DecimalToBaseConverter } from "./DecimalToBaseConverter";

export class BaseToBaseConverter {
    private baseToDecimalConverter: BaseToDecimalConverter;
    private decimalToBaseConverter: DecimalToBaseConverter;
    fromBase: number;
    toBase: number;
    /**
     * A converter to convert from and to any base system between 2 and 36.
     * @param {number} fromBase The base to convert the value from.
     * @param {number} toBase The base to convert the value to.
     */
    constructor(fromBase: number, toBase: number) {
        if (!fromBase || fromBase < 2 || fromBase > 36)
            throw new RangeError("fromBase must be between 2 and 36");
        if (!toBase || toBase < 2 || toBase > 36)
            throw new RangeError("toBase must be between 2 and 36");
        this.baseToDecimalConverter = new BaseToDecimalConverter();
        this.decimalToBaseConverter = new DecimalToBaseConverter();
        this.fromBase = fromBase;
        this.toBase = toBase;
    }

    /**
     * Converts the user input from the selecte fromBase to the toBase.
     * @param {string} value The value to be converted.
     * @returns string;
     */
    convert(value: string): string {
        if (this.fromBase == this.toBase || !value)
            return value;
        else if (this.fromBase != 10 && this.toBase != 10)
            return this.decimalToBaseConverter.convert(this.baseToDecimalConverter.convert(value, this.fromBase), this.toBase);
        else if (this.fromBase == 10)
            return this.decimalToBaseConverter.convert(parseFloat(value), this.toBase);
        else
            return this.baseToDecimalConverter.convert(value, this.fromBase).toString();
    }
}
