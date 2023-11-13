import { getToken, setToken, removeToken } from '@/utils/auth'

const state = { token: getToken() }

const mutations = {
  setToken(state, token) {
    console.log(state, token)
    state.token = token
    setToken(token)
  },
  setRemoveToken(state, token) {
    state.token = null
    removeToken()
  }
}

const actions = {
  // 登录
  login({ commit }, data) {
    // console.log('login', commit, data)

    commit('setToken', data)
  },

}

export default {
  namespaced: true,// 开启命名空间
  state,
  mutations,
  actions
}

