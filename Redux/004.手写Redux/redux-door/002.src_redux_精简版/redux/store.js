/**
 * 该文件专门用于暴露一个store对象，整个应用只有一个store对象
 * 
 * 
 */

// 引入createStore函数，为用于创建redux中核心的store对象
import { createStore } from 'redux'
// 引入为count组件服务的reducer
import countReducer from './count_reducer'

const store = createStore(countReducer)
// 暴露store对象
export default store
