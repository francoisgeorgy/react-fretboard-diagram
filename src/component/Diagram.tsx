import React from "react";
import Fretboard from "./Fretboard";
import Shape from "./Shape";
import DebugGrid from "./DebugGrid";
import DiagramStyle from "../utils/DiagramStyle";
// import {Fretboard as F, Shape as S} from "fretboard-api/types/fretboard-api";
// import {Tuning, Shape as S, Fretboard as F} from "fretboard-api";
import * as FretboardAPI from "fretboard-api";
import FretNumbers from "./FretNumbers";
// import {Tuning} from "fretboard-api";
// import {DOT_TEXT, FRET_NUMBER_FORMAT, FRET_NUMBER_POSITION, ORIENTATION} from "../options";

//TODO: allow strings prop to be able to display a subset of the strings, even if the tuning is for more strings.

/*
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
*/

export interface DiagramProps {
    tuning: any;
    frets: any;
    diagramStyle: any;
    mouseClickHandler: any;
    mouseMoveHandler: any;
    className: any;
    orientation: any;
    text: any;
    leftHanded: any;
    stringsProportional: any;
    fretNumbers: any;
    fretNumbersPosition: any;
    shapes: any;
    debug: any;
}

export interface DiagramState {
    style: DiagramStyle
}

export default class Diagram extends React.Component<DiagramProps, DiagramState> {

    static defaultProps = {
        classname: '',
        diagramStyle: {},
        orientation: 'vertical',
        leftHanded: false,
        stringsProportional: false,
        frets: 4,
        fretNumbers: 'latin',
        fretNumbersPosition: 'top',
        text: 'note',
        tuning: FretboardAPI.Tuning.guitar.standard,
        // tuning: [],
        shapes: null,
        debug: false
    };

    constructor(props: DiagramProps) {
        super(props);
        this.state = {
            style: new DiagramStyle(this.props.diagramStyle)
        }
    }

    // s: any = null;   //TODO: get rid of this variable

    onMouseClick = (e: React.MouseEvent) => {
        if (typeof this.props.mouseClickHandler !== "function") return;
        let sf = this.state.style.getStringFretFromMouseEvent(e, this.props.tuning.length, this.props.frets);
        if (!sf) return;
        this.props.mouseClickHandler(sf.string, sf.fret, e);
    };

    onMouseMove = (e: React.MouseEvent) => {
        if (typeof this.props.mouseMoveHandler !== "function") return;
        let sf = this.state.style.getStringFretFromMouseEvent(e, this.props.tuning.length, this.props.frets);
        if (!sf) return;
        this.props.mouseMoveHandler(sf.string, sf.fret, e);
    };

    render() {
        const {style} = this.state;
        console.log('Diagram render', style, this.props.shapes);
        let strings = this.props.tuning.length;
        let w = style.width(this.props.frets);
        let h = style.height(strings);
        let box = `0 0 ${w} ${h}`;          // viewBox = <min-x> <min-y> <width> <height>
        // let {shapes, ...p} = this.props;    // !! ES7 stage-2 syntax
        // return <h1>Diagram</h1>;
        return (
            <svg viewBox={box} xmlns="http://www.w3.org/2000/svg" style={{backgroundColor:"#eeeeee"}} preserveAspectRatio='xMinYMin meet' width='100%'
                 className={this.props.className} onClick={this.onMouseClick} onMouseMove={this.onMouseMove} >
                {this.props.debug && <DebugGrid />}
                <g className="fretboard-group">
                    <Fretboard strings={strings} frets={this.props.frets} diagramStyle={style} />
                    {
                        this.props.shapes &&
                        this.props.shapes.map(
                            (shape: any, index: number) => <Shape key={index} shape={FretboardAPI.Fretboard.play(FretboardAPI.Shape.create(shape))}
                                                                  strings={strings} diagramStyle={style} text={this.props.text} />
                        )
                    }
                    {(this.props.fretNumbers !== 'none') && <FretNumbers frets={this.props.frets} startAt={1} diagramStyle={this.state.style} />}
                </g>
            </svg>
        )
    }

}
