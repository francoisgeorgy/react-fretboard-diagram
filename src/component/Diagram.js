import React from 'react';
import Fretboard from "./Fretboard";
import Shape from "./Shape";
import PropTypes from "prop-types";
import * as layout from "../utils";
import DebugGrid from "./DebugGrid";


const propTypes = {
    layout: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    orientation: PropTypes.string,      // TODO: make bool instead?
    leftHanded: PropTypes.bool,
    strings: PropTypes.number.isRequired,
    frets: PropTypes.number.isRequired,
    shapes: PropTypes.array,
    debug: PropTypes.bool
};

const defaultProps = {
    layout: 'def',
    orientation: 'vertical',
    leftHanded: false,
    strings: 3,
    frets: 3.5,
    shapes: null,
    debug: false
};

export default class Diagram extends React.Component {

    render() {

        console.log('shapes', this.props.shapes);

        layout.setLayout(this.props.layout);

        let w = layout.width(this.props.frets);
        let h = layout.height(this.props.strings);

        let box = `0 0 ${w} ${h}`;          // viewBox = <min-x> <min-y> <width> <height>
        console.log(`${this.props.layout} : viewbox = ${box}`);

        return (
            <svg viewBox={box} xmlns="http://www.w3.org/2000/svg" style={{backgroundColor:"#eeeeee"}} preserveAspectRatio='xMinYMin meet' width='100%'>
                {this.props.debug && <DebugGrid />}
                <g>
                    <Fretboard {...this.props} />
                    {this.props.shapes &&
                    this.props.shapes.map(
                        (shape, index) => <Shape key={index} shape={shape} strings={this.props.strings} />
                    )}
                </g>
            </svg>
        )
    }

}

Diagram.propTypes = propTypes;
Diagram.defaultProps = defaultProps;
