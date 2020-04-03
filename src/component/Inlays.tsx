import React, {Fragment} from "react";
import {DiagramOptions, fretLength} from "../utils/options";

export interface InlaysProps {
    strings: number;
    fromFret: number;
    toFret: number;
    orientation: string;
    diagramOptions: DiagramOptions;
}

export default class Inlays extends React.Component<InlaysProps> {

    render() {
        const opts = this.props.diagramOptions;

        const y = opts.paddingHigh + fretLength(this.props.strings, opts) / 2;

        let s = [];
        for (let i=1; i <= (this.props.toFret - this.props.fromFret + 1); i++) {

            //FIXME: suppress the loop. Do it better.

            let x = opts.paddingHead + (((i-1) + 0.5) * opts.fretInterval) + opts.fretWidth / 2;

            if (i===3 || i===5 || i===7 || i===9 || i===15 || i===17 || i===19 || i===21) {

                s.push(
                    <circle key={i}
                            cx={x} cy={y} r={opts.inlaysRadius}
                            className="inlay"
                            strokeWidth={0}
                            // stroke="#aaa"
                            fill={opts.inlaysColor} />
                );

            } else if (i===12 || i===24) {
                s.push(
                    <circle key={`${i}.1`}
                            cx={x}
                            cy={y - opts.stringInterval}
                            r={opts.inlaysRadius}
                            className="inlay"
                            strokeWidth={0}
                        // stroke="#aaa"
                            fill={opts.inlaysColor} />
                );
                s.push(
                    <circle key={`${i}.2`}
                            cx={x}
                            cy={y + opts.stringInterval}
                            r={opts.inlaysRadius}
                            className="inlay"
                            strokeWidth={0}
                        // stroke="#aaa"
                            fill={opts.inlaysColor} />
                );
            } else {
                continue;
            }

/*
            console.log("fret number position", i, opts.paddingHead + ((i + 0.5) * opts.fretInterval) + opts.fretWidth / 2, opts.paddingHigh - opts.fretNumberDistance);

            let num = this.props.options.fretNumbersAlphabet === "arab" ? (this.props.fromFret + i) : arabToRoman(this.props.fromFret + i);

            s.push(<text key={i}
                         x={opts.paddingHead + ((i + 0.5) * opts.fretInterval) + opts.fretWidth / 2}
                         y={y}
                         textAnchor="middle"
                         fontSize={opts.fretNumberFontSize}
                         fontFamily={opts.fretNumberFontFamily}
                         fill={opts.fretNumberColor}
                // stroke={opts.fretNumberColor}
                         className="fretboard-inlay">{num}</text>);
*/
        }

        return s.length > 0 ? <g className="fretboard-inlays">{s}</g> : null;

    }

}
