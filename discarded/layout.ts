//TODO: delete me

import Assert from "assert-js";
// import * as layout from "./index";

const COLORS_DEFAULT = {
    fretColor: '',
    fretOpacity: ''
};

const LAYOUTS = {
    def : {
        paddingHigh: 40,
        paddingBody: 15,
        paddingLow: 30,
        paddingHead: 70,
        stringInterval: 60,
        stringWidth: 4,
        fretInterval: 100,
        fretWidth: 4,
        dotIn: 50,
        dotOut: 30,
        dotRadius: 20,
        dotStroke: 2,
        fontSize: 17
    },
    test1 : {
        paddingHead : 2,
        paddingBody : 1,
        paddingHigh: 2,
        paddingLow: 1,
        stringInterval: 2,
        stringWidth: 1,
        fretInterval: 2,
        fretWidth: 1,
        dotIn: 5,
        dotOut: 5,
        dotRadius: 5,
        fontSize: 1
    },
    test2 : {
        paddingHead : 4,
        paddingBody : 2,
        paddingHigh: 3,
        paddingLow: 2,
        stringInterval: 4,
        stringWidth: 1,
        fretInterval: 4,
        fretWidth: 1,
        dotIn: 5,
        dotOut: 5,
        dotRadius: 5,
        fontSize: 1
    },
    test3 : {
        paddingHead : 4,
        paddingBody : 2,
        paddingHigh: 3,
        paddingLow: 2,
        stringInterval: 4,
        stringWidth: 3,
        fretInterval: 4,
        fretWidth: 3,
        dotIn: 5,
        dotOut: 5,
        dotRadius: 5,
        fontSize: 1
    },
    test4 : {
        paddingHead : 4,
        paddingBody : 2,
        paddingHigh: 3,
        paddingLow: 2,
        stringInterval: 6,
        stringWidth: 3,
        fretInterval: 6,
        fretWidth: 3,
        dotIn: 5,
        dotOut: 5,
        dotRadius: 5,
        fontSize: 1
    },
    test5 : {
        paddingHead : 4,
        paddingBody : 2,
        paddingHigh: 3,
        paddingLow: 2,

        stringInterval: 6,
        stringWidth: 2,

        fretInterval: 6,
        fretWidth: 2,

        dotIn: 5,
        dotOut: 5,
        dotRadius: 5,
        fontSize: 1
    },
    test6 : {
        paddingHead : 4,
        paddingBody : 2,
        paddingHigh: 3,
        paddingLow: 2,
        stringInterval: 6,
        stringWidth: 2,
        fretInterval: 6,
        fretWidth: 4,
        dotIn: 5,
        dotOut: 5,
        dotRadius: 5,
        fontSize: 1
    },
    test7 : {
        paddingHead : 4,
        paddingBody : 2,
        paddingHigh: 3,
        paddingLow: 2,
        stringInterval: 6,
        stringWidth: 4,
        fretInterval: 6,
        fretWidth: 2,
        dotIn: 5,
        dotOut: 5,
        dotRadius: 5,
        fontSize: 1
    },
    test8 : {
        paddingHead : 5,
        paddingBody : 5,
        paddingHigh: 5,
        paddingLow: 5,
        stringInterval: 7,
        stringWidth: 2,
        fretInterval: 7,
        fretWidth: 2,
        dotIn: 5,
        dotOut: 5,
        dotRadius: 5,
        fontSize: 1
    }
};
/*
export var currentLayout = LAYOUTS['def'];

export function getLayout(layout: string|object): object {
    if (typeof layout === 'string') {
        console.log("string layout");
        Assert.true(LAYOUTS.hasOwnProperty(layout));
        return LAYOUTS[layout];
    } else {
        return Object.assign(LAYOUTS['def'], layout);
    }
    // currentLayout = LAYOUTS[name];
    // console.log('setLayout: currentLayout', currentLayout);
}


export function setLayout(layout: string|object): void {
    if (typeof layout === 'string') {
        console.log("string layout");
        Assert.true(LAYOUTS.hasOwnProperty(layout));
        currentLayout = LAYOUTS[layout];
    } else {
        currentLayout = Object.assign(LAYOUTS['def'], layout);
    }
    // currentLayout = LAYOUTS[name];
    console.log('setLayout: currentLayout', currentLayout);
}

export function width(frets: number): number {
    console.log('width: currentLayout', currentLayout);
    Assert.greaterThan(0, frets, "Number of frets must be an integer greater than 0");
    // console.log(`w = ${CONF.paddingHead} + (${CONF.fretInterval} * ${frets}) + ${CONF.paddingBody} + ((${fretExtra ? 1 : 0}) * ${CONF.fretExtra})`);
    // return CONF.paddingHead + (CONF.fretInterval * frets) + CONF.paddingBody + ((fretExtra ? 1 : 0) * CONF.fretExtra) + 1;
    console.log(`w = ${currentLayout.paddingHead} + (${currentLayout.fretInterval} * ${frets}) + ${currentLayout.paddingBody} + 1`);
    return currentLayout.paddingHead + (currentLayout.fretInterval * frets) + currentLayout.paddingBody + currentLayout.fretWidth;
}

export function height(strings: number): number {
    Assert.greaterThan(0, strings, "Number of string must be an integer greater than 0");
    console.log(`h = ${currentLayout.paddingHigh} + (${currentLayout.stringInterval} * (${strings} - 1)) + ${currentLayout.paddingLow}`);
    return currentLayout.paddingHigh + (currentLayout.stringInterval * (strings - 1)) + currentLayout.paddingLow + currentLayout.stringWidth;
}

export function stringLength(frets: number): number {
    Assert.greaterThan(0, frets, "NUmber of frets must be an integer greater than 0");
    // return frets * layout.CONF.fretInterval + ((fretExtra ? layout.CONF.fretInterval : 0) * CONF.fretExtra) + 1;
    let tmp = frets * currentLayout.fretInterval + currentLayout.fretWidth;
    console.log(`stringLength: ${frets} * ${currentLayout.fretInterval} + ${currentLayout.fretWidth} = ${tmp}`);
    return frets * currentLayout.fretInterval + currentLayout.fretWidth - currentLayout.fretWidth / 2;
}

export function fretLength(strings: number): number {
    Assert.greaterThan(0, strings, "Number of string must be an integer greater than 0");
    return (strings - 1) * currentLayout.stringInterval + currentLayout.stringWidth;
}
 */