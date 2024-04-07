import React, { Component } from "react";
import { connect } from "react-redux";
import { createIncrementAction } from "../../redux/count_actions";
class CountUi extends Component {
  render() {
    const { Increment, count } = this.props;
    return (
      <div>
        <h2>当前求和为：{count}</h2>
        <button onClick={() => Increment(1)}>+</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ count: state });
const mapDispatchToProps = { Increment: createIncrementAction };

export default connect(mapStateToProps, mapDispatchToProps)(CountUi);
