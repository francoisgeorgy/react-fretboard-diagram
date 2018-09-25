import React from 'react';
import Fretboard from "./Fretboard";
import Shape from "./Shape";
import PropTypes from "prop-types";
import DebugGrid from "./DebugGrid";
import DiagramStyle from "../utils/DiagramStyle";
import {Fretboard as F, Shape as S} from "fretboard-api";
import FretNumbers from "./FretNumbers";   //TODO: import API, and use API.Fretboard...

const propTypes = {
    diagramStyle: PropTypes.object,
    orientation: PropTypes.oneOf(['vertical', 'horizontal']),   // TODO: make bool instead?
    text: PropTypes.oneOf([
        'note',
        'note-octave',
        'interval',             // M10 --> M3
        'interval-compound',    // M10 --> M10 (no simplification)
        'finger',
        'custom']),   // TODO: define "custom"
    leftHanded: PropTypes.bool,
    strings: PropTypes.number.isRequired,
    stringsProportional: PropTypes.bool,        // if true will draw strings with prop widths
    frets: PropTypes.number.isRequired,
    fretNumbers: PropTypes.oneOf(['none', 'latin', 'roman']),
    fretNumbersPosition: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),   // left, right only when vertical orientation
    shapes: PropTypes.array,
    debug: PropTypes.bool
};

const defaultProps = {
    diagramStyle: {},
    orientation: 'vertical',
    leftHanded: false,
    strings: 6,
    stringsProportional: false,
    frets: 4,
    fretNumbers: 'latin',
    fretNumbersPosition: 'top',
    text: 'note',
    shapes: null,
    debug: false
};

export default class Diagram extends React.Component {

    render() {

        console.log('Diagram.render: fretboard', this.props.fretboard);
        console.log('Diagram.render: shapes', this.props.shapes);

        let s = new DiagramStyle(this.props.diagramStyle);

        let strings = this.props.strings;
        let frets = this.props.frets;
        let f;

        if (this.props.fretboard) {
            f = this.props.fretboard;
            strings = f.tuning.length;
            frets = f.maxFret - f.minFret;
        } else {
            f = new F({frets: frets});  // build a default fretboard
            if (this.props.shapes) {
                for (const s of this.props.shapes) {
                    console.log('adding', s);
                    f.addShape(s);
                }
            }
        }

        let w = s.width(frets);
        let h = s.height(strings);

        let box = `0 0 ${w} ${h}`;          // viewBox = <min-x> <min-y> <width> <height>

        // let {shapes, ...p} = this.props;    // !! ES7 stage-2 syntax

        return (
            <svg viewBox={box} xmlns="http://www.w3.org/2000/svg" style={{backgroundColor:"#eeeeee"}} preserveAspectRatio='xMinYMin meet' width='100%'>
                {this.props.debug && <DebugGrid />}
                <g>
                    <Fretboard strings={strings} frets={frets} diagramStyle={s} />
                    {f.shapes &&
                    f.shapes.map(
                        (shape, index) => <Shape key={index} shape={shape} strings={strings} diagramStyle={s} text={this.props.text} />
                    )}
                    {(this.props.fretNumbers !== 'none') && <FretNumbers frets={frets} startAt={1} diagramStyle={s} />}
                </g>
            </svg>
        )
    }

}

Diagram.propTypes = propTypes;
Diagram.defaultProps = defaultProps;
