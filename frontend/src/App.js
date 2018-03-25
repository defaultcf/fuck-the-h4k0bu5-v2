import React, { Component } from 'react';
import moment from 'moment';
import "moment/locale/ja";
import { AutoComplete, Row, Col } from 'antd';
import RouteCard from './RouteCard';
import './App.css';

const API_HOST = "https://test-68fc6.appspot.com";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSourceDeparture: [],
      dataSourceArrival: [],
      departure: "",
      arrival: "",
      routes: [],
    };
  }

  _setSource = (way, stops) => {
    if (way === "departure") this.setState({dataSourceDeparture: stops});
    else this.setState({dataSourceArrival: stops});
  }

  handleSearch = (way, value) => {
    if (value === "") {
      this._setSource(way, []);
    }
    fetch(`${API_HOST}/search/${value}`)
      .then(res => res.json())
      .then(json => {
        let stops = [];
        stops = json.map(j => j.stopName);
        this._setSource(way, stops);
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
      fetch(`${API_HOST}/result/${this.state.departure}/${this.state.arrival}`)
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
    let searchTimerDeparture, searchTimerArrival;
    const searcherDeparture = value => {
      clearTimeout(searchTimerDeparture);
      searchTimerDeparture = setTimeout(this.handleSearch, 1000, "departure", value);
    }

    const searcherArrival = value => {
      clearTimeout(searchTimerArrival);
      searchTimerArrival = setTimeout(this.handleSearch, 1000, "arrival", value);
    }

    return (
      <div>
        <AutoComplete id="departure"
          dataSource={this.state.dataSourceDeparture}
          style={{ width: 200 }}
          onSearch={searcherDeparture}
          onSelect={this.handleSelect}
          placeholder="出発地"
        />
        <AutoComplete id="arrival"
          dataSource={this.state.dataSourceArrival}
          style={{ width: 200 }}
          onSearch={searcherArrival}
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
