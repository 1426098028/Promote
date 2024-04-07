import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import store from './redux/store'

import { Provider } from 'react-redux'
{/* 此处需要使用Provider组件包裹App，目的是让所有后代容器组件都可以接收到store */ }
ReactDOM.render(<Provider store={store}><App /> </Provider>, document.getElementById('App'))
