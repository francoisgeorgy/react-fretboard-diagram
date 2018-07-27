import React from 'react';
import Diagram from "../component/Diagram";

const Home = () => (
    <div>
        <div style={{width:"400px"}}>
            <Diagram strings={6} frets={4} shapes={[
                {
                    frets: [0, 2, 2, 1, 0, 0],
                    intervals: ['R', '5', 'R', '3', '5', 'R']
                }
            ]} />
        </div>
{/*
        <div style={{width:"300px"}}>
            <Diagram strings={6} frets={4} layout={ {
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
