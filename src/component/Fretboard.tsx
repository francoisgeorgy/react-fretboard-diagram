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

    getStringsPath(strings: number, frets: number) {

        console.log(`getStringsPath(${strings}, ${frets})`);

        // could be simplified with the syntax Array.apply(null, Array(N)).map(...)

        let stringLength = this.props.diagramStyle.stringLength(frets);

        let s = new Array(strings);
        for (let i=0; i<strings; i++) {
            s[i] = svg.horizontalLine(
                this.props.diagramStyle.paddingLeft,                                           // X
                this.props.diagramStyle.paddingTop + (i * this.props.diagramStyle.stringInterval),    // Y
                stringLength,
                this.props.diagramStyle.stringWidth);  // FIXME: stringWidth or fretWidth ???
        }
        return s.join(' ');
    }

    getFretsPath(strings: number, frets: number) {

        let fretLength = this.props.diagramStyle.fretLength(strings);

        let f = Math.trunc(frets) + 1;  // +1 because we draw the fret 0

        let s = new Array(f);
        for (let i=0; i<f; i++) {
            s[i] = svg.verticalLine(
                this.props.diagramStyle.paddingLeft + (i * this.props.diagramStyle.fretInterval), // X
                this.props.diagramStyle.paddingTop,                                        // Y
                fretLength,
                this.props.diagramStyle.fretWidth);    // FIXME: stringWidth or fretWidth ???
        }
        return s.join(' ');
    }

    render() {
        console.log('Fretboard render', this.props.diagramStyle);
        return (
            <Fragment>
                <path fill="none" strokeWidth={this.props.diagramStyle.stringWidth} className="fretboard-string" d={this.getStringsPath(this.props.strings, this.props.frets)} />
                <path fill="none" strokeWidth={this.props.diagramStyle.fretWidth} className="fretboard-fret" d={this.getFretsPath(this.props.strings, this.props.frets)} />
            </Fragment>
        );
    }

}
