import request from '@/utils/request'


export const login = (data) => request({ url: '/sys/login', method: 'post', data })
export const getUserInfo = (data) => request({ url: '/sys/profile', method: 'get', data })