import React from "react";
import Fretboard from "./Fretboard";
import Shape from "./Shape";
import DebugGrid from "./DebugGrid";
// import diagramOptions from "../utils/diagramOptions";
// import {Fretboard as F, Shape as S} from "fretboard-api/types/fretboard-api";
// import {Tuning, Shape as S, Fretboard as F} from "fretboard-api";
import * as FretboardAPI from "fretboard-api";
import FretNumbers from "./FretNumbers";
import ShapeHorizontal from "./ShapeHorizontal";
import ShapeVertical from "./ShapeVertical";
import {
    DEFAULT_DIAGRAM_OPTIONS,
    DiagramOptions,
    FretboardOptions, height,
    DotOptions, width,
    xMappingFunction, yMappingFunction
} from "../utils/options";

//TODO: allow strings prop to be able to display a subset of the strings, even if the tuning is for more strings.

export interface DiagramProps {     //TODO: define correct types
    tuning: any;
    frets: any;
    mouseClickHandler: any;
    mouseMoveHandler: any;
    className: any;
    orientation: string;
    text: any;
    leftHanded: any;
    stringsProportional: any;
    fretNumbers: any;
    fretNumbersPosition: any;
    shapes: any;
    debug: any;
    diagramOptions: DiagramOptions;
    dotOptions: DotOptions; // will be passed to the Shapes; will not be used by the Diagram itself.
}

export interface DiagramState {
    // style: diagramOptions
}

export default class Diagram extends React.Component<DiagramProps, DiagramState> {

    static defaultProps = {
        classname: '',
        orientation: 'horizontal',
        leftHanded: false,
        stringsProportional: false,
        frets: 4,
        fretNumbers: 'latin',
        fretNumbersPosition: 'top',
        text: 'note',
        tuning: FretboardAPI.Tuning.guitar.standard,
        // tuning: [],
        shapes: null,
        debug: false,
        diagramOptions: DEFAULT_DIAGRAM_OPTIONS,
        dotOptions: null,
        mouseClickHandler: null,
        mouseMoveHandler: null
};

    // constructor(props: DiagramProps) {
    //     super(props);
    //     this.state = {
    //         style: new diagramOptions(this.props.diagramOptions)
    //     }
    // }

    // s: any = null;   //TODO: get rid of this variable

    x: xMappingFunction = (fret: number): number => {
        return fret === 0
            ? this.props.diagramOptions.paddingHead - this.props.diagramOptions.dotOut + this.props.diagramOptions.fretWidth / 2
            : this.props.diagramOptions.paddingHead + ((fret - 1) * this.props.diagramOptions.fretInterval) + (this.props.diagramOptions.fretInterval - this.props.diagramOptions.dotIn) + this.props.diagramOptions.fretWidth / 2;
    };

    y: yMappingFunction = (string: number): number => {
        return this.props.diagramOptions.paddingHigh + (string * this.props.diagramOptions.stringInterval) + this.props.diagramOptions.stringWidth / 2;
    };

