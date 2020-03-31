import * as React from "react";
import {Diagram} from "../src/component/Diagram";

export const ExampleSizes = () => {

    return [...Array(10)].map((i,j)=>
        <div style={{width:`${(j+1)*100}px`}}>
            width:{`${(j+1)*100}px`}
            <Diagram shapes={["X32010"]} />
        </div>
    );
};