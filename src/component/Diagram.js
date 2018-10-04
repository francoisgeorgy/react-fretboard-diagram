import React from 'react';
import Fretboard from "./Fretboard";
import Shape from "./Shape";
import PropTypes from "prop-types";
import DebugGrid from "./DebugGrid";
import DiagramStyle from "../utils/DiagramStyle";
import {Tuning, Shape as S, Fretboard as F} from "fretboard-api";
import FretNumbers from "./FretNumbers";
import {DOT_TEXT, FRET_NUMBER_FORMAT, FRET_NUMBER_POSITION, ORIENTATION} from "../options";
import {produce} from "immer";   //TODO: import API, and use API.Fretboard...

//TODO: allow strings prop to be able to display a subset of the strings, even if the tuning is for more strings.

const propTypes = {
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
    debug: PropTypes.bool
};

const defaultProps = {
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

    s = null;

    constructor(props) {
        // Required step: always call the parent class' constructor
        super(props);

        // Set the state directly. Use props if necessary.
        this.state = {
            frets: this.props.frets,
            tuning: this.props.tuning,
            shapes: this.props.shapes ? props.shapes.map(s => F.play(S.create(s))) : null,
            editedShape: null       // shape in edition
        }
    }


    /**
     *
     * @param string
     * @param fret
     */
    addDot = (string, fret) => {

        // console.log(`addDot(${string}, ${fret})`);

        let s = this.state.editedShape ? this.state.editedShape : S.create();

        // console.log(s, s.frets, Array.isArray(s.frets[string]) && s.frets[string].includes(fret));       // handle 'X'

        let shape;
        if (Array.isArray(s.frets[string]) && s.frets[string].includes(fret)) {
            shape = S.remove(s, string, fret)
        } else {
            shape = S.add(s, string, fret)
        }

        // console.log('addDot: shape', shape);
        //
        // let played = F.play(shape);
        //
        // console.log('addDot: played', played);

        this.setState(produce(draft => {
            draft.editedShape = F.play(shape)
        }));

    };

    /**
     *
     * @param e
     */
    editInPlace = (e) => {

        // console.log(`paddingTop=${this.s.paddingTop}, s=${this.props.strings}, interval=${this.s.stringInterval}, bottom=${this.s.paddingTop + ((this.props.strings - 1) * this.s.stringInterval)}`);

        // console.log('event', e.currentTarget, e.nativeEvent);
        // console.log(`(${e.clientX}, ${e.clientY}), (${e.nativeEvent.clientX}, ${e.nativeEvent.clientY})`);
        let svg = e.currentTarget.getBoundingClientRect();
        // console.log('targetRect', svg);
        // console.log(`targetRect: (${svg.width} ${svg.height}), ratio = ${svg.width/svg.height}`);

        let w = this.s.width(this.props.frets);
        let scale = svg.width / w;

        // console.log(`scale = ${svg.width} / ${w} = ${scale}`);

        let dx = e.clientX - svg.left;
        let dy = e.clientY - svg.top;

        // console.log(`delta=(${dx}, ${dy})`);
        // console.log(`dy / scale = ${dy / scale}`);

        let deltaY = dy / scale;

        if ((deltaY) < (this.s.paddingTop - (this.s.stringInterval / 2))) {
            // console.log('in padding top, ignore');
            return;
        }

        // console.log(`bottom limit = ${((svg.height / scale) - this.s.paddingBottom + (this.s.stringInterval / 2))}`);
        if ((deltaY) > ((svg.height / scale) - this.s.paddingBottom + (this.s.stringInterval / 2))) {
            // console.log('in padding bottom, ignore');
            return;
        }
        // if ((deltaY) > (this.s.paddingTop + ((this.props.strings - 1) * this.s.stringInterval) + this.s.stringWidth)) {
        //     console.log('in padding bottom, ignore');
        //     return
        // }

        let nString = Math.floor(((deltaY) - this.s.paddingTop - (this.s.stringWidth / 2)) / this.s.stringInterval + 0.5);
        if (nString < 0) nString = 0;
        if (nString >= this.props.strings) nString = this.props.strings - 1;

        // console.log(`((dy/scale) - paddingTop - stringWidth) / stringInterval = ${((deltaY) - this.s.paddingTop - (this.s.stringWidth / 2)) / this.s.stringInterval}; n string = ${nString}`);

        // fret

        let deltaX = dx / scale;

        if (deltaX < (this.s.paddingLeft - this.s.fretInterval + (this.s.fretWidth / 2))) {
            // console.log('in padding left, ignore');
            return;
        }

        if (deltaX > ((svg.width / scale) - this.s.paddingRight)) {
            // console.log('in padding right, ignore');
            return;
        }

        let nFret = Math.floor(((deltaX - this.s.paddingLeft - this.s.fretWidth) / this.s.fretInterval) + 1);
        if (nFret < 0) nFret = 0;
        // if (nFret >= this.props.frets) nFret = this.props.frets;
        if (nFret > this.props.frets) {
            return;
        }

        //console.log(`((dx/scale) - paddingLeft - fretWidth) / fretInterval = ${(deltaX - this.s.paddingLeft - (this.s.fretWidth / 2)) / this.s.fretInterval}; nFret fret = ${nFret}`);
        // console.log(deltaX, nString, nFret);

        this.addDot(this.state.tuning.length - nString - 1, nFret);

    };

    /**
     * https://twitter.com/dan_abramov/status/953612246634188800?lang=en
     * getDerivedStateFromProps() is being replaced by getDerivedStateFromProps()
     *
     * Note: initializing state from props is a bad idea in 95% cases because now it won’t update when props change. Just use props.
     *
     * @param props
     * @param state
     * @returns {*}
     */
    // static getDerivedStateFromProps(props, state) {
    //     console.log("getDerivedStateFromProps", props);
        // const { fretboard } = state;
        /*
        if (props.fretboard && props.fretboard !== null) {
            return {
                fretboard: props.fretboard
            }
        } else {
            console.log(`new fretboard with ${props.frets} frets`);
            let f = new F({tuning: props.tuning, frets: props.frets});  // build a default fretboard
            if (props.shapes) {
                for (const s of props.shapes) {
                    // console.log('adding', this.s);
                    f.addShape(s);
                }
            }
            return {
                fretboard: f
            }
        }
        */

        // const { currentRowIndex } = props;
        // const { lastRowIndex } = state;
        // if (currentRowIndex === lastRowIndex) {
        //     return null;
        // }
        // return {
        //     lastRowIndex: currentRowIndex,
        //     isScrollingDown: lastRowIndex > currentRowIndex
        // };
        // return {
        //     tuning: props.tuning,
        //     frets: props.frets,
        //     shapes: props.shapes ? props.shapes.map(s => F.play(S.create(s))) : null
        // };
    // }

    render() {

        // console.log('render', this.state);

        this.s = new DiagramStyle(this.props.diagramStyle);

        // console.log(this.state);

        let strings = this.state.tuning.length;
        let frets = this.state.frets;

        let w = this.s.width(frets);
        let h = this.s.height(strings);

        let box = `0 0 ${w} ${h}`;          // viewBox = <min-x> <min-y> <width> <height>

        // let {shapes, ...p} = this.props;    // !! ES7 stage-2 syntax

        return (
            <svg viewBox={box} xmlns="http://www.w3.org/2000/svg" style={{backgroundColor:"#eeeeee"}} preserveAspectRatio='xMinYMin meet' width='100%' onClick={this.editInPlace}>
                {this.props.debug && <DebugGrid />}
                <g>
                    <Fretboard strings={strings} frets={frets} diagramStyle={this.s} />
                    {this.state.shapes &&
                    this.state.shapes.map(
                        (shape, index) => <Shape key={index} shape={shape} strings={strings} diagramStyle={this.s} text={this.props.text} />
                    )}
                    {this.state.editedShape &&
                        <Shape key="dummy" shape={this.state.editedShape} strings={strings} diagramStyle={this.s} text={this.props.text} />
                    }
                    {(this.props.fretNumbers !== 'none') && <FretNumbers frets={frets} startAt={1} diagramStyle={this.s} />}
                </g>
            </svg>
        )
    }

}

Diagram.propTypes = propTypes;
Diagram.defaultProps = defaultProps;
