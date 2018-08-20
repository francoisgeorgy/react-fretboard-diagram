import Assert from "assert-js";

class DiagramStyle {

    constructor({
            paddingTop = 40,
            paddingRight = 15,
            paddingBottom = 30,
            paddingLeft = 70,
            stringInterval = 60,
            stringWidth = 4,
            fretInterval = 100,
            fretWidth = 4,
            dotIn = 50,
            dotOut = 30,
            dotRadius = 20,
            dotStroke = 2,
            fontSize = 17,
        } = {}) {

        this.paddingTop = paddingTop;
        this.paddingRight = paddingRight;
        this.paddingBottom = paddingBottom;
        this.paddingLeft = paddingLeft;
        this.stringInterval = stringInterval;
        this.stringWidth = stringWidth;
        this.fretInterval = fretInterval;
        this.fretWidth =fretWidth;
        this.dotIn = dotIn;
        this.dotOut = dotOut;
        this.dotRadius = dotRadius;
        this.dotStroke = dotStroke;
        this.fontSize = fontSize;

        this.colors = {
            interval: {
                'R': {
                    fill: 'black',
                    stroke: 'black',
                    text: 'white'
                },
                '3': {
                    fill: 'red',
                    stroke: 'red',
                    text: 'white'
                },
                '5': {
                    fill: 'blue',
                    stroke: 'blue',
                    text: 'white'
                }
            }
        }

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
        Assert.greaterThan(0, frets, "Number of frets must be an integer greater than 0");
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