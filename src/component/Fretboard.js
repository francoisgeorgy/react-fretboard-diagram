import React from 'react';
import PropTypes from 'prop-types';

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

    let s = new Array(strings);
    for (let i=0; i<strings; i++) {
        s[i] = `M 0,${i} H 10`
    }
    return s.join(' ');
}

function getFretsPath(strings, frets) {
    return '';
}

export default class Fretboard extends React.Component {

    render() {

        let s = getStringsPath(this.props.strings, this.props.frets);
        console.log(s);

        return <div>fretboard with {this.props.strings} strings and {this.props.frets} frets.</div>
    }

}

Fretboard.propTypes = propTypes;
Fretboard.defaultProps = defaultProps;
