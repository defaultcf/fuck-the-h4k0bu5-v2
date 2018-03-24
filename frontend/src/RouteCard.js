import React, { Component } from 'react';
import { Card } from 'antd';

class RouteCard extends Component {
  render() {
    const { route } = this.props;
    return (
      <Card title={route.line} extra={route.predicted_time_arrival}>
        <p>{route.line_description}</p>
        <p>所要時間: {route.duration}</p>
      </Card>
    );
  }
}

export default RouteCard;
