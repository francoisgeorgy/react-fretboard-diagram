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
        const y = opts.paddingHigh + fretLength(this.props.strings, opts);
        return (
            <g>
                {/*this.props.fromFret > 2 &&
                <circle cx={this.x(fret)} cy={this.y(string)} r={this.props.diagramStyle.dotRadius}
                        className={`d n ${css}`}
                        strokeWidth={this.props.diagramStyle.dotStroke}
                        stroke={dotStrokeColor}
                        fill={fill} />
                */}
            </g>
        );
    }

}
