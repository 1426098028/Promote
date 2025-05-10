# ECMAScript 2022 (ES13) 新特性

ECMAScript 2022，也称为 ES13，是 JavaScript 语言的年度更新，于 2022 年 6 月发布。本次更新引入了一些重要特性，特别是在类、对象和数组操作方面，让代码更加简洁、功能更强大。

## 主要新增特性

### 1. 类字段声明和私有成员

- 类静态初始化块
- 私有实例字段、方法和访问器
- 静态类字段和私有静态方法

```javascript
class Counter {
  // 公共实例字段
  count = 0;

  // 私有实例字段 (带 # 前缀)
  #privateValue = 42;

  // 私有方法
  #increment() {
    this.count++;
    return this.#privateValue;
  }

  // 公共方法使用私有方法和字段
  publicMethod() {
    return this.#increment();
  }

  // 私有 getter 和 setter
  get #secret() {
    return this.#privateValue;
  }

  set #secret(value) {
    this.#privateValue = value;
  }

  // 公共方法访问私有 getter/setter
  setSecret(value) {
    this.#secret = value;
  }

  getSecret() {
    return this.#secret;
  }

  // 静态公共字段
  static type = 'Counter';

  // 静态私有字段
  static #instances = 0;

  // 静态私有方法
  static #incrementInstances() {
    this.#instances++;
  }

  // 静态初始化块
  static {
    console.log('Counter class is being initialized');
  }

  constructor() {
    // 调用静态私有方法
    Counter.#incrementInstances();
  }

  // 访问静态私有字段的公共静态方法
  static getInstanceCount() {
    return this.#instances;
  }
}

const counter = new Counter();
console.log(counter.count); // 0
counter.publicMethod();
console.log(counter.count); // 1

// 访问私有字段会导致语法错误
// console.log(counter.#privateValue); // SyntaxError

console.log(Counter.type); // 'Counter'
console.log(Counter.getInstanceCount()); // 1

// 私有静态字段无法从外部访问
// console.log(Counter.#instances); // SyntaxError
```

### 2. RegExp 匹配索引

- 在正则表达式中使用 `/d` 标志，获取匹配字符串的开始和结束位置
- 提供每个捕获组的起始和结束索引

```javascript
// 不使用 d 标志
const regex1 = /(\d{4})-(\d{2})-(\d{2})/;
const match1 = regex1.exec('Date: 2022-06-01');
console.log(match1[0]); // 2022-06-01
console.log(match1.index); // 6

// 使用 d 标志
const regex2 = /(\d{4})-(\d{2})-(\d{2})/d;
const match2 = regex2.exec('Date: 2022-06-01');

// 访问整个匹配的索引
console.log(match2.indices[0]); // [6, 16] (开始和结束索引)

// 访问捕获组的索引
console.log(match2.indices[1]); // [6, 10] (年份部分)
console.log(match2.indices[2]); // [11, 13] (月份部分)
console.log(match2.indices[3]); // [14, 16] (日期部分)

// 在命名捕获组中也可使用
const namedRegex = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/d;
const namedMatch = namedRegex.exec('Date: 2022-06-01');
console.log(namedMatch.indices.groups.year); // [6, 10]
console.log(namedMatch.indices.groups.month); // [11, 13]
console.log(namedMatch.indices.groups.day); // [14, 16]
```

### 3. Object.hasOwn()

- 用于检查对象是否有自己的（非继承的）属性
- 替代 Object.prototype.hasOwnProperty.call() 这种冗长写法

```javascript
const obj = {
  prop: 'exists',
  constructor: 'custom', // 覆盖继承的属性
};

// 以前的方法
console.log(Object.prototype.hasOwnProperty.call(obj, 'prop')); // true

// 现在可以使用 Object.hasOwn
console.log(Object.hasOwn(obj, 'prop')); // true
console.log(Object.hasOwn(obj, 'toString')); // false (继承属性)
console.log(Object.hasOwn(obj, 'constructor')); // true (自己的属性)

// 处理边缘情况
console.log(Object.hasOwn(null, 'prop')); // 抛出 TypeError
console.log(Object.hasOwn(undefined, 'prop')); // 抛出 TypeError

// 安全的检查，不会因为修改 Object.prototype 而受影响
Object.prototype.hasOwnProperty = () => false; // 不好的实践，但有人可能这样做
console.log(obj.hasOwnProperty('prop')); // false (被修改了)
console.log(Object.hasOwn(obj, 'prop')); // true (依然安全工作)
```

