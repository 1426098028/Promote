# ECMAScript 2021 (ES12) 新特性

ECMAScript 2021，也称为 ES12，是 JavaScript 语言的年度更新，于 2021 年 6 月发布。本次更新带来了一些实用的新特性，特别是在字符串操作、Promise 错误处理和数值计算方面的增强。

## 主要新增特性

### 1. String.prototype.replaceAll()

- 替换字符串中所有匹配项，而不需要使用全局正则表达式
- 修复了 String.prototype.replace() 只替换第一个匹配项的限制

```javascript
// 之前的方法 - 使用全局正则表达式
const result1 = 'abcabc'.replace(/abc/g, 'ABC');
console.log(result1); // 'ABCABC'

// 使用 replaceAll
const result2 = 'abcabc'.replaceAll('abc', 'ABC');
console.log(result2); // 'ABCABC'

// 当使用字符串作为查找项时，replace 只替换第一次出现
const buggy = 'abcabc'.replace('abc', 'ABC');
console.log(buggy); // 'ABCabc' - 只有第一个被替换
```

### 2. Promise.any()

- 接收一组 Promise 实例，只要其中一个 Promise 成功，就返回那个已成功的 Promise
- 与 Promise.race() 类似，但会忽略拒绝的 Promise，除非全部拒绝

```javascript
// 从多个资源获取数据，只需要一个成功即可
const promises = [fetch('https://api.example.com/endpoint-1').then((res) => res.json()), fetch('https://api.example.com/endpoint-2').then((res) => res.json()), fetch('https://api.example.com/endpoint-3').then((res) => res.json())];

// Promise.any() - 返回第一个成功的结果
Promise.any(promises)
  .then((firstSuccessfulResult) => {
    console.log('至少一个 API 请求成功:', firstSuccessfulResult);
  })
  .catch((error) => {
    // 所有 Promise 都被拒绝
    console.log('所有 API 请求都失败了');
    console.log(error instanceof AggregateError); // true
    console.log(error.errors); // 包含所有错误的数组
  });

// 对比 Promise.race() - 返回首先完成的结果，无论成功或失败
Promise.race(promises)
  .then((result) => console.log('第一个完成的 Promise 成功:', result))
  .catch((error) => console.log('第一个完成的 Promise 失败:', error));
```

### 3. 逻辑赋值操作符

- 逻辑运算符和赋值表达式的组合
- 包括 `&&=`, `||=`, 和 `??=`

```javascript
// 逻辑与赋值 (&&=)
// x &&= y 等价于 x && (x = y)
let x = 1;
let y = 2;

x &&= y; // 相当于 x = x && y
console.log(x); // 2

// 如果 x 是 falsy，不会执行赋值
x = 0;
x &&= y;
console.log(x); // 0 (没有改变)

// 逻辑或赋值 (||=)
// x ||= y 等价于 x || (x = y)
let config = {};
config.debug ||= true; // 仅当 debug 为假值时设置为 true
console.log(config.debug); // true

// 空值合并赋值 (??=)
// x ??= y 等价于 x ?? (x = y)
let user = { name: 'Alice' };
user.nickname ??= user.name; // 仅当 nickname 为 null/undefined 时设置
console.log(user.nickname); // 'Alice'

// 空值合并赋值不受 "" 和 0 的影响
let values = { count: 0, text: '' };
values.count ??= 10; // 不会覆盖 0
values.text ??= 'default'; // 不会覆盖空字符串
console.log(values); // { count: 0, text: '' }
```

### 4. 数字分隔符

- 允许使用下划线（`_`）作为数字字面量中的分隔符
- 提高大数字的可读性

```javascript
// 大数值可读性差
const oneBillion = 1000000000;

// 使用数字分隔符
const oneBillionReadable = 1_000_000_000;
console.log(oneBillion === oneBillionReadable); // true

// 在十六进制、二进制或八进制中也可使用
const hexValue = 0xff_aa_bb; // 分隔每两个字符
const binaryValue = 0b1010_0001_1000_0101;
const octalValue = 0o1234_5670;

// 在小数点前后都可使用
const pi = 3.141_592_653_589_793;

// 分隔符仅在源代码中可见，不影响程序执行
console.log(1_000_000); // 输出: 1000000
```

