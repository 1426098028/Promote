import http from '@/utils/request';


/**
 * 科目管理  http://doc.xuexiluxian.cn/web/#/218/1895
 * 
 * 
 * 
*/

// 科目列表


export interface ISubjectAllResponse {
    code: string;
    msg: string;
    data: ISubjectAllData;

}
export interface ISubjectAllData {
    id: string;
    subjectName: string;
    enabled: number;
    createBy: string | null;
    createTime: number;
    updateBy: string;
    updateTime: number;
}
export const SubjectAll = (data: string): Promise<ISubjectAllResponse> => {
    return http.get<ISubjectAllResponse>('/crm/teach/subject/all', data, {});
};

// 科目列表

export interface ISubjectPageFrom {
    current: string;
    size: string;
    subjectName: string;
    enabled: string;
}
export interface ISubjectPageResponse {
    code: string;
    msg: string;
    data: ISubjectPageData;

}
export interface ISubjectPageData {
    total: number;
    size: number;
    current: number;
    orders: any[];
    optimizeCountSql: boolean;
    searchCount: boolean;
    countId: string | null;
    maxLimit: string | null;
    pages: number;
    records: ISubjectPageDataRecords[];
}
export interface ISubjectPageDataRecords {
    id: string;
    subjectName: string;
    enabled: number;
    createBy: string | null;
    createTime: number;
    updateBy: string;
    updateTime: number;
}
export const SubjectPage = (data: ISubjectPageFrom): Promise<ISubjectPageResponse> => {
    return http.get<ISubjectPageResponse>('/crm/teach/subject/page', data, {});
};


// 删除科目
export type ISubjectDeleteFrom = {
    id: string;
};
export type ISubjectDeleteResponse = {
    code: string;
    msg: string;
    data: string | null;
};
export const SubjectDelete = (data: ISubjectDeleteFrom): Promise<ISubjectDeleteResponse> => {
    return http.get<ISubjectDeleteResponse>(`/crm/teach/subject/delete/${data}`);
};


// 科目详情
export interface ISubjectDetailFrom {
    id: string;
};
export interface ISubjectDetailResponse {
    code: string;
    msg: string;
    data: ISubjectDetailData;
};
export interface ISubjectDetailData {
    id: string;
    subjectName: string;
    enabled: number;
    createBy: string | null;
    createTime: number;
    updateBy: string;
    updateTime: number;
};
export const SubjectDetail = (data: ISubjectDetailFrom): Promise<ISubjectDetailResponse> => {
    return http.get<ISubjectDetailResponse>(`/crm/teach/subject/get/${data}`);
};

//添加科目
export interface ISubjectAddFrom {
    subjectName: string;
    enabled: number;
}
export type ISubjectAddResponse = {
    code: string;
    msg: string;
    data: string | null;
};
export const SubjectAdd = (data: ISubjectAddFrom): Promise<ISubjectAddResponse> => {
    return http.post<ISubjectAddResponse>(`/crm/teach/subject/add`, data);
};

//修改科目
export interface ISubjectUpdateFrom {
    id: string;
    subjectName: string;
    amount: number;
    protocol: string;
    enabled: string;
}
export type ISubjectUpdateResponse = {
    code: string;
    msg: string;
    data: string | null;
};
export const SubjectUpdate = (data: ISubjectUpdateFrom): Promise<ISubjectUpdateResponse> => {
    return http.post<ISubjectUpdateResponse>(`/crm/teach/subject/update`, data);
};

//导出科目
export interface ISubjectExportFrom {
    subjectName: string;
    enabled: string;
}
export type ISubjectExportFromResponse = {
    code: string;
    msg: string;
    data: string | null;
};
export const SubjectExport = (data: ISubjectExportFrom): Promise<ISubjectExportFromResponse> => {
    return http.get<ISubjectExportFromResponse>(`/crm/teach/subject/export`, data);
};




// 回收站
export interface ISubjectRecyclebinFrom {
    size: number;
    current: number;
}
export type ISubjectRecyclebinResponse = {
    code: string;
    msg: string;
    data: ISubjectRecyclebinData;
};


export interface ISubjectRecyclebinData {
    total: number;
    size: number;
    current: number;
    orders: any[];
    optimizeCountSql: boolean;
    searchCount: boolean;
    countId: string | null;
    maxLimit: string | null;
    pages: number;
    records: ISubjectRecyclebinDataRecords[];
}
export interface ISubjectRecyclebinDataRecords {
    id: string;
    subjectName: string;
    enabled: number;
    createBy: string | null;
    createTime: number;
    updateBy: string;
    updateTime: number;
}
export const SubjectRecyclebin = (data: ISubjectRecyclebinFrom): Promise<ISubjectRecyclebinResponse> => {
    return http.post<ISubjectRecyclebinResponse>(`/crm/teach/subject/rubbish`, data);
};


// 还原
export interface ISubjectRestoreResponse {
    code: string;
    msg: string;
    data: string | null;
};
export const SubjectRestore = (data: string[]): Promise<ISubjectRestoreResponse> => {
    return http.post<ISubjectRestoreResponse>(`/crm/teach/subject/restore`, data);
};

// 清空
export interface ISubjectClearResponse {
    code: string;
    msg: string;
    data: string | null;
};
export const SubjectClear = (data: string): Promise<ISubjectClearResponse> => {
    return http.post<ISubjectClearResponse>(`/crm/teach/subject/clear`, data);
};
