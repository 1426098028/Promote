# ECMAScript 2020 (ES11) 新特性

ECMAScript 2020，也称为 ES11，是 JavaScript 语言的年度更新，于 2020 年 6 月发布。此版本引入了几个重要特性，包括动态导入、BigInt、Promise.allSettled 和全局 this 等，同时也加强了对象和字符串操作能力。

## 主要新增特性

### 1. 动态导入 (Dynamic Import)

- 允许按需导入模块，而不是在顶层静态导入
- 返回一个 Promise，解决后获得模块命名空间对象

```javascript
// 静态导入 (以前的方式)
import { someFunction } from './someModule.js';

// 动态导入 (ES11)
const modulePromise = import('./someModule.js');
modulePromise.then((module) => {
  module.someFunction();
});

// 通常与 async/await 一起使用
async function loadModule() {
  try {
    const module = await import('./someModule.js');
    module.someFunction();
  } catch (error) {
    console.error('模块加载失败:', error);
  }
}
```

### 2. BigInt

- 新的数据类型，表示任意精度的整数
- 解决了 JavaScript 无法精确表示大于 2^53-1 的整数问题

```javascript
// 创建 BigInt
const bigInt1 = 9007199254740991n; // 直接添加 n 后缀
const bigInt2 = BigInt(9007199254740991); // 或使用构造函数

// 基本运算
console.log(bigInt1 + 1n); // 9007199254740992n
console.log(bigInt1 * 2n); // 18014398509481982n

// BigInt 和 Number 不能混合运算
// console.log(bigInt1 + 1); // TypeError

// 可以显式转换
console.log(bigInt1 + BigInt(1)); // 9007199254740992n
console.log(Number(bigInt1) + 1); // 9007199254740992
```

### 3. Promise.allSettled()

- 等待所有 Promise 完成（无论解决或拒绝），返回每个 Promise 的结果
- 与 Promise.all() 不同，它不会在任何一个 Promise 被拒绝时就失败

```javascript
const promises = [fetch('/api/endpoint1').then((response) => response.json()), fetch('/api/endpoint2').then((response) => response.json()), fetch('/api/invalid').then((response) => response.json())];

// 使用 Promise.all()，任一 Promise 拒绝就会导致整体拒绝
Promise.all(promises)
  .then((results) => {
    console.log('全部成功:', results);
  })
  .catch((error) => {
    console.error('至少有一个请求失败:', error);
  });

// 使用 Promise.allSettled()，等待所有 Promise 完成
Promise.allSettled(promises).then((results) => {
  // results 是一个对象数组，每个对象有 status 和 value/reason 属性
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(`请求 ${index + 1} 成功:`, result.value);
    } else {
      console.log(`请求 ${index + 1} 失败:`, result.reason);
    }
  });
});
```

### 4. globalThis

- 提供统一的方式获取全局对象，无论运行环境是什么
- 解决了跨环境代码中访问全局对象的不一致问题
- ES11 正式标准化了这一特性，为所有 JavaScript 环境提供了一致的全局对象访问方式

```javascript
// 以前需要根据环境判断
function getGlobalObject() {
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;
  if (typeof self !== 'undefined') return self;
  throw new Error('无法获取全局对象');
}

// ES11 提供的统一方式
console.log(globalThis); // 在任何环境中都是全局对象
```

### 5. 可选链操作符 (Optional Chaining)

- 允许读取深层嵌套对象属性而不必验证每个引用是否有效
- 当引用为 nullish (null 或 undefined) 时，表达式短路，返回 undefined

```javascript
// 以前的方式
let nestedValue;
if (obj && obj.first && obj.first.second) {
  nestedValue = obj.first.second;
}

// 使用可选链
const nestedValue = obj?.first?.second;

// 应用于方法调用
const result = obj.method?.();

// 应用于数组元素
const firstElement = arr?.[0];
```

### 6. 空值合并操作符 (Nullish Coalescing)

