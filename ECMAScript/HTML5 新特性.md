# HTML5 新特性分类

HTML5 标准引入了大量新特性，为 Web 开发提供了更强大、更灵活的工具集。以下按照 HTML、CSS 和 JavaScript 三个方面对 HTML5 新特性进行分类整理。

## 1. HTML 部分新特性

### 1.1 新的语义化元素

- `<header>` - 定义文档或节的页眉
- `<nav>` - 定义导航链接区域
- `<main>` - 定义文档的主要内容
- `<section>` - 定义文档中的节
- `<article>` - 定义独立的自包含内容
- `<aside>` - 定义页面内容之外的内容
- `<footer>` - 定义文档或节的页脚
- `<figure>` - 定义自包含内容，如图表、图片等
- `<figcaption>` - 为 figure 元素定义标题
- `<mark>` - 定义高亮显示的文本
- `<time>` - 定义日期/时间
- `<details>` - 定义用户可以查看或隐藏的附加细节
- `<summary>` - 为 details 元素定义可见标题
- `<dialog>` - 定义对话框或窗口
- `<ruby>`, `<rt>`, `<rp>` - 定义东亚文字注音或字符注释
- `<bdi>`, `<wbr>` - 双向文本隔离和可选换行
- `<address>` - 提供联系信息（语义增强）
- `<hgroup>` - 标题组合（虽然已从规范中删除，但仍有浏览器支持）

### 1.2 改进的表单功能

#### 新的输入类型（input type）

- `email` - 电子邮件输入
- `url` - URL 地址输入
- `tel` - 电话号码输入
- `number` - 数字输入
- `range` - 范围滑块控件
- `search` - 搜索输入
- `color` - 颜色选择器
- `date` - 日期选择器
- `month` - 月份选择器
- `week` - 周选择器
- `time` - 时间选择器
- `datetime-local` - 本地日期和时间选择器
- `file` - 文件上传（增强支持多文件、accept 属性）

#### 新的表单属性

- `placeholder` - 输入字段提示文本
- `required` - 必填字段
- `pattern` - 指定正则表达式验证
- `min` 和 `max` - 数值或日期范围
- `step` - 数值变化的步长
- `autocomplete` - 自动完成功能
- `autofocus` - 页面加载时自动获取焦点
- `multiple` - 允许多个值
- `form` - 指定表单从属关系
- `novalidate` - 提交时不验证表单数据
- `formaction` - 表单提交地址（覆盖 form 的 action 属性）
- `formmethod` - 表单提交方法（覆盖 form 的 method 属性）
- `formenctype` - 提交表单数据的编码方式
- `formnovalidate` - 提交时不验证表单
- `formtarget` - 规定提交结果的显示位置
- `list` - 引用 datalist 元素
- `dirname` - 提交元素的文本方向

#### 新的表单元素

- `<datalist>` - 为输入字段提供预定义选项列表
- `<output>` - 表示计算结果或操作输出
- `<progress>` - 任务完成进度指示器
- `<meter>` - 已知范围内的标量测量
- `<keygen>` - 密钥对生成控件（已废弃，但曾是 HTML5 的一部分）

### 1.3 多媒体支持

- `<audio>` - 嵌入音频内容
- `<video>` - 嵌入视频内容
- `<source>` - 为媒体元素指定多个媒体资源
- `<track>` - 为媒体元素指定文本轨道（如字幕）
- 媒体元素的控制属性
  - `autoplay` - 自动播放
  - `controls` - 显示控制界面
  - `loop` - 循环播放
  - `muted` - 静音
  - `preload` - 预加载策略

### 1.4 图形和绘图

- `<canvas>` - 通过脚本绘制图形的容器
- `<svg>` - 可缩放矢量图形的原生支持
- 内联 SVG - 直接在 HTML 中嵌入 SVG 代码

### 1.5 新的属性和元素

- `<picture>` - 响应式图像容器
- `<source>` - 为 picture 元素定义多个图像源
- `<template>` - 定义页面加载时不渲染的 HTML 片段
- `data-*` 属性 - 自定义数据属性
- `contenteditable` 属性 - 允许编辑元素内容
- `draggable` 属性 - 定义元素是否可拖动
- `hidden` 属性 - 指定元素不显示
- `spellcheck` 属性 - 定义是否检查元素的拼写和语法
- `translate` 属性 - 指定元素是否需要翻译
- `tabindex` 属性 - 控制元素的键盘焦点顺序
- `accesskey` 属性 - 为元素定义键盘快捷键

### 1.6 链接和文档关系

