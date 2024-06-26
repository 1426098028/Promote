/**
 * 该文件专门用于暴露一个store对象，整个应用只有一个store对象
 * 
 * 
 */

// 引入createStore函数，为用于创建redux中核心的store对象     , applyMiddleware用于支持异步Action
import { createStore, applyMiddleware } from 'redux'
// 引入为count组件服务的reducer
import countReducer from './count_reducer'
// 引入redux-thunk,用于支持异步Action
import { thunk } from 'redux-thunk'

const store = createStore(countReducer, applyMiddleware(thunk))
// 暴露store对象
export default store
