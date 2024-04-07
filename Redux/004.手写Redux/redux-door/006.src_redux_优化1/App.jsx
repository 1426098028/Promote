import React, { Component } from "react";
import CountContainers from "./containers/Count";
export default class App extends Component {
  render() {
    return (
      <div>
        {/* 给容器组件传递store */}
        <CountContainers />
      </div>
    );
  }
}