- `rel="prefetch"` - 预取将在未来导航中需要的资源
- `rel="preload"` - 预加载当前导航需要的资源
- `rel="dns-prefetch"` - DNS 预解析
- `rel="preconnect"` - 预先建立连接
- `rel="modulepreload"` - 预加载 JavaScript 模块
- `rel="noopener"`, `rel="noreferrer"` - 安全链接关系

### 1.7 文档及元数据

- 简化的 DOCTYPE - `<!DOCTYPE html>`
- `<meta charset="utf-8">` - 字符编码声明
- `<meta name="viewport">` - 响应式视口控制
- `<meta name="theme-color">` - 主题颜色
- 开放图谱协议标签（Open Graph）- 控制社交媒体分享呈现
- 微数据（Microdata）- 结构化数据标记
- 移动 Web 应用配置 - 应用清单和添加到主屏幕功能

## 2. CSS 部分新特性

### 2.1 选择器

- 属性选择器（`[attribute^=value]`, `[attribute$=value]`, `[attribute*=value]`）
- 结构伪类（`:nth-child()`, `:nth-of-type()`, `:first-of-type`, `:last-of-type`）
- 目标伪类（`:target`）
- 否定伪类（`:not()`）
- UI 状态伪类（`:enabled`, `:disabled`, `:checked`）
- 空白元素（`:empty`）
- 根元素（`:root`）
- 唯一子元素（`:only-child`, `:only-of-type`）
- 选择器组合（`>`, `+`, `~`）
- 通用选择器与命名空间
- 函数式选择器（`:is()`, `:where()`）- 简化复杂选择器，减少代码重复

### 2.2 媒体查询和响应式设计

- `@media` 规则 - 响应式设计的基础
- 设备特性查询（宽度、高度、方向、分辨率等）
- 媒体特性表达式（逻辑 and、or、not）
- 视口单位（vw, vh, vmin, vmax）
- 设备像素比（device-pixel-ratio）
- 打印媒体功能增强
- 降级和回退机制
- `@supports` 规则 - 功能查询
- 容器查询（`@container`）- 基于容器大小而非视口大小的响应式设计

### 2.3 布局和视觉效果

- 圆角（`border-radius`）
- 阴影（`box-shadow`, `text-shadow`）
- 渐变（`linear-gradient()`, `radial-gradient()`, `conic-gradient()`）
- 多列布局（`column-count`, `column-gap`, `column-rule`）
- 背景增强（`background-size`, `background-origin`, `multiple backgrounds`）
- 过渡效果（`transition`）
- 2D/3D 转换（`transform`, `transform-origin`, `perspective`）
- 动画（`@keyframes`, `animation`）
- 弹性盒布局（`display: flex`）
- 网格布局（`display: grid`）
- 盒模型调整（`box-sizing`）
- 自定义滚动（`scroll-behavior`, `overflow-anchor`）
- 图像滤镜（`filter`）
- 混合模式（`mix-blend-mode`, `background-blend-mode`）
- 遮罩效果（`mask-image`）
- 裁剪路径（`clip-path`）
- 对象适应（`object-fit`, `object-position`）
- 内容可见度（`backface-visibility`）
- 初始、继承和未设置值（`initial`, `inherit`, `unset`）
- 宽高比控制（`aspect-ratio`）- 保持元素固定宽高比例
- 包含属性（`contain`, `content-visibility`）- 优化渲染性能，控制布局和绘制边界

### 2.4 字体和文本

- Web 字体（`@font-face`）
- 可变字体（Variable Fonts）
- 字体显示控制（`font-display`）
- 文本溢出（`text-overflow`）
- 自动换行（`word-wrap`, `overflow-wrap`）
- 文本装饰（`text-decoration-line`, `text-decoration-style`, `text-decoration-color`）
- 文本阴影（`text-shadow`）
- 文本描边（`-webkit-text-stroke`）
- 文本对齐和调整（`text-align-last`, `text-justify`）
- 字间距和字偶距（`letter-spacing`, `word-spacing`）
- 书写模式（`writing-mode`, `text-orientation`）
- 标点控制（`hanging-punctuation`, `text-emphasis`）
- 换行控制（`white-space`）
- 连字符控制（`hyphens`）

### 2.5 颜色和透明度

- RGBA 颜色（`rgba()`）
- HSLA 颜色（`hsla()`）
- 不透明度（`opacity`）
- 当前颜色（`currentColor`）
- CSS 变量（自定义属性）- 通过 `--变量名` 定义，`var(--变量名)` 使用，支持作用域和继承
- 颜色函数（`color()`, `color-mix()`）
- 系统颜色和暗模式支持

