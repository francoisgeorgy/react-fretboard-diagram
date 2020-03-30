import Diagram from "../src/component/Diagram";
import * as React from "react";

export const ExampleDefaults = () => {
    return <>
        <Diagram shapes={["X02220"]} />
        <Diagram shapes={["133211"]} />
    </>
};