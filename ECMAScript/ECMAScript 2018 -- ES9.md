# ECMAScript 2018 (ES9) 新特性

ECMAScript 2018，也称为 ES9，是 JavaScript 语言的又一次重要更新，于 2018 年 6 月发布。这次更新主要聚焦于异步编程和正则表达式的增强，同时引入了一些实用的对象和数组操作方法。

## 主要新增特性

### 1. 异步迭代器 (Async Iterators)

- 允许对异步数据源进行 `for-await-of` 循环迭代
- 结合了异步编程与迭代器的优点

```javascript
// 创建一个异步迭代器
async function* asyncGenerator() {
  yield Promise.resolve(1);
  yield Promise.resolve(2);
  yield Promise.resolve(3);
}

// 使用 for-await-of 遍历异步迭代器
async function consumeAsyncIterable() {
  for await (const value of asyncGenerator()) {
    console.log(value); // 1, 2, 3
  }
}

// 异步迭代 API 结果
async function fetchCommits() {
  const response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');
  const reader = response.body.getReader();

  // 使用异步迭代器读取流数据
  for await (const chunk of readableStreamAsyncIterator(reader)) {
    console.log(chunk);
  }
}
```

### 2. Promise.finally()

- 为 Promise 链添加一个在 Promise 无论成功或失败都会执行的回调
- 非常适合清理代码，无论请求成功或失败

```javascript
fetch('/api/data')
  .then((response) => response.json())
  .then((data) => {
    console.log('数据获取成功:', data);
  })
  .catch((error) => {
    console.error('发生错误:', error);
  })
  .finally(() => {
    // 无论成功或失败都会执行
    console.log('请求完成，移除加载指示器');
    document.querySelector('.loading').style.display = 'none';
  });
```

### 3. 对象展开操作符 (Rest/Spread Properties)

- 将对象展开操作符的功能扩展到对象（ES6 已经支持数组的展开操作符）
- 使对象的解构和合并更加简便

```javascript
// 对象解构中的剩余属性(rest)
const { name, age, ...rest } = { name: 'Alice', age: 30, job: 'Engineer', city: 'Shanghai' };
console.log(name); // 'Alice'
console.log(age); // 30
console.log(rest); // { job: 'Engineer', city: 'Shanghai' }

// 对象展开(spread)
const defaults = { theme: 'dark', size: 'medium' };
const userOptions = { size: 'large', notifications: true };
const mergedOptions = { ...defaults, ...userOptions };
console.log(mergedOptions); // { theme: 'dark', size: 'large', notifications: true }
```

### 4. 正则表达式增强

ES9 引入了多项正则表达式改进：

#### 4.1 命名捕获组 (Named Capture Groups)

- 允许给正则表达式的捕获组命名，提高可读性

```javascript
// 不使用命名捕获组
const dateRegex = /(\d{4})-(\d{2})-(\d{2})/;
const match = dateRegex.exec('2018-06-28');
console.log(match[1]); // 2018 (年)
console.log(match[2]); // 06 (月)
console.log(match[3]); // 28 (日)

// 使用命名捕获组
const namedDateRegex = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const namedMatch = namedDateRegex.exec('2018-06-28');
console.log(namedMatch.groups.year); // 2018
console.log(namedMatch.groups.month); // 06
console.log(namedMatch.groups.day); // 28
```

#### 4.2 后行断言 (Lookbehind Assertions)

- 增加了正向后行断言 `(?<=...)` 和负向后行断言 `(?<!...)`
- 可以根据前面的内容匹配

```javascript
// 正向后行断言 - 匹配前面是$的数字
const priceRegex = /(?<=\$)\d+(\.\d+)?/;
console.log(priceRegex.exec('Price: $19.99')[0]); // 19.99

// 负向后行断言 - 匹配前面不是€的数字
const nonEuroPriceRegex = /(?<!€)\d+(\.\d+)?/;
console.log(nonEuroPriceRegex.exec('Price: $19.99')[0]); // 19.99
```

#### 4.3 Unicode 属性转义 (Unicode Property Escapes)

- 允许使用 `\p{...}` 按照 Unicode 字符的属性匹配字符
- 简化了匹配特定类别字符的正则表达式

```javascript
// 匹配所有希腊字母
const greekLetters = /\p{Script=Greek}/u;
console.log(greekLetters.test('π')); // true

// 匹配所有数学符号
const mathSymbols = /\p{Math}/u;
console.log(mathSymbols.test('±')); // true
console.log(mathSymbols.test('2')); // false

// 匹配所有货币符号
const currency = /\p{Currency_Symbol}/u;
console.log(currency.test('$')); // true
console.log(currency.test('€')); // true
```

#### 4.4 正则表达式 s 标志 (dotAll Flag)

