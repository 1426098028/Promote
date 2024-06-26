import React, { Component } from "react";

export default class Count extends Component {
  increment = () => {
    const { value } = this.selectNumber;
    this.props.increment(value * 1);
  };
  decrement = () => {
    const { value } = this.selectNumber;
    this.props.decrement(value * 1);
  };
  incrementOdd = () => {
    const { value } = this.selectNumber;
    if (this.props.count % 2 !== 0) {
      this.props.increment(value * 1);
    }
  };
  incrementAsync = () => {
    const { value } = this.selectNumber;
    this.props.incrementAsync(value * 1, 1000);
  };
  render() {
    console.log("CountUI", this.props);
    const { count } = this.props;
    return (
      <div>
        <h1>当前和：{count}</h1>
        <select ref={(c) => (this.selectNumber = c)}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>
        &nbsp;
        <button onClick={this.increment}>+</button> &nbsp;
        <button onClick={this.decrement}>-</button> &nbsp;
        <button onClick={this.incrementOdd}>当前求和奇数再加</button> &nbsp;
        <button onClick={this.incrementAsync}>异步加</button> &nbsp;
      </div>
    );
  }
}
