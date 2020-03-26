import React, {Fragment} from "react";
import {Interval, Note} from "tonal";
import {Utils} from "fretboard-api";
import {ShapeProps, ShapeState} from "./Shape";
import {DEFAULT_DIAGRAM_OPTIONS, parseDotOptions} from "../utils/options";

/*
export interface ShapeProps {
    className: string,
    shape: ShapeType,
    strings: number,   // number of strings
    string: number,   // shape position
    fret: number,     // shape position
    diagramStyle: DiagramStyle,
    text: 'note' | 'interval' | 'finger' | 'custom';   // TODO: define "custom"
}

export interface ShapeState {
}
*/

export default class ShapeHorizontal extends React.Component<ShapeProps, ShapeState> {

    static defaultProps = {
        className: '',
        strings: 6,
        string: -1,
        fret: -1,
        // diagramStyle: {},
        text: 'note',
        options: DEFAULT_DIAGRAM_OPTIONS,
        dotOptions: null
    };

    // TODO: check that 'frets', 'intervals', 'fingers', ... arrays have the same structure and lengths.
    // --> should be done by the fretboard-api.

/*
    x(fret: number) {
        return fret === 0
            ? this.props.diagramStyle.paddingHead - this.props.diagramStyle.dotOut + this.props.diagramStyle.fretWidth / 2
            : this.props.diagramStyle.paddingHead + ((fret - 1) * this.props.diagramStyle.fretInterval) + (this.props.diagramStyle.fretInterval - this.props.diagramStyle.dotIn) + this.props.diagramStyle.fretWidth / 2;
    }

    y(string: number) {
        return this.props.diagramStyle.paddingHigh + (string * this.props.diagramStyle.stringInterval) + this.props.diagramStyle.stringWidth / 2;
    }
*/

    getText(string: number, fretIndex: number): string {

        // return 'A♭';

        let t = '';
        let s = this.props.shape;

        // if ((s.notes[string][fretIndex] === undefined) || (s.notes[string][fretIndex] === null)) return;

        switch (this.props.text) {
            case 'note':
                if (s.notes == null) {
                    throw new Error("Shape notes are undefined. Play the shape to set its notes.");
                }
                const notes = s.notes[string];
                if (notes == null) {
                    // non-played string
                    return '';
                }
                t = Note.pc(notes[fretIndex]) || '';
                t = t.replace('b', '♭').replace('#', '♯');  //TODO: offer option to use b|# or symbols
                break;
            // case 'note-octave':
            //     t = s.notes[string][fretIndex];
            //     break;
            case 'interval':
                if (s.intervals == null) {
                    throw new Error("Shape intervals are undefined. Play the shape to set its intervals.");
                }
                const intervals = s.intervals[string];
                if (intervals == null) {
                    // non-played string
                    return '';
                }
                t = Utils.intervalText(intervals[fretIndex]);
                break;
            // case 'interval-compound':
            //     t = FretboardApi.Utils.intervalText(s.intervals[string][fretIndex], true);
            //     break;
            case 'finger':
                if (s.fingers == null) {
                    // throw new Error("Shape fingers are undefined.");
                    return '';
                }
                const fingers = s.fingers[string];
                if (fingers == null) {
                    // non-played string
                    return '';
                }
                t = fingers[fretIndex].toString(10);
                break;
        }

        return t;
    }

