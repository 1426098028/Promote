import request from '@/utils/request'


export const getEmployeeList = (data) => request({ url: '/sys/user', method: 'post', params: data })
export const getUserInfo = (data) => request({ url: '/sys/profile', method: 'get', data })
export const updatePassword = (data) => request({ url: '/sys/user/updatePass', method: 'get', data })