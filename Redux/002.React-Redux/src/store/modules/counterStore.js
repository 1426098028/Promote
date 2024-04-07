import { createSlice } from '@reduxjs/toolkit'
const counterStore = createSlice({
    // 命名空间？
    name: 'counter',
    // 初始化state状态
    initialState: {
        count: 0
    },
    // 修改状态方法，并且支持直接修改，同步方法
    reducers: {
        increment: (state) => {
            state.count++
        },
        decrement: (state) => {
            state.count--
        },
        addToNum: (state, action) => {
            state.count = action.payload
        }
    }
})
console.log('counterStore', counterStore)
// 解构counterStore中修改方法   
const { increment, decrement, addToNum } = counterStore.actions
// 获取reducer
const reducer = counterStore.reducer

// 导出 { increment, decrement }
export { increment, decrement, addToNum }

// 默认方式导出reducer
export default reducer
