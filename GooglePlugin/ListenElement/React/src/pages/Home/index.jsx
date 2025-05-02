import { Tabs } from 'antd';
import TableMonitor from '@/pages/TableMonitor'
import FixedElements from '@/pages/FixedElements'
import HomeCss from '@/pages/Home/index.module.less'

export default function Home() {
  const TabsList = [
    {
      label: '表格监控',
      key: 'TableMonitor',
      children: <TableMonitor />,
    },
    {
      label: '固定元素',
      key: 'FixedElements',
      children: <FixedElements />,
    },
  ];
  return (
    <Tabs className={HomeCss.Home} defaultActiveKey="TableMonitor" items={TabsList} />
  );
};
