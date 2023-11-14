import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo } from '@/api/user'
import router from "@/router";
const state = {
  token: getToken(),
  userInfo: {}
}
const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
    // router.push(router.history.current.query.redirect || '/')
    router.push('/')
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
  },
  logout({ commit }) {
    commit('setRemoveToken')
    commit('setUserInfo', {})
    // router.push(`/login?redirect=${router.history.current.query.redirect || '/'}`)
    router.push(`/login`)
  }
}
export default {
  namespaced: true,// 开启命名空间
  state,
  mutations,
  actions
}

