import React, { Component } from 'react';
import moment from 'moment';
import "moment/locale/ja";
import { AutoComplete, Row, Col } from 'antd';
import RouteCard from './RouteCard';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      departure: "",
      arrival: "",
      routes: [],
    };
  }

  handleSearch = value => {
    if (value === "") this.setState({dataSource: []});
    fetch(`http://localhost:5000/search/${value}`)
      .then(res => res.json())
      .then(json => {
        let stops = [];
        stops = json.map(j => j.stopName);
        this.setState({dataSource: stops});
      });
  }

  _setStop = (way, value) => {
    if (way === "departure") this.setState({departure: value});
    else this.setState({arrival: value});
  }

  handleSelect = async(value, prop) => {
    const way = prop._owner.memoizedProps.id;
    await this._setStop(way, value);

    if (this.state.departure && this.state.arrival) {
      fetch(`http://localhost:5000/result/${this.state.departure}/${this.state.arrival}`)
      .then(res => res.json())
      .then(json => {
        json = json.map(j => {
          const departure = j.predicted_time_departure.split(":");
          const departure_time = moment().hour(departure[0]).minute(departure[1]);
          j["remaining"] = departure_time.fromNow();
          return j;
        });
        this.setState({routes: json})
      });
    }
  }

  render() {
    let searchTimer;
    const searcher = value => {
      clearTimeout(searchTimer)
      searchTimer = setTimeout(this.handleSearch, 1000, value);
    }

    return (
      <div>
        <AutoComplete id="departure"
          dataSource={this.state.dataSource}
          style={{ width: 200 }}
          onSearch={searcher}
          onSelect={this.handleSelect}
          placeholder="出発地"
        />
        <AutoComplete id="arrival"
          dataSource={this.state.dataSource}
          style={{ width: 200 }}
          onSearch={searcher}
          onSelect={this.handleSelect}
          placeholder="到着地"
        />

        <Row id="routes">
          {this.state.routes.map((route, key) => (
            <Col key={key} sm={24} md={12}>
              <RouteCard route={route} />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default App;
