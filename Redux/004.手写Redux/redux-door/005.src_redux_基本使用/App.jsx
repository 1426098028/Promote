import React, { Component } from "react";
import CountContainers from "./containers/Count";
import store from "./redux/store";
export default class App extends Component {
  render() {
    return (
      <div>
        {/* 给容器组件传递store */}
        <CountContainers store={store} />
      </div>
    );
  }
}
