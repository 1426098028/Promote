import http from '@/utils/request';


/**
 * 机构管理  http://doc.xuexiluxian.cn/web/#/212/1672
 * 
 * 
 * 
*/

// 机构列表
export interface IUnitPageFrom {
    name: string;
    code: string;
    enabled: string;
}
export interface IUnitPageResponse {
    code: string;
    msg: string;
    data: IUnitPageData[];
}
export interface IUnitPageData {
    id: string;
    name: string;
    code: string;
    codeseq: string;
    contact: string;
    mobile: string;
    email: string;
    web: string;
    parentId: string;
    hasChildren: number;
    system: number;
    enabled: number;
    leaderId: string | null;
    createBy: string;
    createTime: number;
    updateBy: string | null;
    updateTime: string | null;
    address: string;
}
export const UnitPage = (data: IUnitPageFrom): Promise<IUnitPageResponse> => {
    return http.get<IUnitPageResponse>('/system/unit/list', data, {});
};

// 机构树
export interface IUnitTreeFrom {
    name: string;
    code: string;
    enabled: string;
}
export interface IUnitTreeResponse {
    code: string;
    msg: string;
    data: IUnitTreeData[];
}
export interface IUnitTreeData {
    id: string;
    name: string;
    code: string;
    codeseq: string;
    contact: string;
    mobile: string;
    email: string;
    web: string;
    parentId: string;
    hasChildren: number;
    system: number;
    enabled: number;
    leaderId: string | null;
    createBy: string;
    createTime: number;
    updateBy: string | null;
    updateTime: string | null;
    address: string;
}
export const UnitTree = (data: IUnitTreeFrom): Promise<IUnitTreeResponse> => {
    return http.get<IUnitTreeResponse>('/system/unit/tree', data, {});
};

//添加机构
export interface IUnitAddFrom {
    name: string;
    contact: string;
    mobile: string;
    email: string;
    web: string;
    parentId: string;
    enabled: number;
    leaderId: string | null;
    address: string;
}
export type IUnitAddResponse = {
    code: string;
    msg: string;
    data: string | null;
};
export const UnitAdd = (data: IUnitAddFrom): Promise<IUnitAddResponse> => {
    return http.post<IUnitAddResponse>(`/system/unit/add`, data);
};

//修改机构
export interface IUnitUpdateFrom {
    id: string;
    name: string;
    contact: string;
    mobile: string;
    email: string;
    web: string;
    parentId: string;
    enabled: number;
    leaderId: string | null;
    address: string;
}
export type IUnitUpdateResponse = {
    code: string;
    msg: string;
    data: string | null;
};
export const UnitUpdate = (data: IUnitUpdateFrom): Promise<IUnitUpdateResponse> => {
    return http.post<IUnitUpdateResponse>(`/system/unit/update`, data);
};

// 删除机构
export type IUnitDeleteFrom = {
    id: string;
};
export type IUnitDeleteResponse = {
    code: string;
    msg: string;
    data: string | null;
};
export const UnitDelete = (data: IUnitDeleteFrom): Promise<IUnitDeleteResponse> => {
    return http.get<IUnitDeleteResponse>(`/system/unit/delete/${data}`);
};


// 机构详情
export interface IUnitDetailFrom {
    id: string;
};
export interface IUnitDetailResponse {
    code: string;
    msg: string;
    data: IUnitDetailData;
};
export interface IUnitDetailData {
    id: string;
    name: string;
    code: string;
    codeseq: string;
    contact: string;
    mobile: string;
    email: string;
    web: string;
    parentId: string;
    hasChildren: number;
    system: number;
    enabled: number;
    leaderId: string | null;
    createBy: string;
    createTime: number;
    updateBy: string | null;
    updateTime: string | null;
    address: string;

};
export const UnitDetail = (data: IUnitDetailFrom): Promise<IUnitDetailResponse> => {
    return http.get<IUnitDetailResponse>(`/system/unit/get/${data}`);
};

// 回收站
export interface IUnitRecyclebinFrom {
    size: number;
    current: number;
}
export type IUnitRecyclebinResponse = {
    code: string;
    msg: string;
    data: IUnitRecyclebinData;
};
export type IUnitRecyclebinData = {
    total: number;
    size: number;
    current: number;
    orders: any[];
    optimizeCountSql: boolean;
    searchCount: boolean;
    countId: string | null;
    maxLimit: string | null;
    pages: number;
    records: IUnitRecyclebinDataRecords[];
};
export interface IUnitRecyclebinDataRecords {
    id: string;
    name: string;
    code: string;
    codeseq: string;
    contact: string;
    mobile: string;
    email: string;
    web: string;
    parentId: string;
    hasChildren: number;
    system: number;
    enabled: number;
    delFlag: number;
    leaderId: string | null;
    createBy: string;
    createTime: number;
    updateBy: string | null;
    updateTime: string | null;
    address: string;
}
export const UnitRecyclebin = (data: IUnitRecyclebinFrom): Promise<IUnitRecyclebinResponse> => {
    return http.post<IUnitRecyclebinResponse>(`/system/unit/recyclebin`, data);
};


// 还原
export interface IUnitRestoreResponse {
    code: string;
    msg: string;
    data: string | null;
};
export const UnitRestore = (data: string[]): Promise<IUnitRestoreResponse> => {
    return http.post<IUnitRestoreResponse>(`/system/unit/restore`, data);
};

// 清空
export interface IUnitClearResponse {
    code: string;
    msg: string;
    data: string | null;
};
export const UnitClear = (data: string): Promise<IUnitClearResponse> => {
    return http.post<IUnitClearResponse>(`/system/unit/clear`, data);
};
