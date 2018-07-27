import React, {Fragment} from 'react';
import {currentLayout} from "../utils/layout";
import PropTypes from "prop-types";
import Diagram from "./Diagram";

const propTypes = {
    shape: PropTypes.object.isRequired,
};

// const defaultProps = {
//     layout: 'def',
//     strings: 3,
//     frets: 3.5,
//     shapes: null,
//     debug: false
// };

function x(fret) {
    console.log(`x(${fret})`);
    return fret === 0
        ? currentLayout.paddingLeft - currentLayout.dotOut + currentLayout.fretWidth / 2
        : currentLayout.paddingLeft + ((fret - 1) * currentLayout.fretInterval) + (currentLayout.fretInterval - currentLayout.dotIn) + currentLayout.fretWidth / 2;

}

function y(string) {
    console.log(`y(${string})`);
    return currentLayout.paddingTop + (string * currentLayout.stringInterval) + currentLayout.stringWidth / 2;
}


const Dot = ({fret, string, text}) => (
    // see also dominantBaseline https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dominant-baseline
    <Fragment>
        <circle cx={x(fret)} cy={y(string)} r={currentLayout.dotRadius} className="dot" strokeWidth={currentLayout.dotStroke}/>
        <text x={x(fret)} y={y(string)} alignmentBaseline="central" fontSize={currentLayout.fontSize * 1.5} className="dot-number">{text}</text>
    </Fragment>
);


export default class Shape extends React.Component {

    render() {
        // console.log('shape', this.props.shape);
        return (
            <g>
                {this.props.shape.frets.map(
                    (fret, i) => <Dot fret={fret} string={5 - i} text={this.props.shape.intervals[i]} />
                )}
            </g>
        )
    }

}

Shape.propTypes = propTypes;
// Shape.defaultProps = defaultProps;
