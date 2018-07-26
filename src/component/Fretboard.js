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

    // could be simplified with the syntax Array.apply(null, Array(N)).map(...)

    let stringLength = layout.stringLength(frets);

    let s = new Array(strings);
    for (let i=0; i<strings; i++) {
        s[i] = svg.horizontalLine(currentLayout.paddingLeft, currentLayout.paddingTop + (i * currentLayout.stringInterval), stringLength);
    }
    return s.join(' ');
}

function getFretsPath(strings, frets) {

    let fretLength = layout.fretLength(strings);

    let s = new Array(strings);
    for (let i=0; i<strings; i++) {
        s[i] = svg.verticalLine(currentLayout.paddingLeft + (i * currentLayout.fretInterval), currentLayout.paddingTop, fretLength);
    }
    console.log('frets', s);
    return s.join(' ');
}

export default class Fretboard extends React.Component {

    render() {
        return (
            <Fragment>
                <path fill="none" className="string" strokeWidth={currentLayout.stringWidth} d={getStringsPath(this.props.strings, this.props.frets)} />
                <path fill="none" className="fret" strokeWidth={currentLayout.fretWidth} d={getFretsPath(this.props.strings, this.props.frets)} />
            </Fragment>
        );
    }

}

Fretboard.propTypes = propTypes;
Fretboard.defaultProps = defaultProps;
