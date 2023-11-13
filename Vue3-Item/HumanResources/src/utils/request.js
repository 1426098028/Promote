import axios from 'axios'
import store from '@/store/index'
import { getToken } from '@/utils/auth'
import { MessageBox, Message } from 'element-ui'

// 创建axios实例
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
    console.log('response', response)
    const { data, message, success } = response.data // 默认json格式
    if (success) {
      console.log('data', data)
      return data
    } else {

      Message({ type: 'error', message })
      return Promise.reject(new Error(message))
    }
  },
  async (error) => {

    Message({ type: 'error', message: error.message })
    return Promise.reject(error)
  }
)

export default service
