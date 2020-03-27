import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Diagram from "../src/component/Diagram";
import {DotOptions} from "../src/utils/options";
import {useCallback, useState} from "react";

function getDefaultDotOptions(): DotOptions {
    return {
        colors: {
            '5P':'blue',
            'C3':'red'
        },
        cross: false,
        css: "",
        fill: "",
        root: "red",
        roots: "",
        show: undefined
    };
}

const App = () => {

    // const dotOptions: DotOptions = {
    //     colors: {
    //         '5P':'blue',
    //         'C3':'red'
    //     },
    //     cross: false,
    //     css: "",
    //     fill: "",
    //     root: "red",
    //     roots: "",
    //     show: undefined
    // };

    // const [count, setCount] = useState(0);
    //
    // const increment = useCallback(() => {
    //     setCount(count + 1)
    // }, [count]);

    const [dotOptions, updateDotOptions] = useImmer(() => getDefaultDotOptions());

    updateCells((draft) => {
        draft[r][c].color = Math.floor(Math.random() * 11 + 1);
    });

    return (
        <div>
            <div className="row">
                <div>Interval</div>
                {"C C# Db D D# Eb E F F# Gb G G# Ab A A# Bb B".split(' ').map((n,i) =>
                    <div key={i}>{n}</div>
                )}
            </div>
            <div className="row">
                <div>Note</div>
                {"1P 2m 2M 3m 3M 4P 5P 6m 6M 7m 7M 8P".split(' ').map((n,i) =>
                    <div key={i}>{n}</div>
                )}
            </div>
            <div className="row">
                <div>String</div>
                {"1 2 3 4 5 6".split(' ').map((n,i) =>
                    <div key={i}>{n}</div>
                )}
            </div>
            <div className="row">
                <div>Frets</div>
                {"1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24".split(' ').map((n,i) =>
                    <div key={i}>{n}</div>
                )}
            </div>
            <div className="row">
                <div className="h">C</div>
                <div style={{width: "1000px"}}>
                    <Diagram frets={15}
                             shapes={["X32010"]}
                             text='note' className="f g1"
                             dotOptions={dotOptions}
                    />
{/*
                    <Diagram frets={15}
                             shapes={["X32010", "X35553", "8 10 10 9 8 8", [null, 15, 14, 12, 13, 12]]}
                             text='note' className="f g1"
                            dotOptions={dotOptions}
                    />
*/}
                </div>
            </div>
        </div>
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
