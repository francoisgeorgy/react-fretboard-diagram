import {Component} from "react";
import {Tuning, Shape as S, Fretboard as F} from "fretboard-api";
import Diagram from "../../src/component/Diagram";
import React from "react";

class FretboardApi extends Component {

    render() {

        // console.log(SHAPES);

        // let f = new F();
        // let s = new S({frets:"X22100"});
        let s = F.play(S.create("X32010"), 8);

        // let shape = new Shape("022100");

        return (
            <div>
                <h3></h3>
                <div style={{width:"800px"}}>
                    <Diagram strings={6} frets={12} shapes={[ s ]} />
                </div>
            </div>
        );
    }

}

export default FretboardApi;