### 2.6 交互与动效

- 光标定制（`cursor`）
- 用户选择控制（`user-select`）
- 调整大小控制（`resize`）
- 滚动捕捉（`scroll-snap-type`）
- 触摸操作（`touch-action`）
- 指针事件控制（`pointer-events`）
- 平滑滚动（`scroll-behavior`）
- 硬件加速（`will-change`）

### 2.7 CSS 变量与模块化

- 自定义属性（`--property-name`）- 可继承的变量系统
- 变量使用（`var(--property-name)`）- 灵活调用自定义属性
- 回退值（`var(--property-name, fallback)`）- 变量不存在时的默认值
- CSS 变量作用域 - 全局与局部变量
- CSS 变量操作 - 与 calc() 等函数结合
- 多层级变量引用 - 变量引用其他变量
- 通过 JavaScript 操作 CSS 变量 - 动态主题等高级应用

## 3. JavaScript API 部分新特性

### 3.1 DOM 选择器和操作

- `document.querySelector()` - 选择匹配指定 CSS 选择器的第一个元素
- `document.querySelectorAll()` - 选择匹配指定 CSS 选择器的所有元素
- `classList` API - 操作元素的类（`add()`, `remove()`, `toggle()`, `contains()`）
- `dataset` API - 访问自定义 data-\* 属性
- `innerHTML`, `outerHTML` - 获取和设置元素的 HTML 内容
- DOM 操作简化
- 焦点管理 API
- DOM 树遍历改进

### 3.2 Web 存储

- `localStorage` - 本地永久存储
- `sessionStorage` - 会话存储（浏览器关闭后清除）
- 存储事件监听
- 存储配额和管理

### 3.3 离线与缓存

- 离线 Web 应用（`manifest` 文件，已弃用）
- Service Worker - 离线缓存和后台处理
- Cache API - 请求和响应缓存
- 后台同步 API
- 后台获取 API

### 3.4 并发与多线程

- Web Workers - 后台线程执行脚本
- 共享 Workers - 多标签页共享的线程
- 工作线程作用域和安全模型
- 结构化克隆算法
- 可转移对象（Transferable Objects）
- 并行处理能力

### 3.5 地理位置

- Geolocation API - 获取用户地理位置信息
- 位置精度控制
- 持续位置更新
- 地理围栏（实验中）

### 3.6 拖放与交互

- Drag and Drop API - 原生拖放功能
- 拖放事件和数据传输
- 指针锁定 API
- 全屏 API - 控制元素全屏显示
  - `requestFullscreen()` - 请求元素进入全屏模式
  - `exitFullscreen()` - 退出全屏模式
  - 全屏状态事件与样式
  - 全屏元素导航限制
- 屏幕方向 API
- 震动 API - 控制设备震动（移动端）
  - `navigator.vibrate()` - 以特定模式触发设备震动
  - 震动模式和持续时间控制
- 剪贴板 API - 读写剪贴板内容
  - `navigator.clipboard.readText()` - 读取剪贴板文本
  - `navigator.clipboard.writeText()` - 写入剪贴板文本
  - 剪贴板事件
  - 权限模型
- Web 共享 API
- 通知 API - 显示系统级通知
  - `Notification` 构造函数和选项
  - 通知权限请求
  - 通知交互事件
  - 通知图标和操作按钮

### 3.7 图形和媒体处理

- Canvas API - 2D 绘图功能
  - 路径和形状
  - 图像处理
  - 像素操作
  - 渐变和图案
  - 文本渲染
  - 合成操作
  - 动画控制
- WebGL - 3D 图形处理
- SVG 操作 API - 操作矢量图形
- 音频和视频 API
  - 媒体元素控制
  - 轨道管理
  - 播放状态监控
  - 媒体捕获和流
- Media Source Extensions (MSE) - 流媒体支持
- Encrypted Media Extensions (EME) - 内容保护
- WebRTC - 实时通信
  - 音频/视频流
  - 数据通道
  - 连接和信令
  - 网络穿透

### 3.8 通信和网络

- WebSocket API - 全双工通信通道
- Server-Sent Events - 服务器向客户端推送更新
- Fetch API - 现代网络请求
  - 请求/响应对象
  - Promise 基础
  - 流和数据处理
  - CORS 支持
  - 请求中断
- XMLHttpRequest Level 2 - 改进的 XHR
  - 跨域支持
  - 进度事件
  - 二进制数据处理
