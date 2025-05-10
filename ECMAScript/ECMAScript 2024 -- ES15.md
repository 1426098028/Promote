# ECMAScript 2024 (ES15) 新特性

ECMAScript 2024，也称为 ES15，是 JavaScript 语言的年度更新，于 2024 年 6 月发布。本次更新引入了多项实用新特性，特别是在数组操作、字符串处理、Promise 处理以及正则表达式方面带来了显著的增强。

## 主要新增特性

### 1. Promise.withResolvers()

- 提供了一种创建 Promise 及其关联 resolve 和 reject 函数的简便方法
- 简化了需要外部控制 Promise 状态的场景
- 减少了嵌套代码，提高了可读性

```javascript
// 以前的方式
let resolvePromise, rejectPromise;
const promise = new Promise((resolve, reject) => {
  resolvePromise = resolve;
  rejectPromise = reject;
});

// ES15 方式
const { promise, resolve, reject } = Promise.withResolvers();

// 使用示例
setTimeout(() => resolve('操作完成！'), 1000);

promise
  .then((result) => {
    console.log(result); // '操作完成！'
  })
  .catch((error) => {
    console.error('发生错误:', error);
  });
```

### 2. Object.groupBy() 和 Map.groupBy()

- 允许按照指定条件将数组元素分组
- Object.groupBy() 返回普通对象，Map.groupBy() 返回 Map 对象
- 简化数据分析和处理，无需使用 reduce 实现分组功能
- 注意：这些方法最初是作为 Array.prototype.groupBy()在 ES14 中提出的提案，在 ES15 中重新设计并正式纳入标准

```javascript
const inventory = [
  { name: '苹果', type: '水果', quantity: 5 },
  { name: '香蕉', type: '水果', quantity: 10 },
  { name: '胡萝卜', type: '蔬菜', quantity: 8 },
  { name: '橙子', type: '水果', quantity: 3 },
  { name: '西兰花', type: '蔬菜', quantity: 4 },
];

// 使用 Object.groupBy() 按类型分组
const groupedByType = Object.groupBy(inventory, (item) => item.type);
console.log(groupedByType);
/* 输出:
{
  水果: [
    { name: '苹果', type: '水果', quantity: 5 },
    { name: '香蕉', type: '水果', quantity: 10 },
    { name: '橙子', type: '水果', quantity: 3 }
  ],
  蔬菜: [
    { name: '胡萝卜', type: '蔬菜', quantity: 8 },
    { name: '西兰花', type: '蔬菜', quantity: 4 }
  ]
}
*/

// 使用 Map.groupBy() 按数量范围分组
const groupedByQuantity = Map.groupBy(inventory, (item) => (item.quantity < 5 ? '少量' : item.quantity < 9 ? '中量' : '大量'));

// Map 对象内容
// '少量' => [{ name: '橙子', type: '水果', quantity: 3 }, { name: '西兰花', type: '蔬菜', quantity: 4 }]
// '中量' => [{ name: '苹果', type: '水果', quantity: 5 }, { name: '胡萝卜', type: '蔬菜', quantity: 8 }]
// '大量' => [{ name: '香蕉', type: '水果', quantity: 10 }]
```

### 3. String.prototype.isWellFormed() 和 String.prototype.toWellFormed()

- 用于检查和修复包含损坏 UTF-16 代理对的字符串
- isWellFormed() 返回布尔值，指示字符串是否格式正确
- toWellFormed() 返回一个新字符串，将所有不正确的代理对替换为替换字符 �

```javascript
// 正常字符串
const wellFormed = 'Hello, 世界';
console.log(wellFormed.isWellFormed()); // true

// 包含不成对代理字符的字符串（\uD800 是一个未配对的高代理项）
const illFormed = 'Hello, \uD800World';
console.log(illFormed.isWellFormed()); // false

// 修复格式不正确的字符串
console.log(illFormed.toWellFormed()); // "Hello, �World"

// 在处理 API 响应或用户输入时很有用
function safeEncodeURI(str) {
  return encodeURI(str.toWellFormed());
}

// 以前这可能会抛出错误
try {
  encodeURI(illFormed); // 可能抛出 URIError
} catch (e) {
  console.error('编码错误:', e);
}

// 现在安全了
console.log(safeEncodeURI(illFormed)); // 成功，不会抛出错误
```

