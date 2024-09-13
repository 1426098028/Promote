import request from '@/utils/request';
import { UserRuleFrom, UserNameRequest } from '@/interface/login';

// 账号密码登录
export const loginByJson = (data: UserRuleFrom): Promise<UserNameRequest> => {
    return request({ url: '/u/loginByJson', method: 'post', data, });
};

// 图形验证码
export const captchaImage = (params: { key: string; }): Promise<ArrayBuffer> => {
    return request({ url: '/captcha/image', method: 'get', params, responseType: 'arraybuffer', });
};
