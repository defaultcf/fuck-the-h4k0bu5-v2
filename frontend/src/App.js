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
    this.resultTimer = null;
    this.state = {
      dataSourceDeparture: [],
      dataSourceArrival: [],
      departure: "",
      arrival: "",
      routes: [],
    };
  }

  componentDidMount() {
    const { params } = this.props.match;
    if (Object.keys(params).length === 2) {
      this._fetchResult(params.departure, params.arrival);
      this.setState({departure: params.departure});
      this.setState({arrival: params.arrival});
      this.resultTimer = window.setInterval(this._fetchResult, 30000, params.departure, params.arrival);
    }
  }

  _setSource = (way, stops) => {
    if (way === "departure") this.setState({dataSourceDeparture: stops});
    else this.setState({dataSourceArrival: stops});
  }

  handleSearch = (way, value) => {
    window.clearInterval(this.resultTimer);
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

  _fetchResult = (departure, arrival) => {
    fetch(`${API_HOST}/result/${departure}/${arrival}`)
    .then(res => res.json())
    .then(json => {
      json = json.map(j => {
        const departure = j.predicted_time_departure.split(":");
        const departure_time = moment().hour(departure[0]).minute(departure[1]);
        j["remaining"] = departure_time.fromNow();
        return j;
      }).sort((a, b) => {
        const departure_time = [a, b].map(d => {
          const departure = d.predicted_time_departure.split(":");
          return moment().hour(departure[0]).minute(departure[1]);
        });
        return departure_time[0] > departure_time[1];
      });
      this.setState({routes: json})
    });
  }

  handleSelect = async(value, prop) => {
    const way = prop._owner.memoizedProps.id;
    await this._setStop(way, value);

    if (this.state.departure && this.state.arrival) {
      this._fetchResult(this.state.departure, this.state.arrival);
      window.history.pushState(null, null, `/${this.state.departure}/${this.state.arrival}`);
      window.clearInterval(this.resultTimer);
      this.resultTimer = window.setInterval(this._fetchResult, 30000, this.state.departure, this.state.arrival);
    }
  }

  render() {
    const { departure, arrival } = this.props.match.params;
    let searchTimerDeparture, searchTimerArrival;
    const searcherDeparture = value => {
      window.clearTimeout(searchTimerDeparture);
      searchTimerDeparture = window.setTimeout(this.handleSearch, 1000, "departure", value);
    }

    const searcherArrival = value => {
      window.clearTimeout(searchTimerArrival);
      searchTimerArrival = window.setTimeout(this.handleSearch, 1000, "arrival", value);
    }

    return (
      <div>
        <Row>
          <Col key={1} sm={24} md={12}>
            <AutoComplete id="departure"
              defaultValue={departure}
              dataSource={this.state.dataSourceDeparture}
              style={{ width: 200 }}
              onSearch={searcherDeparture}
              onSelect={this.handleSelect}
              placeholder="出発地"
            />
          </Col>
          <Col key={2} sm={24} md={12}>
            <AutoComplete id="arrival"
              defaultValue={arrival}
              dataSource={this.state.dataSourceArrival}
              style={{ width: 200 }}
              onSearch={searcherArrival}
              onSelect={this.handleSelect}
              placeholder="到着地"
            />
          </Col>
        </Row>

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
