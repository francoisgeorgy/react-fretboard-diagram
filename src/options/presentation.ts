import {DiagramOptions, DotOptions} from "../utils/options";

export const DIAGRAM_DEFAULTS: DiagramOptions = {       // used by default in Diagram
    crossLinecap: "round",
    crossStroke: 3,
    dotIn: 55/2,
    dotOut: 55/2.6,
    dotRadius: 12,
    dotStroke: 2,
    fontSize: 14,
    fretInterval: 55,
    fretNumberDistance: 35,   // check
    fretNumberFontSize: 24,   // check
    fretWidth: 2,
    paddingBody: 15, // check
    paddingHead: 55,
    paddingHigh: 30,  // check
    paddingLow: 40,   // check
    stringInterval: 34,
    stringWidth: 2,

    fretColor: "#424242",
    fretNumberColor: "#aaaaaa",
    fretNumberFontFamily: "sans-serif",
    fretNumbers: "root",
    fretNumbersAlphabet: "arab",
    fretNumbersPosition: "bottom",    //FIXME: define a type

    inlays: true,
    inlaysColor: "#eeeeee",
    inlaysShape: "dot",
    inlaysRadius: 10,
    stringColor: "#424242"
};

export const DOT_DEFAULTS_COLOR: DotOptions = {
    colors: {
        "1P": "#7BC9E5",
        "3M,10M": "#E57BC9",
        "5P,12P": "#E5CD7B"
    },
    cross: true,
    css: "",
    fill: "white",
    stroke: "black",
    root: "",
    roots: "#7BC9E5",
    show: "interval",
    text: "#000000",
    textFontWeight: "bold",
    textFontFamily: "sans-serif",
    textFontSize: 14
};

export const DOT_DEFAULTS_BW: DotOptions = {        // used by default in Shape
    colors: {},
    cross: true,
    css: "",
    fill: "black",
    stroke: "black",
    root: "",
    roots: "white",
    text: "#000000",
    show: null  //,
    textFontWeight: "bold",
    textFontFamily: "sans-serif",
    textFontSize: 14
    // text: null,
    // textFontWeight: "",
    // textfontFamily: "",
    // textfontSize: null
};


// const p : ParsedDotOptions = {
//     show: null,
//     fill: "black",  // DEFAULT FILL COLOR
//     text: null,
//     root: "white",
//     roots: "",
//     cross: true,
//     css: "",
//     fc: {}, ic: {}, nc: {}, noc: {}, oc: {}, pc: {}, sc: {},
//     fct: {}, ict: {}, nct: {}, noct: {}, oct: {}, pct: {}, sct: {}
// };
