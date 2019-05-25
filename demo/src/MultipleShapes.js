import React from 'react';
import Diagram from "../../src/component/Diagram";

const MultipleShapes = () => (
    <div>
        <h3>CMaj chord shape and CMaj scale shape on the same fretboard</h3>
        <div style={{width:"800px"}}>
            <Diagram strings={6} frets={12} shapes={[
                {frets: "X32010"},
                {frets: "8 10, 7 8 10, 7 9 10, 7 9 10, 8 10, 7 8 10"}
            ]} />
        </div>
    </div>
);

export default MultipleShapes;
