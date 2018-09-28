import React from 'react';
import Fretboard from "./Fretboard";
import Shape from "./Shape";
import PropTypes from "prop-types";
import DebugGrid from "./DebugGrid";
import DiagramStyle from "../utils/DiagramStyle";
import {Fretboard as F, Shape as S} from "fretboard-api";
import FretNumbers from "./FretNumbers";
import {DOT_TEXT, FRET_NUMBER_FORMAT, FRET_NUMBER_POSITION, ORIENTATION} from "../options";   //TODO: import API, and use API.Fretboard...

const propTypes = {
    diagramStyle: PropTypes.object,
    orientation: PropTypes.oneOf(ORIENTATION),   // TODO: make bool instead?
    text: PropTypes.oneOf(DOT_TEXT),   // TODO: define "custom"
    leftHanded: PropTypes.bool,
    strings: PropTypes.number.isRequired,
    stringsProportional: PropTypes.bool,        // if true will draw strings with prop widths
    frets: PropTypes.number.isRequired,
    fretNumbers: PropTypes.oneOf(FRET_NUMBER_FORMAT),
    fretNumbersPosition: PropTypes.oneOf(FRET_NUMBER_POSITION),   // left, right only when vertical orientation
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

    s = null;

    editInPlace = (e) => {

        console.log(`paddingTop=${this.s.paddingTop}, s=${this.props.strings}, interval=${this.s.stringInterval}, bottom=${this.s.paddingTop + ((this.props.strings - 1) * this.s.stringInterval)}`);

        // console.log('event', e.currentTarget, e.nativeEvent);
        console.log(`(${e.clientX}, ${e.clientY}), (${e.nativeEvent.clientX}, ${e.nativeEvent.clientY})`);
        let svg = e.currentTarget.getBoundingClientRect();
        console.log('targetRect', svg);

        console.log(`targetRect: (${svg.width} ${svg.height}), ratio = ${svg.width/svg.height}`);

        let w = this.s.width(this.props.frets);
        let scale = svg.width / w;

        console.log(`scale = ${svg.width} / ${w} = ${scale}`);

        let dx = e.clientX - svg.left;
        let dy = e.clientY - svg.top;
        console.log(`delta=(${dx}, ${dy})`);

        console.log(`dy / scale = ${dy / scale}`);

        if ((dy / scale) < (this.s.paddingTop - (this.s.stringInterval / 2))) {
            console.log('in padding top, ignore');
            return;
        }

        console.log(`bottom limit = ${((svg.height / scale) - this.s.paddingBottom + (this.s.stringInterval / 2))}`);
        if ((dy / scale) > ((svg.height / scale) - this.s.paddingBottom + (this.s.stringInterval / 2))) {
            console.log('in padding bottom, ignore');
            return;
        }
        // if ((dy / scale) > (this.s.paddingTop + ((this.props.strings - 1) * this.s.stringInterval) + this.s.stringWidth)) {
        //     console.log('in padding bottom, ignore');
        //     return
        // }

        let n = Math.floor(((dy / scale) - this.s.paddingTop - (this.s.stringWidth / 2)) / this.s.stringInterval + 0.5);
        if (n < 0) n = 0;
        if (n >= this.props.strings) n = this.props.strings - 1;

        console.log(`((dy/scale) - paddingTop - stringWidth) / stringInterval = ${((dy / scale) - this.s.paddingTop - (this.s.stringWidth / 2)) / this.s.stringInterval}; n string = ${n}`);

        // fret

        if ((dx / scale) < (this.s.paddingLeft - (this.s.fretInterval / 2))) {
            console.log('in padding left, ignore');
            return;
        }

        console.log(`right limit = ((${svg.width} / ${scale}) - ${this.s.paddingRight} + (${this.s.fretInterval} / 2)) = ${((svg.width / scale) - this.s.paddingRight + (this.s.fretInterval / 2))}`);
        if ((dx / scale) > ((svg.width / scale) - this.s.paddingRight + (this.s.fretInterval / 2))) {
            console.log('in padding right, ignore');
            return;
        }

        n = Math.floor(((dx / scale) - this.s.paddingLeft - (this.s.fretWidth / 2)) / this.s.fretInterval + 0.5);
        if (n < 0) n = 0;
        if (n >= this.props.frets) n = this.props.frets;

        console.log(`((dx/scale) - paddingLeft - fretWidth) / fretInterval = ${((dx / scale) - this.s.paddingLeft - (this.s.fretWidth / 2)) / this.s.fretInterval}; n fret = ${n}`);


    };

    render() {

        // console.log('Diagram.render: fretboard', this.props.fretboard);
        // console.log('Diagram.render: shapes', this.props.shapes);

        this.s = new DiagramStyle(this.props.diagramStyle);

        let strings = this.props.strings;
        let frets = this.props.frets;
        let f = null;

        if (this.props.fretboard) {
            f = this.props.fretboard;
            strings = f.tuning.length;
            frets = f.maxFret - f.minFret;
        } else {
            if (this.props.shapes) {
                f = new F({frets: frets});  // build a default fretboard
                for (const s of this.props.shapes) {
                    // console.log('adding', this.s);
                    f.addShape(s);
                }
            }
        }

        let w = this.s.width(frets);
        let h = this.s.height(strings);

        let box = `0 0 ${w} ${h}`;          // viewBox = <min-x> <min-y> <width> <height>

        console.log(`viewbox: (${w} ${h}), ratio = ${w/h}`);

        // let {shapes, ...p} = this.props;    // !! ES7 stage-2 syntax

        return (
            <svg viewBox={box} xmlns="http://www.w3.org/2000/svg" style={{backgroundColor:"#eeeeee"}} preserveAspectRatio='xMinYMin meet' width='100%'  onClick={this.editInPlace}>
                {this.props.debug && <DebugGrid />}
                <g>
                    <Fretboard strings={strings} frets={frets} diagramStyle={this.s} />
                    {f && f.shapes &&
                    f.shapes.map(
                        (shape, index) => <Shape key={index} shape={shape} strings={strings} diagramStyle={this.s} text={this.props.text} />
                    )}
                    {(this.props.fretNumbers !== 'none') && <FretNumbers frets={frets} startAt={1} diagramStyle={this.s} />}
                </g>
            </svg>
        )
    }

}

Diagram.propTypes = propTypes;
Diagram.defaultProps = defaultProps;
