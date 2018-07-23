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

export default class Fretboard extends React.Component {

    render() {
        return <div>fretboard with {this.props.strings} strings and {this.props.frets} frets.</div>
    }

}

Fretboard.propTypes = propTypes;
Fretboard.defaultProps = defaultProps;
