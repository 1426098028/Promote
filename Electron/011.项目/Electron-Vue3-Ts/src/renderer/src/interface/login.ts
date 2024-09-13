
// 定义账号密码登录接口数据结构
export interface UserRuleFrom {
    username: string;
    password: string;
    key: string;
    captcha: string;
}

// 账号密码登录返回数据结构
export interface UserNameRequest{
    code:number;
    data?:string;
    msg?:string;
}
