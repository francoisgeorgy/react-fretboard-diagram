import React from 'react';
import Diagram from "../../src/component/Diagram";
import {STYLES} from "../../src/utils/styles";

const GridExamples = () => (
    <div id="grids" className={"debug"}>
        <div>
            <Diagram frets={1} tuning={['E2', 'A2']} diagramStyle={STYLES.test1} debug={true} />
        </div>
        <div>
            <Diagram diagramStyle={STYLES.test2} debug={true} />
        </div>
        <div>
            <Diagram diagramStyle={STYLES.test3} debug={true} />
        </div>
        <div>
            <Diagram diagramStyle={STYLES.test4} debug={true} />
        </div>
        <div>
            <Diagram diagramStyle={STYLES.test5} debug={true} />
        </div>
        <div>
            <Diagram diagramStyle={STYLES.test6} debug={true} />
        </div>
        <div>
            <Diagram diagramStyle={STYLES.test7} debug={true} />
        </div>
        <div className={"big"}>
            <Diagram diagramStyle={STYLES.test8} debug={true} />
        </div>
        <div className={"big"}>
            <Diagram />
        </div>
    </div>
);

export default GridExamples;
