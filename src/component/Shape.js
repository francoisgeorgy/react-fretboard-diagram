import React from 'react';
import {currentLayout} from "../utils/layout";

export default class Shape extends React.Component {

    render() {
        let x1 = currentLayout.paddingLeft + (0 * currentLayout.fretInterval) + (currentLayout.fretInterval - currentLayout.dotIn) + currentLayout.fretWidth / 2;
        let y1 = currentLayout.paddingTop + (0 * currentLayout.stringInterval) + currentLayout.stringWidth / 2;
        let x2 = currentLayout.paddingLeft + (1* currentLayout.fretInterval) + (currentLayout.fretInterval - currentLayout.dotIn) + currentLayout.fretWidth / 2;
        let y2 = currentLayout.paddingTop + (1 * currentLayout.stringInterval) + currentLayout.stringWidth / 2;
        let x3 = currentLayout.paddingLeft - currentLayout.dotOut + currentLayout.fretWidth / 2;
        let y3 = currentLayout.paddingTop + (2 * currentLayout.stringInterval) + currentLayout.stringWidth / 2;
        return (
            <g>
                <circle cx={x1} cy={y1} r={currentLayout.dotRadius} fill={"white"} fillOpacity={0.4} stroke={"black"}/>
                <text x={x1} y={y1} alignmentBaseline="central" fontSize={currentLayout.fontSize * 1.5} className="dot-number">C&#9837;</text>
                <circle cx={x2} cy={y2} r={currentLayout.dotRadius} fill={"white"} fillOpacity={0.4} stroke={"black"} strokeWidth={0.5}/>
                <text x={x2} y={y2} alignmentBaseline="central" fontSize={currentLayout.fontSize * 1.5} className="dot-number">C&#9839;</text>
                <circle cx={x3} cy={y3} r={currentLayout.dotRadius} fill={"white"} fillOpacity={0.4} stroke={"black"} strokeWidth={0.5}/>
                <text x={x3} y={y3} alignmentBaseline="central" fontSize={currentLayout.fontSize * 1.5} className="dot-number">3m</text>
            </g>
        );

        // see also dominantBaseline https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dominant-baseline

    }

}
