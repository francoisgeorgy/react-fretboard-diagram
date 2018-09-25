import React, {Fragment} from 'react';
import PropTypes from "prop-types";
import {Note} from "tonal";
import {Humanizer} from "fretboard-api";

const propTypes = {
    shape: PropTypes.object.isRequired,
    string: PropTypes.number,   // shape position
    fret: PropTypes.number,     // shape position
    diagramStyle: PropTypes.object,
    text: PropTypes.oneOf(['note', 'interval', 'finger', 'custom']),   // TODO: define "custom"
};

const defaultProps = {
    string: -1,
    fret: -1,
    diagramStyle: {},
    text: 'note'
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

    getText(string, fretIndex) {

        let t = '';
        let s = this.props.shape;

        switch (this.props.text) {
            case 'note':
                t = Note.pc(s.notes[string][fretIndex]);
                break;
            case 'note-octave':
                t = s.notes[string][fretIndex];
                break;
            case 'interval':
                t = Humanizer.intervalText(s.intervals[string][fretIndex]);
                break;
            case 'interval-compound':
                t = Humanizer.intervalText(s.intervals[string][fretIndex], true);
                break;
            case 'finger':
                if (s.hasOwnProperty('fingers')) t = s.fingers[string][fretIndex];
                break;
        }

        return t;
    }

    dot(string, fret, text) {

        let fill = 'white';
        let stroke = 'black';
        let dotStrokeColor = 'black';
        let textColor = 'black';

        switch (this.props.text) {
            case 'note':
                break;
            case 'interval':
                if (this.props.diagramStyle.colors.interval.hasOwnProperty(text)) {
                    // console.log(this.props.diagramStyle.colors.interval);
                    fill = this.props.diagramStyle.colors.interval[text].fill;
                    stroke = this.props.diagramStyle.colors.interval[text].stroke;
                    textColor = this.props.diagramStyle.colors.interval[text].text;
                }
                break;
            case 'interval-compound':
                if (this.props.diagramStyle.colors.interval.hasOwnProperty(text)) {
                    // console.log(this.props.diagramStyle.colors.interval);
                    fill = this.props.diagramStyle.colors.interval[text].fill;
                    stroke = this.props.diagramStyle.colors.interval[text].stroke;
                    textColor = this.props.diagramStyle.colors.interval[text].text;
                }
                break;
            case 'finger':
                break;
        }

        return (
            <Fragment key={`${string}.${fret}`}>
                <circle cx={this.x(fret)} cy={this.y(string)} r={this.props.diagramStyle.dotRadius} className="dot" strokeWidth={this.props.diagramStyle.dotStroke}
                        stroke={dotStrokeColor} fill={fill} />
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

    render() {

        let s = this.props.shape;

        let e = [];
        for (let i = 0; i < s.frets.length; i++) {      // for each string
            if (Array.isArray(s.frets[i])) {
                if (s.frets[i].length === 0) {          // non-played string
                    e.push(this.cross(this.props.strings - 1 - i));
                } else {
                    for (let k = 0; k < s.frets[i].length; k++) {
                        e.push(this.dot(this.props.strings - 1 - i, s.frets[i][k], this.getText(i, k)));
                    }
                }
            }

        }
        return e;

    }

}

Shape.propTypes = propTypes;
Shape.defaultProps = defaultProps;
