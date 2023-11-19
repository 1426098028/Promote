import { getMessage, } from '@/api/employee'
const state = {
    MessageList: {},
    UnreadTimes: null,
}
let Times = null
const mutations = {
    setList(state, dataObj) {
        state.MessageList = dataObj
        state.UnreadTimes = dataObj.unread.length === 0 ? null : dataObj.unread.length
    },
    clearTimes(state, Time) {
        clearTimeout(Times)
        Times = null
    },
}
const actions = {
    async Message({ commit, dispatch }) {
        clearTimeout(Times)
        Times = setTimeout(async () => { commit('setList', await getMessage()); dispatch('Message') }, 1000)
    }
}
export default {
    namespaced: true,// 开启命名空间
    state,
    mutations,
    actions
}

