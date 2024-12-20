/**
 * 
 * 登录相关接口
 * 
*/
export interface ILoginRequest {
    code: string;
    msg: string;
    data?: string | null;
}

// 定义账号密码登录接口数据结构
export interface UserRuleFrom {
    username: string;
    password: string;
    key: string;
    captcha: string;
}

//发送验证码
export interface PhoneCodeForm {
    mobile: string;
}

//手机验证码登录
export interface PhoneRuleForm {
    mobile: string;
    captcha: string;
}
