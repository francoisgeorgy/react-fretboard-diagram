import Assert from "assert-js";

/**
 * Default SVG styles
 */
/*
export const DEFAULT_DOT_OPTIONS: SVGOptions = {
    dotRadius: 20,
    dotStroke: 3,
    fontSize: 25,
    crossStroke: 5,
    crossLinecap: "round"
};
*/

// Strings, Frets and external padding
export interface FretboardOptions {
    paddingHigh: number;
    paddingBody: number;
    paddingLow: number;
    paddingHead: number;
    stringInterval: number;
    stringWidth: number;
    stringColor: string;
    fretInterval: number;
    fretWidth: number;
    fretColor: string;
    fretNumberDistance: number;
    fretNumberFontSize: number;
    fretNumberFontFamily: string;
    fretNumberColor: string;
    inlays: boolean;
    inlaysShape: "dot"|"square"|"triangle"|"trapeze";   // gibson|fender|ibanez|jackson...
    inlaysColor: string;
}

// FretboardOptions + Dots & Crosses
export interface DiagramOptions extends FretboardOptions {
    dotIn: number;
    dotOut: number;
    dotStroke: number;
    dotRadius: number;
    fontSize: number;
    crossStroke: number;
    crossLinecap: "round";  // TODO: define other option values
}

//TODO: replace with DIAGRAM_DEFAULTS
/*
export const DEFAULT_DIAGRAM_OPTIONS: DiagramOptions = {
    paddingHigh: 70,    // make room for fret numbers
    paddingLow: 30,
    paddingHead: 70,    // set same as fretInterval
    paddingBody: 15,
    stringInterval: 50,
    stringWidth: 3,
    fretInterval: 80,
    fretWidth: 3,
    fretNumberDistance: 30,
    fretNumberFontSize: 24,
    dotIn: 40,  //TODO: compute automatically if not defined? fretInterval/2
    dotOut: 40,
    dotRadius: 20,
    dotStroke: 4,
    crossLinecap: "round",
    crossStroke: 4,
    fontSize: 25,

    fretColor: "",
    fretNumberColor: "",
    fretNumberFontFamily: "",
    inlays: false,
    inlaysColor: "",
    inlaysShape: "dot",
    stringColor: ""
    //TODO: add fret number roman|arab
};
*/

export interface xMappingFunction {
    (fret: number): number;
}

export interface yMappingFunction {
    (string: number): number;
}

export interface xyMappingFunction {
    (fret: number, string: number): [number, number];
}

export interface DotOptions {
    show?: null | 'note' | 'interval' | 'interval-simple';
    cross?: boolean;
    root?: string;
    roots?: string;
    fill?: string;
    stroke?: string;
    text?: string;      // default text color
    textFontFamily?: string;      // default text color
    textFontSize?: number;      // default text color
    textFontWeight?: string;
    //TODO: add text font family
    css?: string;
    colors?: {
        [key: string]: string;  // value is one or two colors: "<fill-color>[,<text-color>][,<stroke-color>]"
    }
}

//TODO: add cross color

// TODO: find a way to make a specific color option top-priority
export interface ParsedDotOptions {
    show: null | 'note' | 'interval' | 'interval-simple';
    cross: boolean;
    root: string;       // color of the strings
    roots: string;      // color of the frets
    fill: string;       // default fill color
    stroke: string;       // default stroke color
    text: string|null;       // default text color  if null text is not displayed
    textFontFamily: string|null;       // default text color  if null text is not displayed
    textFontSize: number|null;       // default text color  if null text is not displayed
    textFontWeight: string|null;
    css: string;
    // fill color:
    pc: {[key: string]: string;}    // P1: position
    ic: {[key: string]: string;}    // P2: interval
    nc: {[key: string]: string;}    // P3: note without octave color
    noc: {[key: string]: string;}   // P4: note with octave color
    oc: {[key: number]: string;}    // P5: octave
    fc: {[key: number]: string;}    // P6: fret
    sc: {[key: number]: string;}    // P7: string
    // text color:
    pct: {[key: string]: string;}    // P1: position
    ict: {[key: string]: string;}    // P2: interval
    nct: {[key: string]: string;}    // P3: note without octave color
    noct: {[key: string]: string;}   // P4: note with octave color
    oct: {[key: number]: string;}    // P5: octave
    fct: {[key: number]: string;}    // P6: fret
    sct: {[key: number]: string;}    // P7: string
    // stroke color:
    pcs: {[key: string]: string;}    // P1: position
    ics: {[key: string]: string;}    // P2: interval
    ncs: {[key: string]: string;}    // P3: note without octave color
    nocs: {[key: string]: string;}   // P4: note with octave color
    ocs: {[key: number]: string;}    // P5: octave
    fcs: {[key: number]: string;}    // P6: fret
    scs: {[key: number]: string;}    // P7: string
}

