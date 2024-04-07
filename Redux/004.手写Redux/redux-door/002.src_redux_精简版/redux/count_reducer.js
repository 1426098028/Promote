/**
 * 
 * 1.该文件是用于创建一个为Count组件服务的reducer，reducer的本质是一个函数
 * 2.reducer函数会接收到两个参数，分别为：之前的状态（preState），动作对象（action）
 * 
 * 
 */
const initState = 0
function countReducer(preState = initState, action) {
    console.log('@initState', preState, action)
    // 从action对象中获取：type、data 值
    const { type, data } = action
    // 根据type决定如何加工数据
    switch (type) {
        case 'increment':
            return preState + data;
        case 'decrement':
            return preState - data;
        default:
            return preState
    }
}

export default countReducer
