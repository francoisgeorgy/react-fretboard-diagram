import * as React from "react";
import {Diagram} from "../src/component/Diagram";

export const ExampleDefaults = () => {
    return <>
{/*
        <Diagram shapes={["X02220"]} />
        <Diagram shapes={["133211"]} />
*/}
        <Diagram shapes={["8 10, 7 8 10, 7 9 10, 7 9 10, 8 10, 7 8"]} frets={"auto"} />
    </>
};