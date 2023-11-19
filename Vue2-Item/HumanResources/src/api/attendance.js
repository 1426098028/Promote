import request from '@/utils/request'
// 获取考勤列表
export const getAttendancesList = (params) => request({ url: '/attendances', params })
// 获取考勤详情
export const getAtteArchiveDetail = (data) => request({ url: `/attendances/archive/${data.userId}/${data.yearMonth}` })
export const updateAttendance = (data) => request({ url: `/attendances/${data.userId}`, method: 'put', data })
export const getArchivingList = (params) => request({ url: '/attendances/reports/year', params })
export const getArchivingCont = (params) => request({ url: `/attendances/reports/${params.atteArchiveMonthlyId}`, params })

export const importArchive = (data) => request({ url: '/archive/atte/export', method: 'post', data })
// 提醒接口
export const notify = () => request({ url: '/notify/mail', method: 'post' })
export const archives = (params) => request({ url: '/attendances/archives', params })
export const newReports = (params) => request({ url: '/attendances/newReports', params })
export const information = () => request({})


export const pay = () => request({})

export const reportFormList = (params) => request({ url: '/attendances/reports', params })

// 请假保存
export const leaveSave = (data) => request({ url: '/cfg/leave', method: 'put', data })
// 请假获取
export const getLeave = (data) => request({ url: '/cfg/leave/list', method: 'post', data })
// 扣款设置保存
export const deductionsSave = (data) => request({ url: '/cfg/deduction', method: 'put', data })
// 获取扣款设置
export const getDeductions = (data) => request({ url: '/cfg/ded/list', method: 'post', data })

// 加班配置保存
export const overtimeSave = (data) => request({ url: '/cfg/extDuty', method: 'put', data })

// 获取加班配置
export const getOvertime = (data) => request({ url: '/cfg/extDuty/item', method: 'post', data })
// 考勤数据保存
export const attendanceSave = (data) => request({ url: '/cfg/atte', method: 'put', data })
// 考勤数据保存
export const getAttendance = (data) => request({ url: '/cfg/atte/item', method: 'post', data })
export const fileUpdate = (data) => request({ url: `/employee/archives/${data.month}`, method: 'put', data })
