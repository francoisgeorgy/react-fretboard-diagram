
/*
    const element = (
        <div style={{display:"flex"}}>
            <div style={{width:"400px"}}>
                <FD.Diagram frets={4} shapes={["022100"]} />
            </div>
            &nbsp;
            <div style={{width:"400px"}}>
                <FD.Diagram frets={4} shapes={["X22X00"]} className="foo" />
            </div>
            &nbsp;
            <div style={{width:"400px"}}>
                <FD.Diagram frets={5} shapes={["12345,12345,12345,12345,12345,12345"]} className="foo" />
            </div>
        </div>
    );
*/

    const element = (
        <div>
            <div style={{display:"flex"}}>
                <div style={{width:"500px"}}>
                    <FD.Diagram frets={5} shapes={["X0"]} className="foo" />
                </div>
                {/*<div style={{width:"500px"}}>*/}
                {/*    <FD.Diagram frets={4} shapes={["0X"]} className="foo" />*/}
                {/*</div>*/}
                <div style={{width:"500px"}}>
                    <FD.Diagram frets={5} shapes={["12345,12345,12345,12345,12345,12345"]} className="foo" />
                </div>
            </div>
            <div style={{display:"flex"}}>
                <div style={{width:"1000px"}}>
                    <FD.Diagram frets={15} shapes={["XXX010","XXX553","XXX988",[null,null,null,12,13,12]]} text='note' className="foo" />
                </div>
            </div>
            <div style={{display:"flex"}}>
                <div style={{width:"500px"}}>
                    <FD.Diagram frets={5} shapes={["X0"]} className="foo" orientation="vertical" />
                </div>
                {/*<div style={{width:"500px"}}>*/}
                {/*    <FD.Diagram frets={4} shapes={["0X"]} className="foo" />*/}
                {/*</div>*/}
                <div style={{width:"500px"}}>
                    <FD.Diagram frets={5} shapes={["12345,12345,12345,12345,12345,12345"]} className="foo" orientation="vertical" />
                </div>
            </div>

            <div style={{display:"flex"}}>
                <div style={{width:"200px"}}>
                    <FD.Diagram frets={2} shapes={["X12101"]} className="foo" />
                </div>
            </div>

        </div>
    );

    ReactDOM.render(
        element,
        document.getElementById('app')
    );
