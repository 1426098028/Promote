# 前端 HTML5 与现代 Web 技术面试题

本文档包含面向中级和高级前端开发工程师的面试题，主要涵盖 HTML5 新特性和现代 Web 平台能力。每个问题都标注了难度级别，并提供简短和详细的参考答案。

## 目录

- [HTML 部分](#html部分)
- [CSS 部分](#css部分)
- [JavaScript API 部分](#javascript-api部分)
- [现代 Web 平台技术](#现代web平台技术)

## HTML 部分

### 1. 请列举至少 5 个 HTML5 新增的语义化标签，并简述其用途 【中级】

**简单答案：** HTML5 新增了多个语义化标签，如`<header>`（页眉）、`<footer>`（页脚）、`<nav>`（导航）、`<article>`（独立内容）和`<section>`（文档区域）等，它们能更清晰地描述内容结构，有助于 SEO 和无障碍访问。

**详细答案：** HTML5 引入了多个新的语义化元素，目的是让文档结构更加清晰，代码更具可读性，同时改善 SEO 和无障碍访问体验：

1. `<header>` - 定义文档或特定区块的头部区域，通常包含网站标志、主导航栏、标题等。
2. `<footer>` - 定义文档或特定区块的底部区域，通常包含版权信息、联系方式、相关链接等。
3. `<nav>` - 专门用于定义导航链接部分，清晰标识网站的主要导航区域。
4. `<article>` - 表示文档、页面或站点中的一个独立完整的可分配内容单元，如新闻文章、博客帖子等。
5. `<section>` - 表示文档中的一个主题分组，通常带有标题，用于将内容按照主题进行分组。
6. `<aside>` - 表示与页面主内容相关但不是主要内容的部分，如侧边栏、广告栏等。
7. `<main>` - 标识文档的主要内容区域，每个文档只应有一个。
8. `<figure>` 和 `<figcaption>` - 用于标记图表、图片等自包含内容及其标题。

这些标签让开发者能够更准确地描述内容的语义结构，而不仅仅依赖于无语义的`<div>`标签。使用语义化标签的好处包括：

- 提高代码可读性和可维护性
- 帮助搜索引擎更好地理解网页结构和内容关系
- 改善屏幕阅读器等辅助技术的体验
- 使内容在不同设备上更具适应性

### 2. HTML5 表单有哪些新特性？如何进行表单验证？ 【中级】

**简单答案：** HTML5 表单新特性包括新的输入类型（如 email、date 等）、新属性（required、placeholder 等）和新元素（如 datalist）。表单验证可通过 HTML5 内置验证（使用 required、pattern 等属性）或 JavaScript 的表单验证 API 实现。

**详细答案：** HTML5 大幅增强了表单功能，简化了开发流程并改善了用户体验：

1. **新的输入类型**:

   - `email` - 用于邮箱地址输入，自带邮箱格式验证
   - `url` - 用于 URL 地址输入，自带 URL 格式验证
   - `number` - 限制只能输入数字
   - `range` - 带滑块的数值选择器
   - `date`, `month`, `week`, `time` - 各种日期和时间选择器
   - `search` - 专为搜索字段设计
   - `color` - 颜色选择器
   - `tel` - 电话号码输入字段

2. **新的表单属性**:

   - `placeholder` - 输入提示文本
   - `required` - 必填字段
   - `pattern` - 基于正则表达式的格式验证
   - `min`/`max` - 设置值的范围限制
   - `step` - 设置数值的增减步长
   - `autocomplete` - 控制自动完成功能
   - `autofocus` - 页面加载后自动获取焦点
   - `multiple` - 允许选择多个值

3. **新的表单元素**:
   - `<datalist>` - 为输入框提供预定义的选项列表
   - `<output>` - 显示计算或操作的结果
   - `<progress>` - 显示任务完成进度
   - `<meter>` - 显示已知范围内的标量值

表单验证方式:

1. **HTML5 内置验证**:

   - 使用`required`属性标记必填字段
   - 使用`pattern`属性设置正则表达式验证规则
   - 使用`min`/`max`限制数值范围
   - 使用特定输入类型（如`email`、`url`）的内置验证规则
   - 使用`maxlength`/`minlength`限制文本长度

   ```html
   <input type="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" placeholder="请输入邮箱" />
   ```

2. **JavaScript 验证 API**:

   - 使用`checkValidity()`方法检查表单或表单元素是否有效
   - 使用`validationMessage`属性获取验证错误信息
   - 自定义验证消息和行为
   - 使用`setCustomValidity()`设置自定义验证消息

   ```javascript
   const email = document.getElementById('email');
   if (!email.checkValidity()) {
     console.log(email.validationMessage);
   }
   ```

3. **禁用默认验证**:
   - 使用表单的`novalidate`属性禁用所有内置验证
   - 使用`formnovalidate`属性禁用特定提交按钮的验证

HTML5 表单功能极大地减少了对 JavaScript 表单验证的依赖，使开发更简单且用户体验更一致。

### 3. 请解释 HTML5 中的 Canvas 和 SVG，它们各有什么优缺点和适用场景？ 【高级】

**简单答案：** Canvas 是基于位图的绘图技术，通过 JavaScript 动态绘制，适合复杂动画和图像处理；SVG 是基于 XML 的矢量图形技术，具有可缩放性，适合需要高质量放大或交互的图形。Canvas 性能较好但不支持 DOM 操作，SVG 支持 DOM 但复杂图形性能较差。

**详细答案：** HTML5 中的 Canvas 和 SVG 是两种不同的图形绘制技术，各自有不同的特性和适用场景：

**Canvas:**

- **定义**: 通过 JavaScript 在`<canvas>`元素上绘制位图（像素）图形的 API
- **工作原理**: 提供即时绘制模式，一旦绘制完成就"忘记"绘制对象，类似于在纸上用笔绘画
- **优点**:
  - 性能较好，适合绘制大量对象或频繁更新的场景
  - 适合复杂图形和高度自定义的动画效果
  - 像素级操作能力，可进行图像处理
  - 适合游戏开发和数据可视化
- **缺点**:
  - 不支持 DOM 操作，无法为绘制对象添加事件监听器
  - 分辨率依赖，放大会失真
  - 无法使用 CSS 样式
  - 可访问性较差，对屏幕阅读器不友好
  - 文本渲染能力有限
- **应用场景**:
  - 游戏开发
  - 复杂动画
  - 实时图表和数据可视化
  - 图像编辑和处理
  - 需要高性能渲染的场景

**SVG:**

- **定义**: 可缩放矢量图形，基于 XML 的描述性语言
- **工作原理**: 使用 XML 定义图形元素，构建成 DOM 树，浏览器解析渲染
- **优点**:
  - 矢量图形，无论放大多少倍都不会失真
  - 每个元素都是可操作的 DOM 节点，可添加事件监听器
  - 可使用 CSS 样式和动画
  - 可被搜索引擎和屏幕阅读器识别，可访问性好
  - 适合图标、图表等需要清晰缩放的元素
- **缺点**:
  - 对于复杂图形，性能不如 Canvas
  - DOM 操作可能导致性能问题
  - 学习曲线较陡峭
  - 不适合像素级操作和处理
- **应用场景**:
  - 图标和 Logo 设计
  - 需要良好交互性的图表
  - 地图和信息图表
  - 需要随响应式设计缩放的图形
  - 需要可访问性的场景

**对比与选择:**

| 特性         | Canvas                   | SVG                    |
| ------------ | ------------------------ | ---------------------- |
| 基于         | 像素                     | 矢量                   |
| 分辨率相关性 | 是                       | 否                     |
| 操作模型     | 即时绘制，无记忆         | 保留模式，基于 DOM     |
| 性能         | 复杂场景下更好           | 简单场景下更好         |
| 动画性能     | 大量对象时更好           | 少量对象时更好         |
| 交互性       | 需要手动实现             | 原生支持 DOM 事件      |
| 样式调整     | 需要重绘                 | 可通过 CSS 调整        |
| 适合场景     | 游戏、复杂动画、像素处理 | 图标、图表、需交互场景 |

选择时应考虑：需要高性能还是高交互性，图形是否需要缩放，是否需要 DOM 操作，图形的复杂度，等等。

### 4. 什么是 Web 存储？请比较 localStorage、sessionStorage 和 cookies 的区别 【中级】

**简单答案：** Web 存储是 HTML5 提供的客户端存储数据的机制。localStorage 提供永久存储，sessionStorage 提供会话期间存储，而 cookies 则是传统的客户端存储方式。三者在存储容量、生命周期、API 易用性和与服务器通信方面有明显区别。

**详细答案：** Web 存储是 HTML5 引入的用于在客户端存储数据的 API，主要包括 localStorage 和 sessionStorage。与传统的 cookie 相比，它们提供了更大的存储空间和更便捷的 API。

**三种存储机制的主要区别:**

| 特性             | localStorage                           | sessionStorage                               | Cookies                                      |
| ---------------- | -------------------------------------- | -------------------------------------------- | -------------------------------------------- |
| **存储容量**     | 通常 5-10MB                            | 通常 5-10MB                                  | 通常 4KB                                     |
| **生命周期**     | 永久保存，除非手动删除或清除浏览器数据 | 仅在当前会话期间有效，关闭页面或浏览器后清除 | 可设置过期时间，无设置则为会话 cookie        |
| **作用域**       | 同源的所有页面共享                     | 仅限当前窗口或标签页                         | 所有同源页面共享，可通过 Path 和 Domain 限制 |
| **API 易用性**   | 简单易用，键值对存储                   | 简单易用，键值对存储                         | 操作复杂，需要解析字符串                     |
| **数据类型**     | 只能存储字符串，需手动转换             | 只能存储字符串，需手动转换                   | 只能存储字符串                               |
| **与服务器通信** | 不会自动发送到服务器                   | 不会自动发送到服务器                         | 每次 HTTP 请求自动发送给服务器               |
| **大小监控**     | 可通过 API 检查已用空间                | 可通过 API 检查已用空间                      | 难以准确监控大小                             |

**localStorage:**

```javascript
// 存储数据
localStorage.setItem('username', 'john');
// 获取数据
const username = localStorage.getItem('username');
// 删除数据
localStorage.removeItem('username');
// 清除所有数据
localStorage.clear();
```

**sessionStorage:**

```javascript
// 存储数据
sessionStorage.setItem('tempData', 'someValue');
// 获取数据
const tempData = sessionStorage.getItem('tempData');
// 删除数据
sessionStorage.removeItem('tempData');
// 清除所有数据
sessionStorage.clear();
```

**Cookies:**

```javascript
// 设置cookie
document.cookie = 'username=john; expires=Thu, 18 Dec 2023 12:00:00 UTC; path=/';
// 读取cookies需要解析字符串
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
```

**适用场景:**

- **localStorage**: 适合存储长期不变的数据，如用户偏好设置、主题选择等
- **sessionStorage**: 适合存储一次会话中临时需要的数据，如表单临时保存、单次会话的状态维护等
- **Cookies**: 适合需要发送到服务器的数据，如身份验证信息、跟踪 ID 等

**安全考虑:** 所有这些存储机制都存在跨站脚本(XSS)攻击的风险，敏感数据应该加密存储，且不应过度依赖客户端存储敏感信息。cookies 可设置 HttpOnly 和 Secure 标记提高安全性。

### 5. 解释 HTML5 中的离线 Web 应用和 Service Worker 的关系和区别 【高级】

**简单答案：** HTML5 离线 Web 应用使用 Application Cache（已废弃）来缓存资源，而 Service Worker 提供了更强大的现代离线缓存解决方案。Service Worker 可拦截网络请求、精细控制缓存策略，还能支持后台同步和推送通知等高级功能。

**详细答案：** HTML5 最初通过 Application Cache（AppCache）提供离线 Web 应用功能，后来被更强大的 Service Worker 替代。

**Application Cache (AppCache):**

- HTML5 早期引入的离线缓存机制
- 使用 manifest 文件声明需要缓存的资源
- 结构简单但不够灵活，更新机制复杂
- 已被标准废弃，现代浏览器逐渐移除支持

```html
<!-- 已废弃的方式 -->
<html manifest="example.appcache">
  ...
</html>
```

**Service Worker:**

- 现代浏览器支持的脚本，运行在浏览器与网络之间
- 一种特殊的 Web Worker，在单独的线程中执行
- 可以拦截和处理网络请求，精确控制缓存策略
- 在浏览器关闭后仍然可以运行，提供真正的离线体验

**Service Worker 的主要特性:**

1. **请求拦截与缓存控制**

   ```javascript
   self.addEventListener('fetch', (event) => {
     event.respondWith(caches.match(event.request).then((response) => response || fetch(event.request)));
   });
   ```

2. **精细的缓存策略**

   - 缓存优先 (Cache First)
   - 网络优先 (Network First)
   - 缓存回退 (Cache Fallback)
   - 仅缓存 (Cache Only)
   - 仅网络 (Network Only)
   - 按需缓存 (Stale While Revalidate)

3. **生命周期管理**

   - 注册、安装、激活阶段
   - 更新机制

4. **后台功能**
   - 后台同步 (Background Sync)
   - 推送通知 (Push Notifications)

**关键区别:**

| 特性         | Application Cache      | Service Worker           |
| ------------ | ---------------------- | ------------------------ |
| 灵活性       | 低，静态 manifest 文件 | 高，可编程控制缓存       |
| 更新控制     | 复杂且不可靠           | 完全可控，可以精确更新   |
| 网络请求处理 | 不能拦截网络请求       | 可拦截所有网络请求       |
| 缓存策略     | 单一固定策略           | 多种灵活策略             |
| 调试与测试   | 困难                   | 相对简单，有专门调试工具 |
| 标准状态     | 已废弃                 | 活跃发展中               |
| 附加功能     | 无                     | 推送通知、后台同步等     |

**从 AppCache 迁移到 Service Worker 的优势:**

- 更可靠的离线体验
- 更精细的缓存控制
- 更好的性能优化可能性
- 渐进式 Web 应用(PWA)基础能力
- 符合现代 Web 标准的发展方向

虽然 Service Worker 比 AppCache 复杂，但它提供了真正强大的离线 Web 应用体验，是构建现代 PWA 的关键技术。对于需要离线能力的 Web 应用，Service Worker 是目前的最佳选择。

### 6. 详细说明 HTML5 中的数据属性(data-\*)以及如何在 JavaScript 中访问它们 【中级】

**简单答案：** HTML5 的 data-\*属性允许在标准兼容的 HTML 元素上存储额外信息，无需使用非标准属性或额外的 HTTP 请求。在 JavaScript 中可以通过 element.dataset 对象访问这些属性，属性名会自动转换格式(data-user-name 变为 dataset.userName)。

**详细答案：** HTML5 引入的 data-\*属性（自定义数据属性）允许开发者在 HTML 元素上存储私有数据，为元素添加额外信息而不破坏 HTML 的有效性。

**HTML 中定义 data 属性:**

```html
<div id="user" data-id="123" data-user-name="JohnDoe" data-role="admin" data-last-login="2023-05-10">John Doe</div>
```

**在 JavaScript 中访问 data 属性的方法:**

1. **使用 dataset 属性** (推荐方式)

```javascript
const user = document.getElementById('user');

// 获取data属性
console.log(user.dataset.id); // "123"
console.log(user.dataset.userName); // "JohnDoe" (注意驼峰命名转换)
console.log(user.dataset.role); // "admin"

// 修改data属性
user.dataset.status = 'active';
user.dataset.lastLogin = '2023-10-20';

// 删除data属性
delete user.dataset.role;

// 检查data属性是否存在
if ('userName' in user.dataset) {
  // 存在data-user-name属性
}
```

2. **使用 getAttribute/setAttribute 方法** (传统方式)

```javascript
// 获取data属性
console.log(user.getAttribute('data-id')); // "123"
console.log(user.getAttribute('data-user-name')); // "JohnDoe"

// 修改data属性
user.setAttribute('data-status', 'active');

// 删除data属性
user.removeAttribute('data-role');
```

**命名转换规则:**

- HTML 中的属性名格式: `data-*` (连字符格式)
- JavaScript 中的属性名格式: `dataset.*` (驼峰格式)
- 转换规则:
  - 去掉`data-`前缀
  - 将连字符格式转换为驼峰格式 (如`data-user-name`变为`dataset.userName`)

**使用 data 属性的最佳实践:**

1. **语义化使用**

   - 使用有意义的描述性名称
   - 遵循命名约定，使用连字符分隔多个单词

2. **适当的使用场景**

   - 存储与元素相关的配置信息
   - 存储初始化参数
   - 存储界面状态信息
   - 模板和动态内容的数据绑定

3. **避免存储敏感数据**

   - data 属性在 HTML 中可见，不适合存储敏感信息

4. **性能考虑**
   - 不要存储大量数据，会影响 DOM 大小和解析性能
   - 对于大型数据集，考虑使用 JavaScript 变量或 Web Storage

**应用示例:**

1. **组件配置:**

```html
<div class="carousel" data-auto-play="true" data-interval="5000" data-show-controls="true">
  <!-- carousel内容 -->
</div>
```

2. **状态标记:**

```html
<button data-state="inactive" data-toggle-target="panel1">显示面板</button>
```

3. **数据绑定与模板:**

```html
<ul id="users-list">
  <li data-user-id="1" data-user-role="admin">John</li>
  <li data-user-id="2" data-user-role="editor">Jane</li>
</ul>
```

data 属性为 HTML 元素提供了"记忆能力"，使元素能够携带与其相关的额外信息，而不必通过 JavaScript 变量或额外的 AJAX 请求获取，为现代 Web 应用提供了更灵活的开发方式。

## CSS 部分

### 1. 解释 CSS 中的盒模型，以及 box-sizing 属性的作用 【中级】

**简单答案：** CSS 盒模型描述了元素内容、内边距、边框和外边距如何组合决定元素总尺寸。标准盒模型(content-box)中，宽高只包含内容区；而 IE 盒模型(border-box)中，宽高包含内容、内边距和边框。box-sizing 属性允许开发者选择使用哪种盒模型。

**详细答案：** CSS 盒模型是布局的基础概念，定义了元素在页面上如何占据空间。

**盒模型组成部分**:

- **Content** (内容区): 显示元素实际内容的区域
- **Padding** (内边距): 内容与边框之间的空白区域
- **Border** (边框): 环绕内容和内边距的边界线
- **Margin** (外边距): 元素边框外的空白区域，用于与其他元素保持距离

**两种盒模型**:

1. **标准盒模型 (W3C 盒模型)**:

   - 默认模式，`box-sizing: content-box`
   - 元素的`width`和`height`属性仅设置内容区大小
   - 总宽度 = width + padding-left + padding-right + border-left + border-right
   - 总高度 = height + padding-top + padding-bottom + border-top + border-bottom

2. **IE 盒模型 (怪异盒模型)**:
   - 通过`box-sizing: border-box`启用
   - 元素的`width`和`height`包含内容区、内边距和边框
   - 总宽度 = width (内容区会自动缩小以适应内边距和边框)
   - 总高度 = height (内容区会自动缩小以适应内边距和边框)

**box-sizing 属性**:

- **content-box** (默认): 使用标准盒模型
- **border-box**: 使用 IE 盒模型
- **padding-box** (已废弃): 宽高包含内容和内边距

**使用示例**:

```css
/* 标准盒模型 */
.standard-box {
  box-sizing: content-box;
  width: 300px;
  padding: 20px;
  border: 5px solid #333;
  /* 总宽度 = 300px + 40px(左右内边距) + 10px(左右边框) = 350px */
}

/* IE盒模型 */
.border-box {
  box-sizing: border-box;
  width: 300px;
  padding: 20px;
  border: 5px solid #333;
  /* 总宽度 = 300px，内容区宽度 = 250px */
}
```

**实际应用**:

- **border-box**在现代 Web 开发中更常用，因为它使布局计算更直观
- 许多 CSS 框架和重置样式表默认应用`box-sizing: border-box`
- 常见的全局设置:
  ```css
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  ```

**使用 border-box 的好处**:

- 更直观的尺寸控制
- 添加内边距和边框不会意外破坏布局
- 响应式设计中更容易处理百分比宽度

理解盒模型是掌握 CSS 布局的基础，也是解决许多布局问题的关键。

### 2. 请详细解释 CSS 选择器优先级和特异性(Specificity)计算规则 【高级】

**简单答案：** CSS 选择器优先级由特异性(Specificity)决定，按照"内联样式 > ID 选择器 > 类/伪类/属性选择器 > 元素/伪元素选择器"的顺序，分别赋予不同权重。当选择器冲突时，特异性高的样式会覆盖特异性低的样式，而!important 可以覆盖所有其他样式。

**详细答案：** CSS 特异性是浏览器决定哪些样式规则应用于元素的算法，影响样式冲突时的优先级。

**特异性计算规则**:

特异性值表示为四个部分(a,b,c,d)，按重要性从高到低:

- **a**: 内联样式 (style 属性) - 1 或 0
- **b**: ID 选择器的数量
- **c**: 类选择器、属性选择器和伪类选择器的数量
- **d**: 元素选择器和伪元素选择器的数量

**选择器权重对比**:

1. **内联样式**: `style="color: red;"` - (1,0,0,0)
2. **ID 选择器**: `#header` - (0,1,0,0)
3. **类/伪类/属性选择器**: `.active`, `:hover`, `[type="text"]` - (0,0,1,0)
4. **元素/伪元素选择器**: `div`, `::before` - (0,0,0,1)
5. **通配符选择器**: `*` - (0,0,0,0)

**特异性计算示例**:

| 选择器                | 特异性(a,b,c,d) | 十进制表示 |
| --------------------- | --------------- | ---------- |
| `h1`                  | (0,0,0,1)       | 1          |
| `h1.title`            | (0,0,1,1)       | 11         |
| `.nav .list li`       | (0,0,2,1)       | 21         |
| `#header .logo`       | (0,1,1,0)       | 110        |
| `ul#nav li.active`    | (0,1,1,2)       | 112        |
| `style="color: red;"` | (1,0,0,0)       | 1000       |

**重要规则**:

- 特异性是按位比较的，不是简单的十进制转换
- 再多的类选择器也无法覆盖一个 ID 选择器
- `!important`规则会覆盖任何特异性(但应谨慎使用)
- 特异性相同时，后定义的规则会覆盖先定义的规则(源码顺序)
- 继承的样式没有特异性，甚至低于通配符选择器

**选择器组合与特异性**:

```css
/* 特异性:(0,0,0,2) */
div p {
  color: blue;
}

/* 特异性:(0,0,1,1) */
p.note {
  color: red; /* 此样式会覆盖上面的样式 */
}

/* 特异性:(0,1,0,1) */
#content p {
  color: green; /* 此样式会覆盖上面的样式 */
}
```

**!important 规则**:

- 添加`!important`会使规则优先级高于所有非!important 规则
- 多个`!important`规则之间，仍按照特异性和源码顺序决定优先级
- 应尽量避免使用，因为它破坏了特异性的层叠机制

```css
p {
  color: red !important; /* 会覆盖任何其他针对p的颜色设置 */
}
```

**CSS 优先级完整顺序**:

1. !important 规则(正常特异性规则适用于多个!important 声明)
2. 内联样式
3. ID 选择器
4. 类选择器、属性选择器、伪类选择器
5. 元素选择器、伪元素选择器
6. 通配符选择器
7. 继承的样式

理解特异性是解决样式冲突和编写可维护 CSS 的关键，应尽量避免过高特异性和!important，以保持样式的可预测性和可维护性。

### 3. 请解释 CSS 变量(自定义属性)的使用方法、优势和局限性 【中级】

**简单答案：** CSS 变量是用户自定义的属性，使用--开头定义，用 var()函数调用。优势包括：减少重复代码、简化主题切换、增强可维护性、支持动态修改。局限性包括：浏览器兼容性(IE 不支持)、无法在媒体查询中定义、值类型限制。

**详细答案：** CSS 变量（自定义属性）允许开发者定义可重用的值，极大增强了 CSS 的灵活性和可维护性。

**基本语法**:

```css
/* 定义CSS变量 */
:root {
  --main-color: #3498db;
  --accent-color: #e74c3c;
  --text-color: #333;
  --spacing-unit: 8px;
  --max-width: 1200px;
}

/* 使用CSS变量 */
.button {
  background-color: var(--main-color);
  color: white;
  padding: calc(var(--spacing-unit) * 2);
  margin-bottom: var(--spacing-unit);
}

/* 使用默认值 */
.secondary-button {
  background-color: var(--secondary-color, #95a5a6);
}
```

**变量作用域**:

- 变量遵循 CSS 的级联规则和继承机制
- `:root`选择器定义全局变量（相当于在 HTML 元素上定义）
- 可以在任何选择器中定义局部变量，仅在该元素及其后代有效

```css
:root {
  --global-color: blue;
}

.container {
  --local-color: green;
  color: var(--global-color); /* 蓝色 */
}

.container .text {
  color: var(--local-color); /* 绿色 */
}

.other-element {
  color: var(--local-color); /* 无效，回退到默认值或继承值 */
}
```

**通过 JavaScript 操作**:

```javascript
// 获取CSS变量值
const rootStyles = getComputedStyle(document.documentElement);
const mainColor = rootStyles.getPropertyValue('--main-color').trim();
console.log(mainColor); // "#3498db"

// 修改CSS变量值
document.documentElement.style.setProperty('--main-color', '#2980b9');
```

**CSS 变量的优势**:

1. **减少代码重复**: 集中管理常用值，避免复制粘贴和手动同步更新
2. **简化主题实现**: 轻松实现明暗主题切换、品牌定制等
3. **响应式设计增强**: 可以在媒体查询中重新定义变量值
4. **动态修改**: 可通过 JavaScript 修改，实现交互效果
5. **提高可维护性**: 将设计参数集中管理，一处修改多处生效
6. **与计算结合**: 与`calc()`结合使用，实现复杂计算
7. **增强组件封装**: 组件可以使用外部提供的变量值，提高复用性

**CSS 变量的局限性**:

1. **浏览器兼容性**: 不支持 IE11 及以下版本
2. **不支持媒体查询条件**: 不能在媒体查询中动态改变定义方式
3. **类型限制**: 变量值始终是字符串，可能需要额外处理
4. **调试复杂性**: 变量使代码追踪略微复杂化
5. **无法跨域使用**: 不能从不同源的 CSS 文件读取变量
6. **不支持选择器插值**: 不能在选择器名称中使用变量

**实际应用场景**:

1. **主题系统**:

```css
/* 明亮主题 */
:root {
  --bg-color: white;
  --text-color: #333;
}

/* 暗黑主题 */
.dark-theme {
  --bg-color: #222;
  --text-color: #eee;
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
}
```

2. **组件变体**:

```css
.button {
  --button-color: blue;
  background-color: var(--button-color);
}

.button.danger {
  --button-color: red;
}

.button.success {
  --button-color: green;
}
```

3. **响应式布局**:

```css
:root {
  --container-padding: 15px;
}

@media (min-width: 768px) {
  :root {
    --container-padding: 30px;
  }
}

.container {
  padding: var(--container-padding);
}
```

CSS 变量是现代 CSS 工具箱中的重要成员，能有效提升代码质量和开发效率，特别适合复杂用户界面和组件化开发。

### 4. 介绍 CSS Grid 和 Flexbox 布局，并比较它们的适用场景 【中级】

**简单答案：** CSS Grid 是二维布局系统，适合整体页面布局和复杂的网格结构；Flexbox 是一维布局系统，适合一行或一列元素的排列。Grid 更适合大型布局和不规则网格，而 Flexbox 更适合组件内部布局和简单线性排列。两者可以搭配使用，优势互补。

**详细答案：** CSS Grid 和 Flexbox 是现代 CSS 布局的两大核心技术，它们解决了传统布局方法的局限性，使复杂布局变得简单直观。

**Flexbox (弹性盒布局)**:

基本概念：

- 一维布局系统，沿主轴(main axis)或交叉轴(cross axis)布局元素
- 主要控制元素在单行或单列中的排布、对齐和空间分配
- 特别适合于不确定数量或大小的元素排列

关键属性：

```css
/* 容器属性 */
.flex-container {
  display: flex;
  flex-direction: row | row-reverse | column | column-reverse;
  justify-content: flex-start | center | flex-end | space-between | space-around | space-evenly;
  align-items: stretch | flex-start | center | flex-end | baseline;
  flex-wrap: nowrap | wrap | wrap-reverse;
  gap: 10px; /* 行列间距 */
}

/* 子项属性 */
.flex-item {
  flex: 1 1 auto; /* grow shrink basis 简写 */
  /* 或单独指定 */
  flex-grow: 1; /* 分配剩余空间的比例 */
  flex-shrink: 1; /* 分配空间不足时的收缩比例 */
  flex-basis: auto; /* 元素基准尺寸 */
  align-self: auto | flex-start | center | flex-end | baseline | stretch;
  order: 0; /* 元素排序优先级 */
}
```

**CSS Grid (网格布局)**:

基本概念：

- 二维布局系统，同时控制行和列
- 可以精确定位元素在网格中的位置
- 适合复杂布局和整体页面结构设计

关键属性：

```css
/* 容器属性 */
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3列等宽 */
  grid-template-rows: 100px auto 100px; /* 行高定义 */
  gap: 10px; /* 行列间距 */
  justify-items: start | center | end | stretch;
  align-items: start | center | end | stretch;
  grid-template-areas:
    'header header header'
    'sidebar content content'
    'footer footer footer';
}

/* 子项属性 */
.grid-item {
  grid-column: 1 / 3; /* 开始线 / 结束线 */
  grid-row: 1 / 2;
  /* 或使用区域名称 */
  grid-area: header;
  justify-self: start | center | end | stretch;
  align-self: start | center | end | stretch;
}
```

**对比与选择**:

| 特性         | Flexbox                    | CSS Grid                           |
| ------------ | -------------------------- | ---------------------------------- |
| 维度         | 一维(行或列)               | 二维(行和列)                       |
| 布局方向     | 沿主轴方向，单行或单列     | 同时控制行和列                     |
| 控制粒度     | 主要控制元素之间关系       | 可精确控制元素位置                 |
| 自动布局能力 | 强，内容驱动的布局         | 强，但更侧重于预定义结构           |
| 间隙控制     | 支持(gap 属性)             | 支持(gap 属性)                     |
| 对齐方式     | 主轴和交叉轴对齐           | 水平和垂直方向对齐                 |
| 嵌套能力     | 简单嵌套                   | 复杂嵌套和区域定义                 |
| 适用场景     | 组件内部布局、导航、工具栏 | 整体页面布局、网格系统、不规则布局 |

**Flexbox 适合场景**:

- 导航菜单和工具栏
- 卡片布局中的元素对齐
- 不定数量元素的均匀分布
- 垂直或水平居中内容
- 一维方向的元素排列

**CSS Grid 适合场景**:

- 整体页面布局框架
- 图片画廊和卡片网格
- 表格式数据展示
- 复杂的仪表盘界面
- 不规则布局，如杂志风格布局

**组合使用的最佳实践**:

- 使用 Grid 定义整体布局结构
- 使用 Flexbox 管理单个网格单元内的内容排列
- 嵌套使用，大布局用 Grid，组件内部用 Flexbox

**示例: 组合使用**:

```css
.page {
  display: grid;
  grid-template-areas:
    'header header'
    'sidebar content'
    'footer footer';
  grid-template-columns: 250px 1fr;
}

.header {
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.content {
  grid-area: content;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.card {
  display: flex;
  flex-direction: column;
}
```

Grid 和 Flexbox 不是互相替代的技术，而是互补的。理解它们各自的优势和适用场景，可以选择最合适的工具构建出优雅、响应式的 Web 布局。

### 5. 解释 CSS 中的层叠上下文(Stacking Context)及 z-index 属性的工作原理 【高级】

**简单答案：** 层叠上下文是元素在三维空间中的层叠关系，决定了重叠元素的显示顺序。z-index 属性控制元素在层叠上下文中的层叠级别，但仅对定位元素(position 非 static)有效。z-index 比较只在同一层叠上下文内有意义，子元素无法超出父层叠上下文的层叠级别。

**详细答案：** 层叠上下文(Stacking Context)和 z-index 是控制元素在 Z 轴(即垂直于屏幕的方向)如何排列的核心概念。

**层叠上下文基础**:

- 层叠上下文是 HTML 元素在三维空间中的概念层次
- 每个层叠上下文都是相互独立的
- 子元素的 z-index 只在父层叠上下文内部比较
- 整个页面中可以存在多个层叠上下文，形成层次结构

**创建层叠上下文的方式**:

1. 文档根元素(`<html>`)
2. position 为 relative/absolute/fixed/sticky 且 z-index 不为 auto 的元素
3. position 为 fixed/sticky 的元素(不论 z-index 值)
4. flex 容器的子元素，且 z-index 不为 auto
5. grid 容器的子元素，且 z-index 不为 auto
6. opacity 小于 1 的元素
7. mix-blend-mode 不为 normal 的元素
8. 以下属性值不为 none 的元素:
   - transform
   - filter
   - perspective
   - clip-path
   - mask/mask-image/mask-border
9. isolation 为 isolate 的元素
10. -webkit-overflow-scrolling 为 touch 的元素
11. will-change 指定了任意会创建层叠上下文的属性
12. contain 为 layout/paint 或包含它们的值

**层叠顺序(从底到顶)**:

1. 层叠上下文的背景和边框
2. z-index 为负的定位子元素
3. 非定位的块级元素
4. 浮动元素
5. 行内元素
6. z-index 为 0 或 auto 的定位元素
7. z-index 为正的定位元素

**z-index 属性**:

- 只对创建了层叠上下文的元素有效
- 整数值(包括负值)，定义元素的堆叠层级
- auto 值表示不创建新的层叠上下文(除非由其他属性触发)
- 仅在同级元素之间比较有意义

**常见问题与解决方案**:

1. **z-index 失效**:

   - 原因：元素没有定位或父元素创建了层叠上下文
   - 解决：检查元素是否有定位，以及父元素是否创建了层叠上下文

2. **z-index 值过大**:

   - 问题：z-index 设为 999999 也无法置于顶层
   - 解决：理解层叠上下文层级关系，而不是简单增加 z-index 值

3. **层叠上下文隔离**:
   - 技巧：使用 isolation: isolate 创建新的层叠上下文，隔离内部元素与外部的 z-index 争夺

**示例**:

```html
<div class="parent" style="position: relative; z-index: 1;">
  Parent
  <div class="child1" style="position: absolute; z-index: 100;">Child 1</div>
</div>
<div class="parent2" style="position: relative; z-index: 2;">
  Parent 2
  <div class="child2" style="position: absolute; z-index: 1;">Child 2</div>
</div>
```

在这个例子中:

- 尽管 Child 1 的 z-index(100)远大于 Child 2 的 z-index(1)
- 但因为它们在不同的层叠上下文中
- Parent 2 的 z-index(2)大于 Parent 1 的 z-index(1)
- 所以 Child 2 会显示在 Child 1 之上

**实际应用的最佳实践**:

1. 避免过大的 z-index 值，推荐使用 1-10 的小范围值
2. 在组件中使用相对 z-index 值，便于组件复用
3. 使用 CSS 变量管理 z-index 值，保持一致性
4. 警惕隐式创建的层叠上下文(如 opacity, transform 等)
5. 使用开发工具检查层叠关系

理解层叠上下文和 z-index 是解决元素重叠、模态框、下拉菜单等 UI 组件开发的关键，对于复杂布局尤为重要。

### 6. 解释 IndexedDB 的用途、特点及与其他前端存储方案的区别 【高级】

**简单答案：** IndexedDB 是浏览器中的低级 API，用于客户端存储大量结构化数据，包括文件和二进制对象。它支持事务操作、索引查询和大数据量存储，适合复杂数据存储需求。相比 localStorage 和 WebSQL，IndexedDB 提供更高的存储容量、查询能力和事务安全性，是构建离线应用的核心技术。

**详细答案：** IndexedDB 是一个强大的客户端数据库系统，为现代 Web 应用提供了复杂数据存储和检索能力。

**核心特性：**

1. **NoSQL 数据库**：基于对象存储，而非传统的表格结构
2. **异步 API**：所有操作都是非阻塞的，不影响 UI 响应
3. **事务性**：支持 ACID 事务，确保数据完整性
4. **同源策略**：遵循浏览器同源策略，增强安全性
5. **存储容量大**：通常可存储数百 MB 甚至 GB 级数据
6. **结构化查询**：支持索引和游标，提供高效数据检索
7. **支持二进制数据**：可直接存储 Blob、ArrayBuffer 等二进制对象

**基本使用流程：**

```javascript
// 1. 打开数据库连接
const request = indexedDB.open('MyDatabase', 1);

// 2. 处理数据库事件
request.onerror = function (event) {
  console.error('数据库错误:', event.target.error);
};

// 3. 处理数据库版本变更事件(创建/更新对象存储)
request.onupgradeneeded = function (event) {
  const db = event.target.result;

  // 创建对象存储(表)
  const store = db.createObjectStore('customers', { keyPath: 'id' });

  // 创建索引(优化查询)
  store.createIndex('name', 'name', { unique: false });
  store.createIndex('email', 'email', { unique: true });

  console.log('数据库结构已初始化');
};

// 4. 数据库打开成功
request.onsuccess = function (event) {
  const db = event.target.result;
  console.log('数据库连接已就绪');

  // 数据库操作示例

  // 添加数据
  function addCustomer(customer) {
    const transaction = db.transaction(['customers'], 'readwrite');
    const store = transaction.objectStore('customers');
    const request = store.add(customer);

    request.onsuccess = function () {
      console.log('客户数据已添加，ID:', request.result);
    };

    transaction.oncomplete = function () {
      console.log('事务完成');
    };

    transaction.onerror = function (event) {
      console.error('事务错误:', event.target.error);
    };
  }

  // 获取数据
  function getCustomer(id) {
    const transaction = db.transaction(['customers']);
    const store = transaction.objectStore('customers');
    const request = store.get(id);

    request.onsuccess = function () {
      if (request.result) {
        console.log('获取客户:', request.result);
      } else {
        console.log('未找到客户，ID:', id);
      }
    };
  }

  // 更新数据
  function updateCustomer(customer) {
    const transaction = db.transaction(['customers'], 'readwrite');
    const store = transaction.objectStore('customers');
    const request = store.put(customer); // 更新或添加

    request.onsuccess = function () {
      console.log('客户数据已更新');
    };
  }

  // 删除数据
  function deleteCustomer(id) {
    const transaction = db.transaction(['customers'], 'readwrite');
    const store = transaction.objectStore('customers');
    const request = store.delete(id);

    request.onsuccess = function () {
      console.log('客户已删除，ID:', id);
    };
  }

  // 使用索引查询
  function getCustomerByEmail(email) {
    const transaction = db.transaction(['customers']);
    const store = transaction.objectStore('customers');
    const index = store.index('email');
    const request = index.get(email);

    request.onsuccess = function () {
      if (request.result) {
        console.log('通过邮箱找到客户:', request.result);
      } else {
        console.log('未找到客户，邮箱:', email);
      }
    };
  }

  // 使用游标遍历所有客户
  function getAllCustomers() {
    const customers = [];
    const transaction = db.transaction(['customers']);
    const store = transaction.objectStore('customers');
    const request = store.openCursor();

    request.onsuccess = function (event) {
      const cursor = event.target.result;
      if (cursor) {
        customers.push(cursor.value);
        cursor.continue(); // 移动到下一条记录
      } else {
        console.log('所有客户:', customers); // 已到达末尾
      }
    };
  }

  // 使用游标和范围查询
  function getCustomersInRange(minAge, maxAge) {
    const range = IDBKeyRange.bound(minAge, maxAge);
    const transaction = db.transaction(['customers']);
    const store = transaction.objectStore('customers');
    const index = store.index('age');
    const request = index.openCursor(range);

    const customers = [];
    request.onsuccess = function (event) {
      const cursor = event.target.result;
      if (cursor) {
        customers.push(cursor.value);
        cursor.continue();
      } else {
        console.log(`${minAge}-${maxAge}岁范围内的客户:`, customers);
      }
    };
  }
};
```

**与其他前端存储方案的对比：**

| 特性         | IndexedDB                 | localStorage | WebSQL          | Cookies            |
| ------------ | ------------------------- | ------------ | --------------- | ------------------ |
| **存储容量** | 数百 MB 到 GB 级          | 通常 5-10MB  | 数十 MB         | 通常 4KB           |
| **API 类型** | 异步                      | 同步         | 异步            | 同步               |
| **数据类型** | 任意 JS 类型, Blob, Files | 仅字符串     | 结构化 SQL 数据 | 仅字符串           |
| **索引能力** | 强大，支持多索引          | 无索引       | SQL 索引        | 无索引             |
| **事务支持** | 完整 ACID 支持            | 无           | SQL 事务        | 无                 |
| **复杂度**   | 高                        | 低           | 中              | 低                 |
| **查询能力** | 基于索引的结构化查询      | 仅键值查询   | 完整 SQL 查询   | 简单字符串解析     |
| **标准状态** | W3C 标准                  | W3C 标准     | 已废弃          | IETF 标准          |
| **适用场景** | 复杂数据、离线应用        | 简单配置存储 | 不推荐使用      | 会话管理、用户标识 |

**高级概念和模式：**

1. **版本管理**：
   - 每次更改数据库结构时增加版本号
   - 在 `onupgradeneeded` 事件中处理结构迁移
   - 保持向后兼容性的策略

```javascript
// 版本迁移示例
request.onupgradeneeded = function (event) {
  const db = event.target.result;
  const oldVersion = event.oldVersion;

  if (oldVersion < 1) {
    // 版本0→1的迁移
    db.createObjectStore('customers', { keyPath: 'id' });
  }

  if (oldVersion < 2) {
    // 版本1→2的迁移
    const store = request.transaction.objectStore('customers');
    store.createIndex('email', 'email', { unique: true });
  }

  if (oldVersion < 3) {
    // 版本2→3的迁移
    const store = request.transaction.objectStore('customers');
    store.createIndex('address.city', 'address.city'); // 嵌套属性索引
  }
};
```

2. **复合键和高级索引**：

```javascript
// 复合键对象存储
const productStore = db.createObjectStore('products', {
  keyPath: ['category', 'productId'],
});

// 多值索引
productStore.createIndex('tags', 'tags', { multiEntry: true });

// 复合索引
productStore.createIndex('categoryAndPrice', ['category', 'price']);
```

3. **大型二进制数据处理**：

```javascript
// 存储文件
function saveFile(file) {
  const transaction = db.transaction(['files'], 'readwrite');
  const store = transaction.objectStore('files');

  const fileData = {
    name: file.name,
    type: file.type,
    lastModified: file.lastModified,
    size: file.size,
    content: file, // 直接存储File对象
  };

  store.add(fileData);
}

// 使用Blob
function storeImage(imageUrl) {
  fetch(imageUrl)
    .then((response) => response.blob())
    .then((blob) => {
      const transaction = db.transaction(['images'], 'readwrite');
      const store = transaction.objectStore('images');
      store.put({
        id: Date.now(),
        blob: blob,
        metadata: { url: imageUrl },
      });
    });
}
```

4. **事务管理模式**：

```javascript
// 完整事务处理模式
function performComplexOperation() {
  const transaction = db.transaction(['customers', 'orders', 'products'], 'readwrite');
  transaction.onabort = handleAbort;

  // 获取对象存储
  const customerStore = transaction.objectStore('customers');
  const orderStore = transaction.objectStore('orders');
  const productStore = transaction.objectStore('products');

  try {
    // 操作1
    const customerRequest = customerStore.get(123);
    customerRequest.onsuccess = function () {
      const customer = customerRequest.result;

      if (!customer) throw new Error('Customer not found');

      // 操作2：更新客户记录
      customer.orderCount++;
      customerStore.put(customer);

      // 操作3：创建订单
      const order = { id: Date.now(), customerId: customer.id, items: [] };
      orderStore.add(order);

      // 操作4：更新产品库存
      const productRequest = productStore.get(456);
      productRequest.onsuccess = function () {
        const product = productRequest.result;
        if (!product || product.stock < 1) {
          // 回滚整个事务
          transaction.abort();
          return;
        }

        product.stock--;
        productStore.put(product);
      };
    };

    transaction.oncomplete = function () {
      console.log('复杂操作成功完成');
    };
  } catch (error) {
    console.error('操作失败，事务已回滚:', error);
    transaction.abort();
  }
}

function handleAbort(event) {
  console.error('事务中止:', event.target.error);
}
```

**应用场景：**

1. **离线应用**：

   - 存储应用数据，支持离线工作
   - 离线编辑和同步到服务器

2. **大数据集缓存**：

   - 本地缓存 API 结果
   - 减少网络请求，提高应用响应速度

3. **复杂应用状态管理**：

   - 持久化应用状态
   - 支持会话恢复

4. **媒体和文件管理**：

   - 缓存音频、视频和图像
   - 本地文件编辑应用

5. **数据密集型应用**：
   - 数据可视化应用
   - 报表和分析工具

**最佳实践：**

1. **数据库连接管理**：

   - 维护单个数据库连接实例
   - 实现连接池模式避免重复打开

2. **错误处理策略**：

   - 实现全面的错误处理和恢复机制
   - 考虑存储配额限制和用户拒绝权限的情况

3. **性能优化**：

   - 使用高效索引
   - 批量操作使用单一事务
   - 仅存储必要数据
   - 避免在主线程进行大量数据操作

4. **结构设计**：

   - 合理规划对象存储和索引
   - 考虑数据访问模式优化结构

5. **清理与维护**：
   - 实现数据过期策略
   - 定期清理不需要的数据
   - 监控存储使用情况

**示例：IndexedDB 包装库**

```javascript
// 简化的IndexedDB包装类
class IDBManager {
  constructor(dbName, version) {
    this.dbName = dbName;
    this.version = version;
    this.db = null;
    this.storeConfigs = new Map();
  }

  // 定义对象存储配置
  addStore(storeName, keyPath, indexes = []) {
    this.storeConfigs.set(storeName, { keyPath, indexes });
    return this;
  }

  // 打开数据库连接
  async connect() {
    if (this.db) return this.db;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = (event) => reject(event.target.error);

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        this.storeConfigs.forEach((config, storeName) => {
          if (!db.objectStoreNames.contains(storeName)) {
            const store = db.createObjectStore(storeName, { keyPath: config.keyPath });

            config.indexes.forEach((idx) => {
              store.createIndex(idx.name, idx.keyPath, idx.options || {});
            });
          }
        });
      };
    });
  }

  // 通用CRUD操作
  async add(storeName, data) {
    await this.connect();
    return this._runTransaction(storeName, 'readwrite', (store) => store.add(data));
  }

  async get(storeName, key) {
    await this.connect();
    return this._runTransaction(storeName, 'readonly', (store) => store.get(key));
  }

  async put(storeName, data) {
    await this.connect();
    return this._runTransaction(storeName, 'readwrite', (store) => store.put(data));
  }

  async delete(storeName, key) {
    await this.connect();
    return this._runTransaction(storeName, 'readwrite', (store) => store.delete(key));
  }

  async getAll(storeName) {
    await this.connect();
    return this._runTransaction(storeName, 'readonly', (store) => store.getAll());
  }

  // 通过索引查询
  async getByIndex(storeName, indexName, value) {
    await this.connect();
    return this._runTransaction(storeName, 'readonly', (store) => {
      const index = store.index(indexName);
      return index.get(value);
    });
  }

  // 通用事务处理
  async _runTransaction(storeName, mode, callback) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeName, mode);
      const store = transaction.objectStore(storeName);

      transaction.oncomplete = () => resolve();
      transaction.onerror = (event) => reject(event.target.error);

      const request = callback(store);

      if (request) {
        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject(event.target.error);
      }
    });
  }

  // 关闭连接
  close() {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
}

// 使用示例
const dbManager = new IDBManager('MyAppDB', 1)
  .addStore('customers', 'id', [
    { name: 'email', keyPath: 'email', options: { unique: true } },
    { name: 'name', keyPath: 'name' },
  ])
  .addStore('products', 'id');

// 使用
async function exampleUsage() {
  try {
    await dbManager.connect();

    // 添加客户
    await dbManager.add('customers', {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
    });

    // 获取客户
    const customer = await dbManager.get('customers', 1);
    console.log(customer);

    // 通过索引查询
    const customerByEmail = await dbManager.getByIndex('customers', 'email', 'john@example.com');
    console.log(customerByEmail);

    // 获取所有客户
    const allCustomers = await dbManager.getAll('customers');
    console.log(allCustomers);
  } catch (error) {
    console.error('数据库操作错误:', error);
  }
}
```

IndexedDB 是现代 Web 应用中强大的数据存储解决方案，为复杂数据处理和离线功能提供了坚实基础。随着 PWA 和富客户端应用的普及，掌握 IndexedDB 成为前端开发人员的重要技能。

## 现代 Web 平台技术

### 1. 什么是渐进式 Web 应用(PWA)？描述其核心特性和应用场景 【中级】

**简单答案：** 渐进式 Web 应用(PWA)是结合了 Web 和原生应用优势的现代应用模型。其核心特性包括可安装性、离线工作能力、推送通知和后台同步等。PWA 利用 Service Worker、Web App Manifest 和 HTTPS 等技术，在保持 Web 便捷性的同时提供类似原生应用的体验，适用于内容消费、电子商务、社交媒体等多种场景。

**详细答案：** 渐进式 Web 应用(Progressive Web Apps, PWA)代表了现代 Web 平台发展的重要方向，它模糊了 Web 应用和原生应用之间的界限。

**PWA 的核心特性：**

1. **渐进增强**：基础功能适用于所有浏览器，增强特性在现代浏览器中启用
2. **响应式设计**：适应不同屏幕尺寸和设备类型
3. **类应用体验**：具有应用式交互和导航体验
4. **连接独立性**：可在离线或网络不稳定环境下工作
5. **持续更新**：始终保持最新状态，无需应用商店审核
6. **安全性**：通过 HTTPS 提供服务，防止中间人攻击
7. **可发现性**：被搜索引擎识别为"应用"，SEO 友好
8. **可安装**：可添加到设备主屏幕，无需应用商店
9. **可链接**：可通过 URL 分享，无需复杂安装
10. **推送通知**：重新吸引用户的能力
11. **后台同步**：允许在连接恢复时同步数据

**PWA 所基于的关键技术：**

1. **Service Workers**：

   - 作为网络请求的代理
   - 提供离线缓存能力
   - 启用推送通知
   - 支持后台同步

   ```javascript
   // 注册Service Worker
   if ('serviceWorker' in navigator) {
     navigator.serviceWorker
       .register('/sw.js')
       .then((registration) => {
         console.log('Service Worker注册成功:', registration.scope);
       })
       .catch((error) => {
         console.error('Service Worker注册失败:', error);
       });
   }
   ```

2. **Web App Manifest**：

   - 定义应用元数据
   - 控制安装体验和外观
   - 设置启动画面和图标

   ```json
   {
     "name": "我的PWA应用",
     "short_name": "PWA应用",
     "start_url": "/index.html",
     "display": "standalone",
     "background_color": "#ffffff",
     "theme_color": "#4285f4",
     "icons": [
       {
         "src": "/images/icon-192.png",
         "sizes": "192x192",
         "type": "image/png"
       },
       {
         "src": "/images/icon-512.png",
         "sizes": "512x512",
         "type": "image/png"
       }
     ]
   }
   ```

3. **Push API**：

   - 允许服务器向应用发送推送通知
   - 即使应用未打开也能接收消息

   ```javascript
   // 请求推送通知权限
   Notification.requestPermission().then((permission) => {
     if (permission === 'granted') {
       // 订阅推送服务
       navigator.serviceWorker.ready.then((registration) => {
         registration.pushManager
           .subscribe({
             userVisibleOnly: true,
             applicationServerKey: urlBase64ToUint8Array(publicKey),
           })
           .then((subscription) => {
             // 将订阅信息发送到服务器
             saveSubscription(subscription);
           });
       });
     }
   });
   ```

4. **Cache API**：

   - 用于存储网络响应
   - 与 Service Worker 配合实现离线功能

   ```javascript
   // 在Service Worker中缓存资源
   self.addEventListener('install', (event) => {
     event.waitUntil(
       caches.open('my-app-cache-v1').then((cache) => {
         return cache.addAll(['/', '/index.html', '/styles.css', '/script.js', '/images/logo.png']);
       })
     );
   });
   ```

5. **Background Sync API**：

   - 在网络连接恢复时同步数据
   - 改善弱网络环境下的用户体验

   ```javascript
   // 注册后台同步
   navigator.serviceWorker.ready.then((registration) => {
     if ('sync' in registration) {
       registration.sync.register('sync-data');
     }
   });

   // 在Service Worker中处理同步事件
   self.addEventListener('sync', (event) => {
     if (event.tag === 'sync-data') {
       event.waitUntil(syncData());
     }
   });
   ```

**PWA 的主要应用场景：**

1. **内容消费应用**：

   - 新闻和媒体网站
   - 博客和出版物
   - 视频和音频平台

   **示例**：Twitter Lite 减少 70%的数据使用，提升 65%的页面访问量

2. **电子商务平台**：

   - 在线商店
   - 产品目录
   - 预订系统

   **示例**：Flipkart Lite 将转化率提高了 70%，用户停留时间增加 3 倍

3. **社交媒体和通讯工具**：

   - 社交网络
   - 即时通讯
   - 社区平台

   **示例**：Pinterest PWA 提升快速的移动体验，转化率提高 44%

4. **企业应用**：

   - 内部工具
   - CRM 和 ERP 系统
   - 数据记录和表单

   **示例**：Starbucks PWA 的订单界面体积是原生 iOS 应用的 0.4%

5. **工具类应用**：

   - 天气预报
   - 日历和计划工具
   - 笔记和文档编辑器

   **示例**：Google Maps Go 为低性能设备优化的 PWA 版本

**PWA 实现的关键步骤：**

1. **开发响应式 Web 应用**：

   - 确保在所有设备上的良好体验
   - 使用媒体查询和灵活布局

2. **启用 HTTPS**：

   - PWA 的必要条件
   - 确保安全通信

3. **创建 Service Worker**：

   - 实现资源缓存策略
   - 处理离线体验
   - 管理网络请求

4. **添加 Web App Manifest**：

   - 定义应用元数据和外观
   - 启用"添加到主屏幕"功能

5. **实现适当的缓存策略**：

   - 决定哪些资源缓存
   - 选择合适的缓存模式

6. **优化性能**：

   - 针对移动设备优化
   - 资源压缩
   - 按需加载

7. **添加推送通知**（可选）：

   - 设置推送服务
   - 实现通知逻辑

8. **添加后台同步**（可选）：
   - 实现离线数据收集
   - 在网络恢复时同步

**PWA 的挑战和限制：**

1. **跨浏览器支持差异**：

   - Safari 和 iOS 的有限支持
   - 部分高级功能在某些浏览器中不可用

2. **硬件功能访问有限**：

   - 相比原生应用，对某些设备功能访问受限
   - 需要优雅降级策略

3. **用户习惯**：

   - 用户可能习惯于应用商店安装
   - 添加到主屏幕的认知门槛

4. **电池和资源消耗**：
   - 需谨慎使用后台处理
   - 优化 Service Worker 生命周期

**评估 PWA 成功的指标：**

1. **性能指标**：

   - 首次内容绘制(FCP)
   - 首次有效绘制(FMP)
   - 可交互时间(TTI)
   - 速度指数(SI)
   - 安装率

2. **用户参与度**：

   - 会话持续时间
   - 跳出率
   - 页面访问量
   - 再次访问率

3. **业务指标**：
   - 转化率
   - 平均订单价值
   - 广告收入
   - 用户获取成本

**PWA 的未来发展趋势：**

1. **更广泛的平台支持**：

   - iOS 和 Safari 增强支持
   - 桌面 PWA 的普及

2. **与原生 API 进一步融合**：

   - Web NFC、Web Bluetooth 等新 API
   - 更强大的设备集成能力

3. **应用商店分发**：

   - Microsoft Store 已支持 PWA
   - 其他应用商店可能跟进

4. **针对物联网优化**：
   - 轻量级设备界面
   - 离线优先体验

PWA 代表了 Web 平台的一个重要进步，将移动 Web 体验带入了新高度。通过提供接近原生的用户体验，同时保持 Web 的开放性和可访问性，PWA 在当今多设备、多平台的数字环境中提供了一种高效、经济的应用开发和分发方式。

### 2. 浏览器的同源策略是什么？解释 CORS 的工作原理及其实现方式 【中级】

**简单答案：** 同源策略是浏览器安全机制，限制不同源(协议、域名、端口不完全相同)的网页之间访问资源和交互。跨域资源共享(CORS)是克服此限制的标准方法，通过 HTTP 头部允许服务器声明哪些源可以访问其资源。实现 CORS 时，服务器需设置 Access-Control-Allow-Origin 等响应头，对复杂请求还需处理预检请求。

**详细答案：** 同源策略(Same-Origin Policy)和跨域资源共享(Cross-Origin Resource Sharing, CORS)是现代 Web 应用中关键的安全概念。

**同源策略基础：**

1. **定义**：浏览器安全机制，限制一个源的文档或脚本如何与另一个源的资源进行交互
2. **同源定义**：两个 URL 的协议、域名和端口完全相同
3. **示例**：

   | URL A                     | URL B                     | 是否同源 | 原因                 |
   | ------------------------- | ------------------------- | -------- | -------------------- |
   | https://example.com/page1 | https://example.com/page2 | ✓        | 协议、域名、端口相同 |
   | https://example.com       | https://app.example.com   | ✗        | 子域名不同           |
   | https://example.com       | http://example.com        | ✗        | 协议不同             |
   | https://example.com       | https://example.com:8080  | ✗        | 端口不同             |
   | https://example.com       | https://example.org       | ✗        | 域名不同             |

4. **限制内容**：

   - XMLHttpRequest 或 Fetch API 发起的请求
   - Web Storage 和 IndexedDB 访问
   - DOM 访问
   - 相关 Cookies 访问

5. **安全意义**：
   - 防止恶意网站读取其他网站的敏感数据
   - 限制跨站点请求伪造(CSRF)
   - 分割不同源的信息

**CORS 工作原理：**

1. **定义**：一种标准机制，允许服务器声明哪些源有权访问其资源
2. **角色**：

   - 浏览器：强制执行同源策略，添加 CORS 相关头部
   - 服务器：通过 HTTP 头部表明哪些源被允许
   - Web 应用：发起跨域请求

3. **请求类型**：

   - **简单请求**：满足以下所有条件的请求

     - 方法：GET、HEAD 或 POST
     - 仅包含允许的头部(Accept、Accept-Language 等)
     - Content-Type 仅限于：text/plain、application/x-www-form-urlencoded、multipart/form-data

   - **预检请求**：不符合简单请求标准的请求
     - 使用 OPTIONS 方法进行预检
     - 包含实际请求方法和头部的信息
     - 服务器可以决定是否允许实际请求

4. **关键 HTTP 头部**：

   **请求头部**：

   - `Origin`：指明请求来源
   - `Access-Control-Request-Method`：预检请求中指明实际请求的 HTTP 方法
   - `Access-Control-Request-Headers`：预检请求中指明实际请求将包含的自定义头部

   **响应头部**：

   - `Access-Control-Allow-Origin`：指明允许的源（特定源或"\*"）
   - `Access-Control-Allow-Methods`：允许的 HTTP 方法
   - `Access-Control-Allow-Headers`：允许的头部
   - `Access-Control-Allow-Credentials`：是否允许包含凭据(cookies)
   - `Access-Control-Max-Age`：预检请求的缓存时间
   - `Access-Control-Expose-Headers`：允许客户端访问的响应头部

**CORS 实际请求流程：**

1. **简单请求流程**：

```
浏览器 ---> 服务器：HTTP请求 + Origin头部
服务器 ---> 浏览器：HTTP响应 + Access-Control-Allow-Origin头部
浏览器：检查Access-Control-Allow-Origin是否包含请求的Origin
       - 如果匹配：允许访问响应
       - 如果不匹配：阻止访问响应并抛出错误
```

2. **预检请求流程**：

```
浏览器 ---> 服务器：OPTIONS请求 + Origin + Access-Control-Request-Method + Access-Control-Request-Headers
服务器 ---> 浏览器：HTTP响应 + Access-Control-Allow-Origin + Access-Control-Allow-Methods + Access-Control-Allow-Headers
浏览器：检查预检响应是否允许实际请求
       - 如果允许：发送实际请求
       - 如果不允许：不发送实际请求并抛出错误
浏览器 ---> 服务器：实际HTTP请求 + Origin头部
服务器 ---> 浏览器：实际HTTP响应 + Access-Control-Allow-Origin头部
浏览器：最终检查并决定是否允许访问响应
```

**CORS 的服务器端实现：**

1. **Node.js/Express 示例**：

```javascript
// 允许单一源
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://trusted-site.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // 处理预检请求
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204); // No content
  }
  next();
});

// 或使用cors包
const cors = require('cors');
app.use(
  cors({
    origin: 'https://trusted-site.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // 允许携带凭据
  })
);
```

2. **Apache 配置示例**：

```apache
<IfModule mod_headers.c>
  Header set Access-Control-Allow-Origin "https://trusted-site.com"
  Header set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
  Header set Access-Control-Allow-Headers "Content-Type, Authorization"
  Header set Access-Control-Allow-Credentials "true"

  # 处理预检请求
  RewriteEngine On
  RewriteCond %{REQUEST_METHOD} OPTIONS
  RewriteRule ^(.*)$ $1 [R=204,L]
</IfModule>
```

3. **Nginx 配置示例**：

```nginx
server {
  # ...

  location / {
    if ($request_method = 'OPTIONS') {
      add_header 'Access-Control-Allow-Origin' 'https://trusted-site.com';
      add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS';
      add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization';
      add_header 'Access-Control-Allow-Credentials' 'true';
      add_header 'Content-Type' 'text/plain charset=UTF-8';
      add_header 'Content-Length' 0;
      return 204;
    }

    add_header 'Access-Control-Allow-Origin' 'https://trusted-site.com';
    add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS';
    add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization';
    add_header 'Access-Control-Allow-Credentials' 'true';

    # ...
  }
}
```

4. **PHP 实现示例**：

```php
<?php
// 允许特定域名
header("Access-Control-Allow-Origin: https://trusted-site.com");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

// 处理预检请求
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
  header("HTTP/1.1 204 No Content");
  exit;
}

// 正常处理请求
// ...
?>
```

**客户端发起 CORS 请求：**

1. **基本 Fetch API 示例**：

```javascript
// 简单请求
fetch('https://api.example.com/data', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('错误:', error));

// 包含凭据的请求
fetch('https://api.example.com/user-data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
```
