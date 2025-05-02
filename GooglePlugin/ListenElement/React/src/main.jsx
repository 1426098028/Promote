import { ExpandEnv } from '@/Util/ExpandEnv';
import { CreatShadowElement } from '@/Util/CreatShadowElement';
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import { App as AntdApp } from 'antd';
import "antd/dist/reset.css";
import antdCss from "antd/dist/reset.css?inline";

import App from '@/App.jsx'
import GlobalConfig from '@/pages/GlobalConfig'
import '@/main.less'
import mainCss from '@/main.less?inline'

const { Script, Popup } = ExpandEnv()
console.log('ExpandEnv', Script, Popup)


// 生成模态框父节点
CreatShadowElement('ListenModalApp', 'ListenModalAppContainer', `${antdCss} ${mainCss}`)



// 创建悬浮按钮（主应用）
const listen_element_App = document.createElement('div');
listen_element_App.id = 'ListenElementApp'
document.body.appendChild(listen_element_App);

if (Script) {
  const ListenElementApp = ReactDOM.createRoot(document.getElementById('ListenElementApp'))
  const onDelListenElementApp = () => {
    ListenElementApp.unmount();
  }
  ListenElementApp.render(
    <StrictMode>
      <AntdApp>
        <App onDelReactApp={onDelListenElementApp} />
      </AntdApp>
    </StrictMode>,
  )
}
if (Popup) {
  const GlobalConfigApp = ReactDOM.createRoot(document.getElementById('GlobalConfig'))
  const onDelGlobalConfigApp = () => {
    GlobalConfigApp.unmount();
  }
  GlobalConfigApp.render(
    <StrictMode>
      <AntdApp>
        <GlobalConfig onDelReactApp={onDelGlobalConfigApp} />
      </AntdApp>
    </StrictMode>,
  )
}
