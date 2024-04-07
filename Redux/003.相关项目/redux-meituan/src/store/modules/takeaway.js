import axios from 'axios'
import { createSlice } from '@reduxjs/toolkit'
const FoodsState = createSlice({
    name: 'foods',
    initialState: {
        foodsList: [],
        activeIndex: 0,
        cartList: []
    },
    reducers: {
        setFoodsList(state, action) {
            state.foodsList = action.payload
        },
        changActiveIndex(state, action) {
            state.activeIndex = action.payload
        },
        addCart(state, action) {
            // 是否已经添加
            const item = state.cartList.find(item => item.id === action.payload.id)
            if (item) {
                item.count++
            } else {
                state.cartList.push(action.payload)
            }
        },
        // 添加购物车
        addCart(state, action) {
            // 是否已经添加
            const item = state.cartList.find(item => item.id === action.payload.id)
            if (item) {
                item.count++
            } else {
                state.cartList.push(action.payload)
            }
        },
        // 增加商品
        increCount: (state, action) => {
            const item = state.cartList.find(item => item.id === action.payload.id)
            item.count++
        },
        // 减少商品
        decreCount: (state, action) => {
            const item = state.cartList.find(item => item.id === action.payload.id)
            item.count--
            item.count === 0 && (state.cartList = state.cartList.flatMap(item => (item.id !== action.payload.id ? item : [])))
        },
        clearCart: (state, action) => {
            state.cartList = []
        }
    }
})
const { setFoodsList, changActiveIndex, addCart, increCount, decreCount, clearCart } = FoodsState.actions
// 异步获取数据
const fetchFoodsList = () => {
    return async (dispatch) => {
        const { data } = await axios.get('http://localhost:3004/takeaway')
        dispatch(setFoodsList(data))
    }
}
const reducer = FoodsState.reducer
export { fetchFoodsList, changActiveIndex, addCart, increCount, decreCount, clearCart }
export default reducer
