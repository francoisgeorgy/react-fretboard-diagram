import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "./Home";
import Grids from "./Grids";
import Grid1 from "./Grid1";
import Configurator from "./Configurator";
import Examples from "./Examples";

const App = () => (
    <Router>
        <div>
            <h1>react-fretboard-diagram sample app</h1>
            <Link className="header-link" to="/">Home</Link>&nbsp;
            <Link className="header-link" to="/grids">Grids</Link>&nbsp;
            <Link className="header-link" to="/grid1">Grid-1</Link>&nbsp;
            <Link className="header-link" to="/examples">Examples</Link>&nbsp;
            <Link className="header-link" to="/configurator">Configurator</Link>
            <div id={"container"}>
                <Switch>
                    <Route exact={true} path="/" component={Home} />
                    <Route path="/grids" component={Grids} />
                    <Route path="/grid1" component={Grid1} />
                    <Route path="/examples" component={Examples} />
                    <Route path="/configurator" component={Configurator} />
                </Switch>
            </div>
        </div>
    </Router>
);

ReactDOM.render(<App/>, document.getElementById('app'));
