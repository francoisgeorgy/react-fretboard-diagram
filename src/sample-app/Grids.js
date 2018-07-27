import React from 'react';
import Diagram from "../component/Diagram";

const Grids = () => (
    <div id="grids" className={"debug"}>
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
);

export default Grids;
