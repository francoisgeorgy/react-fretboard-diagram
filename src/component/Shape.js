import React, {Fragment} from 'react';
import {currentLayout} from "../utils/layout";
import PropTypes from "prop-types";
import Diagram from "./Diagram";
import Fretboard from "./Fretboard";

function x(fret) {
    // console.log(`x(${fret})`);
    return fret === 0
        ? currentLayout.paddingLeft - currentLayout.dotOut + currentLayout.fretWidth / 2
        : currentLayout.paddingLeft + ((fret - 1) * currentLayout.fretInterval) + (currentLayout.fretInterval - currentLayout.dotIn) + currentLayout.fretWidth / 2;

}

function y(string) {
    // console.log(`y(${string})`);
    return currentLayout.paddingTop + (string * currentLayout.stringInterval) + currentLayout.stringWidth / 2;
}


const Dot = ({fret, string, text}) => (
    // see also dominantBaseline https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dominant-baseline
    <Fragment>
        <circle cx={x(fret)} cy={y(string)} r={currentLayout.dotRadius} className="dot" strokeWidth={currentLayout.dotStroke}/>
        <text x={x(fret)} y={y(string)} alignmentBaseline="central" fontSize={currentLayout.fontSize * 1.5} className="dot-number">{text}</text>
    </Fragment>
);


const propTypes = {
    shape: PropTypes.object.isRequired,
    string: PropTypes.number,   // shape position
    fret: PropTypes.number      // shape position
};

const defaultProps = {
    string: -1,
    fret: -1
};

export default class Shape extends React.Component {

    // TODO: check that 'frets', 'intervals', 'fingers', ... arrays have the same structure and lengths.
    // --> should be done by the fretboard-api.


    render() {

        let s = this.props.shape;

        // TODO: add option to select which information to display inside the dots
        let texts = null;
        if (s.hasOwnProperty('intervals')) {
            texts = s.intervals;
        } else if (s.hasOwnProperty('fingers')) {
            texts = s.fingers;
        }

        let e = [];
        for (let i = 0; i < s.frets.length; i++) {
            if (Array.isArray(s.frets[i])) {
                for (let k = 0; k < s.frets[i].length; k++) {
                    e.push(<Dot key={`${i}_${k}`} fret={s.frets[i][k]} string={this.props.strings - 1 - i} text={texts ? texts[i][k] : ''} />);
                }
            } else {
                e.push(<Dot key={`_${i}`} fret={s.frets[i]} string={this.props.strings - 1 - i} text={texts ? texts[i] : ''} />);
            }
        }
        return e;
/*
        return (
            <g>
                {this.props.shape.frets.map(
                    (fret, i) => {
                        let t;
                        if (this.props.shape.hasOwnProperty('intervals')) {
                            t = this.props.shape.intervals[i];
                        } else if (this.props.shape.hasOwnProperty('fingers')) {
                            t = this.props.shape.fingers[i];
                        }
                        return <Dot fret={fret} string={this.props.strings - 1 - i} text={t} />
                    }
                )}
            </g>
        )
*/
    }

}

Shape.propTypes = propTypes;
Shape.defaultProps = defaultProps;
