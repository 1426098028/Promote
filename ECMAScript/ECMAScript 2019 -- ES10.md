# ECMAScript 2019 (ES10) 新特性

ECMAScript 2019，也称为 ES10，是 JavaScript 语言的年度更新，于 2019 年 6 月发布。这次更新引入了多个实用的数组和对象操作方法，以及字符串和函数的改进。

## 主要新增特性

### 1. 数组方法增强

#### 1.1 Array.prototype.flat()

- 将嵌套数组扁平化，可以指定深度
- 默认只扁平化一层，但可以通过参数控制扁平化深度

```javascript
const nestedArray = [1, 2, [3, 4, [5, 6]]];

// 默认只扁平化一层
console.log(nestedArray.flat());
// [1, 2, 3, 4, [5, 6]]

// 指定扁平化深度
console.log(nestedArray.flat(2));
// [1, 2, 3, 4, 5, 6]

// 完全扁平化（任意深度）
console.log(nestedArray.flat(Infinity));
// [1, 2, 3, 4, 5, 6]

// 移除空项
console.log([1, 2, , 4, 5].flat());
// [1, 2, 4, 5]
```

#### 1.2 Array.prototype.flatMap()

- 组合 map() 和 flat() 的功能，先映射每个元素，然后扁平化结果
- 比分别调用 map() 和 flat() 更高效

```javascript
const sentences = ['Hello world', 'Welcome to JavaScript'];

// 使用 map 和 flat
const words1 = sentences.map((s) => s.split(' ')).flat();
console.log(words1);
// ["Hello", "world", "Welcome", "to", "JavaScript"]

// 使用 flatMap 更高效
const words2 = sentences.flatMap((s) => s.split(' '));
console.log(words2);
// ["Hello", "world", "Welcome", "to", "JavaScript"]

// flatMap 只能扁平化一层
const result = [1, 2, 3].flatMap((x) => [[x * 2]]);
console.log(result);
// [[2], [4], [6]] - 注意不会完全扁平化
```

### 2. 对象方法增强

#### 2.1 Object.fromEntries()

- 将键值对列表转换为对象，是 Object.entries() 的逆操作
- 非常适合将 Map 转换为普通对象，或处理查询字符串

```javascript
// 从键值对数组创建对象
const entries = [
  ['name', 'Alice'],
  ['age', 30],
  ['isAdmin', true],
];

const obj = Object.fromEntries(entries);
console.log(obj);
// { name: 'Alice', age: 30, isAdmin: true }

// 将 Map 转换为普通对象
const map = new Map([
  ['key1', 'value1'],
  ['key2', 'value2'],
]);
const objFromMap = Object.fromEntries(map);
console.log(objFromMap);
// { key1: 'value1', key2: 'value2' }

// 处理 URL 查询参数
const queryString = 'name=Alice&age=30&isAdmin=true';
const queryParams = new URLSearchParams(queryString);
const paramsObject = Object.fromEntries(queryParams);
console.log(paramsObject);
// { name: 'Alice', age: '30', isAdmin: 'true' }
```

### 3. 字符串方法增强

#### 3.1 String.prototype.trimStart() / String.prototype.trimEnd()

- 去除字符串开头或结尾的空白字符
- 提供了比 trim() 更精细的控制
- trimLeft 和 trimRight 作为别名保留

```javascript
const greeting = '   Hello world!   ';

console.log(greeting.trimStart());
// "Hello world!   "

console.log(greeting.trimEnd());
// "   Hello world!"

// 链式调用实现与 trim() 相同的效果
console.log(greeting.trimStart().trimEnd());
// "Hello world!"
```

### 4. 可选的 catch 绑定

- 在不需要错误对象的情况下，可以省略 catch 子句中的参数
- 简化了仅需捕获错误但不需要错误信息的代码

```javascript
// 以前的写法
try {
  // 可能会抛出错误的代码
  JSON.parse(invalidJSON);
} catch (error) {
  // 不使用 error 对象
  console.log('解析失败');
}

// ES10 的写法
try {
  // 可能会抛出错误的代码
  JSON.parse(invalidJSON);
} catch {
  // 没有绑定错误对象
  console.log('解析失败');
}
```

### 5. Symbol.prototype.description

