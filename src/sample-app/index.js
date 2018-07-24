import React from 'react';
import ReactDOM from 'react-dom';
import Diagram from "../component/Diagram";

const App = () => (
    <div>
        <h1>react-fretboard-diagram sample app</h1>
        <div style={{width:"400px"}}>
            <Diagram />
        </div>
    </div>
);

ReactDOM.render(<App/>, document.getElementById('app'));