### 4. at() 方法

- 数组、字符串和类型化数组新增 at() 方法
- 支持相对索引，尤其是负索引，简化了访问末尾元素

```javascript
// 数组的 at() 方法
const fruits = ['apple', 'banana', 'cherry', 'date', 'elderberry'];

// 使用传统方法访问最后一个元素
console.log(fruits[fruits.length - 1]); // 'elderberry'

// 使用 at() 访问最后一个元素
console.log(fruits.at(-1)); // 'elderberry'

// 访问倒数第二个元素
console.log(fruits.at(-2)); // 'date'

// 正索引的行为与传统访问一致
console.log(fruits.at(0)); // 'apple'
console.log(fruits.at(2)); // 'cherry'

// 字符串的 at() 方法
const greeting = 'Hello, world!';
console.log(greeting.at(0)); // 'H'
console.log(greeting.at(-1)); // '!'
console.log(greeting.at(-7)); // 'w'

// 类型化数组的 at() 方法
const int8Array = new Int8Array([10, 20, 30, 40, 50]);
console.log(int8Array.at(0)); // 10
console.log(int8Array.at(-1)); // 50
```

### 5. Error cause

- 在创建错误时添加一个 cause 属性
- 用于错误链和更好的错误处理信息

```javascript
try {
  // 尝试获取用户数据
  fetchUserData();
} catch (error) {
  // 使用原始错误作为新错误的 cause
  throw new Error('用户数据获取失败', { cause: error });
}

// 更完整的示例
async function getData() {
  try {
    const response = await fetch('/api/data');

    if (!response.ok) {
      throw new Error(`HTTP错误 ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    // 包装原始错误并加入额外信息
    throw new Error('无法获取数据，请稍后再试', {
      cause: error,
    });
  }
}

// 错误处理
async function processData() {
  try {
    const data = await getData();
    // 处理数据
  } catch (error) {
    console.error('数据处理失败:', error.message);

    // 访问原始错误
    if (error.cause) {
      console.error('原始错误:', error.cause.message);

      // 可以检查具体类型
      if (error.cause instanceof TypeError) {
        // 处理类型错误
      } else if (error.cause.name === 'AbortError') {
        // 处理请求被中止的情况
      }
    }
  }
}
```

### 6. Top-level await

- 允许在异步模块的顶层使用 await 关键字，无需 async 函数包装
- 使模块可以依赖于异步操作的完成

```javascript
// 以前必须在 async 函数中使用 await
async function initializeData() {
  const response = await fetch('/api/data');
  const data = await response.json();
  return data;
}

// 使用顶层 await (ES13)，可以在模块顶层直接等待
// module.js
const response = await fetch('/api/config');
const config = await response.json();

export const apiKey = config.apiKey;
export const settings = config.settings;

// 另一个模块导入 - 会等待上面模块解析完成
// main.js
import { apiKey, settings } from './module.js';

