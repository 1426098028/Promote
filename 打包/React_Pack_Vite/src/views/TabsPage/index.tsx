import React, { ReactNode } from 'react';
import { Tabs, TabsProps } from 'antd';

import TreePage from '../TreePage';
import NestedSubtables from '../NestedSubtables';
import GlobalConfiguration from '../GlobalConfiguration';
import L7 from '../L7';
import G from '../G';
import G6 from '../G6';
import Lodash from '../Lodash';
import JsCookie from '../JsCookie';

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
            children: <NestedSubtables />,
        },
        {
            key: 'GlobalConfiguration',
            label: 'ConfigProvider 全局化配置',
            children: <GlobalConfiguration />,
        },
        {
            key: 'L7',
            label: 'L7',
            children: <L7 />,
        },
        {
            key: 'G',
            label: 'G',
            children: <G />,
        },
        {
            key: 'G6',
            label: 'G6',
            children: <G6 />,
        },
        {
            key: 'Lodash',
            label: 'Lodash',
            children: <Lodash />,
        },
        {
            key: 'JsCookie',
            label: 'JsCookie',
            children: <JsCookie />,
        },
    ];
    return (
        <Tabs size="small" defaultActiveKey="1" items={items} onChange={onChange} />
    );
};

export default TabsPage;
