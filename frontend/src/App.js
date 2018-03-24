import React, { Component } from 'react';
import { AutoComplete } from 'antd';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    };
  }

  handleSearch = value => {
    fetch(`http://localhost:5000/search/${value}`)
      .then(res => {
        if (res.status === 404) return [];
        else return res.json();
      })
      .then(json => {
        let stops = [];
        stops = json.map(j => j.stopName);
        this.setState({dataSource: stops});
      });
  }

  handleSelect = (value, obj) => {
    console.log(value);
  }

  render() {
    return (
      <div>
        <AutoComplete
          dataSource={this.state.dataSource}
          style={{ width: 200 }}
          onSearch={this.handleSearch}
          onSelect={this.handleSelect}
          placeholder="出発地"
        />
        <AutoComplete
          dataSource={this.state.dataSource}
          style={{ width: 200 }}
          onSearch={this.handleSearch}
          onSelect={this.handleSelect}
          placeholder="到着地"
        />
      </div>
    );
  }
}

export default App;
