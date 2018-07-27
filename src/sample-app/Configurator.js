import React, {Component} from 'react';
import Diagram from "../component/Diagram";


const mins = {
    mainWidth: 100,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    stringInterval: 0,
    stringWidth: 0,
    fretInterval: 0,
    fretWidth: 0,
    dotIn: 0,
    dotOut: 0,
    dotRadius: 0,
    dotStroke: 0,
    fontSize: 0
};

const maxs = {
    mainWidth: 2000,
    paddingLeft: 1000,
    paddingRight: 1000,
    paddingTop: 1000,
    paddingBottom: 1000,
    stringInterval: 1000,
    stringWidth: 200,
    fretInterval: 1000,
    fretWidth: 200,
    dotIn: 1000,
    dotOut: 1000,
    dotRadius: 500,
    dotStroke: 100,
    fontSize: 200
};


const defs = {
    mainWidth: 400,
    paddingLeft: 70,
    paddingRight: 15,
    paddingTop: 30,
    paddingBottom: 10,
    stringInterval: 60,
    stringWidth: 4,
    fretInterval: 100,
    fretWidth: 4,
    dotIn: 50,
    dotOut: 30,
    dotRadius: 20,
    dotStroke: 2,
    fontSize: 17
};

class Configurator extends Component {

    state = {
        mainWidth: defs['mainWidth'],
        paddingLeft: defs['paddingLeft'],
        paddingRight: defs['paddingRight'],
        paddingTop: defs['paddingTop'],
        paddingBottom: defs['paddingBottom'],
        stringInterval: defs['stringInterval'],
        stringWidth: defs['stringWidth'],
        fretInterval: defs['fretInterval'],
        fretWidth: defs['fretWidth'],
        dotIn: defs['dotIn'],
        dotOut: defs['dotOut'],
        dotRadius: defs['dotRadius'],
        dotStroke: defs['dotStroke'],
        fontSize: defs['fontSize']
    };

    handleChange = (event) => {
        let p = event.target.id.substring(1);
        console.log('handleChange', event.target.id, p, event.target.value);
        this.setState({[p]: Number(event.target.value)});
        return true;
    };

    render() {

        //console.log(Object.getOwnPropertyNames(this.state));
        // console.log('defs', defs);
        // console.log(this.state);
        // console.log(this.state.stringInterval);
        return (
            <div>
                <div style={{display:"flex"}}>
                    {/*<input type={"range"} defaultValue={"50"} min={"0"} max={"100"} onChange={this.handleChange}  />*/}
                    <div>
                        {Object.getOwnPropertyNames(this.state).map(
                            (p,i) => <div key={i}>
                                    {p} <input key={p} id={`_${p}`} type={"range"} defaultValue={defs[p]} min={mins[p]} max={maxs[p]} onChange={this.handleChange} step={1} /> {this.state[p]}
                                 </div>
                        )}
                    </div>
                    <div style={{width:`${this.state.mainWidth}px`}}>
                        <Diagram strings={6} frets={4} layout={this.state} shapes={{}}/>
                    </div>
                </div>
                <pre>{JSON.stringify(this.state, null, 2)}</pre>
            </div>
        );
    }

}

export default Configurator;
