import React, { Component } from 'react';
import { Card } from 'antd';

class RouteCard extends Component {
  render() {
    const { route } = this.props;
    return (
      <Card title={route.line} extra={route.remaining}>
        <p>{route.line_description}</p>
      </Card>
    );
  }
}

export default RouteCard;
