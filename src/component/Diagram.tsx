import React from "react";
import Fretboard from "./Fretboard";
import DebugGrid from "./DebugGrid";
import * as FretboardAPI from "fretboard-api";
import FretNumbers from "./FretNumbers";
import ShapeHorizontal from "./ShapeHorizontal";
import {
    DiagramOptions,
    height,
    DotOptions, width,
    xMappingFunction, yMappingFunction
} from "../utils/options";
import {DIAGRAM_DEFAULTS, DOT_DEFAULTS_BW} from "../options/presentation";
import Inlays from "./Inlays";

//TODO: allow strings prop to be able to display a subset of the strings, even if the tuning is for more strings.

export interface DiagramProps {
    className: any;             //FIXME: replace any type by correct type
    orientation: string;
    tuning: any;                //FIXME: replace any type by correct type
    frets: string;             // "<total>"|"<from>,auto"|"auto,<to>"|"<from>,<to>"|"auto"|
    // text: any;
    leftHanded: any;            //FIXME: replace any type by correct type
    // stringsProportional: any;
    // fretNumbers: any;
    shapes: any;                //FIXME: replace any type by correct type
    shapesDotOptions: any;      //FIXME: replace any type by correct type
    diagramOptions: DiagramOptions;
    dotOptions: DotOptions; // will be passed to the Shapes; will not be used by the Diagram itself.
    // fretNumbersPosition: any;
    mouseClickHandler: any;     //FIXME: replace any type by correct type
    mouseMoveHandler: any;      //FIXME: replace any type by correct type
    debug: any;                 //FIXME: replace any type by correct type
}

/*
export interface DiagramState {
    // style: diagramOptions
}
*/

export class Diagram extends React.Component<DiagramProps> {

    static defaultProps = {
        classname: '',
        orientation: 'horizontal',
        leftHanded: false,
        stringsProportional: false,
        frets: "auto",
        // fretNumbers: 'latin',
        // fretNumbersPosition: 'top',
        // text: 'note',
        tuning: FretboardAPI.Tuning.guitar.standard,
        // tuning: [],
        shapes: null,
        shapesDotOptions: null,
        debug: false,
        // diagramOptions: DEFAULT_DIAGRAM_OPTIONS,
        diagramOptions: null,   // defaults will be assigned in render
        dotOptions: DOT_DEFAULTS_BW,
        mouseClickHandler: null,
        mouseMoveHandler: null
    };

    private readonly dOpt: any;                 //FIXME: replace any type by correct type
    private readonly playedShapes: any;         //FIXME: replace any type by correct type
    private readonly fromFret: number;          //FIXME: replace any type by correct type
    private readonly toFret: number;            //FIXME: replace any type by correct type

    constructor(props: DiagramProps) {
        super(props);
    //     this.state = {
    //         style: new diagramOptions(this.props.diagramOptions)
    //     }

        this.dOpt = Object.assign({}, DIAGRAM_DEFAULTS);
        if (this.props.diagramOptions) {
            Object.assign(this.dOpt, this.props.diagramOptions);
        }

        // PLAY THE SHAPES
        // TODO: consider to move this into the component's state
        if (this.props.shapes) {

            this.playedShapes = this.props.shapes.map(shape => FretboardAPI.Fretboard.play(FretboardAPI.Shape.create(shape)));

            console.log("Diagram constructor play the shapes", this.playedShapes, this.playedShapes[0].fromFret);

            // Determine the frets to display
            //FIXME: replace any type by correct type
            this.fromFret = this.playedShapes.reduce((acc: number, cur: any) => cur.fromFret < acc ? cur.fromFret : acc, this.playedShapes[0].fromFret);
            this.toFret = this.playedShapes.reduce((acc: number, cur: any) => cur.toFret > acc ? cur.toFret : acc, this.playedShapes[0].toFret);

        } else {
            this.playedShapes = null;
            this.fromFret = 0;
            this.toFret = 12;   //TODO: define to,from fret defaults
        }

        console.log("Diagram constructor", this.fromFret, this.toFret);
    }

    // s: any = null;   //TODO: get rid of this variable

    x: xMappingFunction = (fret: number): number => {
        return fret === 0
            ? this.dOpt.paddingHead - this.dOpt.dotOut + this.dOpt.fretWidth / 2
            : this.dOpt.paddingHead + ((fret - 1) * this.dOpt.fretInterval) + (this.dOpt.fretInterval - this.dOpt.dotIn) + this.dOpt.fretWidth / 2;
    };

    y: yMappingFunction = (string: number): number => {
        return this.dOpt.paddingHigh + (string * this.dOpt.stringInterval) + this.dOpt.stringWidth / 2;
    };

    getStringFretFromMouseEvent = (event: React.MouseEvent, strings: number, frets: number) => {

        const opts = this.dOpt;

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

        // FRETS
        // const frets = this.toFret - this.fromFret + 1;


        const w = width(this.toFret - this.fromFret + 1, this.dOpt);
        const h = height(strings, this.dOpt);
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox={box} preserveAspectRatio='xMinYMin meet' width='100%'
                 className={this.props.className}
                 onClick={this.onMouseClick}
                 onMouseMove={this.onMouseMove}>

                {this.props.debug && <DebugGrid />}

                {/*
                    INLAYS:
                */}
                {/* this.dOpt.inlays && <Inlays string={strings} fret={this.props.frets} /> */}

                {/*
                    FRETS & STRING:
                */}
                <Fretboard strings={strings} fromFret={this.fromFret} toFret={this.toFret} orientation={this.props.orientation} diagramOptions={this.dOpt} />

                {/*
                    SHAPES:
                */}
                {
                    this.playedShapes.map((shape: any, index: number) => {

                        let opt = Object.assign({}, this.props.dotOptions);
                        if (this.props.shapesDotOptions && this.props.shapesDotOptions[index]) {
                            Object.assign(opt, this.props.shapesDotOptions[index]);
                        }

                        return (
                            <ShapeHorizontal key={index}
                                             shape={shape}
                                             strings={strings}
                                             orientation={this.props.orientation}
                                             text={this.props.text}
                                             options={this.dOpt}
                                             dotOptions={opt}
                                             fretToX={this.x} stringToY={this.y} />
                        );
                    })
                }
                {/*
                    this.props.shapes &&
                    this.props.shapes.map((shape: any, index: number) => {

                        let opt = Object.assign({}, this.props.dotOptions);
                        if (this.props.shapesDotOptions && this.props.shapesDotOptions[index]) {
                            Object.assign(opt, this.props.shapesDotOptions[index]);
                        }

                        return (
                            <ShapeHorizontal key={index}
                               shape={FretboardAPI.Fretboard.play(FretboardAPI.Shape.create(shape))}
                               strings={strings}
                               orientation={this.props.orientation}
                               text={this.props.text}
                               options={this.dOpt}
                               dotOptions={opt}
                               fretToX={this.x} stringToY={this.y} />
                        );
                    })
                */}
                {(this.props.fretNumbers !== 'none') &&
                <FretNumbers fromFret={this.fromFret} toFret={this.toFret} orientation={this.props.orientation} options={this.dOpt} />}
            </svg>
        )
    }

}