//
// defaults:
//
// - fill white for root
// - fill black for non-root
// - stroke black
// - no text
//

export function parseDotOptions(options: DotOptions): ParsedDotOptions {

    //TODO: define defaults dot colors
    const p : ParsedDotOptions = {
        show: null,
        fill: "black",  // DEFAULT FILL COLOR
        stroke: "black",
        text: null,
        textFontFamily: "sans-serif",
        textFontSize: 14,
        textFontWeight: "bold",
        root: "white",
        roots: "",
        cross: true,
        css: "",
        fc: {}, ic: {}, nc: {}, noc: {}, oc: {}, pc: {}, sc: {},            // fill
        fct: {}, ict: {}, nct: {}, noct: {}, oct: {}, pct: {}, sct: {},     // text
        fcs: {}, ics: {}, ncs: {}, nocs: {}, ocs: {}, pcs: {}, scs: {}      // stroke
    };

    if (!options || (Object.keys(options).length === 0)) return p;

    if (options.hasOwnProperty('show') && (options['show'] !== undefined)) p.show = options['show'];    //TODO: validate value
    if (options.hasOwnProperty('cross') && (options['cross'] !== undefined)) p.cross = options['cross'];
    if (options['root']) {
        p.root = options.root;    //TODO: validate value
    }
    if (options['roots']) {
        p.roots = options.roots;    //TODO: validate value
    }
    if (options['fill']) {
        p.fill = options.fill;    //TODO: validate value
    }
    if (options['text']) {
        p.text = options.text;    //TODO: validate value
    }
    if (options['css']) {
        p.css = options.css;    //TODO: validate value
    }

    // colors: {
    //     // priority 1:
    //     '3.1': ...        // the dot at position string 3, fret 1 in the shape (not the played position but the shape's definition position)
    //     // priority 2:
    //     root: '#434248',    // all "root" (1P, 8P, ...)
    //         // priority 3:
    //         '5':  ...           // starts with a digit --> interval; all 5th notes
    //     '3m,7m':  ...       // starts with a digit --> interval; all 3m and 7m intervals
    //     'C4': ...           // starts with a letter --> note; all C4 notes
    //     // priority 4:
    //     'C': ...            // all C, any octave
    //     'C,E,G': ...        // all C, E, G, any octave
    //     // priority 5:
    //     'o4' : ...          // octave 4 (all notes in ...)
    //     // priority 6:
    //     's1: ...            // string 1 : define color for all dots on the sepcified string
    //     's3,4,5: ...        // string 3, 4, 5
    //     // priority 7:
    //     'f1: ...            // fret 1 : define color for all dots on the specified fret
    //     'f1,2,3: ...        // frets 1, 2, 3
    // }

    if (options['colors']) {
        const c = options['colors'];
        for (let k of Object.keys(c)) {
            const v = c[k];
            if (!v) continue;
            const [fillColor, textColor, strokeColor] = v.split(",");
            // console.log(k);
            for (let e of k.split(',')) {
                if (e.indexOf('.') > 0) {                       //console.log(">> position", e);
                    if (fillColor) p.pc[e] = fillColor;
                    if (textColor) p.pct[e] = textColor;
                    if (strokeColor) p.pcs[e] = strokeColor;
                } else if (e.match(/^[0-9]/)) {                 //console.log(">> interval", e);
                    if (fillColor) p.ic[e] = fillColor;
                    if (textColor) p.ict[e] = textColor;
                    if (strokeColor) p.ics[e] = strokeColor;
                } else if (e.match(/^[A-G][#b]?-?[0-9]/)) {     //console.log(">> note+octave", e);
                    if (fillColor) p.noc[e] = fillColor;
                    if (textColor) p.noct[e] = textColor;
                    if (strokeColor) p.nocs[e] = strokeColor;
                } else if (e.match(/^[A-G]/)) {                 //console.log(">> note", e);
                    if (fillColor) p.nc[e] = fillColor;
                    if (textColor) p.nct[e] = textColor;
                    if (strokeColor) p.ncs[e] = strokeColor;
                } else if (e.startsWith('o')) {
                    const n = parseInt(e.substr(1), 10);
                    if (isNaN(n)) {
                        console.error("!! invalid octave", e.substr(1))
                    } else {                                   //console.log(">> octave", n);
                        if (fillColor) p.oc[e] = fillColor;
                        if (textColor) p.oct[e] = textColor;
                        if (strokeColor) p.ocs[e] = strokeColor;
                    }
                } else if (e.startsWith('s')) {
                    const n = parseInt(e.substr(1), 10);
                    if (isNaN(n)) {
                        console.error("!! invalid string", e.substr(1))
                    } else {                                   //console.log(">> string", n);
                        if (fillColor) p.sc[e] = fillColor;
                        if (textColor) p.sct[e] = textColor;
                        if (strokeColor) p.scs[e] = strokeColor;
                    }
                } else if (e.startsWith('f')) {
                    const n = parseInt(e.substr(1), 10);
                    if (isNaN(n)) {
                        console.error("!! invalid fret", e.substr(1))
                    } else {                                    //console.log(">> fret", n);
                        if (fillColor) p.fc[e] = fillColor;
                        if (textColor) p.fct[e] = textColor;
                        if (strokeColor) p.fcs[e] = strokeColor;
                    }
                }
            }
        }
    }

    return p;

}


/*
    options = {
        show: 'note' | 'interval' | 'interval-simple',
        cross: true|false,              // show X for non-played strings
        root: '#434248',        // the root (shortcut for the root note color)
        roots: '#434248',       // all roots (interval class (ic) = 0)
        fill: ...               // default fill color
        colors: {
        // priority 1:
            '3.1': ...        // the dot at position string 3, fret 1 in the shape (not the played position but the shape's definition position)
        // priority 2:
            root: '#434248',    // all "root" (1P, 8P, ...)
        // priority 3:
            '5':  ...           // starts with a digit --> interval; all 5th notes
            '3m,7m':  ...       // starts with a digit --> interval; all 3m and 7m intervals
            'C4': ...           // starts with a letter --> note; all C4 notes
        // priority 4:
            'C': ...            // all C, any octave
            'C,E,G': ...        // all C, E, G, any octave
        // priority 5:
            'o4' : ...          // octave 4 (all notes in ...)
        // priority 6:
            's1: ...            // string 1 : define color for all dots on the sepcified string
            's3,4,5: ...        // string 3, 4, 5
        // priority 7:
            'f1: ...            // fret 1 : define color for all dots on the specified fret
            'f1,2,3: ...        // frets 1, 2, 3
        }
        css: 'none' | 'all' | 'r f s i no o nm nn'  // css classes to add
    }

`options` can be passed at the `Fretboard` or `Shape` level. The `Shape` level overrides the `Fretboard` level.

parsed options:

    parsed_options = {
        show: 'note',
        cross: true,
        fill: <color>           // default fill color
        root: <color>,          // default color for the first root (interval = 1P)
        roots: <color>,         // default color for all roots (interval chroma = 0)
        css: 'r f s i',
        pc: {           // position color
            '3.1' : <color>
        },
        ic: {           // interval color
            '5' : <color>,
            '3m' : <color>,
            '7m' : <color>
        },
        nc: {           // note color
            'C4' : <color>,
            'C' : <color>,
            'E' : <color>
        },
        oc: {           // octave color
            '-2' : <color>
        },
        fc: {           // fret color
            1 : <color>,
            3 : <color>
        },
        sc: {           // string color
            1 : <color>,
            2 : <color>,
            3 : <color>
        }
    }


*/


export function width(frets: number, options: DiagramOptions) {
    // console.log('width = currentLayout', currentLayout);
    Assert.greaterThan(0, frets, "Number of frets must be an integer greater than 0");
    // console.log(`w = ${this.paddingHead} + (${this.fretInterval} * ${frets}) + ${this.paddingBody} + 1`);
    return options.paddingHead + (options.fretInterval * frets) + options.paddingBody + options.fretWidth;
}

export function height(strings: number, options: DiagramOptions) {
    Assert.greaterThan(0, strings, "Number of string must be an integer greater than 0");
    // console.log(`h = ${this.paddingHigh} + (${this.stringInterval} * (${strings} - 1)) + ${this.paddingLow}`);
    return options.paddingHigh + (options.stringInterval * (strings - 1)) + options.paddingLow + options.stringWidth;
}

export function stringLength(frets: number, options: DiagramOptions) {
    Assert.greaterThan(0, frets, "Number of frets must be an integer greater than 0");
    // return frets * layout.CONF.fretInterval + ((fretExtra ? layout.CONF.fretInterval  = 0) * CONF.fretExtra) + 1;
    // let tmp = frets * this.fretInterval + this.fretWidth;
    // console.log(`stringLength = ${frets} * ${this.fretInterval} + ${this.fretWidth} = ${tmp}`);
    return frets * options.fretInterval + options.fretWidth - options.fretWidth / 2;
}

export function fretLength(strings: number, options: DiagramOptions) {
    Assert.greaterThan(0, strings, "Number of string must be an integer greater than 0");
    return (strings - 1) * options.stringInterval + options.stringWidth;
}
