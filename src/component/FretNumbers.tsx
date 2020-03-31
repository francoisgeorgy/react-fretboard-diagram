import React from "react";
import {DiagramOptions} from "../utils/options";
// import {arabToRoman} from "roman-numbers";

function arabToRoman(a: number): string {
    //TODO: implement arabToRoman()
    return a.toString(10);
}

export interface FretNumbersProps {
    frets: number;
    startAt: number;
    orientation: string;
    options: DiagramOptions;
}

// export interface FretNumbersState {
// }

export default class FretNumbers extends React.Component<FretNumbersProps> {

    render() {

        const opts = this.props.options;

        let frets = this.props.frets;
        let startAt = this.props.startAt;

        //TODO: add option to display only odd (1, 3, 5, ...) or only "standard" (3, 5, 7, 9, 12, ...) numbers

        //TODO: allow to choose placement over of below the strings

        //FIXME: fret's text class

        let s = [];
        for (let i=0; i < Math.trunc(frets); i++) {
            s.push(<text key={i}
                         x={opts.paddingHead + ((i + 0.5) * opts.fretInterval) + opts.fretWidth / 2}
                         y={opts.paddingHigh - opts.fretNumberDistance}
                         fontSize={opts.fretNumberFontSize}
                         fontFamily={opts.fretNumberFontFamily}
                         fill={opts.fretNumberColor}
                         // stroke={opts.fretNumberColor}
                         className="fretboard-fret-number">{arabToRoman(startAt + i)}</text>);
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
