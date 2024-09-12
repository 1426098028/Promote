import request from '@/utils/request';

export const loginByJson = (data) => {
    return request({
        url: '/u/loginByJson',
        method: 'post', // 默认值
        data
    });
};
