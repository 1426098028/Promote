import request from '@/utils/request';
import { UserRuleFrom, PhoneCodeForm, PhoneRuleForm } from '@/interface/login';

interface ILoginRequest {
    code: string;
    msg: string;
    data?: string | null;
}


// 账号密码登录
export const loginByJson = (data: UserRuleFrom): Promise<ILoginRequest> => {
    return request({ url: '/u/loginByJson', method: 'post', data, });
};

// 图形验证码
export const captchaImage = (params: { key: string; }): Promise<ArrayBuffer> => {
    return request({ url: '/captcha/image', method: 'get', params, responseType: 'arraybuffer', });
};


// 登录动态验证码
export const sendRegisterOrLoginCaptcha = (params: PhoneCodeForm): Promise<ILoginRequest> => {
    return request({ url: '/captcha/sendRegisterOrLoginCaptcha', method: 'get', params, });
};

// 手机验证码登录
export const loginByMobile = (data: PhoneRuleForm): Promise<ILoginRequest> => {
    return request({ url: '/u/loginByMobile', method: 'POST', data, });
};
