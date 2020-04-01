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
    fretNumberDistance: 10,   // check
    fretNumberFontSize: 24,   // check
    fretWidth: 2,
    paddingBody: 15, // check
    paddingHead: 55,
    paddingHigh: 70,  // check
    paddingLow: 30,   // check
    stringInterval: 34,
    stringWidth: 2,

    fretColor: "#424242",
    fretNumberColor: "#aaaaaa",
    fretNumberFontFamily: "sans-serif",
    inlays: false,
    inlaysColor: "#eeeeee",
    inlaysShape: "dot",
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
    textfontFamily: "sans-serif",
    textfontSize: 14
};

export const DOT_DEFAULTS_BW: DotOptions = {        // used by default in Shape
    colors: {},
    cross: true,
    css: "",
    fill: "black",
    stroke: "black",
    root: "white",
    roots: "white",
    show: null  //,
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
