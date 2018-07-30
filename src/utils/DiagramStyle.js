import Assert from "assert-js";

class DiagramStyle {

    constructor() {
        this.paddingTop = 40;
        this.paddingRight = 15;
        this.paddingBottom = 30;
        this.paddingLeft = 70;
        this.stringInterval = 60;
        this.stringWidth = 4;
        this.fretInterval = 100;
        this.fretWidth = 4;
        this.dotIn = 50;
        this.dotOut = 30;
        this.dotRadius = 20;
        this.dotStroke = 2;
        this.fontSize = 17;
    }

    width(frets) {
        // console.log('width = currentLayout', currentLayout);
        Assert.greaterThan(0, frets, "Number of frets must be an integer greater than 0");
        // console.log(`w = ${this.paddingLeft} + (${this.fretInterval} * ${frets}) + ${this.paddingRight} + 1`);
        return this.paddingLeft + (this.fretInterval * frets) + this.paddingRight + this.fretWidth;
    }

    height(strings) {
        Assert.greaterThan(0, strings, "Number of string must be an integer greater than 0");
        // console.log(`h = ${this.paddingTop} + (${this.stringInterval} * (${strings} - 1)) + ${this.paddingBottom}`);
        return this.paddingTop + (this.stringInterval * (strings - 1)) + this.paddingBottom + this.stringWidth;
    }

    stringLength(frets) {
        Assert.greaterThan(0, frets, "NUmber of frets must be an integer greater than 0");
        // return frets * layout.CONF.fretInterval + ((fretExtra ? layout.CONF.fretInterval  = 0) * CONF.fretExtra) + 1;
        let tmp = frets * this.fretInterval + this.fretWidth;
        // console.log(`stringLength = ${frets} * ${this.fretInterval} + ${this.fretWidth} = ${tmp}`);
        return frets * this.fretInterval + this.fretWidth - this.fretWidth / 2;
    }

    fretLength(strings) {
        Assert.greaterThan(0, strings, "Number of string must be an integer greater than 0");
        return (strings - 1) * this.stringInterval + this.stringWidth;
    }

    // stringWidth() {
    //     return this.stringWidth;
    // }
    //
    // fretWidth() {
    //     return this.fretWidth;
    // }

}

export default DiagramStyle;
