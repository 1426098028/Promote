import CountUI from "../../components/Count";
// 引入connect函数,用于连接UI组件与redux
import { connect } from "react-redux";
import {
  createIncrementAction,
  createDecrementAction,
  createIncrementAsyncAction,
} from "../../redux/count_actions";

// 映射状态
const mapStateToProps = (state, ownProps) => ({ count: state });

// // 映射操作状态的方法 mapDispatchToProps一般写法，普通函数
// const mapDispatchToProps = (dispatch, ownProps) => ({
//   increment: (data) => {
//     dispatch(createIncrementAction(data));
//   },
//   decrement: (data) => {
//     dispatch(createDecrementAction(data));
//   },
//   incrementAsync: (data, time) => {
//     dispatch(createIncrementAsyncAction(data, time));
//   },
// });

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
