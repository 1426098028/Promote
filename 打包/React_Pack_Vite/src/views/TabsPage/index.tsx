import React, { Suspense, ReactNode, lazy } from 'react';
import { Tabs, TabsProps } from 'antd';

import TreePage from '../TreePage';
const NestedSubtables = lazy(() => import('../NestedSubtables'));
const GlobalConfiguration = lazy(() => import('../GlobalConfiguration'));
const L7 = lazy(() => import('../L7'));
const G = lazy(() => import('../G'));
const G6 = lazy(() => import('../G6'));
const Lodash = lazy(() => import('../Lodash'));
const JsCookie = lazy(() => import('../JsCookie'));

const TabsPage: React.FC = (): ReactNode => {
    const onChange = (key: string) => {
        console.log(key);
    };
    const items: TabsProps['items'] = [
        {
            key: 'TreePage',
            label: 'Tree 树形控件',
            children: < TreePage />,
        },
        {
            key: 'NestedSubtables',
            label: 'Table 表格',
            children: <Suspense fallback={<div>加载中...</div>}><NestedSubtables /></Suspense>,
        },
        {
            key: 'GlobalConfiguration',
            label: 'ConfigProvider 全局化配置',
            children: <Suspense fallback={<div>加载中...</div>}><GlobalConfiguration /></Suspense>,
        },
        {
            key: 'L7',
            label: 'L7',
            children: <Suspense fallback={<div>加载中...</div>}><L7 /></Suspense>,
        },
        {
            key: 'G',
            label: 'G',
            children: <Suspense fallback={<div>加载中...</div>}><G /></Suspense>,
        },
        {
            key: 'G6',
            label: 'G6',
            children: <Suspense fallback={<div>加载中...</div>}><G6 /></Suspense>,
        },
        {
            key: 'Lodash',
            label: 'Lodash',
            children: <Suspense fallback={<div>加载中...</div>}><Lodash /></Suspense>,
        },
        {
            key: 'JsCookie',
            label: 'JsCookie',
            children: <Suspense fallback={<div>加载中...</div>}><JsCookie /></Suspense>,
        },
    ];
    return (
        <Tabs size="small" defaultActiveKey="1" items={items} onChange={onChange} />
    );
};

export default TabsPage;
