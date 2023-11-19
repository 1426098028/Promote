import request from '@/utils/request'

export const getSalarysList = (data) => request({ url: '/salarys/list', data, method: 'post' })
/**
 * 获取员工列表
 * **/
export const getEmployeeList = (params) => request({ url: '/sys/user', params })
export const getTips = (yearMonth) => request({ url: `/salarys/tips/${yearMonth}` })
export const getSettings = () => request({ url: '/salarys/settings' })

export const getCompanySetting = () => request({ url: '/salarys/company-settings' })
export const saveSettings = (data) => request({ url: '/salarys/settings', method: 'post', data })

export const getSalaryDetail = (userId) => request({ url: `/salarys/modify/${userId}` })
export const changeSalary = (data) => request({ url: `/salarys/modify/${data.userId}`, method: 'post', data })
export const initSalary = (data) => request({ url: `/salarys/init/${data.userId}`, method: 'post', data })
export const getArchivingList = (params) => request({ url: `/salarys/reports/${params.year}`, params })
export const getArchivingCont = (params) => request({ url: `/salarys/reports/${params.yearMonth}`, params })
export const newReport = (data) => request({ url: `/salarys/reports/${data.yearMonth}/newReport`, method: 'put', data })
export const getArchivingExport = (params) => request({ url: `/salarys/reports/${params.yearMonth}/export`, params })
export const getArchivingFirst = (params) => request({ url: `/salarys/reports/${params.yearMonth}/first`, params })
export const getArchivingArchive = (data) => request({ url: `/salarys/reports/${data.yearMonth}/archive`, data, method: 'post' })
