import http from '@/utils/request';

export interface Irole {
    current: string;
    size: string;
    roleName?: string;
    rolePerm?: string;
    enabled?: string;
}

export interface Role {
    id: string;
    roleName: string;
    rolePerm: string;
    unitId: string;
    dataPrivileges: number;
    enabled: number;
    createBy: string | null;
    createTime: number | null;
    updateBy: string | null;
    updateTime: number | null;
    descript: string | null;
}

export interface IroleApiResponse {
    code: string;
    msg: string;
    data: {
        records: Role[];
        total: number;
        size: number;
        current: number;
        orders: any[];
        optimizeCountSql: boolean;
        searchCount: boolean;
        countId: string | null;
        maxLimit: number | null;
        pages: number;
    };
}
// 角色列表
export const rolePage = (data: Irole): Promise<IroleApiResponse> => {
    return http.get<IroleApiResponse>('/system/role/page', data, {});
};
