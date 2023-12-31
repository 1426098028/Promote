import request from '@/utils/request'


export const getRoleList = (data) => request({ url: '/sys/role', method: 'get', params: data })
export const addRole = (data) => request({ url: '/sys/role', method: 'post', data: data })
export const updateRole = (data) => request({ url: `/sys/role/${data.id}`, method: 'put', data: data })
export const delRole = (data) => request({ url: `/sys/role/${data.id}`, method: 'delete', })
export const getRoleDetail = (data) => request({ url: `/sys/role/${data.id}`, method: 'get', })
export const assignPerm = (data) => request({ url: `/sys/role/assignPrem`, method: 'put', data: data })



