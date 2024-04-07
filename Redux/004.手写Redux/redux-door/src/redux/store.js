/**
 * 该文件专门用于暴露一个store对象，整个应用只有一个store对象
 * 
 * 
 */

// 引入createStore函数，为用于创建redux中核心的store对象     , applyMiddleware用于支持异步Action
import { createStore, applyMiddleware, combineReducers } from 'redux'

// 引入redux-thunk,用于支持异步Action
import { thunk } from 'redux-thunk'
// 引入redux-devtools-extension
import { composeWithDevTools } from 'redux-devtools-extension'

// 引入汇总后的reducer
import Reducers from './Reducers'


const store = createStore(Reducers, composeWithDevTools(applyMiddleware(thunk)))
// 暴露store对象
export default store
