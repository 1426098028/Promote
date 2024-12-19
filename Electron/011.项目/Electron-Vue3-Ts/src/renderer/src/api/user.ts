import http from '@/utils/request';
import { IUserData, IMenuData } from '@/interface/user';

/**
 * 
 * 用户相关接口
 * 
*/


// 个人信息
export const getInfo = (params: { key: string; }): Promise<IUserData> => {
    return http.get<IUserData>('/personal/getInfo', params, {});
};

// 获取路由
export const getUserMenu = (params: string): Promise<IMenuData> => {
    return http.get<IMenuData>(`/personal/getRouters/${params}`);
};

