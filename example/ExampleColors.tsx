import 'react-app-polyfill/ie11';
import * as React from 'react';
import {DotOptions, parseDotOptions} from "../src/utils/options";
import {useCallback, useState} from "react";
import {useImmer} from "use-immer";
import {TwitterPicker} from 'react-color';
import {Diagram} from "../src/component/Diagram";

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

export const ExampleColors = () => {

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

    const [dotOptions, updateDotOptions] = useImmer(() => getDefaultDotOptions());

    // const [count, setCount] = useState(0);
    //
    const [showPicker, togglePicker] = useState<[string, string]|null>(null); // use an object that tells which color we are choosing

    const handleChangeComplete = (color, event) => {
        //this.setState({ background: color.hex });
        console.log("handleChangeComplete", color);

        updateDotOptions(draft => {
            if (!showPicker) return;
            if (!draft.colors) draft['colors'] = {};
            draft.colors[showPicker[1]] = color.hex;
        });

        togglePicker(null);
    };

    // const pick = useCallback(() => {
    //     togglePicker(!showPicker);
    // }, [showPicker]);

    const pick = (what: string, which: string): void => {
        if (showPicker) {
            togglePicker(null);
        } else {
            togglePicker([what, which]);
        }
    };

    // updateCells((draft) => {
    //     draft[r][c].color = Math.floor(Math.random() * 11 + 1);
    // });

    const opt = parseDotOptions(dotOptions);

    return (
        <div>
            <div className="row">
                <div>Interval</div>
                {"C C# Db D D# Eb E F F# Gb G G# Ab A A# Bb B".split(' ').map((n,i) =>
                    <button key={i} onClick={() => pick('note', n)}>{n}</button>
                )}
            </div>
            <div className="row">
                <div>Note</div>
                {"1P 2m 2M 3m 3M 4P 5P 6m 6M 7m 7M 8P".split(' ').map((n,i) =>
                    <button key={i} onClick={() => pick('interval', n)}>{n}</button>
                )}
            </div>
            <div className="row">
                <div>String</div>
                {"1 2 3 4 5 6".split(' ').map((n,i) =>
                    <button key={i}>{n}</button>
                )}
            </div>
            <div className="row">
                <div>Frets</div>
                {"1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24".split(' ').map((n,i) =>
                    <button key={i}>{n}</button>
                )}
            </div>
            {showPicker && <TwitterPicker onChangeComplete={handleChangeComplete} />}
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
            <pre>
                {JSON.stringify(showPicker)}
                <br />
                {JSON.stringify(dotOptions['colors'])}
                <br />
                {JSON.stringify(opt)}
            </pre>
        </div>
    );
};