### 5. WeakRef 和 FinalizationRegistry

- WeakRef 允许创建对对象的弱引用，不阻止垃圾回收
- FinalizationRegistry 允许在对象被垃圾回收时运行回调函数

```javascript
// WeakRef 示例 - 创建对对象的弱引用
let target = { data: 'valuable data' };
const weakRef = new WeakRef(target);

// 稍后获取对象 (如果它仍存在)
const obj = weakRef.deref();
if (obj) {
  console.log(obj.data);
} else {
  console.log('对象已被回收');
}

// 删除强引用，允许垃圾回收
target = null;

// FinalizationRegistry 示例 - 在对象被回收时通知
const registry = new FinalizationRegistry((value) => {
  console.log(`对象 ${value} 已被垃圾回收`);
});

let object = { name: '测试对象' };
// 注册对象并提供标识值
registry.register(object, 'ID-1234');

// 删除强引用，允许垃圾回收
object = null;
// 在某个时间点之后，回调会被调用: "对象 ID-1234 已被垃圾回收"
```

## 数组和对象操作相关特性

### 数组操作

| 特性                  | 描述                   | 使用频率 | 示例                      |
| --------------------- | ---------------------- | -------- | ------------------------- |
| 逻辑赋值 (对数组元素) | 简化数组元素的条件赋值 | ★★★★☆    | `arr[0] ??= defaultValue` |

### 对象操作

| 特性                 | 描述             | 使用频率 | 示例                                 |
| -------------------- | ---------------- | -------- | ------------------------------------ |
| 逻辑赋值操作符       | 简化条件属性赋值 | ★★★★★    | `obj.prop ??= defaultValue`          |
| WeakRef              | 对对象的弱引用   | ★★☆☆☆    | `new WeakRef(obj).deref()`           |
| FinalizationRegistry | 对象垃圾回收通知 | ★★☆☆☆    | `new FinalizationRegistry(callback)` |

## 高频使用特性

以下是 ES12 中最常用的特性，根据使用频率排序：

| 特性                          | 使用频率 | 主要优势                       |
| ----------------------------- | -------- | ------------------------------ |
| String.prototype.replaceAll() | ★★★★★    | 简化全局字符串替换             |
| 逻辑赋值操作符 (??=)          | ★★★★★    | 简化默认值设置逻辑             |
| 数字分隔符                    | ★★★★☆    | 提高大数字可读性               |
| Promise.any()                 | ★★★★☆    | 处理多个异步操作，只需一个成功 |

## 高级特性

以下特性更复杂或有特定的使用场景：

| 特性                 | 复杂度 | 主要应用场景           |
| -------------------- | ------ | ---------------------- |
| WeakRef              | ★★★★★  | 缓存系统、内存敏感应用 |
| FinalizationRegistry | ★★★★★  | 资源清理、内存泄漏监控 |

## 实际应用示例

### 使用逻辑赋值操作符简化配置管理

```javascript
// 用户配置管理
function updateUserPreferences(userPrefs = {}) {
  // 使用空值合并赋值，只在属性不存在时设置默认值
  userPrefs.theme ??= 'light';
  userPrefs.fontSize ??= 'medium';
  userPrefs.notifications ??= true;

  // 逻辑或赋值 - 确保已弃用的属性被更新
  userPrefs.alertLevel ||= userPrefs.notificationLevel;

  // 逻辑与赋值 - 条件属性更新
  userPrefs.isPremium &&= userPrefs.canAccessPremiumFeatures;

  return userPrefs;
}

// 测试不同情况
console.log(updateUserPreferences({}));
// {theme: 'light', fontSize: 'medium', notifications: true}

console.log(updateUserPreferences({ theme: 'dark', isPremium: true }));
// {theme: 'dark', fontSize: 'medium', notifications: true, isPremium: false}

console.log(
  updateUserPreferences({
    theme: 'dark',
    fontSize: 'large',
    notificationLevel: 'high',
    isPremium: true,
    canAccessPremiumFeatures: true,
  })
);
// 全面更新的配置对象
```

### 使用 replaceAll 进行文本处理

