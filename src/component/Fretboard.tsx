import React, {Fragment} from "react";
import * as svg from "../utils/svg";
import DiagramStyle from "../utils/DiagramStyle";

export interface FretboardProps {
    strings: number;
    frets: number;
    diagramStyle: DiagramStyle;
}

export interface DiagramState {
}

export default class Fretboard extends React.Component<FretboardProps, DiagramState> {

    static defaultProps = {
        strings: 6,
        frets: 5
    };

    getStringsPath(strings: number, frets: number, orientation: string) {   //TODO: add orientation left handed, mirror, etc...

        console.log(`getStringsPath(${strings}, ${frets})`);

        // could be simplified with the syntax Array.apply(null, Array(N)).map(...)

        const S = this.props.diagramStyle;

        let stringLength = S.stringLength(frets);

        let s = new Array(strings);
        switch (orientation.toLowerCase()) {
            case 'horizontal':
                for (let i = 0; i < strings; i++) {
                    s[i] = svg.horizontalLine(
                        S.paddingHead,                                // X
                        S.paddingHigh + (i * S.stringInterval),    // Y
                        stringLength,
                        S.stringWidth);  // FIXME: stringWidth or fretWidth ???
                }
                break;
            case 'vertical':
                for (let i = 0; i < strings; i++) {
                    s[i] = svg.verticalLine(
                        S.paddingLow + (i * S.stringInterval),                                           // X
                        S.paddingHead,    // Y
                        stringLength,
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

        const S = this.props.diagramStyle;

        let fretLength = S.fretLength(strings);

        let f = Math.trunc(frets) + 1;  // +1 because we draw the fret 0

        let s = new Array(f);

        switch (orientation.toLowerCase()) {
            case 'horizontal':
                for (let i=0; i<f; i++) {
                    s[i] = svg.verticalLine(
                        S.paddingHead + (i * S.fretInterval), // X
                        S.paddingHigh,                                        // Y
                        fretLength,
                        S.fretWidth);    // FIXME: stringWidth or fretWidth ???
                }
                break;
            case 'vertical':
                for (let i=0; i<f; i++) {
                    s[i] = svg.horizontalLine(
                        S.paddingLow, // X
                        S.paddingHead + (i * S.fretInterval),   // Y
                        fretLength,
                        S.fretWidth);    // FIXME: stringWidth or fretWidth ???
                }
                break;
            default:
                console.warn("getStringsPath: invalid orientation", orientation);
                break;
        }

        return s.join(' ');
    }

    render() {
        console.log('Fretboard render', this.props.diagramStyle);
        return (
            <g>
                <path fill="none" strokeWidth={this.props.diagramStyle.stringWidth} className="fretboard-string"
                      d={this.getStringsPath(this.props.strings, this.props.frets, 'horizontal')} />
                <path fill="none" strokeWidth={this.props.diagramStyle.fretWidth} className="fretboard-fret"
                      d={this.getFretsPath(this.props.strings, this.props.frets, 'horizontal')} />
            </g>
        );
    }

}
