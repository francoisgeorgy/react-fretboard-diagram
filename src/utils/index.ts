// export * from './layout.js';
export * from './svg.js';

export interface DiagramOptions {
    show?: null | 'note' | 'interval' | 'interval-simple';
    cross?: boolean;
    root?: string;
    roots?: string;
    fill?: string;
    css?: string;
    colors?: {
        [key: string]: string;
    }
}

export interface ParsedDiagramOptions {
    show: null | 'note' | 'interval' | 'interval-simple';
    cross: boolean;
    root: string;
    roots: string;
    fill: string;
    css: string;
    pc: {[key: string]: string;}
    ic: {[key: string]: string;}
    nc: {[key: string]: string;}    //note without octave color
    noc: {[key: string]: string;}   //note with octave color
    oc: {[key: string]: string;}
    fc: {[key: string]: string;}
    sc: {[key: string]: string;}
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

export function parseDiagramOptions(options: DiagramOptions): ParsedDiagramOptions {
    const p : ParsedDiagramOptions = {
        cross: true, css: "", fc: {}, ic: {}, nc: {}, noc: {}, oc: {}, pc: {}, root: "", roots: "", sc: {}, show: null
    };
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
            for (let e of v.split(',')) {
                if (e.match(/^[0-9]/)) {
                    //
                }
            }
        }
    }

}
