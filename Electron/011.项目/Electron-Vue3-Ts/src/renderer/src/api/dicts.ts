import http from '@/utils/request';



export interface IDicts {
    code: string;
    msg: string;
    data: Dicts;
}


export type Dicts = {
    'system_global_gender': DictsItem[];
};
export type DictsItem = {
    id: string,
    typeId: string,
    k: string,
    v: string,
    sort: number,
    remark: string,
    createBy: string,
    createTime: number,
    updateBy: string | null,
    updateTime: string | null,
};


/**
 * 
 * 字典相关接口
 * 
*/


// 查询字典项（批量）
export const queryBatch = (data: { key: string; }): Promise<IDicts> => {
    return http.post<IDicts>('/system/dict/item/queryBatch', data, {});
};
