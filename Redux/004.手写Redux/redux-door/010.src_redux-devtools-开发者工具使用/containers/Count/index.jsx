import React, { Component } from "react";

// 引入connect函数,用于连接UI组件与redux
import { connect } from "react-redux";
import {
  createIncrementAction,
  createDecrementAction,
  createIncrementAsyncAction,
} from "../../redux/Actions/count";

//定义Ui组件
class CountUI extends Component {
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
    const { count, personcount } = this.props;
    return (
      <div>
        <h2>我是Count组件,下方组件总人数{personcount}</h2>
        <h4>当前和：{count}</h4>
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

// 映射状态
const mapStateToProps = (state, ownProps) => ({
  count: state.count,
  personcount: state.persons.length,
});

// 映射操作状态的方法  mapDispatchToProps简写直接对象
const mapDispatchToProps = {
  increment: createIncrementAction,
  decrement: createDecrementAction,
  incrementAsync: createIncrementAsyncAction,
};

// 使用connect创建一个UI组件的容器组件
const CountUIConnect = connect(mapStateToProps, mapDispatchToProps)(CountUI);
// function connect(mapStateToProps?, mapDispatchToProps?, mergeProps?, options?)
export default CountUIConnect;
