
// 该文件用于汇总所有单个的reducer变为一个总的reducer

import { combineReducers } from 'redux'


// 引入为count组件服务的reducer
import count from './count'
// 引入为Person组件服务的reducer
import persons from './Person'




export default combineReducers({ count, persons })



