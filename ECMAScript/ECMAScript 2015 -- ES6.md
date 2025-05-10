# ECMAScript 2015 (ES6) 新特性

ECMAScript 2015，也称为 ES6，是 JavaScript 语言的重大更新，于 2015 年 6 月发布。以下是 ES6 引入的主要新特性及其浏览器支持情况。

## 主要新增特性

### 1. 变量声明

- **let 和 const**：块级作用域变量声明
  ```javascript
  let x = 10;
  const PI = 3.14;
  ```

### 2. 箭头函数

- 更简洁的函数表达式，自动绑定 this
  ```javascript
  const sum = (a, b) => a + b;
  ```

### 3. 类

- 基于原型的面向对象编程语法糖
  ```javascript
  class Person {
    constructor(name) {
      this.name = name;
    }
    sayHello() {
      return `Hello, ${this.name}!`;
    }
  }
  ```

### 4. 模板字符串

- 支持多行字符串和字符串插值
  ```javascript
  const name = 'World';
  const greeting = `Hello, ${name}!
  Welcome to ES6!`;
  ```

### 5. 解构赋值

- 从数组或对象提取数据到变量
  ```javascript
  const [a, b] = [1, 2];
  const { name, age } = person;
  ```

### 6. 默认参数

- 函数参数的默认值
  ```javascript
  function greet(name = 'Guest') {
    return `Hello, ${name}!`;
  }
  ```

### 7. 剩余参数和扩展运算符

- 处理不定数量的参数和数组展开
  ```javascript
  function sum(...numbers) {
    return numbers.reduce((a, b) => a + b, 0);
  }
  const arr1 = [1, 2, 3];
  const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]
  ```

### 8. 对象字面量增强

- 简写属性名、方法定义和计算属性名
  ```javascript
  const name = 'John';
  const user = {
    name,
    sayHi() {
      return `Hi, ${this.name}`;
    },
    ['user' + 'Id']: 12345,
  };
  ```

### 9. Promise

- 异步编程的解决方案
  ```javascript
  function fetchData() {
    return new Promise((resolve, reject) => {
      // 异步操作
    });
  }
  ```

### 10. 模块化

- 原生的模块导入导出

  ```javascript
  // 导出
  export function add(x, y) {
    return x + y;
  }

  // 导入
  import { add } from './math.js';
  ```

### 11. Symbol

- 新的原始数据类型，表示唯一的标识符
  ```javascript
  const sym = Symbol('description');
  ```

### 12. 迭代器和 for...of 循环

- 新的遍历集合的方式
  ```javascript
  for (const item of ['a', 'b', 'c']) {
    console.log(item);
  }
  ```

### 13. 生成器函数

- 可暂停执行的函数
  ```javascript
  function* idGenerator() {
    let id = 0;
    while (true) {
      yield id++;
    }
  }
  ```

### 14. Map 和 Set 集合

- 新的数据结构

  ```javascript
  const map = new Map();
  map.set('key', 'value');

  const set = new Set([1, 2, 3]);
  ```

### 15. Proxy 和 Reflect

- 元编程特性
  ```javascript
  const handler = {
    get(target, prop) {
      return prop in target ? target[prop] : 'not found';
    },
  };
  const proxy = new Proxy({}, handler);
  ```

### 16. 尾调用优化

- 特定条件下的调用栈优化

### 17. WeakMap 和 WeakSet

- 弱引用集合，不阻止垃圾回收

  ```javascript
  const weakMap = new WeakMap();
  const obj = {};
  weakMap.set(obj, 'data');

  const weakSet = new WeakSet();
  weakSet.add(obj);
  ```

### 18. 类型化数组

- 更高效的二进制数据处理
  ```javascript
  const typedArray = new Int32Array(4);
  typedArray[0] = 42;
  ```

### 19. 新的字符串方法

- 对象、数组和字符串的新方法

  ```javascript
  // 新增的字符串方法（注意：Array.prototype.includes 是 ES7 引入的）
  'abc'.repeat(3); // 'abcabcabc'
  'abc'.startsWith('a'); // true
  'abc'.endsWith('c'); // true
  'abc'.includes('b'); // true - 注意：这是 ES6 引入的 String.prototype.includes()
  ```

### 20. 新的数组方法

- 数组处理能力增强

  ```javascript
  // 注意：Array.prototype.includes()是ES7 (ES2016)引入的，不是ES6的一部分
  Array.from('abc'); // ['a', 'b', 'c']
  Array.of(1, 2, 3); // [1, 2, 3]
  [1, 4, 3, 2].find((x) => x > 3); // 4
  [1, 4, 3, 2].findIndex((x) => x > 3); // 1
  ```

