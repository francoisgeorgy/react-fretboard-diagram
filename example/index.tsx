import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Diagram from "../src/component/Diagram";

const App = () => {
  return (
    <div>
        <div className="row">
            <div className="h">C</div>
            <div style={{width:"1000px"}}>
                <Diagram frets={15} shapes={["X32010","X35553","8 10 10 9 8 8",[null,15,14,12,13,12]]} text='note' className="f g1" />
            </div>
        </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
