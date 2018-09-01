import React, {Fragment} from 'react';
import {arabToRoman} from "roman-numbers";

export default class FretNumbers extends React.Component {

    render() {

        let frets = this.props.frets;
        let startAt = this.props.startAt;

        //TODO: add option to display only odd (1, 3, 5, ...) or only "standard" (3, 5, 7, 9, 12, ...) numbers

        //TODO: allow to choose placement over of below the strings

        let y = this.props.diagramStyle.paddingTop - this.props.diagramStyle.fretNumberDistance;

        let f = Math.trunc(frets);

        let s = [];
        for (let i=0; i<f; i++) {
            s.push(<text key={i}
                         x={this.props.diagramStyle.paddingLeft + ((i + 0.5) * this.props.diagramStyle.fretInterval) + this.props.diagramStyle.fretWidth / 2}
                         y={y}
                         fontSize={this.props.diagramStyle.fretNumberFontSize}
                         stroke={this.props.diagramStyle.fretNumberColor}
                         className="fret-number">{arabToRoman(startAt + i)}</text>);
        }
        return <g>{s}</g>;
        // return <Fragment>{s}</Fragment>;

        // let i = 1;
        // return <text x={currentLayout.paddingLeft + (i * currentLayout.fretInterval)}
        //       y={currentLayout.paddingTop}
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