import React from 'react';
import Fretboard from "./Fretboard";
import Shape from "./Shape";

export default class Diagram extends React.Component {

    render() {
        return (
            <div>
                diagram
                <Fretboard strings={6} frets={5} />
                <Shape/>
            </div>
        )
    }

/*
            <svg viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
                <rect x={this.props.x} y={this.props.y} width={this.props.w} height={this.props.h} style={{stroke:this.props.color, strokeWidth:"2", fill:"none"}} />
            </svg>
*/

}
