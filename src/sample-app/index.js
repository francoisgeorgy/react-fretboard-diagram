import React from 'react';
import ReactDOM from 'react-dom';
import Diagram from "../component/Diagram";

const App = () => (
    <div>
        <h1>react-fretboard-diagram sample app</h1>
        <div id={"container"}>

            <div>
                <Diagram layout={"test1"}/>
            </div>
            <div>
                <Diagram layout={"test2"}/>
            </div>
            <div>
                <Diagram layout={"test3"}/>
            </div>
            <div>
                <Diagram layout={"test4"}/>
            </div>

            <div>
                <Diagram layout={"test5"}/>
            </div>
            <div>
                <Diagram layout={"test6"}/>
            </div>
            <div>
                <Diagram layout={"test7"}/>
            </div>
            <div className={"big"}>
                <Diagram layout={"test8"}/>
            </div>
            <div className={"big"}>
                <Diagram />
            </div>
        </div>
    </div>
);

ReactDOM.render(<App/>, document.getElementById('app'));
