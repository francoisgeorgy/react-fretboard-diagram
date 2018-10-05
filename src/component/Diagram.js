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
            editedShape: null,      // shape in edition
            overString: null,
            overFret: null,
            overShape: null
        }
    }


    /**
     *
     * @param string
     * @param fret
     */
    toggleDot = (string, fret) => {

        // console.log(`toggleDot(${string}, ${fret})`);

        let s = this.state.editedShape ? this.state.editedShape : S.create({frets:[], root:{string:0, fret:0}});

        let shape;
        if (Array.isArray(s.frets[string]) && s.frets[string].includes(fret)) {
            shape = S.remove(s, string, fret)
        } else {
            shape = S.add(s, string, fret)
        }

        this.setState(produce(draft => {
            draft.editedShape = F.play(shape)
        }));

    };

    /**
     *
     * @param e
     */

    editInPlace = (e) => {

        let sf = this.s.getStringFretFromMouseEvent(e, this.state.tuning.length, this.props.frets);

        if (!sf) return;

        this.toggleDot(sf.string, sf.fret);

    };


    /**
     *
     * @param string
     * @param fret
     */
    overDot = (string, fret) => {

        // console.log(`overDot(${string}, ${fret})`, this.state.overString, this.state.overFret);

        let shape = this.state.overShape ? this.state.overShape : S.create({frets:[], root:{string:0, fret:0}});

        if (this.state.overString !== null && this.state.overFret !== null) {
            shape = S.remove(shape, this.state.overString, this.state.overFret);
        }

        shape = S.add(shape, string, fret);

        this.setState(produce(draft => {
            draft.overString = string;
            draft.overFret = fret;
            draft.overShape = F.play(shape);
        }));

    };


    /**
     *
     * @param e
     */
    mouseMove = (e) => {

        let sf = this.s.getStringFretFromMouseEvent(e, this.state.tuning.length, this.props.frets);

        if (!sf) return;

        if (sf.string === this.state.overString && sf.fret === this.state.overFret) {
            return;
        }

        this.overDot(sf.string, sf.fret);

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
            <svg viewBox={box} xmlns="http://www.w3.org/2000/svg" style={{backgroundColor:"#eeeeee"}} preserveAspectRatio='xMinYMin meet' width='100%'
                 onClick={this.editInPlace}
                 onMouseMove={this.mouseMove}>
                {this.props.debug && <DebugGrid />}
                <g>
                    <Fretboard strings={strings} frets={frets} diagramStyle={this.s} />
                    {this.state.shapes &&
                    this.state.shapes.map(
                        (shape, index) => <Shape key={index} shape={shape} strings={strings} diagramStyle={this.s} text={this.props.text} />
                    )}
                    {this.state.editedShape &&
                        <Shape key="editshape" shape={this.state.editedShape} strings={strings} diagramStyle={this.s} text={this.props.text} />
                    }
                    {this.state.overShape &&
                        <Shape key="overshape" shape={this.state.overShape} strings={strings} diagramStyle={this.s} text={this.props.text} />
                    }
                    {(this.props.fretNumbers !== 'none') && <FretNumbers frets={frets} startAt={1} diagramStyle={this.s} />}
                </g>
            </svg>
        )
    }

}

Diagram.propTypes = propTypes;
Diagram.defaultProps = defaultProps;
