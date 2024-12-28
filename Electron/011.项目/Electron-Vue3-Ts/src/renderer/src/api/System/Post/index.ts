import http from '@/utils/request';


/**
 * 岗位管理  http://doc.xuexiluxian.cn/web/#/212/1678
 * 
 * 
 * 
*/

// 岗位列表
export interface IPostPageFrom {
    current: string;
    size: string;
    postName: string;
    postCode: string;
    enabled: string;
}
export interface IPostPageResponse {
    code: string;
    msg: string;
    data: IPostPageData[];
}
export interface IPostPageData {
    total: number;
    size: number;
    current: number;
    orders: any[];
    optimizeCountSql: boolean;
    searchCount: boolean;
    countId: string | null;
    maxLimit: string | null;
    pages: number;
    records: IPostPageDataRecords[];
}
export interface IPostPageDataRecords {
    id: string;
    postName: string;
    postCode: string;
    sort: number;
    enabled: number;
    remark: string | null;
    createBy: string | null;
    createTime: string | null;
    updateBy: string | null;
    updateTime: string | null;
}
export const PostPage = (data: IPostPageFrom): Promise<IPostPageResponse> => {
    return http.get<IPostPageResponse>('/system/post/page', data, {});
};


// 删除岗位
export type IPostDeleteFrom = {
    id: string;
};
export type IPostDeleteResponse = {
    code: string;
    msg: string;
    data: string | null;
};
export const PostDelete = (data: IPostDeleteFrom): Promise<IPostDeleteResponse> => {
    return http.get<IPostDeleteResponse>(`/system/post/delete/${data}`);
};


// 岗位详情
export interface IPostDetailFrom {
    id: string;
};
export interface IPostDetailResponse {
    code: string;
    msg: string;
    data: IPostDetailData;
};
export interface IPostDetailData {
    id: string;
    postName: string;
    postCode: string;
    sort: number;
    enabled: number;
    remark: string | null;
    createBy: string | null;
    createTime: string | null;
    updateBy: string | null;
    updateTime: string | null;
};
export const PostDetail = (data: IPostDetailFrom): Promise<IPostDetailResponse> => {
    return http.get<IPostDetailResponse>(`/system/post/get/${data}`);
};

//添加岗位
export interface IPostAddFrom {
    postName: string;
    postCode: string;
    sort: number;
    enabled: number;
    remark: string;
}
export type IPostAddResponse = {
    code: string;
    msg: string;
    data: string | null;
};
export const PostAdd = (data: IPostAddFrom): Promise<IPostAddResponse> => {
    return http.post<IPostAddResponse>(`/system/post/add`, data);
};

//修改岗位
export interface IPostUpdateFrom {
    id: string;
    postName: string;
    postCode: string;
    sort: number;
    enabled: number;
    remark: string;
}
export type IPostUpdateResponse = {
    code: string;
    msg: string;
    data: string | null;
};
export const PostUpdate = (data: IPostUpdateFrom): Promise<IPostUpdateResponse> => {
    return http.post<IPostUpdateResponse>(`/system/post/update`, data);
};


// 全部岗位
export type IPostAllResponse = {
    code: string;
    msg: string;
    data: IPostAllData[];
};
export type IPostAllData = {
    id: string;
    postName: string;
    postCode: string;
    sort: number;
    enabled: number;
    remark: string | null;
    createBy: string | null;
    createTime: string | null;
    updateBy: string | null;
    updateTime: string | null;
};
export const PostAll = (data: string): Promise<IPostAllResponse> => {
    return http.get<IPostAllResponse>(`/system/post/all`);
};

// 回收站
export interface IPostRecyclebinFrom {
    size: number;
    current: number;
}
export type IPostRecyclebinResponse = {
    code: string;
    msg: string;
    data: IPostRecyclebinData;
};
export type IPostRecyclebinData = {
    total: number;
    size: number;
    current: number;
    orders: any[];
    optimizeCountSql: boolean;
    searchCount: boolean;
    countId: string | null;
    maxLimit: string | null;
    pages: number;
    records: IPostRecyclebinDataRecords[];
};
export interface IPostRecyclebinDataRecords {
    id: string;
    postName: string;
    postCode: string;
    unitId: string | null;
    sort: number;
    enabled: number;
    remark: string | null;
    delFlag: number;
    createBy: string | null;
    createTime: string | null;
    updateBy: string | null;
    updateTime: string | null;
}
export const PostRecyclebin = (data: IPostRecyclebinFrom): Promise<IPostRecyclebinResponse> => {
    return http.post<IPostRecyclebinResponse>(`/system/post/recyclebin`, data);
};


// 还原
export interface IPostRestoreResponse {
    code: string;
    msg: string;
    data: string | null;
};
export const PostRestore = (data: string[]): Promise<IPostRestoreResponse> => {
    return http.post<IPostRestoreResponse>(`/system/post/restore`, data);
};

// 清空
export interface IPostClearResponse {
    code: string;
    msg: string;
    data: string | null;
};
export const PostClear = (data: string): Promise<IPostClearResponse> => {
    return http.post<IPostClearResponse>(`/system/post/clear`, data);
};
