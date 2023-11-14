import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo } from '@/api/user'
import router from "@/router";

console.log(router)

const state = {
  token: getToken(),
  userInfo: {}
}

const mutations = {
  setToken(state, token) {
    state.token = token

    setToken(token)
  },
  setRemoveToken(state, token) {
    state.token = null
    removeToken()
  },
  setUserInfo(state, Info) {
    state.userInfo = Info
  }
}
const actions = {
  // 登录
  async login({ commit }, loginForm) {
    const token = await login(loginForm)
    commit('setToken', token)
  },
  async getUserInfo({ commit }, Info) {
    const result = await getUserInfo()
    commit('setUserInfo', result)
  }
}
export default {
  namespaced: true,// 开启命名空间
  state,
  mutations,
  actions
}