    dot(string: number, fret: number, text: string, interval: string|null, note: string|null) {

        let fill = 'white';     //TODO: configure this color
        let stroke = 'black';   //TODO: configure this color
        let dotStrokeColor = 'black';
        let textColor = 'black';    //TODO: configure this color

        switch (this.props.text) {
            case 'note':
                break;
            case 'interval':
/*
                if (this.props.diagramStyle.colors.interval.hasOwnProperty(text)) {
                    // console.log(this.props.diagramStyle.colors.interval);
                    fill = this.props.diagramStyle.colors.interval[text].fill;
                    stroke = this.props.diagramStyle.colors.interval[text].stroke;
                    textColor = this.props.diagramStyle.colors.interval[text].rotate;
                }
*/
                break;
            // case 'interval-compound':
            //     if (this.props.diagramStyle.colors.interval.hasOwnProperty(text)) {
            //         // console.log(this.props.diagramStyle.colors.interval);
            //         fill = this.props.diagramStyle.colors.interval[text].fill;
            //         stroke = this.props.diagramStyle.colors.interval[text].stroke;
            //         textColor = this.props.diagramStyle.colors.interval[text].text;
            //     }
            //     break;
            case 'finger':
                break;
        }

        //TODO: if single letter in circle, make x = x-1

        const nm = note ? `nm-${Note.midi(note)}` : '';     // .nm-<number>    midi note number
        const o = note ? `o-${Note.oct(note)}` : '';        // .o-<number>     octave (octave -2 is .o--2)
        const nn = note ? `nn-${Note.pc(note)}` : '';       // .nn-<string>    note name without octave
        const r = interval ? (Interval.ic(interval) === 0 ? 'r' : '') : '';     // .r   root note
        const css = `f-${fret} s-${string} ${interval ? `i-${interval}` : ''} ${note ? `no-${note}` : ''} ${nn} ${o} ${nm} ${r} ${this.props.className}`;

        return (
            <Fragment key={`${string}.${fret}`}>
                <circle cx={this.props.fretToX(fret)} cy={this.props.stringToY(string)} r={this.props.dotRadius()}
                        className={`d n ${css}`}
                        // strokeWidth={this.props.dotStroke()}
                        stroke={dotStrokeColor}
                        fill={fill} />
                <text x={this.props.fretToX(fret)} y={this.props.stringToY(string)}
                      alignmentBaseline="central"
                      className={`dt ${css}`}
                      textAnchor="middle"
                      fontSize={this.props.svgOptions.fontSize}
                      fill={textColor}
                      >{text}</text>
            </Fragment>
        );
    }

    cross(string: number) {

        let stroke = 'black';   //TODO: configure this color

        const x = this.props.fretToX(0);
        const y = this.props.stringToY(string);
        const w = this.props.options.dotRadius * 0.75;
        return (
            <Fragment key={`${string}.X`}>
                <path className={`x s-${string} ${this.props.className}`}
                      stroke={stroke}
                      strokeWidth={this.props.options.crossStroke}
                      strokeLinecap={this.props.options.crossLinecap}
                      d={`M${x-w},${y-w}L${x+w},${y+w}`} />
                <path className={`x s-${string} ${this.props.className}`}
                      stroke={stroke}
                      strokeWidth={this.props.options.crossStroke}
                      strokeLinecap={this.props.options.crossLinecap}
                      d={`M${x+w},${y-w}L${x-w},${y+w}`} />
            </Fragment>
        );
    }

    render() {

        const shape = this.props.shape;

        if (!shape) return null;

        const opt = parseDotOptions(this.props.dotOptions);

        let e = [];
        for (let s = 0; s < shape.frets.length; s++) {      // for each string

            const frets = shape.frets[s];
            if (frets == null) {
                // non-played string
                if (opt.cross) {
                    e.push(this.cross(this.props.strings - 1 - s));     // strings numbering [0] is lowest pitched
                }
            } else {
                for (let f = 0; f < frets.length; f++) {

                    let i = shape.intervals[s] ? shape.intervals[s] : null;
                    let n = shape.notes[s] ? shape.notes[s] : null;

                    e.push(this.dot(this.props.strings - 1 - s, frets[f], this.getText(s, f),
                        i ? i[f] : '',
                        n ? n[f] : ''));
                }
            }
            // if (Array.isArray(shape.frets[i])) {
                // if (s.frets[i].length === 0) {          // non-played string
                //     //e.push(this.cross(this.props.strings - 1 - i));     // strings numbering [0] is lowest pitched
                //     //TODO: ignore
                // } else if (s.frets[i][0] === 'X') {
                //     e.push(this.cross(this.props.strings - 1 - i));     // strings numbering [0] is lowest pitched
                // } else {
                //     for (let f = 0; f < shape.frets[s].length; f++) {
                //         if (shape.frets[s][f] === 'X') {
                //             e.push(this.cross(this.props.strings - 1 - s));     // strings numbering [0] is lowest pitched
                //         } else {
                //             e.push(this.dot(this.props.strings - 1 - s, shape.frets[s][f], this.getText(s, f)));
                //         }
                //     }
                // }
            // }
            // TODO: throw error if not an array? invalid format error
        }
        return e;

    }

}
