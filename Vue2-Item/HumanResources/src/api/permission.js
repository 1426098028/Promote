import request from '@/utils/request'


export const getPermissionList = (data) => request({ url: '/sys/permission', method: 'get', data })
export const DelPermission = (data) => request({ url: `/sys/permission/${data.id}`, method: 'DELETE', })
export const addPermission = (data) => request({ url: '/sys/permission', method: 'POST', data })
export const EditPermission = (data) => request({ url: `/sys/permission/${data.id}`, method: 'PUT', data })
export const DetPermission = (data) => request({ url: `/sys/permission/${data.id}`, method: 'get', data })