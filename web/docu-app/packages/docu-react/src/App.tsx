import * as React from 'react';
import 'sprotty-component/lib/wrapper';
import './App.css';
import logo from './logo.svg';
import { SprottyWrapper } from 'sprotty-component/lib/wrapper';
// import { SModelElement } from "sprotty/lib";

interface AppState {
  selectedElements:any[];//SModelElement[];
}

class App extends React.Component<{},AppState> {
  private sprotty:React.RefObject<SprottyWrapper>;
  constructor(props:any) {
    super(props);
    this.sprotty = React.createRef();
  }
  componentDidMount() {
    if(this.sprotty.current) {
      this.sprotty.current.subscribeToSelection(selectedElements => this.setState({selectedElements}));
    }
  }
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <sprotty-wrapper ref={this.sprotty}></sprotty-wrapper>
        <div>
          <h2>Selected</h2>
          <div>
            <button onClick = {this.handleSelect('node0')}>Select Node 1</button>
            <button onClick = {this.handleSelect('node1')}>Select Node 2</button>
          </div>
          <div>
            {this.showSelection()}
          </div>
        </div>
      </div>
    );
  }
  private handleSelect =(nodeid:string) => () => {
    if(this.sprotty.current){
      this.sprotty.current.selection=[nodeid];
    }
  }
  private showSelection() {
    if(this.state && this.state.selectedElements)
      return this.state.selectedElements.map((e,idx) => (
        <div key={'selection-'+idx}>
          <h6>{e.id}</h6>
          <span>{e.type}</span>
        </div>
    ));
    return <h6>No selection!</h6>
  }
}

export default App;