- 当左侧操作数为 null 或 undefined 时，返回右侧操作数，否则返回左侧操作数
- 与 || 不同，空字符串 '' 和 0 被视为有效值

```javascript
// 逻辑或操作符的问题
const count = userCount || 10; // 如果 userCount 为 0，也会返回 10

// 空值合并操作符
const count = userCount ?? 10; // 只有 userCount 为 null 或 undefined 时才返回 10
const text = inputText ?? ''; // 即使 inputText 是空字符串，也会使用它

// 组合使用可选链和空值合并
const value = obj?.prop?.value ?? 'default';
```

### 7. String.prototype.matchAll()

- 返回一个包含所有匹配正则表达式及其捕获组的迭代器
- 简化了对正则表达式全局匹配的处理

```javascript
const text = 'test1test2test3';
const pattern = /test(\d)/g;

// 旧方法：循环调用 exec
let match;
while ((match = pattern.exec(text)) !== null) {
  console.log(`匹配: ${match[0]}, 捕获组: ${match[1]}`);
}

// 使用 matchAll
const matches = text.matchAll(pattern);
for (const match of matches) {
  console.log(`匹配: ${match[0]}, 捕获组: ${match[1]}`);
}

// 也可以转换为数组
const allMatches = [...text.matchAll(pattern)];
```

### 8. import.meta

- 提供关于当前模块的元信息，如模块的 URL
- 在浏览器环境中特别有用，可以处理相对路径

```javascript
// 获取当前模块的 URL
console.log(import.meta.url);

// 构建相对于当前模块的资源路径
const resourceURL = new URL('./resource.json', import.meta.url);
```

### 9. 导出模块命名空间 (Module Namespace Exports)

- 允许重新导出导入的所有内容
- 简化了模块组合和重构

```javascript
// 之前的重新导出方式
export * from './module.js';
export { default } from './module.js';

// ES11 简化
export * as utilities from './utilities.js';
// 等同于:
// import * as utilities from './utilities.js';
// export { utilities };
```

## 数组和对象操作相关特性

### 数组操作

| 特性          | 描述                         | 使用频率 | 示例                                           |
| ------------- | ---------------------------- | -------- | ---------------------------------------------- |
| 可选链 (数组) | 安全访问可能不存在的数组索引 | ★★★★★    | `array?.[0]` 如果 array 为 null 返回 undefined |

### 对象操作

| 特性           | 描述                                 | 使用频率 | 示例                                 |
| -------------- | ------------------------------------ | -------- | ------------------------------------ |
| 可选链操作符   | 安全访问嵌套对象属性                 | ★★★★★    | `obj?.prop?.subProp`                 |
| 空值合并操作符 | 提供默认值，仅当为 null/undefined 时 | ★★★★★    | `obj.value ?? 'default'`             |
| BigInt         | 任意精度整数，处理超大数值           | ★★★★☆    | `9007199254740991n + 1n`             |
| globalThis     | 统一访问全局对象                     | ★★★☆☆    | `globalThis` 替代 window/global/self |

## 高频使用特性

以下是 ES11 中最常用的特性，根据使用频率排序：

| 特性                 | 使用频率 | 主要优势                                  |
| -------------------- | -------- | ----------------------------------------- |
| 可选链操作符         | ★★★★★    | 安全访问嵌套对象，避免错误                |
| 空值合并操作符       | ★★★★★    | 正确处理默认值，区分 0、'' 和 null        |
| Promise.allSettled() | ★★★★☆    | 处理多个独立 Promise 不会因一个失败而中断 |
| 动态导入             | ★★★★☆    | 按需加载模块，减少初始加载时间            |
| matchAll             | ★★★☆☆    | 简化正则表达式全局匹配处理                |

## 高级特性

以下特性较复杂或有特定的使用场景：

| 特性         | 复杂度 | 主要应用场景                       |
| ------------ | ------ | ---------------------------------- |
| BigInt       | ★★★★☆  | 大整数计算、加密操作、精确 ID 处理 |
| import.meta  | ★★★☆☆  | 模块元数据访问、相对路径处理       |
| 命名空间导出 | ★★★☆☆  | 模块组织、API 设计、库开发         |

