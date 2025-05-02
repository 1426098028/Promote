import { FloatButton, Alert } from 'antd';
import { ModalForm, } from '@ant-design/pro-components';
import { BorderOuterOutlined } from '@ant-design/icons';
import "antd/dist/reset.css";
import Home from '@/pages/Home'
import AppCss from '@/App.module.less'
export default function App() {
  const onOpen = () => {
    const { hostname, pathname, search, hash } = window.location;
    console.log('打开', hostname, pathname, search, hash)
  }
  return (
    <ModalForm
      className={AppCss.App}
      width='80%'
      trigger={<FloatButton type="primary" icon={<BorderOuterOutlined />} tooltip={<div>元素跟踪</div>} onClick={onOpen} />}
      autoFocusFirstInput
      modalProps={{
        getContainer: () => document.querySelector('#ListenModalAppContainer'),
        keyboard: false,
        closable: false,
        maskClosable: false,
        // modalRende:{},
        onCancel: () => console.log('run'),
      }}
      submitter={{
        searchConfig: {
          submitText: '关闭',
        },
        render: (props, defaultDoms) => defaultDoms[1],
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        console.log(values)
        return true;
      }}
    >
      <Alert
        message={`当前页面：${window.location.href}`}
        description={`创建时间：${new Date().toLocaleString()} 最后更新：${new Date().toLocaleString()}`}
        type="success"
      />
      <Home></Home>
    </ModalForm>
  )
}