- 获取 Symbol 的可选描述，而不是使用 toString() 方法

```javascript
const sym = Symbol('foo');

// 以前的写法
console.log(sym.toString()); // "Symbol(foo)"
console.log(sym.toString().slice(7, -1)); // "foo"

// ES10 的写法
console.log(sym.description); // "foo"
```

### 6. Function.prototype.toString() 改进

- 现在会保留函数声明的原始源代码，包括空格和注释
- 使调试工具和元编程更准确

```javascript
function /* 这是注释 */ foo() {
  // 另一个注释
  console.log('Hello');
}

// ES10 之前不包含注释和格式
// ES10 之后保留了完整格式
console.log(foo.toString());
// "function /* 这是注释 */ foo() {
//   // 另一个注释
//   console.log("Hello");
// }"
```

### 7. JSON 超集

- ECMAScript 现在允许 JSON 字符串包含 U+2028 行分隔符和 U+2029 段落分隔符
- 使 JSON.parse 更兼容不同来源的 JSON 数据

```javascript
// 以前这会导致语法错误
const json = '{"name":"value\u2028"}';
// ES10 中可以正常解析
const obj = JSON.parse(json);
console.log(obj.name); // "value⨨" (带有行分隔符)
```

### 8. 稳定的 Array.prototype.sort()

- 排序算法现在保证是稳定的，相等元素的相对顺序不变
- 提高了排序结果的一致性和可预测性

```javascript
// 具有相同年龄但不同名字的对象数组
const people = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 30 },
  { name: 'David', age: 25 },
];

// 按年龄排序
// ES10 之前相同年龄的元素可能会改变顺序
// ES10 之后保证相同年龄的元素保持原来的顺序
const sorted = people.sort((a, b) => a.age - b.age);
console.log(sorted);
// [
//   { name: "Bob", age: 25 },
//   { name: "David", age: 25 },
//   { name: "Alice", age: 30 },
//   { name: "Charlie", age: 30 }
// ]
```

## 浏览器支持情况

| 浏览器            | 支持 ES10 起始版本 | 发布日期     |
| ----------------- | ------------------ | ------------ |
| Chrome            | 73                 | 2019 年 3 月 |
| Firefox           | 67                 | 2019 年 5 月 |
| Safari            | 12.1               | 2019 年 3 月 |
| Edge (Chromium)   | 79                 | 2020 年 1 月 |
| Internet Explorer | 不支持             | -            |
| Opera             | 60                 | 2019 年 4 月 |

## 数组和对象操作相关特性

ES10 引入的特性大大增强了数组和对象的操作能力，以下是对这些功能的详细总结：

### 数组操作

| 特性                | 描述                         | 使用频率 | 示例                                                |
| ------------------- | ---------------------------- | -------- | --------------------------------------------------- |
| Array.flat()        | 扁平化嵌套数组，可指定深度   | ★★★★★    | `[1, [2, [3]]].flat(2)` → `[1, 2, 3]`               |
| Array.flatMap()     | 映射每个元素，然后扁平化结果 | ★★★★☆    | `['a b'].flatMap(x => x.split(' '))` → `['a', 'b']` |
| 稳定的 Array.sort() | 保证相等元素的顺序不变       | ★★★☆☆    | `[{id:1, v:2}, {id:2, v:2}].sort((a,b) => a.v-b.v)` |

### 对象操作

| 特性                 | 描述                                           | 使用频率 | 示例                                                      |
| -------------------- | ---------------------------------------------- | -------- | --------------------------------------------------------- |
| Object.fromEntries() | 从键值对数组创建对象，Object.entries()的逆操作 | ★★★★★    | `Object.fromEntries([['a', 1], ['b', 2]])` → `{a:1, b:2}` |

## 高频使用特性

以下是 ES10 中最常用的特性，根据使用频率排序：

| 特性                   | 使用频率 | 主要优势                           |
| ---------------------- | -------- | ---------------------------------- |
| Array.flat()           | ★★★★★    | 轻松处理嵌套数组，一行代码替代递归 |
| Object.fromEntries()   | ★★★★★    | 便于将 Map 或键值对数组转换为对象  |
| String.trimStart/End() | ★★★★☆    | 精细控制字符串空白处理             |
| 可选的 catch 绑定      | ★★★★☆    | 简化错误处理代码                   |
| Array.flatMap()        | ★★★★☆    | 数据转换和扁平化的高效组合         |

