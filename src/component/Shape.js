import React, {Fragment} from 'react';
import PropTypes from "prop-types";
import {Humanizer} from "fretboard-api";
import {Interval} from "tonal";


const propTypes = {
    shape: PropTypes.object.isRequired,
    string: PropTypes.number,   // shape position
    fret: PropTypes.number,     // shape position
    diagramStyle: PropTypes.object
};

const defaultProps = {
    string: -1,
    fret: -1,
    diagramStyle: {}
};

export default class Shape extends React.Component {

    // TODO: check that 'frets', 'intervals', 'fingers', ... arrays have the same structure and lengths.
    // --> should be done by the fretboard-api.

    x(fret) {
        return fret === 0
            ? this.props.diagramStyle.paddingLeft - this.props.diagramStyle.dotOut + this.props.diagramStyle.fretWidth / 2
            : this.props.diagramStyle.paddingLeft + ((fret - 1) * this.props.diagramStyle.fretInterval) + (this.props.diagramStyle.fretInterval - this.props.diagramStyle.dotIn) + this.props.diagramStyle.fretWidth / 2;
    }

    y(string) {
        return this.props.diagramStyle.paddingTop + (string * this.props.diagramStyle.stringInterval) + this.props.diagramStyle.stringWidth / 2;
    }

    dot(string, fret, text) {
        let fill = 'white';
        let stroke = 'black';
        let textColor = 'black';
        if (this.props.diagramStyle.colors.interval.hasOwnProperty(text)) {
            // console.log(this.props.diagramStyle.colors.interval);
            fill = this.props.diagramStyle.colors.interval[text].fill;
            stroke = this.props.diagramStyle.colors.interval[text].stroke;
            textColor = this.props.diagramStyle.colors.interval[text].text;
        }

        return (
            <Fragment key={`${string}.${fret}`}>
                <circle cx={this.x(fret)} cy={this.y(string)} r={this.props.diagramStyle.dotRadius} className="dot" strokeWidth={this.props.diagramStyle.dotStroke}
                        stroke={stroke} fill={fill} />
                <text x={this.x(fret)} y={this.y(string)} alignmentBaseline="central" fontSize={this.props.diagramStyle.fontSize * 1.5} className="dot-number"
                      fill={textColor}>{text}</text>
            </Fragment>
        );
    }

    cross(string) {
        return (
            <Fragment key={`${string}.X`}>
                <text x={this.x(0)} y={this.y(string)} alignmentBaseline="central" fontSize={this.props.diagramStyle.fontSize * 1.5} className="dot-number">&#x2715;</text>
            </Fragment>
        );
    }
/*
    label(shape, string, fret) {
        let texts = null;
        if (s.hasOwnProperty('intervals')) {
            texts = s.intervals;
        } else if (s.hasOwnProperty('fingers')) {
            texts = s.fingers;
        }
        texts ? texts[i][k] : ''
    }
    */

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
        for (let i = 0; i < s.frets.length; i++) {      // for each string
            if (Array.isArray(s.frets[i])) {
                if (s.frets[i].length === 0) {          // non-played string
                    e.push(this.cross(this.props.strings - 1 - i));
                } else {
                    for (let k = 0; k < s.frets[i].length; k++) {
                        e.push(this.dot(this.props.strings - 1 - i, s.frets[i][k], texts ? Humanizer.intervalSimple(texts[i][k]) : ''));
                    }
                }
            }

        }
        return e;

    }

}

Shape.propTypes = propTypes;
Shape.defaultProps = defaultProps;
