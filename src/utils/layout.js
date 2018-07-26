import Assert from "assert-js";

const COLORS_DEFAULT = {
    fretColor: '',
    fretOpacity: ''
};

const LAYOUTS = {
    def : {
        paddingLeft: 20,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        stringInterval: 10,
        stringWidth: 1,
        fretInterval: 20,
        fretWidth: 1,
        dotIn: 5,
        dotOut: 5
    },
    test1 : {
        paddingLeft : 1,
        paddingRight : 1,
        paddingTop: 1,
        paddingBottom: 1,
        stringInterval: 2,
        stringWidth: 1,
        fretInterval: 2,
        fretWidth: 1,
        dotIn: 5,
        dotOut: 5
    },
    test2 : {
        paddingLeft : 2,
        paddingRight : 2,
        paddingTop: 2,
        paddingBottom: 2,
        stringInterval: 4,
        stringWidth: 1,
        fretInterval: 4,
        fretWidth: 1,
        dotIn: 5,
        dotOut: 5
    },
    test3 : {
        paddingLeft : 2,
        paddingRight : 2,
        paddingTop: 2,
        paddingBottom: 2,
        stringInterval: 4,
        stringWidth: 3,
        fretInterval: 4,
        fretWidth: 3,
        dotIn: 5,
        dotOut: 5
    },
    test4 : {
        paddingLeft : 2,
        paddingRight : 2,
        paddingTop: 2,
        paddingBottom: 2,
        stringInterval: 6,
        stringWidth: 3,
        fretInterval: 6,
        fretWidth: 3,
        dotIn: 5,
        dotOut: 5
    },
    test5 : {
        paddingLeft : 2,
        paddingRight : 2,
        paddingTop: 2,
        paddingBottom: 2,

        stringInterval: 6,
        stringWidth: 2,

        fretInterval: 6,
        fretWidth: 2,

        dotIn: 5,
        dotOut: 5
    },
    test6 : {
        paddingLeft : 2,
        paddingRight : 2,
        paddingTop: 2,
        paddingBottom: 2,
        stringInterval: 6,
        stringWidth: 2,
        fretInterval: 6,
        fretWidth: 4,
        dotIn: 5,
        dotOut: 5
    },
    test7 : {
        paddingLeft : 2,
        paddingRight : 2,
        paddingTop: 2,
        paddingBottom: 2,
        stringInterval: 6,
        stringWidth: 4,
        fretInterval: 6,
        fretWidth: 2,
        dotIn: 5,
        dotOut: 5
    },
    test8 : {
        paddingLeft : 10,
        paddingRight : 5,
        paddingTop: 10,
        paddingBottom: 5,
        stringInterval: 7,
        stringWidth: 2,
        fretInterval: 7,
        fretWidth: 2,
        dotIn: 5,
        dotOut: 5
    }
};

export var currentLayout = LAYOUTS['def'];

export function setLayout(name) {
    Assert.true(LAYOUTS.hasOwnProperty(name));
    currentLayout = LAYOUTS[name];
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
