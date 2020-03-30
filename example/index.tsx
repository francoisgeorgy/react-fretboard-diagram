import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {ExampleDefaults} from "./ExampleDefaults";
import {ExampleColors} from "./ExampleColors";
import "./main.css";
import {ExampleSVG} from "./ExampleSVG";
import {ExampleSVG2} from "./ExampleSVG2";
import {ExampleSizes} from "./ExampleSizes";
import {ExampleCAGED} from "./ExampleCAGED";

const App = () => {

    return (
        <div>
{/*
            <div className="w600">
                <ExampleSVG/>
            </div>
            <div className="w600">
                <ExampleDefaults/>
            </div>
*/}
            <div className="w600">
                <ExampleCAGED/>
            </div>
{/*
            <div className="w600">
                <ExampleSVG2 />
            </div>
            <ExampleSizes />
*/}
            {/*<ExampleColors/>*/}
        </div>
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
