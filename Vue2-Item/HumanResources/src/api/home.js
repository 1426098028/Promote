import request from '@/utils/request'

// 获取首页数据
export const getHomeData = (data) => request({ url: '/home/data', method: 'get', params: data })

// 获取消息列表
export const getMessageList = (data) => request({ url: '/home/notice', method: 'get', params: data })
