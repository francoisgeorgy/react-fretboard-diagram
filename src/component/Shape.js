import React, {Fragment} from 'react';
import PropTypes from "prop-types";
import {Humanizer} from "fretboard-api";
import {Interval} from "tonal";

/*
const Dot = ({fret, string, text}) => (
    // see also dominantBaseline https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dominant-baseline
    <Fragment>
        <circle cx={x(fret)} cy={y(string)} r={currentLayout.dotRadius} className="dot" strokeWidth={currentLayout.dotStroke}/>
        <text x={x(fret)} y={y(string)} alignmentBaseline="central" fontSize={currentLayout.fontSize * 1.5} className="dot-number">{text}</text>
    </Fragment>
);
*/


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


    x(fret) {
        // console.log(`x(${fret})`);
        return fret === 0
            ? this.props.style.paddingLeft - this.props.style.dotOut + this.props.style.fretWidth / 2
            : this.props.style.paddingLeft + ((fret - 1) * this.props.style.fretInterval) + (this.props.style.fretInterval - this.props.style.dotIn) + this.props.style.fretWidth / 2;

    }

    y(string) {
        // console.log(`y(${string})`);
        return this.props.style.paddingTop + (string * this.props.style.stringInterval) + this.props.style.stringWidth / 2;
    }


    dot(string, fret, text) {
        let fill = 'white';
        let stroke = 'black';
        let textColor = 'black';
        if (this.props.style.colors.interval.hasOwnProperty(text)) {
            // console.log(this.props.style.colors.interval);
            fill = this.props.style.colors.interval[text].fill;
            stroke = this.props.style.colors.interval[text].stroke;
            textColor = this.props.style.colors.interval[text].text;
        }
        // console.log(text, fg, bg);

        return (
            <Fragment key={`${string}.${fret}`}>
                <circle cx={this.x(fret)} cy={this.y(string)} r={this.props.style.dotRadius} className="dot" strokeWidth={this.props.style.dotStroke}
                        stroke={stroke} fill={fill} />
                <text x={this.x(fret)} y={this.y(string)} alignmentBaseline="central" fontSize={this.props.style.fontSize * 1.5} className="dot-number"
                      fill={textColor}>{text}</text>
            </Fragment>
        );
    }

    cross(string) {
        return (
            <Fragment key={`${string}.X`}>
                <text x={this.x(0)} y={this.y(string)} alignmentBaseline="central" fontSize={this.props.style.fontSize * 1.5} className="dot-number">&#x2715;</text>
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
            // texts = s.intervals;
            // texts = s.chromas;
            texts = s.intervals;
        } else if (s.hasOwnProperty('fingers')) {
            texts = s.fingers;
        }

        console.log(`Shape.render: texts=${texts}`, texts);

        let e = [];
        for (let i = 0; i < s.frets.length; i++) {      // for each string

            console.log(`Shape.render: s.frets[${i}]`, s.frets[i]);

            if (Array.isArray(s.frets[i])) {

                console.log(`Shape.render: [${i}] is array`, s.frets[i].length);

                if (s.frets[i].length === 0) {

                    console.log(`Shape.render: [${i}] is NOT played`);

                    e.push(this.cross(this.props.strings - 1 - i));

                    // e.push(s.frets[i] < 0 ?
                    //     this.cross(this.props.strings - 1 - i) :
                    //     this.dot(this.props.strings - 1 - i, s.frets[i], texts ? texts[i] : ''));

                } else {

                    for (let k = 0; k < s.frets[i].length; k++) {
                        //e.push(<Dot key={`${i}_${k}`} fret={s.frets[i][k]} string={this.props.strings - 1 - i} text={texts ? texts[i][k] : ''} style={this.props.style} />);
                        e.push(this.dot(this.props.strings - 1 - i, s.frets[i][k], texts ? Humanizer.intervalSimple(texts[i][k]) : ''));
                    }
                }
            } /*else {

                console.log(`Shape.render: [${i}] is NOT array`);

                // e.push(<Dot key={`_${i}`} fret={s.frets[i]} string={this.props.strings - 1 - i} text={texts ? texts[i] : ''} style={this.props.style} />);
                e.push(s.frets[i] < 0 ?
                    this.cross(this.props.strings - 1 - i) :
                    this.dot(this.props.strings - 1 - i, s.frets[i], texts ? texts[i] : ''));
            }*/

        }
        return e;

    }

}

Shape.propTypes = propTypes;
Shape.defaultProps = defaultProps;
