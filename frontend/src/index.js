import React, { Component } from "react";
import ReactDOM from "react-dom";

class Index extends Component {
  render() {
    return (
      <div>
        <h1>Hello</h1>
        <p>hello</p>
      </div>
    )
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById("root")
);
