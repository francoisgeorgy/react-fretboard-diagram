import React from 'react';
import ReactDOM from 'react-dom';
import {Dummy} from "../component";

const App = () => (
    <div>
        <h1>react-fretboard-diagram sample app</h1>
        <Dummy text={"yolo"}/>
    </div>
);

ReactDOM.render(<App/>, document.getElementById('app'));
