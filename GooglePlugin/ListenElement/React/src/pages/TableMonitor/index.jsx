import { useEffect, useState } from 'react';
import { message, Button, Tooltip } from 'antd';
import TableForm from '@/components/TableForm';
import SelectElement from '@/components/SelectElement';
import ColConfig from '@/pages/TableMonitor/ColConfig'
import { TestSelector } from '@/Util/TestSelector'
import TableMonitorCss from '@/pages/TableMonitor/index.module.less'


export default function TableMonitor() {
  const [editableKeys, setEditableRowKeys] = useState([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const TargetType = 'Table'
  const columns = [
    {
      title: '监控名称',
      dataIndex: 'MonitorName',
      tooltip: '只读，使用form.getFieldValue获取不到值',
      align: 'center',
      ellipsis: true,
      formItemProps: { rules: [{ required: true, message: '此项为必填项' }] },
    },
    {
      title: '选择表格',
      dataIndex: 'MonitorTable',
      tooltip: '只读，使用form.getFieldValue获取不到值',
      align: 'center',
      ellipsis: true,
      renderFormItem: () => <SelectElement TargetType={TargetType} />,
      // render: (text, { MonitorTable: { tbody, thead } = { tbody: [], thead: [] } }, _, action) => <Tooltip fresh placement="top" title={tbody?.join(' > ')}>{tbody?.join(' > ')}</Tooltip>,
      render: (text, { MonitorTable: { tbody, thead } = { tbody: { Selector: "" }, thead: { Selector: "" } } }, _, action) => <Tooltip fresh placement="top" title={tbody?.Selector}>{tbody?.Selector}</Tooltip>,
    },
    {
      initialValue: true,
      title: '状态',
      dataIndex: 'MonitorState',
      valueType: 'switch',
      align: 'center',
      fieldProps: { checkedChildren: "启用", unCheckedChildren: "禁用", },
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (text, { _id, MonitorTable }, _, action) => [
        <a key="TestSelector" onClick={() => { TestSelector(MonitorTable, TargetType) }}  >    测试  </a>,
        <a key="editable" onClick={() => { action?.startEditable?.(_id); }}    >      编辑    </a>,
        <a key="delete" onClick={() => onDel(_id)}>      删除    </a>,
      ],
    },
  ];

  const onDel = async (_id) => {
    const success = true
    const NewdataSource = dataSource.filter(item => item._id !== _id)
    setDataSource(NewdataSource)
    message[success ? 'success' : 'error']('成功');
  };
  const onExpand = (expanded, { _id }) => {
    if (editableKeys.length !== 0) return setExpandedRowKeys([])
    expanded ? setExpandedRowKeys([_id]) : setExpandedRowKeys([])
  };
  useEffect(() => {
    editableKeys.length !== 0 && setExpandedRowKeys([])
  }, [editableKeys])
  return (
    <TableForm
      FormTitle={() => <> </>}
      columns={columns}
      expandable={{
        onExpand,
        expandedRowKeys,
        expandedRowRender: (CurrentItem) => <ColConfig />,
      }}
      dataSource={dataSource}
      editableKeys={editableKeys}
      onSave={async (rowKey, { MonitorName, MonitorTable, MonitorState, index, _id }) => {
        const success = true
        return Promise[success ? 'resolve' : 'reject']('成功');
      }}
      dataSourceChange={setDataSource}
      editableKeysChange={setEditableRowKeys}
    />
  );
};
