import React, {Fragment} from "react";
import {Note} from "tonal";
// import {Humanizer} from "fretboard-api";
import DiagramStyle from "../utils/DiagramStyle";
import {ShapeType, Utils} from "fretboard-api";
import {ShapeProps, ShapeState} from "./Shape";
// import './Shape.css';

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
        diagramStyle: {},
        text: 'note'
    };

    // TODO: check that 'frets', 'intervals', 'fingers', ... arrays have the same structure and lengths.
    // --> should be done by the fretboard-api.

    x(fret: number) {
        return fret === 0
            ? this.props.diagramStyle.paddingHead - this.props.diagramStyle.dotOut + this.props.diagramStyle.fretWidth / 2
            : this.props.diagramStyle.paddingHead + ((fret - 1) * this.props.diagramStyle.fretInterval) + (this.props.diagramStyle.fretInterval - this.props.diagramStyle.dotIn) + this.props.diagramStyle.fretWidth / 2;
    }

    y(string: number) {
        return this.props.diagramStyle.paddingHigh + (string * this.props.diagramStyle.stringInterval) + this.props.diagramStyle.stringWidth / 2;
    }

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

    dot(string: number, fret: number, text: string) {

        let fill = 'white';
        let stroke = 'black';
        let dotStrokeColor = 'black';
        let textColor = 'black';

        switch (this.props.text) {
            case 'note':
                break;
            case 'interval':
                if (this.props.diagramStyle.colors.interval.hasOwnProperty(text)) {
                    // console.log(this.props.diagramStyle.colors.interval);
                    fill = this.props.diagramStyle.colors.interval[text].fill;
                    stroke = this.props.diagramStyle.colors.interval[text].stroke;
                    textColor = this.props.diagramStyle.colors.interval[text].rotate;
                }
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

        return (
            <Fragment key={`${string}.${fret}`}>
                <circle cx={this.x(fret)} cy={this.y(string)} r={this.props.diagramStyle.dotRadius}
                        className={`${this.props.className} fretboard-dot`}
                        strokeWidth={this.props.diagramStyle.dotStroke}
                        stroke={dotStrokeColor}
                        fill={fill} />
                <text x={this.x(fret)} y={this.y(string)} alignmentBaseline="central"
                      className={`${this.props.className} fretboard-dot-number`}
                      textAnchor="middle"
                      fontSize={this.props.diagramStyle.fontSize}
                      fill={textColor}>{text}</text>
            </Fragment>
        );
    }

    cross(string: number) {
        const x = this.x(0);
        const y = this.y(string);
        const w = this.props.diagramStyle.dotRadius * 0.75;
        return (
            <Fragment key={`${string}.X`}>
                <path stroke={this.props.diagramStyle.colors.cross} strokeWidth={this.props.diagramStyle.crossStroke} strokeLinecap="round"
                      d={`M${x-w},${y-w}L${x+w},${y+w}`} />
                <path stroke={this.props.diagramStyle.colors.cross} strokeWidth={this.props.diagramStyle.crossStroke} strokeLinecap="round"
                      d={`M${x+w},${y-w}L${x-w},${y+w}`} />
            </Fragment>
        );
    }

    render() {

        const shape = this.props.shape;

        let e = [];
        for (let s = 0; s < shape.frets.length; s++) {      // for each string
            const frets = shape.frets[s];
            if (frets == null) {
                // non-played string
                e.push(this.cross(this.props.strings - 1 - s));     // strings numbering [0] is lowest pitched
            } else {
                for (let f = 0; f < frets.length; f++) {
                    e.push(this.dot(this.props.strings - 1 - s, frets[f], this.getText(s, f)));
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
