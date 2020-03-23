# react-fretboard-diagram

A React component to build SVG fretboard diagrams


### Strings numbering

For the user: strings are numbered starting at 1 and from the lowest pitched to the highest pitched.

Implementation: strings are in an array 0-index.

### Frets numbering

Frets are numbered starting at 0 and from the head of the neck towards the bridge.

Fret number 0 is the nut, or the "zero fret" installed close the the nut on certain guitars.

### Interval display

Intervals can be displayed in two forms:

- full interval: 11
- simplified interval: 4

"P" and "M" are omitted. 

### CSS class

Dot `circle`:

    .d              dot                     was:  fretboard-dot
    .n              fretted note
    .f-<number>     fret number
    .s-<number>     string number
    .r              root note
    .d-<number>     scale degree N                  only if played
    .nm-<number>    midi note number                only if played
    .nn-<string>    note name without octave        only if played
    .no-<string>    note name with octave           only if played
    .o-<number>     octave (octave -2 is .o--2)     only if played
    
Dot `text`:    
    
    .dt             dot-text                was: fretboard-dot-number

Cross:

    .x              non played string (cross)
    .s-<number>     string number
 
----

# TODO

- Display stacked intervals

- Color schemes
    - colors for intervals

- Type checking:
    - Flow or TypeScript. Go with Flow if possible.

- Make sure react-router is not build into the component because it is only used by the sample-app.

- Allow overriding of the display options per Shape. For example, on the same diagram, one shape could be displayed with
notes and another shape could be displayed with intervals.

- Font:
    - Nunito
    - PT Sans Narrow
    - Quicksand
    - Dosis
    - Varela Round

----

# Never forget:

[Optimize Later](http://wiki.c2.com/?OptimizeLater) - Premature optimization is the root of all evil. The most important 
function of computer code is to communicate the programmer's intent to a human reader. Any coding practice that makes 
your code harder to understand in the name of performance is a premature optimization.

Apply the [Robustness principle](https://en.wikipedia.org/wiki/Robustness_principle) - Be liberal in what you accept, and conservative in what you send



