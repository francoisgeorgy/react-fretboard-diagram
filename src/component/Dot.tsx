import React, {Fragment} from "react";
import {Interval, Note} from "tonal";

export interface DotProps {
    className: string,
    string: number,
    fret: number,
    text: string
}

export interface DotState {
}

export default class Dot extends React.Component<DotProps, DotState> {

    render() {

        let fill = 'white';
        let stroke = 'black';
        let dotStrokeColor = 'black';
        let textColor = 'black';

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
                <circle cx={this.x(fret)} cy={this.y(string)} r={this.props.diagramStyle.dotRadius}
                        className={`d n ${css}`}
                        strokeWidth={this.props.diagramStyle.dotStroke}
                        stroke={dotStrokeColor}
                        fill={fill} />
                <text x={this.x(fret)} y={this.y(string)}
                      alignmentBaseline="central"
                      className={`dt ${css}`}
                      textAnchor="middle"
                      fontSize={this.props.diagramStyle.fontSize}
                      fill={textColor}
                >{text}</text>
            </Fragment>
        );
    }

}
