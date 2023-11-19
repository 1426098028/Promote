import request from '@/utils/request'


export const login = (data) => request({ url: '/sys/login', method: 'post', data })
export const getUserInfo = (data) => request({ url: '/sys/profile', method: 'get', data })
export const updatePassword = (data) => request({ url: '/sys/user/updatePass', method: 'get', data })
export const loginQrcodeKey = (data) => request({ url: '/sys/qrcodeKey', method: 'get', data })
export const LoginQrcodeState = (data) => request({ url: '/sys/qrcodeState', method: 'get', params: data })