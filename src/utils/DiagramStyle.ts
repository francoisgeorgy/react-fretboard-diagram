import Assert from "assert-js";
import React from "react";

class DiagramStyle {

    paddingHigh: number;
    paddingBody: number;
    paddingLow: number;
    paddingHead: number;
    stringInterval: number;
    stringWidth: number;
    fretInterval: number;
    fretWidth: number;
    dotIn: number;
    dotOut: number;
    dotRadius: number;
    dotStroke: number;
    crossStroke: number;
    fontSize: number;
    fretNumberDistance: number;
    fretNumberFontSize: number;
    fretNumberColor: string;
    colors: any;    //TODO: describe colors

    constructor({
            paddingHigh = 70,    // make room for fret numbers
            paddingLow = 30,
            paddingHead = 70,
            paddingBody = 15,
            stringInterval = 60,
            stringWidth = 4,
            fretInterval = 100,
            fretWidth = 4,
            dotIn = 50,
            dotOut = 30,
            dotRadius = 20,
            dotStroke = 3,
            crossStroke = 5,
            fontSize = 25,
            fretNumberDistance = 30,
            fretNumberFontSize = 24,
            fretNumberColor = '#999'
        } = {}) {

        this.paddingHigh = paddingHigh;
        this.paddingBody = paddingBody;
        this.paddingLow = paddingLow;
        this.paddingHead = paddingHead;
        this.stringInterval = stringInterval;
        this.stringWidth = stringWidth;
        this.fretInterval = fretInterval;
        this.fretWidth =fretWidth;
        this.dotIn = dotIn;
        this.dotOut = dotOut;
        this.dotRadius = dotRadius;
        this.dotStroke = dotStroke;
        this.crossStroke = crossStroke;
        this.fontSize = fontSize;
        this.fretNumberDistance = fretNumberDistance;
        this.fretNumberFontSize = fretNumberFontSize;
        this.fretNumberColor = fretNumberColor;

        this.colors = {
            cross: "black",
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

    width(frets: number) {
        // console.log('width = currentLayout', currentLayout);
        Assert.greaterThan(0, frets, "Number of frets must be an integer greater than 0");
        // console.log(`w = ${this.paddingHead} + (${this.fretInterval} * ${frets}) + ${this.paddingBody} + 1`);
        return this.paddingHead + (this.fretInterval * frets) + this.paddingBody + this.fretWidth;
    }

    height(strings: number) {
        Assert.greaterThan(0, strings, "Number of string must be an integer greater than 0");
        // console.log(`h = ${this.paddingHigh} + (${this.stringInterval} * (${strings} - 1)) + ${this.paddingLow}`);
        return this.paddingHigh + (this.stringInterval * (strings - 1)) + this.paddingLow + this.stringWidth;
    }

    stringLength(frets: number) {
        Assert.greaterThan(0, frets, "Number of frets must be an integer greater than 0");
        // return frets * layout.CONF.fretInterval + ((fretExtra ? layout.CONF.fretInterval  = 0) * CONF.fretExtra) + 1;
        // let tmp = frets * this.fretInterval + this.fretWidth;
        // console.log(`stringLength = ${frets} * ${this.fretInterval} + ${this.fretWidth} = ${tmp}`);
        return frets * this.fretInterval + this.fretWidth - this.fretWidth / 2;
    }

    fretLength(strings: number) {
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

    getStringFretFromMouseEvent(event: React.MouseEvent, strings: number, frets: number) {

        // console.log(`paddingHigh=${this.paddingHigh}, s=${this.props.strings}, interval=${this.stringInterval}, bottom=${this.paddingHigh + ((this.props.strings - 1) * this.stringInterval)}`);

        // console.log('event', event.currentTarget, event.nativeEvent);
        // console.log(`(${e.clientX}, ${e.clientY}), (${e.nativeEvent.clientX}, ${e.nativeEvent.clientY})`);
        let svg = event.currentTarget.getBoundingClientRect();
        // console.log('targetRect', svg);
        // console.log(`targetRect: (${svg.width} ${svg.height}), ratio = ${svg.width/svg.height}`);

        let w = this.width(frets);
        let scale = svg.width / w;

        // console.log(`scale = ${svg.width} / ${w} = ${scale}`);

        let dx = event.clientX - svg.left;
        let dy = event.clientY - svg.top;

        // console.log(`delta=(${dx}, ${dy})`);
        // console.log(`dy / scale = ${dy / scale}`);

        let deltaY = dy / scale;

        if (deltaY < (this.paddingHigh - (this.stringInterval / 2))) {
            // console.log('in padding top, ignore');
            return null;
        }

        // console.log(`bottom limit = ${((svg.height / scale) - this.paddingLow + (this.stringInterval / 2))}`);
        if (deltaY > ((svg.height / scale) - this.paddingLow + (this.stringInterval / 2))) {
            // console.log('in padding bottom, ignore');
            return null;
        }
        // if ((deltaY) > (this.paddingHigh + ((strings - 1) * this.stringInterval) + this.stringWidth)) {
        //     console.log('in padding bottom, ignore');
        //     return
        // }

        let nString = Math.floor((deltaY - this.paddingHigh - (this.stringWidth / 2)) / this.stringInterval + 0.5);
        if (nString < 0) nString = 0;
        if (nString >= strings) nString = strings - 1;

        // console.log(`((dy/scale) - paddingHigh - stringWidth) / stringInterval = ${((deltaY) - this.paddingHigh - (this.stringWidth / 2)) / this.stringInterval}; n string = ${nString}`);

        // fret

        let deltaX = dx / scale;

        if (deltaX < (this.paddingHead - this.fretInterval + (this.fretWidth / 2))) {
            // console.log('in padding left, ignore');
            return null;
        }

        if (deltaX > ((svg.width / scale) - this.paddingBody)) {
            // console.log('in padding right, ignore');
            return null;
        }

        let nFret = Math.floor(((deltaX - this.paddingHead - this.fretWidth) / this.fretInterval) + 1);
        if (nFret < 0) nFret = 0;
        // if (nFret >= frets) nFret = frets;
        if (nFret > frets) {
            return null;
        }

        //console.log(`((dx/scale) - paddingHead - fretWidth) / fretInterval = ${(deltaX - this.paddingHead - (this.fretWidth / 2)) / this.fretInterval}; nFret fret = ${nFret}`);
        // console.log(strings - nString - 1, nFret);

        // this.addDot(this.state.tuning.length - nString - 1, nFret);
        return {
            string: strings - nString - 1,
            fret: nFret
        }

    };

}

export default DiagramStyle;
