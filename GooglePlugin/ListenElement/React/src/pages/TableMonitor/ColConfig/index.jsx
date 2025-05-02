import { useEffect, useState } from 'react';
import { message, Tooltip } from 'antd';
import TableForm from '@/components/TableForm';
import SelectElement from '@/components/SelectElement';
import { TestSelector } from '@/Util/TestSelector'
import ColConfigCss from '@/pages/TableMonitor/ColConfig/index.module.less'


export default function ColConfig({ Current_Id, BookVersion_Id }) {
  const [editableKeys, setEditableRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const TargetType = 'td'

  const columns = [
    {
      title: '列名称',
      dataIndex: 'ColName',
      tooltip: '只读，使用form.getFieldValue获取不到值',
      align: 'center',
      readonly: true
    },
    {
      title: '类型',
      dataIndex: 'ColType',
      tooltip: '只读，使用form.getFieldValue获取不到值',
      align: 'center'

    },
    {
      title: '选择单元格',
      dataIndex: 'MonitorCell',
      tooltip: '只读，使用form.getFieldValue获取不到值',
      align: 'center',
      ellipsis: true,
      renderFormItem: (schema, config, form) => <SelectElement TargetType={TargetType} />,
      // renderFormItem: (schema, config, form) => {
      //   form.setFieldsValue({ [config.recordKey]: { ColName: config?.record?.MonitorCell?.thead?.InnerText } })
      //   return <SelectElement TargetType={TargetType} />
      // },
      render: (text, { MonitorCell: { tbody, thead } = { tbody: { Selector: "" }, thead: { Selector: "" } } }, _, action) => <Tooltip fresh placement="top" title={tbody?.Selector}>{tbody?.Selector}</Tooltip>,
    },
    {
      title: '索引',
      dataIndex: 'ColIndex',
      tooltip: '只读，使用form.getFieldValue获取不到值',
      align: 'center',
      ellipsis: true,
    },
    {
      title: '正则规则',
      dataIndex: 'ColRegular',
      tooltip: '只读，使用form.getFieldValue获取不到值',
      align: 'center'
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (text, { _id, MonitorCell }, _, action) => [
        <a key="TestSelector" onClick={() => {
          console.log(MonitorCell)
          TestSelector(MonitorCell, TargetType)
        }}   >     测试   </a>,
        <a key="editable" onClick={() => { action?.startEditable?.(_id); }}   >     编辑</a>,
        <a key="delete" onClick={() => onDel(_id)}>    删除  </a>,
      ],
    },
  ];


  // 删除 章节
  const onDel = async (_id) => {
    const success = true
    const NewdataSource = dataSource.filter(item => item._id !== _id)
    setDataSource(NewdataSource)
    message[success ? 'success' : 'error']('成功');
  };
  return (
    <TableForm
      FormTitle={() => <>列配置</>}
      columns={columns}
      dataSource={dataSource}
      editableKeys={editableKeys}
      onSave={async (rowKey, { ColName, ColType, ColIndex, ColRegular, index, _id }) => {
        const success = true
        return Promise[success ? 'resolve' : 'reject']('成功');
      }}
      dataSourceChange={setDataSource}
      editableKeysChange={setEditableRowKeys}
    />
  );
};