- Beacon API - 发送分析数据
- 网络信息 API - 网络状态检测

### 3.9 存储与文件

- File API - 访问本地文件
  - Blob 处理
  - 文件读取
  - URL 创建
- IndexedDB - 客户端数据库存储
  - 索引和查询
  - 事务处理
  - 游标操作
- Web SQL（已弃用但仍支持）
- File System Access API（新兴）
- Blob API - 二进制数据处理
- Streams API - 流式数据处理

### 3.10 历史和导航

- History API - 操作浏览历史
  - pushState/replaceState
  - 历史状态管理
  - 导航事件
- 页面可见性 API - 检测页面是否可见
- 会话历史导航
- 页面生命周期管理

### 3.11 性能与安全

- Web Workers - 后台处理
- Performance API
  - 性能时间线
  - 资源计时
  - 用户计时
  - 导航计时
  - 内存和 CPU 监控
- Intersection Observer - 元素可见性监测
  - 视口交叉检测
  - 懒加载实现
  - 无限滚动
  - 可见性触发动画
  - 性能优化的替代方案
- Resize Observer - 元素大小监测
  - 元素尺寸变化监测
  - 响应式组件开发
  - 避免回流和重排
  - 与 CSS 容器查询协同
- Performance Observer - 性能指标监控
- Mutation Observer - DOM 变化监测
- Cross-Origin Resource Sharing (CORS) - 跨域资源共享
- Content Security Policy - 内容安全策略
- Web Cryptography API - 加密功能
  - 加密/解密
  - 签名验证
  - 哈希函数
  - 密钥生成
- Credential Management API - 凭证管理
- Payment Request API - 支付处理

### 3.12 设备接入与传感器

- 媒体设备 API - 摄像头/麦克风访问
  - `navigator.mediaDevices.getUserMedia()` - 访问媒体设备
  - 设备枚举和选择
  - 媒体流约束和配置
  - 屏幕共享与录制
- WebUSB API - USB 设备接入
- WebBluetooth API - 蓝牙设备连接
- Web NFC - 近场通信
- 设备方向 API - 陀螺仪与加速度感应
  - `DeviceOrientationEvent` - 设备方向变化事件
  - `DeviceMotionEvent` - 设备运动事件
  - 重力感应与角度计算
  - 罗盘功能实现
- 环境光传感器 API
- 电池状态 API - 查看设备电池信息（部分浏览器已废弃）
  - `navigator.getBattery()` - 获取电池信息
  - 电量变化监测
  - 充电状态监测
- Web Audio API - 音频处理和合成
- 地理围栏 API - 地理区域进出检测（实验性）
- 距离传感器 API（实验性）
- 环境温度传感器（实验性）

### 3.13 新的语言特性支持

- ECMAScript 6+ 特性支持
- Promises 和异步编程
- 箭头函数
- 模板字符串
- 解构赋值
- 类和模块系统
- 迭代器和生成器
- Proxy 和 Reflect
- Symbol 和 WeakMap/WeakSet
- 国际化 API (Intl)

## 总结

HTML5 标准及其相关技术大幅扩展了 Web 平台的能力，使其成为一个功能丰富的应用开发平台。从语义化标记、富媒体支持、本地存储到强大的图形和通信能力，HTML5 生态系统允许开发者创建以前只能通过原生应用实现的复杂交互体验。

这些新特性不仅改进了 Web 应用的结构化、表现和交互能力，还提供了更好的性能优化、离线功能和设备集成能力。随着浏览器实现的不断完善，开发者可以利用这些特性构建更加现代化、响应式和功能强大的 Web 应用程序。

<!--
FormData	用于表单数据的创建和管理，支持异步上传文件。	HTML5	提交表单数据，特别适用于文件上传
fetch()	取代 XMLHttpRequest 的新 API，用于发起异步 HTTP 请求，支持 Promise。	HTML5	简洁且功能强大的 AJAX 请求
WebSocket	实现客户端和服务器之间的双向通信。	HTML5	实时数据交换，适合即时通讯等应用
Canvas API	动态生成图形，支持绘制图像、动画等。	HTML5	动态绘制图形和图像
Web Workers	在后台线程中运行 JavaScript，避免阻塞主线程。	HTML5	用于处理后台任务，避免 UI 卡顿
Service Workers	用于离线缓存资源，使应用具备离线能力。	HTML5	离线访问和后台数据同步
WebRTC	提供浏览器间的实时通讯（音视频通话、数据交换）。	HTML5	实时音视频通信
 -->
