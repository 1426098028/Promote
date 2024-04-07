import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const channeStore = createSlice({
    name: "channel",
    initialState: {
        channelList: []
    },
    reducers: {
        setchannel(state, action) {
            state.channelList = action.payload
        }
    }
})




// 异步请求
const { setchannel } = channeStore.actions
const fetchchannelList = () => {
    return async (dispatch) => {
        const { data: { data: { channels } } } = await axios.get('https://geek.itheima.net/v1_0/channels')
        dispatch(setchannel(channels))
    }
}
const reducer = channeStore.reducer
export { fetchchannelList }
export default reducer


