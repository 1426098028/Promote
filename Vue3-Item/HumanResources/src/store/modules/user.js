import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'

const state = { token: getToken() }

const mutations = {
  setToken(state, token) {
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
  async login({ commit }, loginForm) {
    const token = await login(loginForm)
    commit('setToken', token)
  },
}
export default {
  namespaced: true,// 开启命名空间
  state,
  mutations,
  actions
}

