import React, {Fragment} from "react";
import {ShapeType, Utils} from "fretboard-api";
import ShapeHorizontal from "./ShapeHorizontal";
import {
    DiagramOptions,
    DotOptions,
    xMappingFunction,
    yMappingFunction
} from "../utils/options";
import {DIAGRAM_DEFAULTS} from "../options/presentation";

//TODO: add option to display non played string as 'X' or nothing at all

export interface ShapeProps {
    className: string,
    shape: ShapeType,
    strings: number,   // number of strings
    // string: number,   // shape position
    // fret: number,     // shape position
    orientation: string;
    // text: 'note' | 'interval' | 'finger' | 'custom';   // TODO: define "custom"
    options: DiagramOptions;
    dotOptions: DotOptions;
    // svgOptions: SVGOptions;
    // xy: xyMappingFunction;
    fretToX: xMappingFunction;
    stringToY: yMappingFunction;
}
//
// export interface ShapeState {
// }

export default class Shape extends React.Component<ShapeProps/*, ShapeState*/> {

    static defaultProps = {
        className: '',
        strings: 6,
        string: -1,
        fret: -1,
        // diagramStyle: {},
        // text: 'note',
        dotOptions: null,
        options: DIAGRAM_DEFAULTS
    };

    // TODO: check that 'frets', 'intervals', 'fingers', ... arrays have the same structure and lengths.
    // --> should be done by the fretboard-api.

    render () {
        switch (this.props.orientation) {
            case 'horizontal':
                return <ShapeHorizontal {...this.props} />;
            // case 'vertical':
            //     return <ShapeVertical {...this.props} />;
            default:
                return null;
        }
    }

}
