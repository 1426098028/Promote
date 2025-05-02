import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'antd';
import { ProCard, } from '@ant-design/pro-components';
import { ProForm, ProFormDigit, ProFormSwitch, ProFormSlider } from '@ant-design/pro-components';
import SelectElement from '@/components/SelectElement';
// import { NodeChanges } from '@/Util/NodeChanges';
import GlobalConfigCss from '@/pages/GlobalConfig/index.module.less'
export default class GlobalConfig extends PureComponent {
  static propTypes = {
    onDelReactApp: PropTypes.func
  };

  state = { Loading: true, FormInitialValues: { HistoryLength: 3, HighlightTime: 3, StorageLimit: 3, AutoClean: false, CleanInterval: 3, CleanThreshold: 60, } }
  onFinish = (values) => {
    console.log('values', values)
  };
  componentDidMount() {
    // import.meta.env.MODE === 'production' && NodeChanges(document.querySelector('#ListenElementApp'), this.props?.onDelReactApp)
    // process.env.NODE_ENV === 'production' && NodeChanges(document.querySelector('#ListenElementApp'), this.props?.onDelReactApp)
    // process.env.NODE_ENV !== 'development' && document.querySelector('#ListenElementApp') && this.props.onDelReactApp()
    const LoadingTime = setTimeout(() => {
      clearTimeout(LoadingTime)
      this.setState({ Loading: false })
    }, 500)
  }
  render() {
    const { FormInitialValues, Loading } = this.state
    return (
      <  >
        <ProCard loading={Loading} layout="center" hoverable className={GlobalConfigCss.GlobalConfig} title="全局配置" bordered tooltip="这是提示">
          <ProForm initialValues={FormInitialValues} onFinish={this.onFinish} grid
            // submitter={{ render: (props, doms) => <Flex gap="small" justify={'center'} align={'center'} vertical={false}   >{doms}</Flex> }}
            submitter={{ searchConfig: { submitText: '保存', }, render: (props, doms) => <Flex gap="small" vertical={true}>{doms}</Flex> }}
          >
            <ProFormDigit colProps={{ span: 12 }} name="HistoryLength" min={1} label="历史记录长度" tooltip="每个元素保留的历史记录数量" placeholder="请输入名称" required rules={[{ required: true, message: '这是必填项' }]} />
            <ProFormDigit colProps={{ span: 12 }} name="HighlightTime" min={1} label="高亮持续时间" tooltip="数据变化时的高亮显示时间（毫秒）" placeholder="请输入名称" required rules={[{ required: true, message: '这是必填项' }]} />
            <ProFormDigit colProps={{ span: 12 }} name="StorageLimit" min={1} label="存储限制" tooltip="最多保存的数据条目数" placeholder="请输入名称" required rules={[{ required: true, message: '这是必填项' }]} />
            <ProFormDigit colProps={{ span: 12 }} name="CleanInterval" min={1} label="清理间隔" tooltip="自动清理的间隔天数" placeholder="请输入名称" required rules={[{ required: true, message: '这是必填项' }]} />
            <ProFormSwitch colProps={{ span: 10 }} name="AutoClean" min={1} label="自动清理" tooltip="最长位" placeholder="请输入名称" required rules={[{ required: true, message: '这是必填项' }]} />
            <ProFormSlider colProps={{ span: 14 }} name="CleanThreshold" label="清理阈值" tooltip="最长位" placeholder="请输入名称" required rules={[{ required: true, message: '这是必填项' }]} />
          </ProForm>
        </ProCard>
        {process.env.NODE_ENV === 'development' && <SelectElement TargetType={'table'} />}
        {process.env.NODE_ENV === 'development' && <SelectElement TargetType={'td'} />}
        {process.env.NODE_ENV === 'development' && <table style={{ tableLayout: 'auto', }}><colgroup></colgroup><thead className="ant-table-thead"><tr><th className="ant-table-cell" scope="col">Name</th><th className="ant-table-cell" scope="col">Age</th><th className="ant-table-cell" scope="col">Address</th><th className="ant-table-cell" scope="col">Tags</th><th className="ant-table-cell" scope="col">Action</th></tr></thead><tbody className="ant-table-tbody"><tr className="ant-table-row ant-table-row-level-0" data-row-key="1"><td className="ant-table-cell"><a>John Brown</a></td><td className="ant-table-cell">32</td><td className="ant-table-cell">New York No. 1 Lake Park</td><td className="ant-table-cell"><span className="ant-tag ant-tag-green css-var-r1tl">NICE</span><span className="ant-tag ant-tag-geekblue css-var-r1tl">DEVELOPER</span></td><td className="ant-table-cell"><div className="ant-space ant-space-horizontal ant-space-align-center ant-space-gap-row-middle ant-space-gap-col-middle css-var-r1tl"><div className="ant-space-item"><a>Invite John Brown</a></div><div className="ant-space-item"><a>Delete</a></div></div></td></tr><tr className="ant-table-row ant-table-row-level-0" data-row-key="2"><td className="ant-table-cell"><a>Jim Green</a></td><td className="ant-table-cell">42</td><td className="ant-table-cell">London No. 1 Lake Park</td><td className="ant-table-cell"><span className="ant-tag ant-tag-volcano css-var-r1tl">LOSER</span></td><td className="ant-table-cell"><div className="ant-space ant-space-horizontal ant-space-align-center ant-space-gap-row-middle ant-space-gap-col-middle css-var-r1tl"><div className="ant-space-item"><a>Invite Jim Green</a></div><div className="ant-space-item"><a>Delete</a></div></div></td></tr><tr className="ant-table-row ant-table-row-level-0" data-row-key="3"><td className="ant-table-cell"><a>Joe Black</a></td><td className="ant-table-cell">32</td><td className="ant-table-cell">Sydney No. 1 Lake Park</td><td className="ant-table-cell"><span className="ant-tag ant-tag-green css-var-r1tl">COOL</span><span className="ant-tag ant-tag-geekblue css-var-r1tl">TEACHER</span></td><td className="ant-table-cell"><div className="ant-space ant-space-horizontal ant-space-align-center ant-space-gap-row-middle ant-space-gap-col-middle css-var-r1tl"><div className="ant-space-item"><a>Invite Joe Black</a></div><div className="ant-space-item"><a>Delete</a></div></div></td></tr></tbody></table>}
      </>
    )
  }
}

