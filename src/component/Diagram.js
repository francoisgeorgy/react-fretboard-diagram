import React from 'react';
import Fretboard from "./Fretboard";
import Shape from "./Shape";
import PropTypes from "prop-types";
import * as layout from "../utils";
import DebugGrid from "./DebugGrid";


const propTypes = {
    layout: PropTypes.string,
    strings: PropTypes.number.isRequired,
    frets: PropTypes.number.isRequired
};

const defaultProps = {
    layout: 'def',
    strings: 3,
    frets: 3.5
};

export default class Diagram extends React.Component {

    render() {

        layout.setLayout(this.props.layout);

        let w = layout.width(this.props.frets);
        let h = layout.height(this.props.strings);

        let box = `0 0 ${w} ${h}`;          // viewBox = <min-x> <min-y> <width> <height>
        console.log(`${this.props.layout} : viewbox = ${box}`);

        return (
            <svg viewBox={box} xmlns="http://www.w3.org/2000/svg" style={{backgroundColor:"#eeeeee"}} preserveAspectRatio='xMinYMin meet' width='100%'>
                <DebugGrid />
                <g>
                    <Fretboard {...this.props} />
                    <Shape/>
                </g>
            </svg>
        )
    }

}

Diagram.propTypes = propTypes;
Diagram.defaultProps = defaultProps;
