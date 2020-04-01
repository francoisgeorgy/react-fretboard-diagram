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
import {ExampleDiagramOptions} from "./ExampleDiagramOptions";

const App = () => {

    return (
        <div className="content">
{/*
            <div className="w600">
                <ExampleSVG/>
            </div>
*/}
            <div className="w600">
                <ExampleDefaults/>
            </div>
{/*
            <div className="w600">
                <ExampleCAGED/>
            </div>
*/}
{/*
            <div style={{width:"200px"}}>
                <ExampleDiagramOptions />
            </div>
            <div style={{width:"300px"}}>
                <ExampleDiagramOptions />
            </div>
            <div style={{width:"400px"}}>
                <ExampleDiagramOptions />
            </div>
            <div style={{width:"800px"}}>
                <ExampleDiagramOptions />
            </div>
*/}
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
