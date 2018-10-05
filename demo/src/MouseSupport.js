import {Component} from "react";
import {Shape as S, Fretboard as F} from "fretboard-api";
import Diagram from "../../src/component/Diagram";
import React from "react";
import {produce} from "immer";

class MouseSupport extends Component {

    /**
     *
     * @param props
     */
    constructor(props) {

        // Required step: always call the parent class' constructor
        super(props);

        this.state = {
            frets: this.props.frets,
            tuning: this.props.tuning,
            shapes: [ F.play(S.create("022100")) ],     // shape for demo
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
     * @param e
     */
    toggleDot = (string, fret, e) => {

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
     * @param string
     * @param fret
     * @param e
     */
    overDot = (string, fret, e) => {

        if (string === this.state.overString && fret === this.state.overFret) {
            return;
        }

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
     * @returns {*}
     */
    render() {

        // console.log('render', this.state.editedShape ? this.state.editedShape.frets : '');

        let s = [...this.state.shapes];     // avoid copy by reference
        if (this.state.editedShape) {
            s.push(this.state.editedShape);
        }
        if (this.state.overShape) {
            s.push(this.state.overShape);
        }

        // console.log('render', JSON.stringify(s));

        return (
            <div>
                <h3>Mouse support</h3>
                <div style={{width:"800px"}}>
                    <Diagram frets={4} shapes={s} mouseClickHandler={this.toggleDot} mouseMoveHandler={this.overDot} />
{/*
                    <svg viewBox={box} xmlns="http://www.w3.org/2000/svg" style={{backgroundColor:"#eeeeee"}} preserveAspectRatio='xMinYMin meet' width='100%'
                         className={this.props.className}
                         onClick={this.editInPlace}
                         onMouseMove={this.mouseMove}>
                        {this.props.debug && <DebugGrid />}
                        <g className="fretboard-group">
                            <Fretboard strings={strings} frets={frets} diagramStyle={this.s} />
                            {
                                this.props.shapes &&
                                this.props.shapes.map(
                                    (s, index) => <Shape key={index} shape={F.play(S.create(s))} strings={strings} diagramStyle={this.s} text={this.props.text} />
                                )
                            }
                            {this.state.shapes &&
                            this.state.shapes.map(
                                (shape, index) => <Shape key={index} shape={shape} strings={strings} diagramStyle={this.s} text={this.props.text} />
                            )}
                            {this.state.editedShape &&
                                <Shape key="editshape" shape={this.state.editedShape} strings={strings} diagramStyle={this.s} text={this.props.text} />
                            }
                            {this.state.overShape &&
                                <Shape key="overshape" shape={this.state.overShape} strings={strings} diagramStyle={this.s} text={this.props.text} className="over" />
                            }
                            {(this.props.fretNumbers !== 'none') && <FretNumbers frets={frets} startAt={1} diagramStyle={this.s} />}
                        </g>
                    </svg>
*/}
                </div>
            </div>
        );
    }

}

export default MouseSupport;
