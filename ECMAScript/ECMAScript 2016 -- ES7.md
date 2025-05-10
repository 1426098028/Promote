# ECMAScript 2016 (ES7) 新特性

ECMAScript 2016，也称为 ES7，是 JavaScript 语言的一次小更新，于 2016 年 6 月发布。这次更新只包含两个主要新特性。

## 主要新增特性

### 1. Array.prototype.includes()

- 用于检查数组中是否包含特定元素，返回布尔值
- 比 indexOf 更直观，且能正确处理 NaN
- 注意：String.prototype.includes() 是 ES6 引入的，而 Array.prototype.includes() 是 ES7 引入的

```javascript
const array = [1, 2, 3, NaN];

// 旧方法
console.log(array.indexOf(2) !== -1); // true
console.log(array.indexOf(NaN) !== -1); // false（无法检测NaN）

// 新方法
console.log(array.includes(2)); // true
console.log(array.includes(NaN)); // true（可以正确检测NaN）

// 对比：字符串的includes方法（ES6引入）
console.log('hello world'.includes('world')); // true
```

### 2. 指数运算符（\*\*）

- 提供了一种简洁的指数运算方式
- 替代 Math.pow() 方法

```javascript
// 旧方法
console.log(Math.pow(2, 10)); // 1024

// 新方法
console.log(2 ** 10); // 1024

// 还支持赋值操作
let num = 2;
num **= 3;
console.log(num); // 8
```

## 浏览器支持情况

| 浏览器            | 支持 ES7 起始版本 | 发布日期     |
| ----------------- | ----------------- | ------------ |
| Chrome            | 52                | 2016 年 7 月 |
| Firefox           | 52                | 2017 年 3 月 |
| Safari            | 10.1              | 2017 年 3 月 |
| Edge              | 14                | 2016 年 8 月 |
| Internet Explorer | 不支持            | -            |
| Opera             | 39                | 2016 年 8 月 |

## 高频使用特性

由于 ES7 只包含两个新特性，它们都被广泛使用：

| 特性              | 使用频率 | 主要优势                   |
| ----------------- | -------- | -------------------------- |
| Array.includes()  | ★★★★★    | 简化数组元素检查，支持 NaN |
| 指数运算符 (\*\*) | ★★★★☆    | 简化指数计算，提高可读性   |

## 与 ES6 对比

相比 ES6 的大规模更新，ES7 的变化相对较小：

| 版本       | 发布日期     | 新特性数量 | 主要影响                  |
| ---------- | ------------ | ---------- | ------------------------- |
| ES6 (2015) | 2015 年 6 月 | 20+ 个     | JavaScript 语言重大现代化 |
| ES7 (2016) | 2016 年 6 月 | 2 个       | 小幅改进现有功能          |

## ES6 和 ES7 容易混淆的特性

| 特性                        | 所属版本   | 说明                               |
| --------------------------- | ---------- | ---------------------------------- |
| String.prototype.includes() | ES6 (2015) | 检查字符串中是否包含指定的子字符串 |
| Array.prototype.includes()  | ES7 (2016) | 检查数组中是否包含指定的元素       |

## 转译支持

主流的 JavaScript 转译工具都支持 ES7 特性：

- **Babel**: 通过 @babel/preset-env 支持
- **TypeScript**: 2.1 版本起完全支持

## 结论

ES7 是一次小型更新，但其引入的两个新特性都非常实用，特别是 Array.includes() 方法已成为处理数组时的常用功能。相比 ES6 的大规模改动，ES7 采取了更小、更频繁的更新策略，这也是 TC39 委员会后续版本更新的基本模式。
