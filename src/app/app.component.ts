import { Component } from '@angular/core';
import { BaseToBaseConverter } from './converters/BaseToBaseConverter';
import { CHARS } from './converters/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    fromBase: number = 2;
    toBase: number = 10;
    numberToConvert: string = "";
    result: string = "";

    constructor() { }

    get numberToConvertPlaceHolder(): string {
        const allowedInputs = CHARS.slice(0, this.fromBase);
        return "Allowed chars are: " + allowedInputs.split('').join();
    }

    get isUserInputValid(): boolean {
        let isValid = true;
        if (this.numberToConvert) {
            const allowedChars = CHARS.slice(0, this.fromBase);
            const pattern = new RegExp(`^[${allowedChars}]+\\.?[${allowedChars}]*$`, 'gi');
            isValid = pattern.exec(this.numberToConvert) != null;
        }
        return isValid;
    }

    calculateIfValid() {
        let value = '';
        if (this.isUserInputValid && this.numberToConvert)
            value = this.convertUserInput();
        this.result = value;
    }

    copyResult() {
        navigator.clipboard.writeText(this.result);
    }

    convertUserInput(): string {
        const baseToBaseConverter = new BaseToBaseConverter(this.fromBase, this.toBase);
        return baseToBaseConverter.convert(this.numberToConvert);
    }

    validateFromAndToBases() {
        if (this.fromBase < 2)
            this.fromBase = 2;
        else if (this.fromBase > 36)
            this.fromBase = 36;

        if (this.toBase < 2)
            this.toBase = 2;
        else if (this.toBase > 36)
            this.toBase = 36;

        this.calculateIfValid();
    }
}
