export interface User {
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
    remark: string | null;
}

export interface Permission {
    [index: number]: string;
}

export interface Unit {
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
    createTime: number | null;
    updateBy: string | null;
    updateTime: number | null;
    address: string;
}

export interface Role {
    id: string;
    roleName: string;
    rolePerm: string;
}

export interface IUserData {
    code: string;
    msg: string;
    data: {
        userInfo: User;
        permissions: Permission;
        units: Unit;
        roles: Role[];
    };
}


//关于路由
export interface Meta {
    title: string;
    icon: string;
    noCache: boolean;
    link: string | null;
}

export interface Child {
    id: string;
    name: string;
    path: string;
    hidden: boolean;
    component: string;
    meta: Meta;
}

export interface Parent {
    id: string;
    name: string;
    hidden: boolean;
    redirect: string;
    component: string;
    alwaysShow: boolean;
    query: string;
    path: string;
    meta: Meta;
    children: Child[];
}

export interface IMenuData {
    code: string;
    msg: string;
    data: Parent[];
}
