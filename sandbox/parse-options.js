
function parseDiagramOptions(options) {
    const p = {
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
    //     '[3,1]': ...        // the dot at position string 3, fret 1 in the shape (not the played position but the shape's definition position)
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

    // notes must be uppercase --> F
    // fret must be lowercase --> f

    if (options['colors']) {
        // console.log("colors");
        const c = options['colors'];
        for (let k of Object.keys(c)) {
            const v = c[k];
            // console.log("colors: k,v", k, v);
            if (!v) continue;
            console.log(k);
            for (let e of k.split(',')) {
                // console.log("colors: e", e);
                if (e.indexOf('.') > 0) {
                    console.log(">> position", e);
                    p.pc[e] = v;
                } else if (e.match(/^[0-9]/)) {
                    console.log(">> interval", e);
                    p.ic[e] = v;
                } else if (e.match(/^[A-G][#b]?-?[0-9]/)) {
                    console.log(">> note+octave", e);
                    p.noc[e] = v;
                } else if (e.match(/^[A-G]/)) {
                    console.log(">> note", e);
                    p.nc[e] = v;
                } else if (e.startsWith('o')) {
                    console.log(">> octave", e);
                    p.oc[e] = v;
                } else if (e.startsWith('s')) {
                    const n = parseInt(e.substr(1), 10);
                    if (isNaN(n)) {
                        console.error("!! invalid string", e.substr(1))
                    } else {
                        console.log(">> string", n);
                        p.sc[e] = v;
                    }
                } else if (e.startsWith('f')) {
                    const n = parseInt(e.substr(1), 10);
                    if (isNaN(n)) {
                        console.error("!! invalid fret", e.substr(1))
                    } else {
                        console.log(">> fret", n);
                        p.fc[e] = v;
                    }
                }
            }
        }
    }

    return p;
}

const options = {
    show: 'note' | 'interval' | 'interval-simple',
    cross: true|false,              // show X for non-played strings
    root: '#434248',        // the root (shortcut for the root note color)
    roots: '#434248',       // all roots (interval class (ic) = 0)
    fill: '#434248',               // default fill color
    colors: {
        // priority 1:
        '3.1': '#434248',        // the dot at position string 3, fret 1 in the shape (not the played position but the shape's definition position)
        // priority 2:
        root: '#434248',    // all "root" (1P, 8P, '#434248')
        // priority 3:
        '5':  '#434248',           // starts with a digit --> interval; all 5th notes
        '3m,7m':  '#434248',       // starts with a digit --> interval; all 3m and 7m intervals
        'C4': '#434248',           // starts with a letter --> note; all C4 notes
        // priority 4:
        'C': '#434248',            // all C, any octave
        'C,E,G': '#434248',        // all C, E, G, any octave
        // priority 5:
        'o4' : '#434248',          // octave 4 (all notes in '#434248')
        // priority 6:
        's1': '#434248',            // string 1 : define color for all dots on the sepcified string
        's3,s4,s5': '#434248',        // string 3, 4, 5
        // priority 7:
        'f1': '#434248',            // fret 1 : define color for all dots on the specified fret
        'f1,f2,f3': '#434248',        // frets 1, 2, 3

        // they can be combined:
        'C,C#,C#4,Cb-4,s0,s4,C,B3,5P,7,7m,o4,f10,fa': '#434248'        // frets 1, 2, 3
    },
    css: 'none' | 'all' | 'r f s i no o nm nn'  // css classes to add
};

const parsed = parseDiagramOptions(options);
console.log(parsed);
