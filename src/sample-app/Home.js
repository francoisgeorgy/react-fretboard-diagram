import React from 'react';
import Diagram from "../component/Diagram";

const Home = () => (
    <div>
        <div style={{width:"200px"}}>
            <Diagram strings={6} frets={4} layout={ {
                // paddingLeft: 20,
                // paddingRight: 5,
                // paddingTop: 10,
                // paddingBottom: 10,
                // stringInterval: 20,
                stringWidth: 2,
                // fretInterval: 30,
                fretWidth: 3,
                // dotIn: 15,
                // dotOut: 10,
                // dotRadius: 6,
                // fontSize: 5
            }} />
        </div>
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
    </div>
);

export default Home;