## 实际应用示例

### 使用可选链和空值合并简化数据处理

```javascript
// 处理带有深层嵌套的 API 响应
function displayUserData(response) {
  // 用户名 - 有默认值
  const username = response?.user?.profile?.username ?? '匿名用户';

  // 用户积分 - 0 是有效值
  const points = response?.user?.gameStats?.points ?? 0;

  // 用户头像 - 提供默认图片
  const avatarUrl = response?.user?.profile?.avatar?.url ?? '/images/default-avatar.png';

  // 安全地调用可能不存在的方法
  const formattedDate = response?.user?.getLastActiveDate?.() ?? '从未活动';

  return { username, points, avatarUrl, formattedDate };
}

// 仅需一行代码安全访问深层嵌套数据
const adminRole = user?.permissions?.roles?.[0]?.type === 'admin';
```

### 使用 Promise.allSettled 处理多个 API 请求

```javascript
async function loadDashboardData() {
  const endpoints = ['/api/user', '/api/stats', '/api/notifications', '/api/newsFeed'];

  const requests = endpoints.map((url) =>
    fetch(url)
      .then((response) => response.json())
      .catch((error) => ({ error: true, message: error.message }))
  );

  // 无论请求成功与否，都获取所有结果
  const results = await Promise.allSettled(requests);

  // 只使用成功的结果，跳过失败的
  const dashboardData = {
    user: results[0].status === 'fulfilled' ? results[0].value : null,
    stats: results[1].status === 'fulfilled' ? results[1].value : null,
    notifications: results[2].status === 'fulfilled' ? results[2].value : null,
    newsFeed: results[3].status === 'fulfilled' ? results[3].value : null,
  };

  // 如果某些请求失败，也能部分显示数据
  return dashboardData;
}
```

## 浏览器支持情况

| 浏览器            | 支持 ES11 起始版本 | 发布日期     |
| ----------------- | ------------------ | ------------ |
| Chrome            | 80                 | 2020 年 2 月 |
| Firefox           | 74                 | 2020 年 3 月 |
| Safari            | 13.1               | 2020 年 3 月 |
| Edge (Chromium)   | 80                 | 2020 年 2 月 |
| Internet Explorer | 不支持             | -            |
| Opera             | 67                 | 2020 年 3 月 |

## 与前代的演进关系

ES11 继续增强了 JavaScript 对对象和数组操作的能力：

| 版本        | 发布日期     | 主要对象/数组操作增强                |
| ----------- | ------------ | ------------------------------------ |
| ES6 (2015)  | 2015 年 6 月 | 解构赋值，展开运算符                 |
| ES7 (2016)  | 2016 年 6 月 | Array.prototype.includes()           |
| ES8 (2017)  | 2017 年 6 月 | Object.entries(), Object.values()    |
| ES9 (2018)  | 2018 年 6 月 | 对象展开运算符 (...obj)              |
| ES10 (2019) | 2019 年 6 月 | Array.flat(), Object.fromEntries()   |
| ES11 (2020) | 2020 年 6 月 | 可选链(?.), 空值合并(??), globalThis |

## 转译支持

主流的 JavaScript 工具已支持 ES11 特性：

- **Babel**: 通过 @babel/preset-env 或特定插件支持
- **TypeScript**: 3.7+ 版本支持可选链和空值合并
- **Node.js**: 14.0.0+ 支持所有 ES11 特性

## 结论

ES11 (ECMAScript 2020) 带来的新特性极大地简化了常见的错误处理模式。可选链和空值合并操作符解决了 JavaScript 开发中常见的数据访问问题，使代码更简洁且不易出错。Promise.allSettled() 则为异步操作提供了更好的组合方式。

这些增强显示了 JavaScript 语言持续向提高开发者体验和代码可靠性方向演进，特别是在处理嵌套数据结构和异步操作方面。
