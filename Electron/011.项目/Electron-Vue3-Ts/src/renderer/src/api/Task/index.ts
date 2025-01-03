import http from '@/utils/request';


/**
 * 任务管理  http://doc.xuexiluxian.cn/web/#/218/1854
 * 
 * 
*/


// 任务列表
export interface ITaskPageFrom {
    size: string;
    current: string;
    taskName: string;
    status: string;
}
export interface ITaskPageResponse {
    code: string;
    msg: string;
    data: ITaskPageData[];
}
export interface ITaskPageData {
    total: number;
    size: number;
    current: number;
    orders: any[];
    optimizeCountSql: boolean;
    searchCount: boolean;
    countId: string | null;
    maxLimit: string | null;
    pages: number;
    records: ITaskPageDataRecords[];
}
export interface ITaskPageDataRecords {
    id: string;
    taskName: string;
    taskContent: string | null;
    downloadUrl: string;
    status: number;
    errorLog: string | null;
    createBy: string;
    createTime: number;
    updateBy: string | null;
    updateTime: string | null;
}
export const TaskPage = (data: ITaskPageFrom): Promise<ITaskPageResponse> => {
    return http.get<ITaskPageResponse>('/crm/task/page', data, {});
};



// 删除任务
export type ITaskDeleteFrom = {
    id: string;
};
export type ITaskDeleteResponse = {
    code: string;
    msg: string;
    data: string | null;
};
export const TaskDelete = (data: ITaskDeleteFrom): Promise<ITaskDeleteResponse> => {
    return http.get<ITaskDeleteResponse>(`/crm/task/delete/${data}`);
};

// 批量删除
export type ITaskBatchDeleteResponse = {
    code: string;
    msg: string;
    data: string | null;
};
export const TaskBatchDelete = (data: string[]): Promise<ITaskBatchDeleteResponse> => {
    return http.post<ITaskBatchDeleteResponse>(`/crm/task/deleteBatch/`, data);
};