### 4. 正则表达式 v 标志

- 新增正则表达式 `v` (Unicode set notation) 标志
- 允许更强大的 Unicode 属性转义和集合表示法
- 简化复杂字符类的创建，特别是在处理多语言文本时

```javascript
// 基本使用
// 注意：这需要支持 'v' 标志的 JavaScript 环境

// 匹配任何希腊文字母（使用 Unicode 属性）
const greekLetters = /\p{Script=Greek}/v;
console.log(greekLetters.test('α')); // true (希腊字母 alpha)
console.log(greekLetters.test('a')); // false (拉丁字母)

// 使用集合表示法（set notation）
// 匹配所有小写字母但不包括元音字母
const consonants = /[\p{Lowercase}--[aeiou]]/v;
console.log(consonants.test('b')); // true
console.log(consonants.test('a')); // false

// 使用交集操作符 (&&)
// 匹配既是大写字母又是希腊字母的字符
const upperGreek = /[\p{Uppercase}&&\p{Script=Greek}]/v;
console.log(upperGreek.test('Δ')); // true (大写希腊字母 Delta)
console.log(upperGreek.test('A')); // false (拉丁大写)
console.log(upperGreek.test('δ')); // false (小写希腊字母)
```

### 5. ArrayBuffer 改进：resize() 和 transfer()

- ArrayBuffer.prototype.resize() 允许调整 ArrayBuffer 的大小
- ArrayBuffer.prototype.transfer() 将数据转移到新的 ArrayBuffer 并使原始的无效
- 提供了更灵活的内存管理方式，特别适用于处理大型二进制数据

```javascript
// 创建一个可调整大小的 ArrayBuffer
const buffer = new ArrayBuffer(8, { maxByteLength: 16 });
console.log(buffer.byteLength); // 8

// 调整大小
buffer.resize(12);
console.log(buffer.byteLength); // 12

// 尝试超出最大值会抛出错误
try {
  buffer.resize(20); // 超出了 maxByteLength
} catch (e) {
  console.error('调整大小错误:', e);
}

// 转移 ArrayBuffer 内容
const buffer2 = new ArrayBuffer(4);
const view = new Uint8Array(buffer2);
view.set([1, 2, 3, 4]);

// 转移数据到新 buffer
const newBuffer = buffer2.transfer();
console.log(newBuffer.byteLength); // 4

try {
  // 原始 buffer 现在已无效
  console.log(buffer2.byteLength); // 抛出错误
} catch (e) {
  console.log('原始 buffer 已无效');
}
```

### 6. Atomics.waitAsync()

- 提供了 Atomics.wait() 的异步版本
- 在 SharedArrayBuffer 上使用，适用于跨工作线程的同步
- 返回一个 Promise，当条件满足时解析，而不是阻塞主线程

```javascript
// 创建一个共享数组缓冲区和视图
const sharedBuffer = new SharedArrayBuffer(4);
const view = new Int32Array(sharedBuffer);
Atomics.store(view, 0, 0);

// 等待索引 0 处的值变为 0（当前已是 0）
const result = Atomics.waitAsync(view, 0, 0);
result.value.then(
  (value) => console.log('等待结束，结果是:', value),
  (error) => console.error('等待出错:', error)
);

// 在另一个工作线程或超时后
setTimeout(() => {
  // 更改值并通知等待的 Promise
  Atomics.store(view, 0, 100);
  Atomics.notify(view, 0, 1);
  console.log('已更新值并通知');
}, 1000);
```

## 数组和对象操作相关特性

ES15 引入的特性大大增强了数组和对象的操作能力，以下是对这些功能的详细总结：

### 数组操作