## 高级特性

以下特性更复杂或使用场景更专业：

| 特性                     | 复杂度 | 主要应用场景                         |
| ------------------------ | ------ | ------------------------------------ |
| 稳定的 Array.sort()      | ★★★☆☆  | 保持相对顺序的复杂排序，表格数据处理 |
| Function.toString() 改进 | ★★★☆☆  | 元编程、代码转换工具、代码分析       |
| Symbol.description       | ★★★☆☆  | 调试工具、自定义 Symbol 库           |

## 特性实际应用示例

### 使用 flat() 和 flatMap() 处理数据

```javascript
// 扁平化多层JSON结构
const nestedData = [
  {
    id: 1,
    details: {
      items: [
        { name: 'Item 1', tags: ['a', 'b'] },
        { name: 'Item 2', tags: ['c'] },
      ],
    },
  },
  {
    id: 2,
    details: { items: [{ name: 'Item 3', tags: ['d', 'e', 'f'] }] },
  },
];

// 提取所有标签到一个数组
const allTags = nestedData.flatMap((user) => user.details.items).flatMap((item) => item.tags);

console.log(allTags); // ['a', 'b', 'c', 'd', 'e', 'f']
```

### 使用 Object.fromEntries() 转换数据

```javascript
// 使用场景：过滤对象属性
const user = {
  name: 'Alice',
  age: 30,
  password: '12345',
  email: 'alice@example.com',
  phone: '123-456-7890',
};

// 创建一个不包含敏感信息的安全版本
const publicInfo = Object.fromEntries(Object.entries(user).filter(([key]) => !['password', 'email', 'phone'].includes(key)));

console.log(publicInfo); // { name: 'Alice', age: 30 }
```

### 稳定排序在数据表格中的应用

```javascript
// 多级排序（先按部门，相同部门内按工资）
const employees = [
  { name: 'Alice', department: 'Engineering', salary: 100000 },
  { name: 'Bob', department: 'Marketing', salary: 85000 },
  { name: 'Charlie', department: 'Engineering', salary: 95000 },
  { name: 'David', department: 'Marketing', salary: 85000 },
];

// 先按工资排序
employees.sort((a, b) => a.salary - b.salary);

// 再按部门排序（ES10保证相同工资的员工顺序不变）
employees.sort((a, b) => a.department.localeCompare(b.department));

console.log(employees);
// 结果保证相同部门里，工资低的排在前面
// 并且相同工资的维持原来的顺序
```

## 与前代的演进关系

ES10 延续了 JavaScript 对数组和对象操作的增强：

| 版本        | 发布日期     | 数组操作增强               | 对象操作增强                        |
| ----------- | ------------ | -------------------------- | ----------------------------------- |
| ES6 (2015)  | 2015 年 6 月 | find, findIndex, 数组解构  | Object.assign, 对象字面量增强       |
| ES7 (2016)  | 2016 年 6 月 | includes                   | -                                   |
| ES8 (2017)  | 2017 年 6 月 | -                          | Object.values/entries, 对象解构提案 |
| ES9 (2018)  | 2018 年 6 月 | -                          | 对象展开运算符 (...obj)             |
| ES10 (2019) | 2019 年 6 月 | flat, flatMap, 稳定的 sort | Object.fromEntries                  |

## 转译支持

主流的 JavaScript 转译工具都对 ES10 特性提供了良好支持：

- **Babel**: 通过 @babel/preset-env 支持
- **TypeScript**: 3.5 版本起支持大部分 ES10 特性
- **Node.js**: 12.0.0 版本起支持大部分 ES10 特性

## 结论

ES10 引入的新特性极大地简化了常见的数组和对象操作任务。特别是 Array.flat()/flatMap() 和 Object.fromEntries() 成为了处理嵌套数据结构和数据转换的强大工具。这些特性遵循了 JavaScript 设计的一贯理念：提供简洁、灵活且强大的数据处理功能。

虽然 ES10 相比 ES6 的变化范围较小，但它提供的改进在实际开发中非常实用，特别是在数据处理和转换方面，使代码更加简洁和可读。
