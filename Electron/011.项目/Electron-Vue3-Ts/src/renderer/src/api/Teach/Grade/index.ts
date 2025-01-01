import http from '@/utils/request';


/**
 * 等级管理  http://doc.xuexiluxian.cn/web/#/218/2095
 * 
 * 
 * 
*/

// 等级查询
export interface IGradeAllFrom {
    subjectId: string;
}
export interface IGradeAllResponse {
    code: string;
    msg: string;
    data: IGradeAllData;

}
export interface IGradeAllData {
    total: number;
    size: number;
    current: number;
    orders: any[];
    optimizeCountSql: boolean;
    searchCount: boolean;
    countId: string | null;
    maxLimit: string | null;
    pages: number;
    records: IIGradeAllDataRecords[];
}
export interface IIGradeAllDataRecords {
    id: string;
    subjectId: string;
    gradeName: string;
    amount: number;
    protocol: string;
    enabled: number;
    delFlag: number;
    createBy: string;
    createTime: number;
    updateBy: string | null;
    updateTime: string | null;
}
export const GradeAll = (data: IGradeAllFrom): Promise<IGradeAllResponse> => {
    return http.get<IGradeAllResponse>('/crm/teach/grade/all', data, {});
};

// 等级列表
export interface IGradePageFrom {
    size: string;
    current: string;
    subjectName: string;
    gradeName: string;
}
export interface IGradePageResponse {
    code: string;
    msg: string;
    data: IGradePageData[];
}
export interface IGradePageData {
    total: number;
    size: number;
    current: number;
    orders: any[];
    optimizeCountSql: boolean;
    searchCount: boolean;
    countId: string | null;
    maxLimit: string | null;
    pages: number;
    records: IGradePageDataRecords[];
}
export interface IGradePageDataRecords {
    id: string;
    subjectId: string;
    gradeName: string;
    amount: number;
    protocol: string;
    enabled: number;
    delFlag: number;
    createBy: string;
    createTime: number;
    updateBy: string | null;
    updateTime: string | null;
}
export const GradePage = (data: IGradePageFrom): Promise<IGradePageResponse> => {
    return http.get<IGradePageResponse>('/crm/teach/grade/list', data, {});
};



//添加等级
export interface IGradeAddFrom {
    gradeName: string;
    amount: number;
    enabled: number;
    subjectId: string;
    protocol: string;
}
export type IGradeAddResponse = {
    code: string;
    msg: string;
    data: string | null;
};
export const GradeAdd = (data: IGradeAddFrom): Promise<IGradeAddResponse> => {
    return http.post<IGradeAddResponse>(`/crm/teach/grade/add`, data);
};

//修改等级
export interface IGradeUpdateFrom {
    gradeName: string;
    id: string;
    enabled: number;
    subjectId: string;
    protocol: string;
    amount: number;
}
export type IGradeUpdateResponse = {
    code: string;
    msg: string;
    data: string | null;
};
export const GradeUpdate = (data: IGradeUpdateFrom): Promise<IGradeUpdateResponse> => {
    return http.post<IGradeUpdateResponse>(`/crm/teach/grade/update`, data);
};

// 删除等级
export type IGradeDeleteFrom = {
    id: string;
};
export type IGradeDeleteResponse = {
    code: string;
    msg: string;
    data: string | null;
};
export const GradeDelete = (data: IGradeDeleteFrom): Promise<IGradeDeleteResponse> => {
    return http.get<IGradeDeleteResponse>(`/crm/teach/grade/delete/${data}`);
};


// 等级详情
export interface IGradeDetailFrom {
    id: string;
};
export interface IGradeDetailResponse {
    code: string;
    msg: string;
    data: IGradeDetailData;
};
export interface IGradeDetailData {
    id: string;
    subjectId: string;
    gradeName: string;
    amount: number;
    protocol: string;
    enabled: number;
    delFlag: number;
    createBy: string;
    createTime: number;
    updateBy: string | null;
    updateTime: string | null;
};
export const GradeDetail = (data: IGradeDetailFrom): Promise<IGradeDetailResponse> => {
    return http.get<IGradeDetailResponse>(`/crm/teach/grade/get/${data}`);
};

// 回收站
export interface IGradeRecyclebinFrom {
    size: number;
    current: number;
}
export type IGradeRecyclebinResponse = {
    code: string;
    msg: string;
    data: IGradeRecyclebinData;
};
export type IGradeRecyclebinData = {
    total: number;
    size: number;
    current: number;
    orders: any[];
    optimizeCountSql: boolean;
    searchCount: boolean;
    countId: string | null;
    maxLimit: string | null;
    pages: number;
    records: IGradeRecyclebinDataRecords[];
};
export interface IGradeRecyclebinDataRecords {
    id: string;
    subjectId: string;
    gradeName: string;
    amount: number;
    protocol: string;
    enabled: number;
    delFlag: number;
    createBy: string;
    createTime: number;
    updateBy: string | null;
    updateTime: string | null;
}
export const GradeRecyclebin = (data: IGradeRecyclebinFrom): Promise<IGradeRecyclebinResponse> => {
    return http.post<IGradeRecyclebinResponse>(`/crm/teach/grade/rubbish`, data);
};


// 还原
export interface IGradeRestoreResponse {
    code: string;
    msg: string;
    data: string | null;
};
export const GradeRestore = (data: string[]): Promise<IGradeRestoreResponse> => {
    return http.post<IGradeRestoreResponse>(`/crm/teach/grade/restore`, data);
};

// 清空
export interface IGradeClearResponse {
    code: string;
    msg: string;
    data: string | null;
};
export const GradeClear = (data: string): Promise<IGradeClearResponse> => {
    return http.post<IGradeClearResponse>(`/crm/teach/grade/clear`, data);
};
