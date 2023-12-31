import axios from 'axios'
import store from '@/store/index'
import { MessageBox, Message } from 'element-ui'

// 创建axios实例
console.log(process.env.VUE_APP_BASE_API)
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 100000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    if (store.getters.token) { config.headers.Authorization = `Bearer ${store.getters.token}` }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    if (response.data instanceof Blob) return response.data  // 判断是否Blob 返回Blob对象
    const { data, message, success } = response.data // 默认json格式
    if (success) {
      return data
    } else {
      Message({ type: 'error', message })
      return Promise.reject(new Error(message))
    }
  },
  async (error) => {
    if (error.response.status === 401) {
      Message({ type: 'warning', message: 'token超时了' })
      store.dispatch('user/logout')
      return Promise.reject(error)
    }
    Message({ type: 'error', message: error.message })
    return Promise.reject(error)
  }
)

export default service
