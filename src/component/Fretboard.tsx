import React from "react";
import * as svg from "../utils/svg";
import {DiagramOptions, fretLength, stringLength} from "../utils/options";

export interface FretboardProps {
    strings: number;
    frets: number;
    orientation: string;
    diagramOptions: DiagramOptions;
}

export interface DiagramState {
}

export default class Fretboard extends React.Component<FretboardProps, DiagramState> {

    static defaultProps = {
        strings: 6,
        frets: 5
    };

    getStringsPath(strings: number, frets: number, orientation: string) {   //TODO: add orientation left handed, mirror, etc...

        // console.log(`getStringsPath(${strings}, ${frets})`);

        // could be simplified with the syntax Array.apply(null, Array(N)).map(...)

        const S = this.props.diagramOptions;

        let stringLen = stringLength(frets, this.props.diagramOptions);

        let s = new Array(strings);
        switch (orientation.toLowerCase()) {
            case 'horizontal':
                for (let i = 0; i < strings; i++) {
                    s[i] = svg.horizontalLine(
                        S.paddingHead,                                // X
                        S.paddingHigh + (i * S.stringInterval),    // Y
                        stringLen,
                        S.stringWidth);  // FIXME: stringWidth or fretWidth ???
                }
                break;
            case 'vertical':
                for (let i = 0; i < strings; i++) {
                    s[i] = svg.verticalLine(
                        S.paddingLow + (i * S.stringInterval),                                           // X
                        S.paddingHead,    // Y
                        stringLen,
                        S.stringWidth);  // FIXME: stringWidth or fretWidth ???
                }
                break;
            default:
                console.warn("getStringsPath: invalid orientation", orientation);
                break;
        }
        return s.join(' ');
    }

    getFretsPath(strings: number, frets: number, orientation: string) {

        const opts = this.props.diagramOptions;

        let fLen = fretLength(strings, this.props.diagramOptions);

        let f = Math.trunc(frets) + 1;  // +1 because we draw the fret 0

        let s = new Array(f);

        switch (orientation.toLowerCase()) {
            case 'horizontal':
                for (let i=0; i<f; i++) {
                    s[i] = svg.verticalLine(
                        opts.paddingHead + (i * opts.fretInterval), // X
                        opts.paddingHigh,                                        // Y
                        fLen,
                        opts.fretWidth);    // FIXME: stringWidth or fretWidth ???
                }
                break;
            case 'vertical':
                for (let i=0; i<f; i++) {
                    s[i] = svg.horizontalLine(
                        opts.paddingLow, // X
                        opts.paddingHead + (i * opts.fretInterval),   // Y
                        fLen,
                        opts.fretWidth);    // FIXME: stringWidth or fretWidth ???
                }
                break;
            default:
                console.warn("getStringsPath: invalid orientation", orientation);
                break;
        }

        return s.join(' ');
    }

    render() {
        console.log('Fretboard render', this.props.diagramOptions);
        // We draw the strings on top of the frets.
        return (
            <g>
                <path fill="none" stroke="#444444" strokeWidth={this.props.diagramOptions.fretWidth} className="fretboard-fret"
                      d={this.getFretsPath(this.props.strings, this.props.frets, this.props.orientation)} />
                <path fill="none" stroke="#444444" strokeWidth={this.props.diagramOptions.stringWidth} className="fretboard-string"
                      d={this.getStringsPath(this.props.strings, this.props.frets, this.props.orientation)} />
            </g>
        );
    }

}