| 特性                   | 描述                                | 使用频率 | 示例                            |
| ---------------------- | ----------------------------------- | -------- | ------------------------------- |
| Object.groupBy()       | 根据回调函数结果分组数组元素为对象  | ★★★★★    | `Object.groupBy(arr, fn)`       |
| Map.groupBy()          | 根据回调函数结果分组数组元素为 Map  | ★★★★☆    | `Map.groupBy(arr, fn)`          |
| ArrayBuffer.resize()   | 调整 ArrayBuffer 的大小             | ★★★☆☆    | `buffer.resize(newSize)`        |
| ArrayBuffer.transfer() | 转移 ArrayBuffer 内容并使原始的无效 | ★★★☆☆    | `const newBuf = buf.transfer()` |

### 对象操作

| 特性                    | 描述                                | 使用频率 | 示例                                                         |
| ----------------------- | ----------------------------------- | -------- | ------------------------------------------------------------ |
| Promise.withResolvers() | 创建包含 promise 和其控制函数的对象 | ★★★★★    | `const {promise, resolve, reject} = Promise.withResolvers()` |
| Atomics.waitAsync()     | 非阻塞方式等待共享内存中的值变化    | ★★★☆☆    | `Atomics.waitAsync(view, index, value)`                      |

## 高频使用特性

以下是 ES15 中最常用的特性，根据使用频率排序：

| 特性                            | 使用频率 | 主要优势                         |
| ------------------------------- | -------- | -------------------------------- |
| Promise.withResolvers()         | ★★★★★    | 简化异步控制流，减少嵌套         |
| Object.groupBy()                | ★★★★★    | 优雅高效地对数组元素进行分组     |
| String.prototype.isWellFormed() | ★★★★☆    | 防止因字符串格式不正确导致的错误 |
| String.prototype.toWellFormed() | ★★★★☆    | 安全处理潜在的格式不正确的字符串 |
| Map.groupBy()                   | ★★★★☆    | 以 Map 格式分组数据，适合复杂键  |

## 高级特性

以下特性更为高级，具有特定的使用场景和复杂程度：

| 特性                   | 复杂度 | 主要应用场景                     |
| ---------------------- | ------ | -------------------------------- |
| 正则表达式 v 标志      | ★★★★☆  | 多语言文本处理，国际化应用       |
| Atomics.waitAsync()    | ★★★★★  | 并发编程，跨线程通信             |
| ArrayBuffer.resize()   | ★★★★☆  | 动态二进制数据处理，性能优化     |
| ArrayBuffer.transfer() | ★★★★☆  | 内存高效处理，处理大型二进制数据 |

## 实际应用示例

### 使用 Promise.withResolvers() 创建可控异步操作

```javascript
// 创建一个自定义的带控制功能的异步任务
function createControllableTask() {
  const { promise, resolve, reject } = Promise.withResolvers();
  let timeoutId = null;

  // 返回一个任务对象，包含 promise 和控制方法
  return {
    // 原始 promise
    promise,

    // 完成任务
    complete(result) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      resolve(result);
    },

    // 失败任务
    fail(error) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      reject(error);
    },

    // 设置超时
    setTimeout(ms) {
      timeoutId = setTimeout(() => {
        reject(new Error(`操作超时 (${ms}ms)`));
      }, ms);
      return this;
    },
  };
}

// 使用示例：模拟网络请求并允许外部取消
async function fetchWithTimeout(url, timeout = 5000) {
  const task = createControllableTask().setTimeout(timeout);

  // 启动异步操作
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`HTTP 错误: ${response.status}`);
    })
    .then((data) => task.complete(data))
    .catch((error) => task.fail(error));

  return task.promise;
}

// 在组件中使用
async function loadData() {
  try {
    const data = await fetchWithTimeout('/api/data', 3000);
    console.log('数据加载成功:', data);
  } catch (error) {
    console.error('数据加载失败:', error.message);
  }
}
```

### 使用 Object.groupBy() 实现数据分析功能

