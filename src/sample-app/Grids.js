import React from 'react';
import Diagram from "../component/Diagram";
import {STYLES} from "../utils/styles";

const Grids = () => (
    <div id="grids" className={"debug"}>
        <div>
            <Diagram frets={1} strings={2} diagramStyle={STYLES.test1}/>
        </div>
        <div>
            <Diagram diagramStyle={STYLES.test2}/>
        </div>
        <div>
            <Diagram diagramStyle={STYLES.test3}/>
        </div>
        <div>
            <Diagram diagramStyle={STYLES.test4}/>
        </div>
        <div>
            <Diagram diagramStyle={STYLES.test5}/>
        </div>
        <div>
            <Diagram diagramStyle={STYLES.test6}/>
        </div>
        <div>
            <Diagram diagramStyle={STYLES.test7}/>
        </div>
        <div className={"big"}>
            <Diagram diagramStyle={STYLES.test8}/>
        </div>
        <div className={"big"}>
            <Diagram />
        </div>
    </div>
);

export default Grids;
