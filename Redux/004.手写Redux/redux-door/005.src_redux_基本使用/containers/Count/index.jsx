import CountUI from "../../components/Count";
// 引入connect函数,用于连接UI组件与redux
import { connect } from "react-redux";
import {
  createIncrementAction,
  createDecrementAction,
  createIncrementAsyncAction,
} from "../../redux/count_actions";

/**
 *
 * 1.mapStateToProps函数返回是一个对象
 * 2.返回对象中的key就作为传递给UI组件的props的key属性,value作为传递给UI组件的props的value值
 * 3.mapStateToProps用于传递状态
 *
 */
const mapStateToProps = (state, ownProps) => ({ count: state });

/**
 *
 * 1.mapDispatchToProps函数返回是一个对象
 * 2.返回对象中的key就作为传递给UI组件的props的key属性,value作为传递给UI组件的props的value值
 * 3.mapDispatchToProps用于传递操作状态的方法
 *
 */
const mapDispatchToProps = (dispatch, ownProps) => {
  console.log("mapDispatchToProps", dispatch);
  return {
    increment: (data) => {
      dispatch(createIncrementAction(data));
    },
    decrement: (data) => {
      dispatch(createDecrementAction(data));
    },
    incrementAsync: (data, time) => {
      dispatch(createIncrementAsyncAction(data, time));
    },
  };
};

// 使用connect创建一个UI组件的容器组件
const CountUIConnect = connect(mapStateToProps, mapDispatchToProps)(CountUI);
// function connect(mapStateToProps?, mapDispatchToProps?, mergeProps?, options?)
export default CountUIConnect;
