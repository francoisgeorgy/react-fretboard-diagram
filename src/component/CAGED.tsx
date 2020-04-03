import React, {Fragment} from "react";
import {DiagramOptions, fretLength, xMappingFunction, yMappingFunction} from "../utils/options";

export interface CAGEDProps {
    form: string;
    playedShape: any;   //TODO: rename simply as "shape"
    strings: number;
    // fromFret: number;
    // toFret: number;
    orientation: string;
    options: DiagramOptions;
    fretToX: xMappingFunction;
    stringToY: yMappingFunction;
}

export default class CAGED extends React.Component<CAGEDProps> {

    render() {

        const opts = this.props.options;

        const x0 = this.props.fretToX(this.props.playedShape.fromFret - 0.4);
        const x1 = this.props.fretToX(this.props.playedShape.toFret + 0.4);

        const y = opts.paddingHigh - opts.stringInterval / 1.9; // + fretLength(this.props.strings, opts) / 2;
        const h = opts.paddingHigh + fretLength(this.props.strings, opts) + opts.stringInterval / 4;

        const form = <rect
            x={x0}
            y={y}
            width={x1 - x0}
            height={h}
            rx="5"
            stroke={"#bbbbee"}
            strokeWidth={3}
            fill={"#ddddff"}
            opacity={0.4}/>;


        return form;

    }

}