    getStringFretFromMouseEvent = (event: React.MouseEvent, strings: number, frets: number) => {

        const opts = this.props.diagramOptions;

        // console.log(`paddingHigh=${this.paddingHigh}, s=${this.props.strings}, interval=${this.stringInterval}, bottom=${this.paddingHigh + ((this.props.strings - 1) * this.stringInterval)}`);

        // console.log('event', event.currentTarget, event.nativeEvent);
        // console.log(`(${e.clientX}, ${e.clientY}), (${e.nativeEvent.clientX}, ${e.nativeEvent.clientY})`);
        let svg = event.currentTarget.getBoundingClientRect();
        // console.log('targetRect', svg);
        // console.log(`targetRect: (${svg.width} ${svg.height}), ratio = ${svg.width/svg.height}`);

        let w = width(frets, opts);
        let scale = svg.width / w;

        // console.log(`scale = ${svg.width} / ${w} = ${scale}`);

        let dx = event.clientX - svg.left;
        let dy = event.clientY - svg.top;

        // console.log(`delta=(${dx}, ${dy})`);
        // console.log(`dy / scale = ${dy / scale}`);

        let deltaY = dy / scale;

        if (deltaY < (opts.paddingHigh - (opts.stringInterval / 2))) {
            // console.log('in padding top, ignore');
            return null;
        }

        // console.log(`bottom limit = ${((svg.height / scale) - this.paddingLow + (this.stringInterval / 2))}`);
        if (deltaY > ((svg.height / scale) - opts.paddingLow + (opts.stringInterval / 2))) {
            // console.log('in padding bottom, ignore');
            return null;
        }
        // if ((deltaY) > (this.paddingHigh + ((strings - 1) * this.stringInterval) + this.stringWidth)) {
        //     console.log('in padding bottom, ignore');
        //     return
        // }

        let nString = Math.floor((deltaY - opts.paddingHigh - (opts.stringWidth / 2)) / opts.stringInterval + 0.5);
        if (nString < 0) nString = 0;
        if (nString >= strings) nString = strings - 1;

        // console.log(`((dy/scale) - paddingHigh - stringWidth) / stringInterval = ${((deltaY) - this.paddingHigh - (this.stringWidth / 2)) / this.stringInterval}; n string = ${nString}`);

        // fret

        let deltaX = dx / scale;

        if (deltaX < (opts.paddingHead - opts.fretInterval + (opts.fretWidth / 2))) {
            // console.log('in padding left, ignore');
            return null;
        }

        if (deltaX > ((svg.width / scale) - opts.paddingBody)) {
            // console.log('in padding right, ignore');
            return null;
        }

        let nFret = Math.floor(((deltaX - opts.paddingHead - opts.fretWidth) / opts.fretInterval) + 1);
        if (nFret < 0) nFret = 0;
        // if (nFret >= frets) nFret = frets;
        if (nFret > frets) {
            return null;
        }

        //console.log(`((dx/scale) - paddingHead - fretWidth) / fretInterval = ${(deltaX - opts.paddingHead - (opts.fretWidth / 2)) / opts.fretInterval}; nFret fret = ${nFret}`);
        // console.log(strings - nString - 1, nFret);

        // opts.addDot(opts.state.tuning.length - nString - 1, nFret);
        return {
            string: strings - nString - 1,
            fret: nFret
        }

    };

    onMouseClick = (e: React.MouseEvent) => {
        if (!this.props.mouseClickHandler || typeof this.props.mouseClickHandler !== "function") return;
        let sf = this.getStringFretFromMouseEvent(e, this.props.tuning.length, this.props.frets);
        if (!sf) return;
        this.props.mouseClickHandler(sf.string, sf.fret, e);
    };

    onMouseMove = (e: React.MouseEvent) => {
        if (!this.props.mouseMoveHandler || typeof this.props.mouseMoveHandler !== "function") return;
        let sf = this.getStringFretFromMouseEvent(e, this.props.tuning.length, this.props.frets);
        if (!sf) return;
        this.props.mouseMoveHandler(sf.string, sf.fret, e);
    };

    render() {

        // console.log('Diagram render', style, this.props.shapes);

        let strings = this.props.tuning.length;

        const w = width(this.props.frets, this.props.diagramOptions);
        const h = height(strings, this.props.diagramOptions);
        let box;
        switch (this.props.orientation) {
            case 'horizontal':
                box = `0 0 ${w} ${h}`;          // viewBox = <min-x> <min-y> <width> <height>
                break;
            case 'vertical':
                box = `0 0 ${h} ${w}`;          // viewBox = <min-x> <min-y> <width> <height>
                break;
            default:
                box = '0 0 0 0';    //TODO: throw an error
        }

        //FIXME: pass dotOptions to Shape

        return (
            <svg viewBox={box} xmlns="http://www.w3.org/2000/svg" style={{backgroundColor:"#eeeeee"}} preserveAspectRatio='xMinYMin meet' width='100%'
                 className={this.props.className} onClick={this.onMouseClick} onMouseMove={this.onMouseMove} >
                {this.props.debug && <DebugGrid />}
                <Fretboard strings={strings} frets={this.props.frets} orientation={this.props.orientation} diagramOptions={this.props.diagramOptions} />
                {
                    this.props.shapes &&
                    this.props.shapes.map((shape: any, index: number) =>
                        <ShapeHorizontal key={index}
                               shape={FretboardAPI.Fretboard.play(FretboardAPI.Shape.create(shape))}
                               strings={strings}
                               orientation={this.props.orientation}
                               text={this.props.text}
                               options={this.props.diagramOptions}
                               dotOptions={this.props.dotOptions}
                               fretToX={this.x} stringToY={this.y} />
                    )
                }
                {(this.props.fretNumbers !== 'none') &&
                <FretNumbers frets={this.props.frets} startAt={1} orientation={this.props.orientation} options={this.props.diagramOptions} />}
            </svg>
        )
    }

}
