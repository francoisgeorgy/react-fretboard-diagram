import {Diagram} from "../src/component/Diagram";
import * as React from "react";

export const ExampleCAGED = () => {
    return <>
        <Diagram shapes={["X32010","8 7 5 5 5 8","x x 10 12 13 12"]} frets={15}
                 dotOptions={{cross:false}}
                 shapesDotOptions={[null,{fill:'blue',root:'lightblue'},null]} />
        <Diagram shapes={["X35553","8 10 10 9 8 8"]}
                 frets={15}
                 dotOptions={{cross:false}}
                 shapesDotOptions={[{fill:'blue',root:'lightblue'}]}
        />
    </>
};