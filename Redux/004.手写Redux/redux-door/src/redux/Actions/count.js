/**
 * 该文件专门为count组件生成action对象
 * 
 * 
 */

import { INCREMENT, DECREMENT } from '../constant'
// 同步Action,就是指action的返回值为Object类型的一般对象
const increment = (data) => ({ type: INCREMENT, data })
const decrement = (data) => ({ type: DECREMENT, data })
// 异步Action,就是指action的返回值为函数
// 一般异步action中会调用同步action
const incrementAsync = (data, time) => {
    return (dispatch) => {
        console.log('异步')
        const Time = setTimeout(() => {
            clearTimeout(Time)
            dispatch(increment(data))
        }, time)
    }
}
export { increment, decrement, incrementAsync }