// 此时 apiKey 和 settings 已可用，无需处理 Promise
console.log(apiKey, settings);
```

## 数组和对象操作相关特性

### 数组操作

| 特性      | 描述                   | 使用频率 | 示例                            |
| --------- | ---------------------- | -------- | ------------------------------- |
| at() 方法 | 支持相对索引的数组访问 | ★★★★★    | `array.at(-1)` 访问最后一个元素 |

### 对象操作

| 特性            | 描述             | 使用频率 | 示例                               |
| --------------- | ---------------- | -------- | ---------------------------------- |
| Object.hasOwn() | 安全检查自有属性 | ★★★★★    | `Object.hasOwn(obj, 'prop')`       |
| 类属性增强      | 私有字段和方法   | ★★★★☆    | `class C { #private; }`            |
| Error cause     | 错误链           | ★★★☆☆    | `new Error('msg', { cause: err })` |

## 高频使用特性

以下是 ES13 中最常用的特性，根据使用频率排序：

| 特性             | 使用频率 | 主要优势                    |
| ---------------- | -------- | --------------------------- |
| at() 方法        | ★★★★★    | 简化数组/字符串末尾元素访问 |
| Object.hasOwn()  | ★★★★★    | 安全、简洁的自有属性检查    |
| 类字段和私有字段 | ★★★★☆    | 增强类封装，更符合 OOP 实践 |
| 顶层 await       | ★★★★☆    | 简化模块中异步初始化        |
| Error cause      | ★★★☆☆    | 更好的错误追踪和调试        |

## 高级特性

以下特性更复杂或有特定的使用场景：

| 特性               | 复杂度 | 主要应用场景               |
| ------------------ | ------ | -------------------------- |
| 静态类字段初始化块 | ★★★★☆  | 复杂类初始化，依赖关系处理 |
| RegExp 匹配索引    | ★★★★☆  | 文本处理，富文本编辑器     |
| 私有静态字段和方法 | ★★★★☆  | 类库设计，高级 OOP 模式    |

## 实际应用示例

### 使用 at() 简化数组操作

```javascript
// 分页控件 - 显示最近的几个页码
function renderPagination(currentPage, totalPages) {
  // 确定要显示的页码范围
  let pagesToShow = [];

  if (totalPages <= 7) {
    // 如果总页数少，全部显示
    pagesToShow = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    // 总是显示第一页和最后一页
    pagesToShow = [1];

    if (currentPage <= 3) {
      // 靠近开始
      pagesToShow.push(2, 3, 4, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      // 靠近结尾
      pagesToShow.push('...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      // 在中间
      pagesToShow.push('...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
  }

  // 获取前一页和后一页
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  // 获取最近几次访问的页面（假设存储在一个数组中）
  const recentlyVisited = [3, 7, 12, 5];

  // 使用 at() 显示最近访问的最后一个页面
  const lastVisited = recentlyVisited.at(-1);

  return {
    pages: pagesToShow,
    prevPage,
    nextPage,
    lastVisited,
  };
}

console.log(renderPagination(5, 20));
```

### 使用类私有字段和方法实现设计模式

```javascript
// 单例模式实现
class DatabaseConnection {
  // 私有静态实例
  static #instance = null;

  // 私有连接配置
  #config = null;
  #connectionPool = [];
  #maxConnections = 5;

  // 私有方法
  #initialize(config) {
    this.#config = config;
    console.log(`初始化数据库连接: ${config.host}`);

    // 创建连接池
    for (let i = 0; i < this.#maxConnections; i++) {
      this.#connectionPool.push({
        id: i,
        status: 'idle',
      });
    }
  }

  // 私有获取连接方法
  #getIdleConnection() {
    return this.#connectionPool.find((conn) => conn.status === 'idle');
  }

  // 公共静态工厂方法
  static getInstance(config) {
    if (!DatabaseConnection.#instance) {
      DatabaseConnection.#instance = new DatabaseConnection(config);
    }
    return DatabaseConnection.#instance;
  }

  constructor(config) {
    // 确保只能创建一个实例
    if (DatabaseConnection.#instance) {
      throw new Error('数据库连接已存在，请使用 getInstance() 方法');
    }

    this.#initialize(config);
  }

  // 公共方法
  query(sql) {
    const connection = this.#getIdleConnection();
    if (!connection) {
      throw new Error('没有可用的连接');
    }

    try {
      connection.status = 'busy';
      console.log(`使用连接 #${connection.id} 执行查询: ${sql}`);
      // 模拟查询
      return { rows: [], success: true };
    } finally {
      connection.status = 'idle';
    }
  }

  // 获取活动连接数的公共方法
  getActiveConnectionCount() {
    return this.#connectionPool.filter((conn) => conn.status === 'busy').length;
  }

  // 公共关闭方法
  close() {
    console.log(`关闭到 ${this.#config.host} 的连接`);
    this.#connectionPool = [];
    // 重置单例实例
    DatabaseConnection.#instance = null;
  }
}

