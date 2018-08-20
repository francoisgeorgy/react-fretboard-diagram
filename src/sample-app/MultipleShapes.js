import React from 'react';
import Diagram from "../component/Diagram";

const MultipleShapes = () => (
    <div>
        <h3></h3>
        <div style={{width:"800px"}}>
            <Diagram strings={6} frets={12} shapes={[
                {
                    frets: [-1, 3, 2, 0, 1, 0],
                    intervals: ['', 'R', '3', '5', 'R', '3']
                },{
                    frets: [[8, 10], [7, 8, 10], [7, 9, 10], [7, 9, 10], [8, 10], [7, 8, 10]],
                    intervals: [['R', '2'], ['3', '4', '5'], ['6', '7', 'R'], ['2', '3', '4'], ['5', '6'], ['7', 'R', '2']]
                }
            ]} />
        </div>
    </div>
);

export default MultipleShapes;