### 21. 二进制和八进制字面量

- 新的数值表示方法
  ```javascript
  const binary = 0b1010; // 二进制，值为10
  const octal = 0o755; // 八进制，值为493
  ```

### 22. Unicode 支持增强

- 更好的 Unicode 编码支持
  ```javascript
  const unicode = '\u{1F600}'; // 😀
  '😀'.length; // ES6 之前为 2，现在可以正确处理
  ```

### 23. 正则表达式增强

- 支持 u 和 y 标志
  ```javascript
  const regex1 = /^\uD83D/u; // u 标志用于处理 Unicode
  const regex2 = /ab/y; // y 标志用于"粘性"搜索
  ```

## 高频使用特性

以下是开发中最常用的 ES6 特性，几乎每个现代 JavaScript 项目都会大量使用：

| 特性            | 使用频率 | 主要优势                     |
| --------------- | -------- | ---------------------------- |
| 箭头函数        | ★★★★★    | 简洁语法、自动绑定 this      |
| let/const       | ★★★★★    | 块级作用域、防止变量重复声明 |
| 模板字符串      | ★★★★★    | 字符串插值、多行字符串       |
| 解构赋值        | ★★★★★    | 简化代码、提取数据           |
| 扩展/剩余运算符 | ★★★★★    | 数组/对象操作简化            |
| Promise         | ★★★★★    | 异步编程简化                 |
| 模块化          | ★★★★★    | 代码组织、封装               |
| 对象字面量增强  | ★★★★☆    | 简洁语法                     |
| 默认参数        | ★★★★☆    | 函数参数灵活性               |
| 类              | ★★★★☆    | 面向对象编程                 |
| for...of 循环   | ★★★★☆    | 迭代各种集合                 |
| 字符串新方法    | ★★★★☆    | 简化字符串操作               |

## 注意事项和常见混淆点

### ES6 vs ES7 特性区分

有些特性容易在版本上混淆，特别是：

| 特性                        | 所属版本   | 说明                               |
| --------------------------- | ---------- | ---------------------------------- |
| String.prototype.includes() | ES6 (2015) | 检查字符串是否包含指定的子字符串   |
| Array.prototype.includes()  | ES7 (2016) | 检查数组是否包含指定元素，包括 NaN |

## 高级特性

以下是更复杂、更强大但使用频率较低的 ES6 特性，通常在特定场景或高级应用中使用：

| 特性              | 复杂度 | 主要应用场景             |
| ----------------- | ------ | ------------------------ |
| 生成器函数        | ★★★★★  | 惰性求值、异步流程控制   |
| Proxy/Reflect     | ★★★★★  | 元编程、拦截对象操作     |
| Symbol            | ★★★★☆  | 唯一标识符、避免名称冲突 |
| WeakMap/WeakSet   | ★★★★☆  | 内存管理、防止内存泄漏   |
| 迭代器            | ★★★★☆  | 自定义迭代行为           |
| 尾调用优化        | ★★★★☆  | 递归函数优化             |
| 类型化数组        | ★★★★☆  | 二进制数据处理、WebGL    |
| 正则表达式 y 标志 | ★★★☆☆  | 高性能字符串解析         |

## 特性采用建议

### 初学者应优先掌握

- let/const
- 箭头函数
- 模板字符串
- 解构赋值
- 扩展运算符
- Promise 基础

### 中级开发者应掌握

- 类和继承
- 模块系统
- Map/Set
- 生成器函数基础
- 迭代器和 for...of
- Promise 高级用法

### 高级开发者应掌握

- Proxy/Reflect
- Symbol 及其应用
- WeakMap/WeakSet
- 生成器异步流程控制
- 元编程技术

## 浏览器支持情况

| 浏览器            | 支持 ES6 起始版本 | 发布日期     |
| ----------------- | ----------------- | ------------ |
| Chrome            | 51                | 2016 年 5 月 |
| Firefox           | 52                | 2017 年 3 月 |
| Safari            | 10                | 2016 年 9 月 |
| Edge              | 14                | 2016 年 8 月 |
| Internet Explorer | 不支持            | -            |
| Opera             | 38                | 2016 年 6 月 |

## 转译工具

对于需要支持老版本浏览器的项目，可以使用以下工具将 ES6 代码转换为 ES5 代码：

- **Babel**: 最流行的 JavaScript 编译器
- **TypeScript**: 微软开发的 JavaScript 超集，也可以将 ES6 转为 ES5

## 结论

ES6 的引入极大地改进了 JavaScript 的功能和语法，使开发人员能够编写更简洁、更强大的代码。现代浏览器对 ES6 的支持非常广泛，但在需要兼容旧浏览器的情况下，转译工具是必不可少的。
