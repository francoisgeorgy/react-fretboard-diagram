import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "./Home";
import GridExamples from "./GridExamples";
import GridBig from "./GridBig";
import Configurator from "./Configurator";
import Examples from "./Examples";
import MultipleShapes from "./MultipleShapes";
import FretboardApi from "./FretboardApi";
import MouseSupport from "./MouseSupport";

const App = () => (
    <Router>
        <div>
            <h1>react-fretboard-diagram sample app</h1>
            <Link className="header-link" to="/">Home</Link>&nbsp;
            <Link className="header-link" to="/grid-examples">Grid Exampes</Link>&nbsp;
            <Link className="header-link" to="/grid-big">Grid Big</Link>&nbsp;
            <Link className="header-link" to="/multiple-shapes">Multiple shapes</Link>&nbsp;
            <Link className="header-link" to="/examples">Examples</Link>&nbsp;
            <Link className="header-link" to="/mouse-support">Mouse</Link>&nbsp;
            <Link className="header-link" to="/fretboard-api">Fretboard API</Link>&nbsp;
            <Link className="header-link" to="/configurator">Configurator</Link>
            <div id={"container"}>
                <Switch>
                    <Route exact={true} path="/" component={Home} />
                    <Route path="/grid-examples" component={GridExamples} />
                    <Route path="/grid-big" component={GridBig} />
                    <Route path="/multiple-shapes" component={MultipleShapes} />
                    <Route path="/examples" component={Examples} />
                    <Route path="/mouse-support" component={MouseSupport} />
                    <Route path="/fretboard-api" component={FretboardApi} />
                    <Route path="/configurator" component={Configurator} />
                </Switch>
            </div>
        </div>
    </Router>
);

ReactDOM.render(<App/>, document.getElementById('app'));