```javascript
// 简单的模板引擎
function renderTemplate(template, data) {
  let result = template;

  // 替换所有模板变量，格式为 {{变量名}}
  for (const [key, value] of Object.entries(data)) {
    const placeholder = `{{${key}}}`;
    // 一行代码替换所有匹配项
    result = result.replaceAll(placeholder, value);
  }

  return result;
}

const template = `
<div>
  <h1>{{title}}</h1>
  <p>作者: {{author}}</p>
  <div>{{content}}</div>
  <footer>{{footer}}</footer>
</div>
`;

const data = {
  title: '使用 replaceAll 的模板引擎',
  author: '张三',
  content: '这是一个简单的示例，展示 replaceAll 的强大功能。',
  footer: '版权所有 © {{author}}', // 嵌套的替换
};

const rendered = renderTemplate(template, data);
console.log(rendered);

// 通过再次调用，支持嵌套替换
const finalOutput = renderTemplate(rendered, data);
console.log(finalOutput);
```

### 使用 Promise.any() 实现高可用性请求

```javascript
// 多 API 服务器请求，提高可用性
async function fetchWithFallback(endpoints, timeout = 5000) {
  // 为每个请求添加超时
  const promises = endpoints.map((endpoint) => {
    return Promise.race([
      fetch(endpoint).then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      }),
      new Promise((_, reject) => setTimeout(() => reject(new Error('请求超时')), timeout)),
    ]);
  });

  try {
    // 使用 Promise.any() - 任一成功即返回
    const data = await Promise.any(promises);
    return { success: true, data };
  } catch (error) {
    // 所有请求都失败时获取所有错误信息
    if (error instanceof AggregateError) {
      const errors = error.errors.map((e) => e.message);
      return {
        success: false,
        reason: '所有请求都失败',
        details: errors,
      };
    }
    return { success: false, reason: error.message };
  }
}

// 调用示例
const result = await fetchWithFallback(['https://api-1.example.com/data', 'https://api-2.example.com/data', 'https://api-3.example.com/data']);

if (result.success) {
  processData(result.data);
} else {
  showError(`获取数据失败: ${result.reason}`);
  console.error(result.details);
}
```

## 浏览器支持情况

| 浏览器            | 支持 ES12 起始版本 | 发布日期                    |
| ----------------- | ------------------ | --------------------------- |
| Chrome            | 85-89              | 2020 年 8 月 - 2021 年 3 月 |
| Firefox           | 79-85              | 2020 年 7 月 - 2021 年 1 月 |
| Safari            | 14.1               | 2021 年 4 月                |
| Edge (Chromium)   | 85-89              | 2020 年 8 月 - 2021 年 3 月 |
| Internet Explorer | 不支持             | -                           |
| Opera             | 71-75              | 2020 年 8 月 - 2021 年 3 月 |

## 与前代的演进关系

ES12 继续增强了 JavaScript 的语言表达能力：

| 版本        | 发布日期     | 主要对象/数组/字符串操作增强                          |
| ----------- | ------------ | ----------------------------------------------------- |
| ES10 (2019) | 2019 年 6 月 | Array.flat(), Array.flatMap(), Object.fromEntries()   |
| ES11 (2020) | 2020 年 6 月 | 可选链 (?.), 空值合并 (??), globalThis                |
| ES12 (2021) | 2021 年 6 月 | 逻辑赋值操作符 (??=, &&=, \|\|=), String.replaceAll() |

## 转译支持

主流的 JavaScript 工具已支持 ES12 特性：

- **Babel**: 通过 @babel/preset-env 或特定插件支持
- **TypeScript**: 4.3+ 版本支持 ES12 特性
- **Node.js**: 16.0.0+ 支持大部分 ES12 特性

## 结论

ES12 (ECMAScript 2021) 的更新虽然相对较小，但引入了几个非常实用的特性，特别是 String.replaceAll() 和逻辑赋值操作符，它们解决了开发者长期以来的痛点。Promise.any() 补充了 Promise 工具集，使异步编程更加灵活。

这些增强体现了 JavaScript 语言标准化的模式：专注于解决实际开发中的常见问题，不断提高语言的表达能力和开发效率。
