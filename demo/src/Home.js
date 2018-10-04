import React from 'react';
import Diagram from "../../src/component/Diagram";
import {Tuning} from 'fretboard-api';

const Home = () => (
    <div>
        <div>
            <h4>Defaults</h4>
            <ul>
                <li>Tuning: standard guitar tuning = {Tuning.guitar.standard}</li>
                <li>Number of strings: {Tuning.guitar.standard.length} (determined by the tuning)</li>
            </ul>
        </div>

        <h3>E major chord:</h3>
        <div style={{width:"800px"}}>
            <Diagram frets={4} shapes={["022100"]} />
        </div>

        <h3>Major scale with intervals:</h3>
        <div style={{width:"400px"}}>
            <Diagram frets={4} text={"interval"} shapes={["2 4, 1 2 4, 1 3 4, 1 3 4, 2 4, 1 2 4"]} />
        </div>

        <h3>Major scale with fingers:</h3>
        <div style={{width:"400px"}}>
            <Diagram frets={4} text={"finger"} shapes={[
                {
                    frets: "2 4, 1 2 4, 1 3 4, 1 3 4, 2 4, 1 2 4",
                    fingers: "2 4, 1 2 4, 1 3 4, 1 3 4, 2 4, 1 2 4"
                }
            ]} />
        </div>

{/*
        <div style={{width:"300px"}}>
            <Diagram strings={6} frets={4} diagramStyle={ {
                paddingLeft: 200,
                paddingRight: 50,
                paddingTop: 100,
                paddingBottom: 100,
                stringInterval: 200,
                stringWidth: 20,
                fretInterval: 300,
                fretWidth: 30,
                dotIn: 150,
                dotOut: 100,
                dotRadius: 60,
                dotStroke: 10,
                fontSize: 50
            }} />
        </div>
*/}
    </div>
);

export default Home;
