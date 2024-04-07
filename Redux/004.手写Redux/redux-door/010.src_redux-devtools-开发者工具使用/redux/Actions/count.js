/**
 * 该文件专门为count组件生成action对象
 * 
 * 
 */

import { INCREMENT, DECREMENT } from '../constant'
// 同步Action,就是指action的返回值为Object类型的一般对象
const createIncrementAction = (data) => ({ type: INCREMENT, data })
const createDecrementAction = (data) => ({ type: DECREMENT, data })
// 异步Action,就是指action的返回值为函数
// 一般异步action中会调用同步action
const createIncrementAsyncAction = (data, time) => {
    return (dispatch) => {
        console.log('异步')
        const Time = setTimeout(() => {
            clearTimeout(Time)
            dispatch(createIncrementAction(data))
        }, time)
    }
}
export { createIncrementAction, createDecrementAction, createIncrementAsyncAction }
