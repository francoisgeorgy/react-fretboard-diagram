import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import * as svg from "../utils/svg.js";

const propTypes = {
    strings: PropTypes.number.isRequired,
    frets: PropTypes.number.isRequired
};

const defaultProps = {
    strings: 6,
    frets: 5
};

export default class Fretboard extends React.Component {

    getStringsPath(strings, frets) {

        // console.log(`getStringsPath(${strings}, ${frets})`);

        // could be simplified with the syntax Array.apply(null, Array(N)).map(...)

        let stringLength = this.props.style.stringLength(frets);

        let s = new Array(strings);
        for (let i=0; i<strings; i++) {
            s[i] = svg.horizontalLine(
                this.props.style.paddingLeft,                                           // X
                this.props.style.paddingTop + (i * this.props.style.stringInterval),    // Y
                stringLength,
                this.props.style.stringWidth);  // FIXME: stringWidth or fretWidth ???
        }
        return s.join(' ');
    }

    getFretsPath(strings, frets) {

        let fretLength = this.props.style.fretLength(strings);

        let f = Math.trunc(frets) + 1;  // +1 because we draw the fret 0

        let s = new Array(f);
        for (let i=0; i<f; i++) {
            s[i] = svg.verticalLine(
                this.props.style.paddingLeft + (i * this.props.style.fretInterval), // X
                this.props.style.paddingTop,                                        // Y
                fretLength,
                this.props.style.fretWidth);    // FIXME: stringWidth or fretWidth ???
        }
        return s.join(' ');
    }

    getFretsNumbers(strings, frets, startAt) {

        //TODO: add option to display only odd (1, 3, 5, ...) or only "standard" (3, 5, 7, 9, 12, ...) numbers

        //TODO: allow to choose placement over of below the strings

        let f = Math.trunc(frets);

        let s = [];
        for (let i=0; i<f; i++) {
            s.push(<text key={i}
                         x={this.props.style.paddingLeft + ((i + 0.5) * this.props.style.fretInterval) + this.props.style.fretWidth / 2}
                         y={this.props.style.paddingTop - 5}
                         fontSize={this.props.style.fontSize}
                         className="fret-number">{startAt + i}</text>);
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


    render() {
        return (
            <Fragment>
                <path fill="none" className="string" strokeWidth={this.props.style.stringWidth} d={this.getStringsPath(this.props.strings, this.props.frets)} />
                <path fill="none" className="fret" strokeWidth={this.props.style.fretWidth} d={this.getFretsPath(this.props.strings, this.props.frets)} />
                {this.getFretsNumbers(this.props.strings, this.props.frets, 1)}
            </Fragment>
        );
    }

}

Fretboard.propTypes = propTypes;
Fretboard.defaultProps = defaultProps;