import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {ExampleDefaults} from "./ExampleDefaults";
import {ExampleColors} from "./ExampleColors";
import "./main.css";
import {ExampleSVG} from "./ExampleSVG";

const App = () => {

    return (
        <div>
{/*
            <div className="w200">
                <ExampleDefaults/>
            </div>
*/}
            {/*<ExampleColors/>*/}
            <div className="w600">
                <ExampleSVG/>
            </div>
        </div>
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
