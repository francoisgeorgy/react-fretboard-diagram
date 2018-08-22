import React from 'react';
import Fretboard from "./Fretboard";
import Shape from "./Shape";
import PropTypes from "prop-types";
import DebugGrid from "./DebugGrid";
import DiagramStyle from "../utils/DiagramStyle";


const propTypes = {
    // layout: PropTypes.oneOfType([
    //     PropTypes.string,
    //     PropTypes.object
    // ]),
    diagramStyle: PropTypes.object,
    orientation: PropTypes.string,      // TODO: make bool instead?
    leftHanded: PropTypes.bool,
    strings: PropTypes.number.isRequired,
    frets: PropTypes.number.isRequired,
    shapes: PropTypes.array,
    debug: PropTypes.bool
};

const defaultProps = {
    diagramStyle: {},
    orientation: 'vertical',
    leftHanded: false,
    strings: 6,
    frets: 4,
    shapes: null,
    debug: false
};

export default class Diagram extends React.Component {

    render() {

        console.log('Diagram.render: shapes', this.props.shapes);

        let s = new DiagramStyle(this.props.diagramStyle);

        let w = s.width(this.props.frets);
        let h = s.height(this.props.strings);

        let box = `0 0 ${w} ${h}`;          // viewBox = <min-x> <min-y> <width> <height>

        let {shapes, ...p} = this.props;    // !! ES7 stage-2 syntax

        return (
            <svg viewBox={box} xmlns="http://www.w3.org/2000/svg" style={{backgroundColor:"#eeeeee"}} preserveAspectRatio='xMinYMin meet' width='100%'>
                {this.props.debug && <DebugGrid />}
                <g>
                    <Fretboard {...p} style={s} />
                    {shapes &&
                    shapes.map(
                        (shape, index) => <Shape key={index} shape={shape} strings={this.props.strings} style={s} />
                    )}
                </g>
            </svg>
        )
    }

}

Diagram.propTypes = propTypes;
Diagram.defaultProps = defaultProps;
