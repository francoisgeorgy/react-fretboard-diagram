// @flow

import * as React from 'react';

type Props = {
    x: number,
    y: number,
    w: number,
    h: number,
    color: string
};

export default class Diagram extends React.Component<Props> {

    static defaultProps : {
        color: "blue"
    };

    render() {
        console.log(this.props);
        return (
            <svg viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
                <rect x={this.props.x} y={this.props.y} width={this.props.w} height={this.props.h} style={{stroke:this.props.color, strokeWidth:"2", fill:"none"}} />
            </svg>
        )
    }

}
