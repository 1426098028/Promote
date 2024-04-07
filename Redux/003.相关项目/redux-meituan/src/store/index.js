
import { configureStore } from '@reduxjs/toolkit'
import FoodsReducer from './modules/takeaway'
const store = configureStore({
    reducer: {
        foods: FoodsReducer
    }
})
export default store


