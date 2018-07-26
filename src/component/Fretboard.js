import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import * as layout from "../utils/layout.js";
import * as svg from "../utils/svg.js";
import {currentLayout} from "../utils/layout";

const propTypes = {
    strings: PropTypes.number.isRequired,
    frets: PropTypes.number.isRequired
};

const defaultProps = {
    strings: 6,
    frets: 5
};

function getStringsPath(strings, frets) {

    console.log(`getStringsPath(${strings}, ${frets})`);

    // could be simplified with the syntax Array.apply(null, Array(N)).map(...)

    let stringLength = layout.stringLength(frets);

    let s = new Array(strings);
    for (let i=0; i<strings; i++) {
        s[i] = svg.horizontalLine(
            currentLayout.paddingLeft,                                      // X
            currentLayout.paddingTop + (i * currentLayout.stringInterval),  // Y
            stringLength);
    }
    return s.join(' ');
}

function getFretsPath(strings, frets) {

    let fretLength = layout.fretLength(strings);

    let f = Math.trunc(frets) + 1;  // +1 because we draw the fret 0

    let s = new Array(f);
    for (let i=0; i<f; i++) {
        s[i] = svg.verticalLine(
            currentLayout.paddingLeft + (i * currentLayout.fretInterval),   // X
            currentLayout.paddingTop,                                       // Y
            fretLength);
    }
    return s.join(' ');
}

function getFretsNumbers(strings, frets) {

    //TODO: allow to choose placement over of below the strings

    let f = Math.trunc(frets);

    let s = [];
    for (let i=0; i<f; i++) {
        s.push(<text key={i}
                     x={currentLayout.paddingLeft + ((i + 0.5) * currentLayout.fretInterval) + currentLayout.fretWidth / 2}
                     y={currentLayout.paddingTop - 1}
                     fontSize={currentLayout.fontSize}
                     className="fret-number">12</text>);
    }
    return <Fragment>{s}</Fragment>;

    // let i = 1;
    // return <text x={currentLayout.paddingLeft + (i * currentLayout.fretInterval)}
    //       y={currentLayout.paddingTop}
    //       className="small">12</text>
    //
    // var rows = [];
    // for (var i = 0; i < numrows; i++) {
    //     // note: we add a key prop here to allow react to uniquely identify each
    //     // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
    //     rows.push(<ObjectRow key={i} />);
    // }
    // return <tbody>{rows}</tbody>;

}

export default class Fretboard extends React.Component {

    render() {
        // let i = 1;
        return (
            <Fragment>
                <path fill="none" className="string" strokeWidth={currentLayout.stringWidth} d={getStringsPath(this.props.strings, this.props.frets)} />
                <path fill="none" className="fret" strokeWidth={currentLayout.fretWidth} d={getFretsPath(this.props.strings, this.props.frets)} />
                {getFretsNumbers(this.props.strings, this.props.frets)}
            </Fragment>
        );
    }

}

Fretboard.propTypes = propTypes;
Fretboard.defaultProps = defaultProps;
