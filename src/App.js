import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {lines: [], input: "", type: "", index: 0};
    this.addLine = this.addLine.bind(this);
    this.changeInput = this.changeInput.bind(this);
    this.changeType = this.changeType.bind(this);
  }

  addLine(e) {
    e.preventDefault();
    this.setState({
      lines: [...this.state.lines, {text: this.state.input, type: this.state.type, edit: false, index: this.newIndex()}]
    });
  }

  newIndex() {
    var index = this.state.index;
    this.setState({
      index: this.state.index+1
    });
    return index;
  }

  changeType(e) {
    this.setState({
      type: e
    });
  }

  changeInput(e) {
    this.setState({
      input: e.target.value
    });
  }

  removeLine(i) {
    var lines = this.state.lines;
    lines = lines.filter((e) => {
      return e.index !== i;
    });
    this.setState({
      lines
    });
  }

  render() {
    const lines = this.state.lines;
    const eLines = lines.map((line) => {
      let i = line.index;
      return <Line key={i} index={i} line={line} removeLine={() => this.removeLine(i)} />;
    });
    return (
      <div className="paper">
        <input type="text" name="line" value={this.state.value} onChange={this.changeInput} />
        <button onClick={this.addLine}>Add Line</button>
        <LineType onChange={this.changeType} />
        <div>
          {eLines}
        </div>
      </div>
    );
  }
}

class Line extends Component {
  constructor (props) {
    super(props);
    this.state = {value: this.props.line.text, type: this.props.line.type, edit: false};
    this.changeType = this.changeType.bind(this);
    this.removeLine = this.removeLine.bind(this);
    this.changeInput = this.changeInput.bind(this);
  }

  componentDidMount() {
    this.setState({
      type: this.props.line.type,
      value: this.props.line.text,
      edit: false,
      index: this.props.index
    });
  }

  removeLine(i) {
    if (this.props.removeLine === null) return;
    this.props.removeLine(i);
  }

  editLine() {
    this.setState({
      edit: !this.state.edit,
      value: this.state.value
    });
    
  }

  changeType(e) {
    this.setState({
      type: e
    });
  }

  changeInput(e) {
    this.setState({
      value: e.target.value
    });
  }

  render() {
    const i = this.state.index;

    const show = 
        <p>
          [{this.state.type}]: 
          {this.state.value}
          <button onClick={() => this.removeLine(i)}>
            Remove
          </button>
          <button onClick={() => this.editLine()}>
            Edit
          </button>
        </p>;

    const edit = 
      <p>
        [<LineType onChange={this.changeType} />]: 
        <input type="text" name="line" value={this.state.value} onChange={this.changeInput} />
        <button onClick={() => this.removeLine(i)}>
          Remove
        </button>
        <button onClick={() => this.editLine()}>
          Finish
        </button>
      </p>
    return (
      <div key={i}>
        {this.state.edit ? edit : show}
      </div>
    );
  }
}

class LineType extends Component {
  constructor(props) {
    super(props);
    this.state = {value: "dialogue"};
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount () {
    this.handleChange({target: {value: this.state.value}});
  }

  handleChange(e) {
    this.setState({value: e.target.value});
    if (this.props.onChange !== null) {
      this.props.onChange(e.target.value);
    }
  }

  render () {
    return (
      <select name="type" value={this.state.value} onChange={this.handleChange}>
        <option value="dialogue">dialogue</option>
        <option value="parenthetical">parenthetical</option>
        <option value="action">action</option>
        <option value="character">character</option>
      </select>
    );
  }
}
export default App;
