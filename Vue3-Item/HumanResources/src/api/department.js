import request from '@/utils/request'


export const getDepartment = (data) => request({ url: '/company/department', method: 'get', data })
export const departmentId = (data) => request({ url: '/company/department/{id}', method: 'get', data })
export const simple = (data) => request({ url: '/sys/user/simple', method: 'get', data })
export const company = (data) => request({ url: '/company/department', method: 'POST', data })
export const DELETE = (data) => request({ url: '/company/department', method: 'DELETE', data })
export const PUT = (data) => request({ url: '/company/department/{id}', method: 'PUT', data })