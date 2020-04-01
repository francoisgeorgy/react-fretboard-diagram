import React, {Fragment} from "react";

export interface InlaysProps {
    string: number,
    fret: number
}

export default class Inlays extends React.Component<InlaysProps> {

    render() {

        return (
            <Fragment key={`${string}.${fret}`}>
                {this.props.fret > 2 &&
                <circle cx={this.x(fret)} cy={this.y(string)} r={this.props.diagramStyle.dotRadius}
                        className={`d n ${css}`}
                        strokeWidth={this.props.diagramStyle.dotStroke}
                        stroke={dotStrokeColor}
                        fill={fill} />
                }
            </Fragment>
        );
    }

}
