import React from 'react';
import Diagram from "../component/Diagram";

const Home = () => (
    <div>
        <h3>E major chord:</h3>
        <div style={{width:"400px"}}>
            <Diagram strings={6} frets={4} shapes={[
                {
                    frets: [[0], [2], [2], [1], [0], [0]],
                    intervals: [['R'], ['5'], ['R'], ['3'], ['5'], ['R']]
                }
            ]} />
        </div>

        <h3>Major scale with intervals:</h3>
        <div style={{width:"400px"}}>
            <Diagram strings={6} frets={4} shapes={[
                {
                    frets: [[2, 4], [1, 2, 4], [1, 3, 4], [1, 3, 4], [2, 4], [1, 2, 4]],
                    intervals: [['R', '2'], ['3', '4', '5'], ['6', '7', 'R'], ['2', '3', '4'], ['5', '6'], ['7', 'R', '2']]
                }
            ]} />
        </div>

        <h3>Major scale with fingers:</h3>
        <div style={{width:"400px"}}>
            <Diagram strings={6} frets={4} shapes={[
                {
                    frets: [[2, 4], [1, 2, 4], [1, 3, 4], [1, 3, 4], [2, 4], [1, 2, 4]],
                    fingers: [[2, 4], [1, 2, 4], [1, 3, 4], [1, 3, 4], [2, 4], [1, 2, 4]]
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
