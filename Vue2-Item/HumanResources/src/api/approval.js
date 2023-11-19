import request from '@/utils/request'

export const getApprovalList = (data) => request({ url: `/user/process/instance/${data.page}/${data.pageSize}`, method: 'put', data })

// 获取审批信息
export const getInformation = (id) => request({ url: `/user/process/instance/getById/${id}` })
export const getReviewHistory = (id) => request({ url: `/approvals/flows/${id}` })
export const process = (data) => request({ url: '/approvals/process', method: 'post', data })
export const getSetState = (params) => request({ url: '/approvals/setting', params })

// 保存状态
export const saveSetState = (data) => request({ url: '/approvals/setting', method: 'put', data })

// 获取流程详情
export const getApprovalsDetail = (id) => request({ url: `/user/process/instance/${id}` })

// 获取流程详情
export const getApprovalsTaskDetail = (id) => request({ url: `/user/process/instance/tasks/${id}` })

// 下载图片
export const downImg = (picture_id) => request({ url: `//user/process/buss/showBussImgById/${picture_id}` })

// 获取流程列表
export const getFlowList = (params) => request({ url: `/user/process/definition`, params })
export const suspend = (params) => request({ url: `/user/process/suspend/${params.processKey}`, params })
export const startProcess = (data) => request({ url: `/user/process/startProcess`, data, method: 'post' })
export const applyeLave = (data) => request({ url: `/user/process_leave/startProcess`, data, method: 'post' })

// 驳回
export const approvalsReject = (data) => request({ url: `/user/approvals/${data.id}/reject`, method: 'put', data })
// 删除
export const approvalsDel = (id) => request({ url: `/user/approvals/${id}`, method: 'delete' })
// 同意
export const approvalsPass = (data) => request({ url: '/user/process/instance/commit', method: 'put', data })
export const applyDimission = (data) => request({ url: '/user/process_dimission/startProcess', method: 'post', data })
export const applyOvertime = (data) => request({ url: '/user/process_overtime/startProcess', method: 'post', data })
export const exportApprovals = (data) => request({ url: `/approvals/export/${data.month}`, data })

export const updateUser = (data) => request({ url: `/sys/user/${data.id}`, method: 'put', data })
