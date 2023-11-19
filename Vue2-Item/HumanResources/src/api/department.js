import request from '@/utils/request'


export const getDepartment = (data) => request({ url: '/company/department', method: 'get', data })
export const getManagerList = (data) => request({ url: '/sys/user/simple', method: 'get', data })
export const addDepartment = (data) => request({ url: '/company/department', method: 'POST', data })
export const getDepartmentDetail = (data) => request({ url: `/company/department/${data.id}`, method: 'get', })
export const updateDepartment = (data) => request({ url: `/company/department/${data.id}`, method: 'PUT', data })
export const delDepartment = (data) => request({ url: `/company/department/${data.id}`, method: 'DELETE', })