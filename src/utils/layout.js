import Assert from "assert-js";
import * as layout from "./index";

const COLORS_DEFAULT = {
    fretColor: '',
    fretOpacity: ''
};

const LAYOUTS = {
    def : {
        paddingTop: 40,
        paddingRight: 15,
        paddingBottom: 30,
        paddingLeft: 70,
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
        paddingLeft : 2,
        paddingRight : 1,
        paddingTop: 2,
        paddingBottom: 1,
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
        paddingLeft : 4,
        paddingRight : 2,
        paddingTop: 3,
        paddingBottom: 2,
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
        paddingLeft : 4,
        paddingRight : 2,
        paddingTop: 3,
        paddingBottom: 2,
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
        paddingLeft : 4,
        paddingRight : 2,
        paddingTop: 3,
        paddingBottom: 2,
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
        paddingLeft : 4,
        paddingRight : 2,
        paddingTop: 3,
        paddingBottom: 2,

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
        paddingLeft : 4,
        paddingRight : 2,
        paddingTop: 3,
        paddingBottom: 2,
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
        paddingLeft : 4,
        paddingRight : 2,
        paddingTop: 3,
        paddingBottom: 2,
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
        paddingLeft : 5,
        paddingRight : 5,
        paddingTop: 5,
        paddingBottom: 5,
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

export var currentLayout = LAYOUTS['def'];

export function setLayout(layout) {
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

export function width(frets) {
    console.log('width: currentLayout', currentLayout);
    Assert.greaterThan(0, frets, "Number of frets must be an integer greater than 0");
    // console.log(`w = ${CONF.paddingLeft} + (${CONF.fretInterval} * ${frets}) + ${CONF.paddingRight} + ((${fretExtra ? 1 : 0}) * ${CONF.fretExtra})`);
    // return CONF.paddingLeft + (CONF.fretInterval * frets) + CONF.paddingRight + ((fretExtra ? 1 : 0) * CONF.fretExtra) + 1;
    console.log(`w = ${currentLayout.paddingLeft} + (${currentLayout.fretInterval} * ${frets}) + ${currentLayout.paddingRight} + 1`);
    return currentLayout.paddingLeft + (currentLayout.fretInterval * frets) + currentLayout.paddingRight + currentLayout.fretWidth;
}

export function height(strings) {
    Assert.greaterThan(0, strings, "Number of string must be an integer greater than 0");
    console.log(`h = ${currentLayout.paddingTop} + (${currentLayout.stringInterval} * (${strings} - 1)) + ${currentLayout.paddingBottom}`);
    return currentLayout.paddingTop + (currentLayout.stringInterval * (strings - 1)) + currentLayout.paddingBottom + currentLayout.stringWidth;
}

export function stringLength(frets) {
    Assert.greaterThan(0, frets, "NUmber of frets must be an integer greater than 0");
    // return frets * layout.CONF.fretInterval + ((fretExtra ? layout.CONF.fretInterval : 0) * CONF.fretExtra) + 1;
    let tmp = frets * currentLayout.fretInterval + currentLayout.fretWidth;
    console.log(`stringLength: ${frets} * ${currentLayout.fretInterval} + ${currentLayout.fretWidth} = ${tmp}`);
    return frets * currentLayout.fretInterval + currentLayout.fretWidth - currentLayout.fretWidth / 2;
}

export function fretLength(strings) {
    Assert.greaterThan(0, strings, "Number of string must be an integer greater than 0");
    return (strings - 1) * currentLayout.stringInterval + currentLayout.stringWidth;
}
