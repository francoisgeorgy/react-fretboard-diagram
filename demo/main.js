
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

    ReactDOM.render(
        element,
        document.getElementById('app')
    );
