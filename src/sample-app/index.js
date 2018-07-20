import React from 'react';
import ReactDOM from 'react-dom';
import Diagram from "../component/Diagram";

const App = () => (
    <div>
        <h1>react-fretboard-diagram sample app</h1>
        <div style={{width:"200px"}}>
            <Diagram x={10} y={10} w={40} h={20} color={"blue"} />
        </div>
    </div>
);

ReactDOM.render(<App/>, document.getElementById('app'));
