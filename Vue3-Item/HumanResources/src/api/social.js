import request from '@/utils/request'

export const getArchivingCont = (params) => request({ url: `/social_securitys/historys/${params.month}`, params })

export const getArchivingList = (data) => request({ url: `/social_securitys/historys/${data.year}/list`, data })
export const newReport = (data) => request({ url: `/social_securitys/historys/${data.yearMonth}/newReport`, method: 'put', data })
export const getHistorysData = (data) => request({ url: `/social_securitys/historys/archiveDetail/${data.userId}/${data.yearMonth}`, data })
export const getArchivingExport = (data) => request({ url: `/social_securitys/historys/${data.yearMonth}/export`, data })
export const getArchivingFirst = (data) => request({ url: `/social_securitys/historys/${data.yearMonth}/first`, data })
export const getSocialList = (data) => request({ url: '/social_securitys/list', method: 'post', data })
export const getArchivingArchive = (data) => request({ url: `/social_securitys/historys/${data.yearMonth}/archive`, method: 'post', data })

export const getTips = (yearMonth) => request({ url: `/social_securitys/tips/${yearMonth}` })
export const saveContent = (data) => request({ url: `/social_securitys/${data.userId}`, method: 'put', data })
export const getContent = (userId) => request({ url: `/social_securitys/${userId}` })
export const getPaymentItemList = (id) => request({ url: `/social_securitys/payment_item/${id}` })
export const getSettings = () => request({ url: '/social_securitys/settings' })
export const saveSettings = (data) => request({ url: '/social_securitys/settings', data, method: 'post' })
