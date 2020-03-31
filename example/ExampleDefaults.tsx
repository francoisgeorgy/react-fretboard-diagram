import * as React from "react";
import {Diagram} from "../src/component/Diagram";

export const ExampleDefaults = () => {
    return <>
        <Diagram shapes={["X02220"]} />
        <Diagram shapes={["133211"]} />
    </>
};