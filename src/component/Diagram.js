import React from 'react';
import Fretboard from "./Fretboard";
import Shape from "./Shape";
import PropTypes from "prop-types";
import DebugGrid from "./DebugGrid";
import DiagramStyle from "../utils/DiagramStyle";
import {Tuning, Shape as S, Fretboard as F} from "fretboard-api";
import FretNumbers from "./FretNumbers";
import {DOT_TEXT, FRET_NUMBER_FORMAT, FRET_NUMBER_POSITION, ORIENTATION} from "../options";

//TODO: allow strings prop to be able to display a subset of the strings, even if the tuning is for more strings.

const propTypes = {
    classname: PropTypes.string,
    diagramStyle: PropTypes.object,
    orientation: PropTypes.oneOf(ORIENTATION),   // TODO: make bool instead?
    text: PropTypes.oneOf(DOT_TEXT),   // TODO: define "custom"
    leftHanded: PropTypes.bool,
    stringsProportional: PropTypes.bool,        // if true will draw strings with prop widths
    frets: PropTypes.number.isRequired,
    fretNumbers: PropTypes.oneOf(FRET_NUMBER_FORMAT),
    fretNumbersPosition: PropTypes.oneOf(FRET_NUMBER_POSITION),   // left, right only when vertical orientation
    tuning: PropTypes.array,
    shapes: PropTypes.array,
    debug: PropTypes.bool,
    mouseClickHandler: PropTypes.func,
    mouseMoveHandler: PropTypes.func
};

const defaultProps = {
    classname: '',
    diagramStyle: {},
    orientation: 'vertical',
    leftHanded: false,
    stringsProportional: false,
    frets: 4,
    fretNumbers: 'latin',
    fretNumbersPosition: 'top',
    text: 'note',
    tuning: Tuning.guitar.standard,
    shapes: null,
    debug: false
};


export default class Diagram extends React.Component {

    s = null;   //TODO: get rid of this variable


    /**
     *
     * @param e
     */
    onMouseClick = (e) => {

        if (typeof this.props.mouseClickHandler !== "function") return;

        let sf = this.s.getStringFretFromMouseEvent(e, this.props.tuning.length, this.props.frets);

        if (!sf) return;

        this.props.mouseClickHandler(sf.string, sf.fret, e);

    };


    /**
     *
     * @param e
     */
    onMouseMove = (e) => {

        if (typeof this.props.mouseMoveHandler !== "function") return;

        let sf = this.s.getStringFretFromMouseEvent(e, this.props.tuning.length, this.props.frets);

        if (!sf) return;

        this.props.mouseMoveHandler(sf.string, sf.fret, e);

    };


    /**
     *
     * @returns {*}
     */
    render() {

        // console.log('Diagram render', this.props.shapes);

        this.s = new DiagramStyle(this.props.diagramStyle);

        let strings = this.props.tuning.length;
        let w = this.s.width(this.props.frets);
        let h = this.s.height(strings);
        let box = `0 0 ${w} ${h}`;          // viewBox = <min-x> <min-y> <width> <height>

        // let {shapes, ...p} = this.props;    // !! ES7 stage-2 syntax

        return (
            <svg viewBox={box} xmlns="http://www.w3.org/2000/svg" style={{backgroundColor:"#eeeeee"}} preserveAspectRatio='xMinYMin meet' width='100%'
                 className={this.props.className} onClick={this.onMouseClick} onMouseMove={this.onMouseMove} >
                {this.props.debug && <DebugGrid />}
                <g className="fretboard-group">
                    <Fretboard strings={strings} frets={this.props.frets} diagramStyle={this.s} />
                    {
                        this.props.shapes &&
                        this.props.shapes.map(
                            (s, index) => <Shape key={index} shape={F.play(S.create(s))} strings={strings} diagramStyle={this.s} text={this.props.text} />
                        )
                    }
                    {(this.props.fretNumbers !== 'none') && <FretNumbers frets={this.props.frets} startAt={1} diagramStyle={this.s} />}
                </g>
            </svg>
        )
    }

}

Diagram.propTypes = propTypes;
Diagram.defaultProps = defaultProps;
