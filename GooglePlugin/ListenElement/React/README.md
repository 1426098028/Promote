# React + Vite 表格监控插件

本项目是一个基于 **React** 和 **Vite** 的浏览器插件，用于监控网页中表格内容的变化。项目提供了最简化的配置，以便在 Vite 中使用 React，并支持热模块替换（HMR）和一些 ESLint 规则。

## 技术栈

### 核心框架

- **React**：用于构建用户界面的 JavaScript 库，版本为 `^18.3.1`。
- **React DOM**：用于将 React 组件渲染到 DOM 中，版本为 `^18.3.1`。

### 构建工具

- **Vite**：下一代前端构建工具，提供快速的开发体验，版本为 `^6.1.0`。

### UI 组件库

- **Ant Design**：一个企业级 UI 设计语言和 React 组件库，版本为 `^5.24.1`。
- **Ant Design Pro Components**：Ant Design 的高级组件库，版本为 `^2.8.6`。

### 开发工具

- **ESLint**：用于代码质量检查的工具，版本为 `^9.19.0`。
- **TypeScript 类型定义**：为 React 和 React DOM 提供类型支持，版本分别为 `^19.0.8` 和 `^19.0.3`。

### 浏览器插件支持

- **crx**：用于打包 Chrome 扩展的工具，版本为 `^5.0.1`。

## 主要功能

- **表格内容监控**：实时监控网页中表格内容的变化，并在内容更新时触发相应事件。
- **热模块替换（HMR）**：在开发过程中，修改代码后无需刷新页面即可看到更新。
- **ESLint 规则**：提供代码质量检查，确保代码风格一致。

## 官方插件

- **[@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md)**：使用 Babel 实现 Fast Refresh。
- **[@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc)**：使用 SWC 实现 Fast Refresh。

## 使用说明

1. **安装依赖**：

   ```bash
   npm install
   ```

2. **启动开发服务器**：

   ```bash
   npm run dev
   ```

3. **构建生产环境代码**：

   ```bash
   npm run build
   ```

4. **运行 ESLint 检查**：

   ```bash
   npm run lint
   ```

5. **加载浏览器插件**：
   - 打开浏览器的扩展管理页面（例如 Chrome 的 `chrome://extensions/`）。
   - 启用"开发者模式"。
   - 点击"加载已解压的扩展程序"，选择项目的 `dist` 目录。

## 项目适用场景

本项目适合需要实时监控网页中表格内容变化的场景，例如：

1. **数据监控**：

   - 实时监控网页中表格数据的更新，适用于需要及时获取数据变化的场景，如实时报表等。
   - 通过插件可以自动捕获数据变化并触发通知或记录日志。

2. **自动化测试**：

   - 在自动化测试中，监控表格内容的变化可以帮助验证数据的正确性和一致性。
   - 插件可以与其他测试工具集成，提供更全面的测试覆盖。

3. **数据采集与分析**：

   - 对于需要从网页表格中提取数据的场景，插件可以自动捕获数据变化并保存到本地或发送到服务器。
   - 适用于数据挖掘、市场分析等需要大量数据采集的场景。

4. **用户行为分析**：

   - 监控表格内容的变化可以帮助分析用户的操作行为，例如用户对表格数据的编辑、排序等操作。
   - 适用于用户体验优化和产品改进。

5. **实时协作 通过 WebSocket 通信**：
   - 在多人协作的场景中，插件可以实时同步表格内容的变化，确保所有用户看到的数据一致。
   - 适用于在线文档、项目管理工具等需要实时协作的场景。

### 项目优势

- **高效开发**：利用 Vite 的高效构建和热模块替换（HMR）功能，开发者可以快速迭代和优化插件功能。
- **轻量级**：基于 React 和 Vite 的轻量级架构，确保插件运行高效且占用资源少。
- **易于扩展**：插件设计模块化，便于根据需求添加新功能或集成其他工具。
- **跨平台支持**：作为浏览器插件，支持多种现代浏览器，如 Chrome、Edge 等。

通过以上场景和优势，本项目能够满足多种实际需求，提供高效、灵活的表格内容监控解决方案。

## 依赖项

### 生产依赖（`dependencies`）

- `@ant-design/pro-components`：Ant Design 的高级组件库。
- `antd`：Ant Design 的核心组件库。
- `react`：React 核心库。
- `react-dom`：React 的 DOM 渲染库。

### 开发依赖（`devDependencies`）

- `@eslint/js`：ESLint 的核心规则集。
- `@types/react` 和 `@types/react-dom`：React 和 React DOM 的类型定义。
- `@vitejs/plugin-react`：Vite 的 React 插件，支持 Fast Refresh。
- `crx`：用于打包 Chrome 扩展的工具。
- `eslint`：ESLint 核心库。
- `eslint-plugin-react`：ESLint 的 React 插件。
- `eslint-plugin-react-hooks`：ESLint 的 React Hooks 插件。
- `eslint-plugin-react-refresh`：ESLint 的 React Refresh 插件。
- `globals`：提供全局变量的 ESLint 插件。
- `less` 和 `less-loader`：用于编译 Less 样式文件的工具。
- `sharp`：用于图像处理的库。
- `vite`：Vite 核心库。

## 脚本命令

- `dev`：启动开发服务器。
- `build`：构建生产环境代码。
- `lint`：运行 ESLint 检查。
- `preview`：预览生产环境构建结果。

## 项目特点

- **快速开发**：利用 Vite 的高效构建和热模块替换（HMR）功能，提供快速的开发体验。
- **代码质量**：通过 ESLint 和 TypeScript 类型定义，确保代码风格一致和类型安全。
- **浏览器插件支持**：使用 `crx` 工具打包 Chrome 扩展，方便部署和测试。
