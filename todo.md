
- automatically colorize each shape
    - --> CAGED colors? 
        - Cyan, grAy, Green, bluE, reD 
- shadow dots
    - ~~in compact notation, add a '-' to the position: "X,3-,2-,0,1,0"~~
    - ~~uppercase X : display 'X'~~
    - ~~lowercase x : display nothing~~
    - specify which strings to show    
- css class per interval, per note name, per string, per fret    
    --> .i-X .n-X, .s-X .f-X
    --> for root: .r
    --> for non-played string: .x
    
- force string color    
    
- layout:
    - standard
    - compact
    - real (smae spacing as in a real fretboard)
    - right-hand
    - left-hand
    - mirror horizontal
    - mirror vertical

- intervals
    - roman: I, II, III, ...
    - arab: 1, 2, 3, ...
- minor intervals:
    - 3m
    - iii (lowercase)        
    
# UI

- notes on/off
- intervals on/off
- default color
- color by note
- color by interval
- color by octave
- color by string
- color by fret

Pass a single `options` property:

    options = {
        show: 'note' | 'interval' | 'interval-simple',
        cross: true|false,              // show X for non-played strings
        root: '#434248',        // the root (shortcut for the root note color)
        fill: ...               // default fill color
        colors: {
        // priority 1:
            '[3,1]': ...        // the dot at position string 3, fret 1 in the shape (not the played position but the shape's definition position)
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
        
    
# refactor:

- Fretboard, FretNumbers and Shape component must return a SVG <g> element.

# Ideas:

    <Fretboard>
        <Shape />
        <Shape />
        <Connection from="A" to="A5" />
        <Pattern ... />
    </Fretboard>

-----

- https://www.fullstackreact.com/p/advanced-component-configuration-with-props-state-and-children/
- https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e

# typescript

    yarn add react react-dom @types/react @types/react-dom

- https://www.typescriptlang.org/docs/handbook/react-&-webpack.html
- https://fettblog.eu/typescript-react/events/
- https://mattferderer.com/default-props-in-react-with-typescript

# react

- https://react-styleguidist.js.org/
    - see https://github.com/KaiHotz/react-rollup-boilerplate
