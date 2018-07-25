import React from 'react';
import Fretboard from "./Fretboard";
import Shape from "./Shape";
import PropTypes from "prop-types";
import * as layout from "../utils";

/*
    Fretboard size:

    length = padding-left + (fret-gap * frets) + fret-extra + padding-right
    height = padding-top + (string-gap * (strings - 1)) + padding-bottom


*/


const propTypes = {
    strings: PropTypes.number.isRequired,
    frets: PropTypes.number.isRequired,
    fretExtra: PropTypes.bool
};

const defaultProps = {
    strings: 6,
    frets: 5,
    fretExtra: false
};

export default class Diagram extends React.Component {

    render() {

        let w = layout.width(this.props.frets, this.props.fretExtra);
        let h = layout.height(this.props.strings);

        let box = `0 0 ${w} ${h}`;          // viewBox = <min-x> <min-y> <width> <height>
        console.log(`viewbox = ${box}`);

        return (
            <svg viewBox={box} xmlns="http://www.w3.org/2000/svg" style={{backgroundColor:"#eeeeee"}} preserveAspectRatio='xMinYMin meet' width='100%'>
                <g>
                    <Fretboard {...this.props} />
                    {/*<Shape/>*/}
                </g>
            </svg>
        )
    }

/*
            <svg viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
                <rect x={this.props.x} y={this.props.y} width={this.props.w} height={this.props.h} style={{stroke:this.props.color, strokeWidth:"2", fill:"none"}} />
            </svg>
*/

}

Diagram.propTypes = propTypes;
Diagram.defaultProps = defaultProps;