```javascript
// 假设从销售系统获取的数据
const sales = [
  { product: '手机', category: '电子', amount: 1200, date: '2024-01-15' },
  { product: '笔记本', category: '电子', amount: 3500, date: '2024-01-22' },
  { product: '衬衫', category: '服装', amount: 120, date: '2024-01-05' },
  { product: '咖啡机', category: '家电', amount: 650, date: '2024-01-08' },
  { product: '裤子', category: '服装', amount: 200, date: '2024-01-18' },
  { product: '耳机', category: '电子', amount: 350, date: '2024-01-30' },
  { product: '微波炉', category: '家电', amount: 800, date: '2024-01-11' },
];

// 按类别分组并计算统计数据
function analyzeByCategory(sales) {
  // 使用 Object.groupBy 按类别分组
  const byCategory = Object.groupBy(sales, (item) => item.category);

  // 计算每个类别的统计数据
  const result = {};

  for (const [category, items] of Object.entries(byCategory)) {
    // 计算销售总额
    const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);

    // 找出最畅销产品
    const bestSeller = [...items].sort((a, b) => b.amount - a.amount)[0];

    // 计算平均销售额
    const averageAmount = totalAmount / items.length;

    result[category] = {
      totalAmount,
      averageAmount,
      itemCount: items.length,
      bestSeller: bestSeller.product,
      bestSellerAmount: bestSeller.amount,
      items, // 保留原始项目数据
    };
  }

  return result;
}

// 运行分析
const salesReport = analyzeByCategory(sales);
console.log(salesReport);

/* 输出示例:
{
  "电子": {
    "totalAmount": 5050,
    "averageAmount": 1683.33,
    "itemCount": 3,
    "bestSeller": "笔记本",
    "bestSellerAmount": 3500,
    "items": [...]
  },
  "服装": {
    "totalAmount": 320,
    "averageAmount": 160,
    "itemCount": 2,
    "bestSeller": "裤子",
    "bestSellerAmount": 200,
    "items": [...]
  },
  "家电": {
    "totalAmount": 1450,
    "averageAmount": 725,
    "itemCount": 2,
    "bestSeller": "微波炉",
    "bestSellerAmount": 800,
    "items": [...]
  }
}
*/

// 获取销售额最高的类别
const categories = Object.entries(salesReport);
const topCategory = categories.sort((a, b) => b[1].totalAmount - a[1].totalAmount)[0];
console.log(`销售额最高的类别: ${topCategory[0]}, 金额: ¥${topCategory[1].totalAmount}`);
// 输出: "销售额最高的类别: 电子, 金额: ¥5050"
```

### 使用 ArrayBuffer.resize() 处理大型二进制数据

```javascript
// 模拟动态增长的数据流处理（如视频数据处理或文件上传）
class DynamicBuffer {
  constructor(initialSize = 1024, growthFactor = 2) {
    // 创建一个可变大小的 buffer，最大支持 1GB
    this.buffer = new ArrayBuffer(initialSize, { maxByteLength: 1024 * 1024 * 1024 });
    this.view = new Uint8Array(this.buffer);
    this.growthFactor = growthFactor;
    this.size = 0; // 当前使用的大小
  }

  // 添加数据到 buffer
  append(data) {
    const dataArray = data instanceof Uint8Array ? data : new Uint8Array(data);
    const requiredSize = this.size + dataArray.length;

    // 如果需要更大空间，则调整 buffer 大小
    if (requiredSize > this.buffer.byteLength) {
      const newSize = Math.min(Math.max(this.buffer.byteLength * this.growthFactor, requiredSize), this.buffer.maxByteLength);

      try {
        this.buffer.resize(newSize);
        // 重新获取视图，因为底层 buffer 已变化
        this.view = new Uint8Array(this.buffer);
        console.log(`Buffer 调整至 ${newSize} 字节`);
      } catch (e) {
        throw new Error(`无法调整 buffer 大小: ${e.message}`);
      }
    }

    // 复制数据到视图
    this.view.set(dataArray, this.size);
    this.size += dataArray.length;
  }

  // 获取已使用部分的副本
  getData() {
    return this.buffer.slice(0, this.size);
  }

  // 优化内存使用（裁剪未使用部分）
  compact() {
    if (this.size < this.buffer.byteLength) {
      this.buffer.resize(this.size);
      this.view = new Uint8Array(this.buffer);
      console.log(`已压缩 buffer 到 ${this.size} 字节`);
    }
  }

  // 清空缓冲区
  clear() {
    this.size = 0;
  }
}

// 使用示例：处理逐块到达的文件数据
async function processStreamingFile(fileStream) {
  const buffer = new DynamicBuffer();
  const reader = fileStream.getReader();

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      // 添加新数据块
      buffer.append(value);
      console.log(`已读取 ${buffer.size} 字节数据`);
    }

    // 处理完毕，压缩 buffer 以优化内存
    buffer.compact();

    // 返回完整数据以进行处理
    return buffer.getData();
  } catch (error) {
    console.error('读取流失败:', error);
    throw error;
  }
}

// 模拟实际使用（例如文件上传）
async function uploadAndProcessFile(file) {
  try {
    const stream = file.stream();
    const processedData = await processStreamingFile(stream);

    console.log(`处理完成，总大小: ${processedData.byteLength} 字节`);
    // 进一步处理或上传...

    return {
      success: true,
      size: processedData.byteLength,
      hash: await calculateHash(processedData), // 假设函数
    };
  } catch (error) {
    console.error('文件处理失败:', error);
    return { success: false, error: error.message };
  }
}
```

