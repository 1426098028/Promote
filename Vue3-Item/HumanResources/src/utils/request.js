import axios from 'axios'
import store from '@/store/index'
import { getToken } from '@/utils/auth'

// 创建axios实例
// https://heimahr.itheima.net/api/sys/login?mobile=13800000002&password=hm%23qd@23%21&isAgree=true
const service = axios.create({
  // baseURL: 'https://heimahr.itheima.net/app',
  baseURL: '/app',
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
    const { data, message, success } = response.data // 默认json格式
    if (success) {
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
