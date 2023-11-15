import request from '@/utils/request'


export const getRoleList = (data) => request({ url: '/sys/role', method: 'get', params: data })
export const addRole = (data) => request({ url: '/sys/role', method: 'post', data: data })