- 新增 `s` 标志，使得 `.` 可以匹配任何字符，包括换行符
- 解决了正则表达式中 `.` 不匹配换行符的限制

```javascript
// 不使用 s 标志
console.log(/foo.bar/.test('foo\nbar')); // false

// 使用 s 标志
console.log(/foo.bar/s.test('foo\nbar')); // true
```

### 5. Promise.prototype.finally()

- 为 Promise 链添加最终处理操作，无论成功或失败

```javascript
function loadData() {
  showLoadingSpinner();

  return fetchData()
    .then((data) => {
      updateUI(data);
    })
    .catch((error) => {
      showError(error);
    })
    .finally(() => {
      // 无论成功或失败都会执行
      hideLoadingSpinner();
    });
}
```

## 浏览器支持情况

| 浏览器            | 支持 ES9 起始版本 | 发布日期      |
| ----------------- | ----------------- | ------------- |
| Chrome            | 68                | 2018 年 7 月  |
| Firefox           | 62                | 2018 年 9 月  |
| Safari            | 12                | 2018 年 9 月  |
| Edge              | 18                | 2018 年 11 月 |
| Internet Explorer | 不支持            | -             |
| Opera             | 55                | 2018 年 8 月  |

## 高频使用特性

以下是 ES9 中最常用的特性，根据使用频率排序：

| 特性                 | 使用频率 | 主要优势                           |
| -------------------- | -------- | ---------------------------------- |
| 对象展开运算符       | ★★★★★    | 简化对象合并和解构，提高代码可读性 |
| Promise.finally()    | ★★★★★    | 简化 Promise 链的清理逻辑          |
| 正则表达式命名捕获组 | ★★★★☆    | 提高正则表达式的可读性和可维护性   |
| 正则表达式 s 标志    | ★★★★☆    | 处理多行文本时更加方便             |
| 异步迭代器           | ★★★☆☆    | 处理异步数据流                     |

## 高级特性

以下特性更复杂，通常在特定场景或高级应用中使用：

| 特性               | 复杂度 | 主要应用场景                   |
| ------------------ | ------ | ------------------------------ |
| 异步迭代器         | ★★★★★  | 处理异步数据流、实时 API 响应  |
| 正则表达式后行断言 | ★★★★☆  | 复杂文本解析、数据提取         |
| Unicode 属性转义   | ★★★★☆  | 国际化应用、文本处理、语言分析 |

## 与前代的演进关系

ES9 继续了 JavaScript 在异步编程和数据处理方面的发展：

| 版本       | 发布日期     | 异步编程进化                | 数据处理进化                     |
| ---------- | ------------ | --------------------------- | -------------------------------- |
| ES6 (2015) | 2015 年 6 月 | Promise, 生成器             | 数组解构, 展开运算符             |
| ES7 (2016) | 2016 年 6 月 | -                           | Array.prototype.includes         |
| ES8 (2017) | 2017 年 6 月 | Async/Await                 | Object.values/entries            |
| ES9 (2018) | 2018 年 6 月 | 异步迭代器, Promise.finally | 对象展开运算符, 增强的正则表达式 |

## 特性实际应用示例

### 使用对象展开简化 Redux reducer

```javascript
function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_USER_NAME':
      // 使用对象展开来更新状态而不是Object.assign
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload,
        },
      };
    default:
      return state;
  }
}
```

### 使用命名捕获组解析 URL

```javascript
function parseURL(url) {
  const regex = /^(?<protocol>\w+):\/\/(?<host>[\w.]+)(?<path>\/.*)?$/;
  const match = regex.exec(url);

  if (match) {
    const { protocol, host, path = '' } = match.groups;
    return { protocol, host, path };
  }

  return null;
}

console.log(parseURL('https://example.com/path'));
// { protocol: 'https', host: 'example.com', path: '/path' }
```

### 使用异步迭代器处理分页 API

```javascript
async function* fetchPages(baseURL) {
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(`${baseURL}?page=${page}`);
    const data = await response.json();

    yield data.items;

    hasMore = data.hasMore;
    page++;
  }
}

async function getAllItems() {
  const allItems = [];

  for await (const items of fetchPages('/api/products')) {
    allItems.push(...items);
  }

  return allItems;
}
```

## 转译支持

主流的 JavaScript 转译工具都对 ES9 特性提供了良好支持：

- **Babel**: 通过 @babel/preset-env 支持，某些特性可能需要额外的插件
- **TypeScript**: 3.0 版本起支持大部分 ES9 特性

## 结论

ES9 (ECMAScript 2018) 虽然比起 ES6 的大规模更新要小，但它引入的特性在日常开发中非常实用。尤其是对象展开运算符和 Promise.finally() 已成为现代 JavaScript 开发中的常用工具。异步迭代器为处理异步数据流提供了强大能力，而正则表达式的增强则大大提高了文本处理的能力。
