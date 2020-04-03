import React from "react";
import {DiagramOptions, fretLength} from "../utils/options";

export interface TuningProps {
    position: "left"|"right"|"top"|"bottom";
    orientation: string;
    options: DiagramOptions;
}

// export interface StringsNotesState {
// }

export default class Tuning extends React.Component<TuningProps> {

    render() {

        const opts = this.props.options;

        console.log("Tuning", this.props);

/*

        const y = this.props.position === "top" ?
            opts.paddingHigh - opts.fretNumberDistance :
            opts.paddingHigh + fretLength(this.props.strings, opts) + opts.fretNumberDistance;

        let s = [];
        for (let i=0; i < (this.props.toFret - this.props.fromFret + 1); i++) {
            console.log("string note position", i, opts.paddingHead + ((i + 0.5) * opts.fretInterval) + opts.fretWidth / 2, opts.paddingHigh - opts.fretNumberDistance);
            s.push(<text key={i}
                         x={opts.paddingHead + ((i + 0.5) * opts.fretInterval) + opts.fretWidth / 2}
                         y={y}
                         textAnchor="middle"
                         fontSize={opts.fretNumberFontSize}
                         fontFamily={opts.fretNumberFontFamily}
                         fill={opts.fretNumberColor}
                         // stroke={opts.fretNumberColor}
                         className="string-note">{i}</text>);
        }

        return <g className="fretboard-fret-number-group">{s}</g>;
*/
        return null;


    }

}