## 浏览器支持情况

| 浏览器            | 支持 ES15 起始版本 | 发布日期      |
| ----------------- | ------------------ | ------------- |
| Chrome            | 119+               | 2023 年 11 月 |
| Firefox           | 122+               | 2024 年 3 月  |
| Safari            | 17.4+              | 2024 年 3 月  |
| Edge (Chromium)   | 119+               | 2023 年 11 月 |
| Internet Explorer | 不支持             | -             |
| Opera             | 105+               | 2023 年 11 月 |

## 与前代的演进关系

ES15 继续 JavaScript 语言的渐进式发展，特别是在数据处理和异步编程方面：

| 版本        | 发布日期     | 主要数组/对象操作增强                                       |
| ----------- | ------------ | ----------------------------------------------------------- |
| ES11 (2020) | 2020 年 6 月 | 可选链 (?.)，空值合并 (??)，globalThis                      |
| ES12 (2021) | 2021 年 6 月 | 逻辑赋值运算符 (??=)，String.replaceAll()                   |
| ES13 (2022) | 2022 年 6 月 | 类私有字段，Object.hasOwn()，数组的 at() 方法               |
| ES14 (2023) | 2023 年 6 月 | 数组的 toSorted()，toReversed()，toSpliced()，with() 方法   |
| ES15 (2024) | 2024 年 6 月 | Object.groupBy()，Promise.withResolvers()，ArrayBuffer 改进 |

## 转译支持

要在不完全支持 ES15 的环境中使用这些特性，可以采用以下工具：

- **Babel**: 通过 @babel/preset-env 及特定插件支持大部分 ES15 特性
- **TypeScript**: 5.3+ 版本开始逐步支持 ES15 特性
- **Node.js**: 20.10.0+ 支持部分特性，22.0.0+ 支持更多 ES15 特性
- **core-js**: 提供对新特性的 polyfill 支持
- **@formatjs/intl**: 提供对国际化相关功能的部分支持
- **v8-polyfill**: 为特定的 V8 功能提供 polyfill

## 结论

ECMAScript 2024 (ES15) 的更新引入了一系列实用的新特性，特别增强了对数组数据的分组处理能力、Promise 的灵活创建方式和二进制数据的操作。Object.groupBy() 和 Promise.withResolvers() 等特性将极大简化日常开发中的常见任务，使代码更加简洁和可读。

这些新特性展示了 JavaScript 继续向更加成熟、表达性更强的编程语言发展，特别是在处理复杂数据结构和异步操作方面。随着浏览器和运行时环境的不断更新，这些功能将逐渐成为 JavaScript 开发的标准工具集，推动 Web 和服务器端应用程序的进一步发展。
