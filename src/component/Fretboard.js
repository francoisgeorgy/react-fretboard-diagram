import React from 'react';
import PropTypes from 'prop-types';
import * as layout from "../utils/layout.js";
import * as svg from "../utils/svg.js";

const propTypes = {
    strings: PropTypes.number.isRequired,
    frets: PropTypes.number.isRequired
};

const defaultProps = {
    strings: 6,
    frets: 5
};

function getStringsPath(strings, frets, fretExtra) {

    // could be simplified with the syntax Array.apply(null, Array(N)).map(...)

    let stringLength = layout.stringLength(frets, fretExtra);

    let s = new Array(strings);
    for (let i=0; i<strings; i++) {
        s[i] = svg.horizontalLine(layout.CONF.paddingRight, layout.CONF.paddingTop + (i * layout.CONF.stringInterval), stringLength);
    }
    return s.join(' ');
}

function getFretsPath(strings, frets) {

    //TODO: add stroke-width/2 to X coordinate

    let fretLength = layout.fretLength(strings);

    let s = new Array(strings);
    for (let i=0; i<strings; i++) {
        s[i] = svg.verticalLine(layout.CONF.paddingRight + (i * layout.CONF.fretInterval), layout.CONF.paddingTop, fretLength);
    }
    console.log('frets', s);
    return s.join(' ');
}

export default class Fretboard extends React.Component {

    render() {

        let s = getStringsPath(this.props.strings, this.props.frets, this.props.fretExtra) +
                ' ' +
                getFretsPath(this.props.strings, this.props.frets);

        console.log(s);

        return <path fill="none" stroke="black" strokeWidth={1} d={s} />;
    }

}

Fretboard.propTypes = propTypes;
Fretboard.defaultProps = defaultProps;
