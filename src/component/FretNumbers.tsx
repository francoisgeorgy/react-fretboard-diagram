import React from "react";
import {DiagramOptions, fretLength} from "../utils/options";
// import {arabToRoman} from "roman-numbers";

function arabToRoman(a: number): string {
    //TODO: implement arabToRoman()
    return a.toString(10);
}

export interface FretNumbersProps {
    strings: number;    // we need to know the number of strings to compute the height of the diagram (in case the numbers are at the bottom)
    fromFret: number;
    toFret: number;
    // only?:only number;
    position: "top"|"bottom";
    orientation: string;
    options: DiagramOptions;
}

// export interface FretNumbersState {
// }

export default class FretNumbers extends React.Component<FretNumbersProps> {

    render() {

        const opts = this.props.options;

        console.log("FretNumbers", this.props);

        // let frets = this.props.frets;
        // let startAt = this.props.startAt;

        //TODO: add option to display only odd (1, 3, 5, ...) or only "standard" (3, 5, 7, 9, 12, ...) numbers

        //TODO: allow to choose placement over of below the strings

        //FIXME: fret's text class



        const y = this.props.position === "top" ?
            opts.paddingHigh - opts.fretNumberDistance :
            opts.paddingHigh + fretLength(this.props.strings, opts) + opts.fretNumberDistance;

        let s = [];
        for (let i=0; i < (this.props.toFret - this.props.fromFret + 1); i++) {
            console.log("fret number position", i, opts.paddingHead + ((i + 0.5) * opts.fretInterval) + opts.fretWidth / 2, opts.paddingHigh - opts.fretNumberDistance);
            s.push(<text key={i}
                         x={opts.paddingHead + ((i + 0.5) * opts.fretInterval) + opts.fretWidth / 2}
                         y={y}
                         textAnchor="middle"
                         fontSize={opts.fretNumberFontSize}
                         fontFamily={opts.fretNumberFontFamily}
                         fill={opts.fretNumberColor}
                         // stroke={opts.fretNumberColor}
                         className="fretboard-fret-number">{arabToRoman(this.props.fromFret + i)}</text>);
        }

        return <g className="fretboard-fret-number-group">{s}</g>;

        // return <Fragment>{s}</Fragment>;

        // let i = 1;
        // return <text x={currentLayout.paddingHead + (i * currentLayout.fretInterval)}
        //       y={currentLayout.paddingHigh}
        //       className="small">12</text>
        //
        // var rows = [];
        // for (var i = 0; i < numrows; i++) {
        //     // note: we add a key prop here to allow react to uniquely identify each
        //     // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
        //     rows.push(<ObjectRow key={i} />);
        // }
        // return <tbody>{rows}</tbody>;

    }

}
