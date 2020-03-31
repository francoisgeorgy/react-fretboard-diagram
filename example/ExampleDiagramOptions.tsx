import * as React from "react";
import {Diagram} from "../src/component/Diagram";

export const ExampleDiagramOptions = () => {
    // @ts-ignore
    return <Diagram shapes={["X02220"]}
                    diagramOptions={{
                        crossLinecap: "round",
                        crossStroke: 3,
                        dotIn: 55/2,
                        dotOut: 55/2.6,
                        dotRadius: 12,
                        dotStroke: 2,
                        fontSize: 14,
                        fretInterval: 55,
                        // fretNumberDistance: 0,
                        // fretNumberFontSize: 0,
                        fretWidth: 2,
                        // paddingBody: 0,
                        paddingHead: 55,
                        // paddingHigh: 0,
                        // paddingLow: 0,
                        stringInterval: 34,
                        stringWidth: 2
                    }}
                    dotOptions={{
                        colors: {
                            "1P": "#7BC9E5",
                            "3M,10M": "#E57BC9",
                            "5P,12P": "#E5CD7B"
                        },
                        // cross: false,
                        // css: "",
                        fill: "white",
                        // root: "",
                        roots: "#7BC9E5",
                        show: "interval",
                        text: "#000000"
                    }}
            />
};