// 使用单例
const db1 = DatabaseConnection.getInstance({
  host: 'localhost',
  user: 'root',
  password: 'password',
});

// 尝试创建第二个实例
try {
  const db2 = new DatabaseConnection({ host: 'other-server' });
} catch (error) {
  console.log(error.message); // "数据库连接已存在，请使用 getInstance() 方法"
}

// 使用相同的实例
const db3 = DatabaseConnection.getInstance({ host: 'ignored' });
console.log(db1 === db3); // true

// 执行查询
db1.query('SELECT * FROM users');
console.log(`活动连接: ${db1.getActiveConnectionCount()}`);

// 无法直接访问私有成员
// console.log(db1.#config); // SyntaxError
// console.log(DatabaseConnection.#instance); // SyntaxError
```

### 使用 Object.hasOwn() 安全处理对象

```javascript
// 过滤用户提供的对象中的安全属性
function sanitizeUserInput(userObject) {
  const allowedProperties = ['name', 'email', 'age', 'location'];
  const sanitized = {};

  for (const property of allowedProperties) {
    // 安全地检查属性是否存在
    if (Object.hasOwn(userObject, property)) {
      sanitized[property] = userObject[property];
    }
  }

  return sanitized;
}

// 特别当处理用户生成的内容时
function processFormData(formData) {
  // 用户可能会提交带有 toString、constructor 等覆盖的属性
  const userInput = {
    name: 'John Doe',
    toString: 'malicious code',
    email: 'john@example.com',
    __proto__: { malicious: true },
    constructor: 'potential attack',
  };

  const cleanData = sanitizeUserInput(userInput);
  console.log(cleanData); // 只包含 {name: 'John Doe', email: 'john@example.com'}

  // 在表单处理中使用
  for (const key in cleanData) {
    if (Object.hasOwn(cleanData, key)) {
      // 安全处理
      formData.append(key, cleanData[key]);
    }
  }

  return formData;
}
```

## 浏览器支持情况

| 浏览器            | 支持 ES13 起始版本 | 发布日期                     |
| ----------------- | ------------------ | ---------------------------- |
| Chrome            | 93-98              | 2021 年 8 月 - 2022 年 3 月  |
| Firefox           | 90-97              | 2021 年 7 月 - 2022 年 2 月  |
| Safari            | 15.2-15.4          | 2021 年 12 月 - 2022 年 3 月 |
| Edge (Chromium)   | 93-98              | 2021 年 9 月 - 2022 年 3 月  |
| Internet Explorer | 不支持             | -                            |
| Opera             | 79-84              | 2021 年 10 月 - 2022 年 4 月 |

## 与前代的演进关系

ES13 继续增强 JavaScript 的面向对象特性和实用功能：

| 版本        | 发布日期     | 主要对象/数组/类操作增强                    |
| ----------- | ------------ | ------------------------------------------- |
| ES11 (2020) | 2020 年 6 月 | 可选链 (?.), 空值合并 (??), globalThis      |
| ES12 (2021) | 2021 年 6 月 | 逻辑赋值操作符 (??=, &&=, \|\|=)            |
| ES13 (2022) | 2022 年 6 月 | 类私有字段/方法, Object.hasOwn(), 数组 at() |

## 转译支持

主流的 JavaScript 工具已支持 ES13 特性：

- **Babel**: 通过 @babel/preset-env 和特定插件支持
- **TypeScript**: 4.7+ 版本支持大部分 ES13 特性
- **Node.js**: 16.11.0+ 支持大部分特性；18.0.0+ 全面支持

## 结论

ES13 (ECMAScript 2022) 显著增强了 JavaScript 的面向对象编程能力，尤其是通过添加类私有字段和方法。同时，实用的 at() 方法和 Object.hasOwn() 函数简化了日常编程任务，使代码更加简洁和安全。

这些改进使 JavaScript 更加成熟，特别是在构建大型应用程序时，能够更好地实现封装和信息隐藏等面向对象原则。同时，新引入的特性也显示了 JavaScript 持续聚焦于解决实际开发者痛点的演进方向。
