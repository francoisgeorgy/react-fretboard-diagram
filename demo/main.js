
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
            <h2>Major triads</h2>
{/*
            <div style={{display:"flex"}}>
                <div style={{width:"500px"}}>
                    <FD.Diagram frets={5} shapes={["X0"]} className="foo" />
                </div>
                <div style={{width:"500px"}}>
                    <FD.Diagram frets={5} shapes={["12345,12345,12345,12345,12345,12345"]} className="foo" />
                </div>
            </div>
*/}
            <div className="row">
                <div className="h">C</div>
                <div style={{width:"1000px"}}>
                    <FD.Diagram frets={15} shapes={["X32010","X35553","8 10 10 9 8 8",[null,15,14,12,13,12]]} text='note' className="f g1" />
                </div>
            </div>
            <div className="row">
                <div className="h">C</div>
                <div style={{width:"1000px"}}>
                    <FD.Diagram frets={15} shapes={["XXX010","XXX553","XXX988",[null,null,null,12,13,12]]} text='note' className="f g1b" />
                </div>
            </div>
            <div className="row">
                <div className="h">C</div>
                <div style={{width:"1000px"}}>
                    <FD.Diagram frets={15} shapes={["XX201X","XX555X",[null,null,10,9,8,null],[null,null,14,12,13,null]]} text='note' className="f" />
                </div>
            </div>
            <div className="row">
                <div className="h">C</div>
                <div style={{width:"1000px"}}>
                    <FD.Diagram frets={15} shapes={["X320XX","X755XX",[null,10,10,9,null,null],[null,15,14,12,null,null]]} text='note' className="f" />
                </div>
            </div>
            <div className="row">
                <div className="h">C</div>
                <div style={{width:"1000px"}}>
                    <FD.Diagram frets={15} shapes={["332XXX","875XXX",[12,10,10,null,null,null],[15,15,14,null,null,null]]} text='note' className="f" />
                </div>
            </div>

            <div className="row">
                <div className="h">F</div>
                <div style={{width:"1000px"}}>
                    <FD.Diagram frets={15} shapes={["XX321X","XX756X",[null,null,10,10,10,null],[null,null,15,14,13,null]]} text='note' className="f" />
                </div>
            </div>


            {/*
            <div style={{display:"flex"}}>
                <div style={{width:"500px"}}>
                    <FD.Diagram frets={5} shapes={["X0"]} className="foo" orientation="vertical" />
                </div>
                <div style={{width:"500px"}}>
                    <FD.Diagram frets={5} shapes={["12345,12345,12345,12345,12345,12345"]} className="foo" orientation="vertical" />
                </div>
            </div>

            <div style={{display:"flex"}}>
                <div style={{width:"200px"}}>
                    <FD.Diagram frets={2} shapes={["X12101"]} className="foo" />
                </div>
            </div>
*/}
        </div>
    );

    ReactDOM.render(
        element,
        document.getElementById('app')
    );
