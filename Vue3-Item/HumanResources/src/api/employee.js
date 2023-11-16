import request from '@/utils/request'


export const getEmployeeList = (data) => request({ url: '/sys/user', method: 'get', params: data })
export const exportEmployee = (data) => request({ url: '/sys/user/export', method: 'get', responseType: 'blob' })
export const getExportTemplate = (data) => request({ url: '/sys/user/import/template', method: 'get', responseType: 'blob', data })
export const uploadExcel = (data) => request({ url: '/sys/user/import', method: 'post', data })
export const delEmployee = (data) => request({ url: `/sys/user/${data.id}`, method: 'delete', })
export const addEmployee = (data) => request({ url: '/sys/user', method: 'post', data })
export const getEmployeeDetail = (data) => request({ url: `/sys/user/${data.id}`, method: 'get', data })
export const updateEmployee = (data) => request({ url: `/sys/user/${data.id}`, method: 'put', data })
export const getEnableRoleList = (data) => request({ url: `/sys/role/list/enabled`, method: 'get', data })
export const assignRole = (data) => request({ url: `/sys/user/assignRoles`, method: 'PUT', data })
