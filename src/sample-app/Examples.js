import React from 'react';
import Diagram from "../component/Diagram";

const Examples = () => (
    <div id="examples">

        <div>
            <Diagram />
        </div>
        <div>
            &lt;Diagram /&gt;
        </div>

        <div>
            <Diagram orientation="vertical" />
        </div>
        <div>
            &lt;Diagram orientation="vertical" /&gt;
        </div>

        <div>
            <Diagram leftHanded={true} />
        </div>
        <div>
            &lt;Diagram leftHanded={true} /&gt;
        </div>

        <div>
            <Diagram orientation="vertical" leftHanded={true} />
        </div>
        <div>
            &lt;Diagram orientation="vertical" leftHanded={true} /&gt;
        </div>

    </div>
);

export default Examples;
