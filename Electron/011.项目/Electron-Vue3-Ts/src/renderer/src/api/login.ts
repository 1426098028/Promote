import http from '@/utils/request';
import { UserRuleFrom, PhoneCodeForm, PhoneRuleForm } from '@/interface/login';
/**
 * 
 * 登录相关接口
 * 
*/
interface ILoginRequest {
    code: string;
    msg: string;
    data?: string | null;
}


// 账号密码登录
export const loginByJson = (data: UserRuleFrom): Promise<ILoginRequest> => {
    return http.post<ILoginRequest>('/u/loginByJson', data, {});
};

// 图形验证码
export const captchaImage = (params: { key: string; }): Promise<ArrayBuffer> => {
    return http.get<ArrayBuffer>('/captcha/image', params, { responseType: 'arraybuffer', });
};


// 登录动态验证码
export const sendRegisterOrLoginCaptcha = (params: PhoneCodeForm): Promise<ILoginRequest> => {
    return http.get<ILoginRequest>('/captcha/sendRegisterOrLoginCaptcha', params, {});
};

// 手机验证码登录
export const loginByMobile = (data: PhoneRuleForm): Promise<ILoginRequest> => {
    return http.post<ILoginRequest>('/u/loginByMobile', data, {});
};
