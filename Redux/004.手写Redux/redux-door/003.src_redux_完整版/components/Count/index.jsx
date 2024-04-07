import React, { Component } from "react";
import store from "../../redux/store";
import {
  createIncrementAction,
  createDecrementAction,
} from "../../redux/count_actions";
export default class Count extends Component {
  increment = () => {
    const { value } = this.selectNumber;
    // 通知redux进行修改状态
    store.dispatch(createIncrementAction(value * 1));
  };
  decrement = () => {
    const { value } = this.selectNumber;
    store.dispatch(createDecrementAction(value * 1));
  };
  incrementOdd = () => {
    const { value } = this.selectNumber;
    if (store.getState() % 2 !== 0) {
      store.dispatch(createIncrementAction(value * 1));
    }
  };
  incrementAsync = () => {
    const { value } = this.selectNumber;
    setTimeout(() => {
      store.dispatch(createIncrementAction(value * 1));
    }, 500);
  };

  // componentDidMount() {
  //   // 检测redux中状态变化，只要变化，就调用render, 更新页面
  //   store.subscribe(() => {
  //     console.log("subscribe", "store状态变化");
  //     this.setState({});
  //   });
  // }

  render() {
    console.log("getState", store.getState(), store);
    return (
      <div>
        <h1>当前和：{store.getState()}</h1>
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
