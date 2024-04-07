
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './modules/counterStore'
import channelReducer from './modules/channeStore'

const store = configureStore({
    reducer: {
        // 导入子模块reducer
        counter: counterReducer,
        channel: channelReducer
    }
})

// 导出store
export default store
