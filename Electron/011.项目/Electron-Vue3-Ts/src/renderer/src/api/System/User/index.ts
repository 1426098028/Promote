import http from '@/utils/request';


/**
 * 用户管理  http://doc.xuexiluxian.cn/web/#/212/1735
 * 
 * 
 * 
*/

// 用户列表

export interface IUserPageFrom {
    current: string;
    size: string;
    username: string;
    realName: string;
    email: string;
    phone: string;
    gender: string;
    enabled: string;
    unitId: string;
}
export interface IUserPageResponse {
    code: string;
    msg: string;
    data: IUserPageData;

}
export interface IUserPageData {
    total: number;
    size: number;
    current: number;
    orders: any[];
    optimizeCountSql: boolean;
    searchCount: boolean;
    countId: string | null;
    maxLimit: string | null;
    pages: number;
    records: IUserPageDataRecords[];
}
export interface IUserPageDataRecords {
    id: string;
    username: string;
    realName: string;
    userType: number;
    email: string;
    phone: string;
    gender: number;
    avatar: string;
    enabled: number;
    delFlag: number;
    loginIp: string;
    loginDate: number;
    createBy: string | null;
    createTime: number;
    updateBy: string;
    updateTime: number;
    remark: string | null;
}
export const UserPage = (data: IUserPageFrom): Promise<IUserPageResponse> => {
    return http.get<IUserPageResponse>('/system/user/page', data, {});
};


// 删除用户
export type IUserDeleteFrom = {
    id: string;
};
export type IUserDeleteResponse = {
    code: string;
    msg: string;
    data: string | null;
};
export const UserDelete = (data: IUserDeleteFrom): Promise<IUserDeleteResponse> => {
    return http.get<IUserDeleteResponse>(`/system/user/delete/${data}`);
};


// 用户详情
export interface IUserDetailFrom {
    id: string;
};
export interface IUserDetailResponse {
    code: string;
    msg: string;
    data: IUserDetailData;
};
export interface IUserDetailData {
    roleIds: string[];
    postIds: string[];
    user: IUserDetailDataUser;
};
export interface IUserDetailDataUser {
    id: string;
    username: string;
    realName: string;
    userType: number;
    email: string;
    phone: string;
    gender: number;
    avatar: string;
    enabled: number;
    delFlag: number;
    loginIp: string;
    loginDate: number;
    createBy: string | null;
    createTime: number;
    updateBy: string;
    updateTime: number;
    remark: string | null;
};
export const UserDetail = (data: IUserDetailFrom): Promise<IUserDetailResponse> => {
    return http.get<IUserDetailResponse>(`/system/user/get/${data}`);
};

//添加用户

export interface IUserAddFrom {
    username: string;
    password: string;
    realName: string;
    email: string;
    gender: number;
    avatar: string;
    remark: string;
    phone: string;
    enabled: number;
    roleIds: string[];
    postIds: string[];
    unitId: string;
}
export type IUserAddResponse = {
    code: string;
    msg: string;
    data: string | null;
};
export const UserAdd = (data: IUserAddFrom): Promise<IUserAddResponse> => {
    return http.post<IUserAddResponse>(`/system/user/add`, data);
};

//修改用户
export interface IUserUpdateFrom {
    id: string;
    username: string;
    password: string;
    realName: string;
    email: string;
    gender: number;
    avatar: string;
    remark: string;
    phone: string;
    enabled: number;
    roleIds: string[];
    postIds: string[];
    unitId: string;
}
export type IUserUpdateResponse = {
    code: string;
    msg: string;
    data: string | null;
};
export const UserUpdate = (data: IUserUpdateFrom): Promise<IUserUpdateResponse> => {
    return http.post<IUserUpdateResponse>(`/system/user/update`, data);
};


// 用户选中角色
export type IUserCheckedFrom = {
    id: string;
};
export type IUserCheckedResponse = {
    code: string;
    msg: string;
    data: IUserCheckedData;
};
export type IUserCheckedData = {
    checkedRoleIds: string[];
    roles: IUserCheckedDataRoles[];
};
export type IUserCheckedDataRoles = {
    id: string;
    roleName: string;
    rolePerm: string;
    unitId: string;
    dataPrivileges: number;
    enabled: number;
    createBy: string | null;
    createTime: number;
    updateBy: string | null;
    updateTime: string | null;
    descript: string | null;
};
export const UserChecked = (data: IUserCheckedFrom): Promise<IUserCheckedResponse> => {
    return http.get<IUserCheckedResponse>(`/system/user/checked/${data}`);
};

// 重置密码
export interface IUserResetFrom {
    id: string;
}
export type IUserResetResponse = {
    code: string;
    msg: string;
    data: string | null;
};
export const UserReset = (data: IUserResetFrom): Promise<IUserResetResponse> => {
    return http.get<IUserResetResponse>(`/system/user/reset/${data}`);
};


// 授权角色
export interface IUserGrantFrom {
    userId: string;
    roleId: string;
}
export type IUserGrantResponse = {
    code: string;
    msg: string;
    data: string | null;
};
export const UserGrant = (data: IUserGrantFrom[]): Promise<IUserGrantResponse> => {
    return http.post<IUserGrantResponse>(`/system/user/grant`, data);
};


// 回收站
export interface IUserRecyclebinFrom {
    size: number;
    current: number;
}
export type IUserRecyclebinResponse = {
    code: string;
    msg: string;
    data: IUserRecyclebinData;
};
export type IUserRecyclebinData = {
    total: number;
    size: number;
    current: number;
    orders: any[];
    optimizeCountSql: boolean;
    searchCount: boolean;
    countId: string | null;
    maxLimit: string | null;
    pages: number;
    records: IUserRecyclebinDataRecords[];
};
export interface IUserRecyclebinDataRecords {
    id: string;
    username: string;
    realName: string;
    userType: number;
    email: string;
    phone: string;
    gender: number;
    avatar: string;
    enabled: number;
    systemed: number;
    unitId: string | null;
    delFlag: number;
    loginIp: string;
    loginDate: number;
    createBy: string | null;
    createTime: number;
    updateBy: string;
    updateTime: number;
    remark: string | null;
}
export const UserRecyclebin = (data: IUserRecyclebinFrom): Promise<IUserRecyclebinResponse> => {
    return http.post<IUserRecyclebinResponse>(`/system/user/recyclebin`, data);
};


// 还原
export interface IUserRestoreResponse {
    code: string;
    msg: string;
    data: string | null;
};
export const UserRestore = (data: string[]): Promise<IUserRestoreResponse> => {
    return http.post<IUserRestoreResponse>(`/system/user/restore`, data);
};

// 清空
export interface IUserClearResponse {
    code: string;
    msg: string;
    data: string | null;
};
export const UserClear = (data: string): Promise<IUserClearResponse> => {
    return http.post<IUserClearResponse>(`/system/user/clear`, data);
};
