import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {

constructor(props) {
  super(props);
  console.log('constructor');
}

componentWillMount() {
  console.log('will mount');

}

componentDidMount() {
  console.log('mounted');
}

state = {
  visable: true
}

eventtoggle = () => {
  this.setState({
    visable: !this.state.visable
  })
}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Welcome text="My Custom Text by props" visable={this.state.visable}/>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {this.state.visable &&
        <p>This should show and hide</p>
        }
        <button onClick={this.eventtoggle}>Toggle Visability</button>
      </div>
    );
  }
}

class Welcome extends Component {
  render() {
    const { text, visable } = this.props;
    console.log(visable);
    return (
      <div>
      <h1 className="App-title">{text}</h1>
      </div>
    )
  }
}

export default App;
