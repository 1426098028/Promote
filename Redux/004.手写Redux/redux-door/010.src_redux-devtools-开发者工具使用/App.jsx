import React, { Component } from "react";
import CountContainers from "./containers/Count";
import Person from "./containers/Person";
export default class App extends Component {
  render() {
    return (
      <div>
        <CountContainers />
        <hr />
        <Person />
      </div>
    );
  }
}
