# ECMAScript 2023 (ES14) 新特性

ECMAScript 2023，也称为 ES14，是 JavaScript 语言的年度更新，于 2023 年 6 月发布。本次更新进一步增强了 JavaScript 的数组和对象处理能力，提供了更强大和简便的数组操作方法，以及标准化了一些常用的辅助函数。

## 主要新增特性

### 1. 数组查找增强：findLast 和 findLastIndex

- 从后向前查找数组元素，与现有的 find 和 findIndex 方法相反
- 方便在有序数组中查找最后一个满足条件的元素

```javascript
const numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];

// 从前往后查找第一个大于 3 的数
const firstGreaterThan3 = numbers.find((n) => n > 3);
console.log(firstGreaterThan3); // 4 (索引 3 处的元素)

// 从后往前查找最后一个大于 3 的数
const lastGreaterThan3 = numbers.findLast((n) => n > 3);
console.log(lastGreaterThan3); // 4 (索引 5 处的元素)

// 找到最后一个大于 3 的元素的索引
const lastGreaterThan3Index = numbers.findLastIndex((n) => n > 3);
console.log(lastGreaterThan3Index); // 5
```

### 2. Hashbang 语法支持

- 允许在 JavaScript 文件开头使用 `#!` (shebang/hashbang)
- 使 JavaScript 文件可以作为独立可执行脚本

```javascript
#!/usr/bin/env node

// 这是一个可以直接在类 Unix 系统上执行的 JavaScript 文件
console.log('Hello from executable JavaScript!');

// 使用方法：
// 1. 保存为文件 script.js
// 2. 设置执行权限：chmod +x script.js
// 3. 直接运行：./script.js
```

### 3. 符号作为 WeakMap 键

- 允许符号（Symbol）作为 WeakMap 的键
- 扩展了 WeakMap 的使用场景

```javascript
// 以前 WeakMap 只能使用对象作为键
const userMap = new WeakMap();
const user = { name: 'Alice' };
userMap.set(user, { lastLogin: new Date() });

// ES14：现在可以使用 Symbol 作为键
const uniqueSymbol = Symbol('unique');
const symbolMap = new WeakMap();
symbolMap.set(uniqueSymbol, 'Symbol value');

console.log(symbolMap.get(uniqueSymbol)); // 'Symbol value'

// 但仍然不能使用原始值
// symbolMap.set(42, "Number value"); // TypeError
// symbolMap.set("key", "String value"); // TypeError
```

### 4. 数组分组：Array.prototype.groupBy() (Stage 3 提案)

> 注意：此特性最初是作为提案加入 ES14，但在最终版本中没有被包含。在 ES15 (ECMAScript 2024)中，它以 Object.groupBy()和 Map.groupBy()的形式被正式引入。

- 按照给定的回调函数对数组元素进行分组
- 返回一个对象，键为分组标准，值为分组后的数组

```javascript
// 此语法已被更新，在ES15中使用Object.groupBy或Map.groupBy
// ES15实现
const inventory = [
  { name: 'apple', type: 'fruit', quantity: 5 },
  { name: 'banana', type: 'fruit', quantity: 8 },
  { name: 'carrot', type: 'vegetable', quantity: 12 },
  { name: 'orange', type: 'fruit', quantity: 4 },
  { name: 'broccoli', type: 'vegetable', quantity: 3 },
];

// 按类型分组 (ES15语法)
const groupByType = Object.groupBy(inventory, (item) => item.type);
console.log(groupByType);
/* 输出:
{
  fruit: [
    { name: 'apple', type: 'fruit', quantity: 5 },
    { name: 'banana', type: 'fruit', quantity: 8 },
    { name: 'orange', type: 'fruit', quantity: 4 }
  ],
  vegetable: [
    { name: 'carrot', type: 'vegetable', quantity: 12 },
    { name: 'broccoli', type: 'vegetable', quantity: 3 }
  ]
}
*/

// 按数量范围分组 (ES15语法)
const groupByQuantity = Object.groupBy(inventory, (item) => (item.quantity < 5 ? 'low' : item.quantity < 10 ? 'medium' : 'high'));
console.log(groupByQuantity);
/* 输出:
{
  low: [
    { name: 'orange', type: 'fruit', quantity: 4 },
    { name: 'broccoli', type: 'vegetable', quantity: 3 }
  ],
  medium: [
    { name: 'apple', type: 'fruit', quantity: 5 },
    { name: 'banana', type: 'fruit', quantity: 8 }
  ],
  high: [
    { name: 'carrot', type: 'vegetable', quantity: 12 }
  ]
}
*/
```

### 5. Change Array by Copy

- 新增不改变原数组的数组操作方法
- 包括四个新方法：toSorted()、toReversed()、toSpliced() 和 with()

#### 5.1 toSorted()

- 返回排序后的数组副本，不修改原数组
- 参数与 sort() 相同

```javascript
const numbers = [3, 1, 4, 1, 5, 9];

// sort() 会修改原数组
const sorted1 = numbers.sort();
console.log(numbers); // [1, 1, 3, 4, 5, 9] (原数组被修改)
console.log(sorted1 === numbers); // true (返回的是同一个数组)

// toSorted() 不会修改原数组
const originalArray = [3, 1, 4, 1, 5, 9];
const sorted2 = originalArray.toSorted();
console.log(originalArray); // [3, 1, 4, 1, 5, 9] (原数组未变)
console.log(sorted2); // [1, 1, 3, 4, 5, 9] (返回新数组)

// 自定义排序函数
const people = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 35 },
];

const sortedByAge = people.toSorted((a, b) => a.age - b.age);
console.log(people); // 原数组未变
console.log(sortedByAge);
// [
//   { name: 'Bob', age: 25 },
//   { name: 'Alice', age: 30 },
//   { name: 'Charlie', age: 35 }
// ]
```

#### 5.2 toReversed()

- 返回反转后的数组副本，不修改原数组

```javascript
const letters = ['a', 'b', 'c', 'd'];

// reverse() 会修改原数组
const reversed1 = letters.reverse();
console.log(letters); // ['d', 'c', 'b', 'a'] (原数组被修改)
console.log(reversed1 === letters); // true (返回的是同一个数组)

// toReversed() 不会修改原数组
const original = ['a', 'b', 'c', 'd'];
const reversed2 = original.toReversed();
console.log(original); // ['a', 'b', 'c', 'd'] (原数组未变)
console.log(reversed2); // ['d', 'c', 'b', 'a'] (返回新数组)
```

#### 5.3 toSpliced()

- 返回应用 splice 操作后的数组副本，不修改原数组
- 参数与 splice() 相同

```javascript
const colors = ['red', 'green', 'blue', 'yellow'];

// splice() 会修改原数组
const removed1 = colors.splice(1, 2, 'purple', 'pink');
console.log(colors); // ['red', 'purple', 'pink', 'yellow'] (原数组被修改)
console.log(removed1); // ['green', 'blue'] (返回被删除的元素)

// toSpliced() 不会修改原数组
const original = ['red', 'green', 'blue', 'yellow'];
const result = original.toSpliced(1, 2, 'purple', 'pink');
console.log(original); // ['red', 'green', 'blue', 'yellow'] (原数组未变)
console.log(result); // ['red', 'purple', 'pink', 'yellow'] (返回新数组)
```

#### 5.4 with()

- 返回替换指定索引元素后的数组副本，不修改原数组
- 相当于不可变的数组元素赋值

```javascript
const planets = ['Mercury', 'Venus', 'Earth', 'Mars'];

// 传统方法修改元素会改变原数组
planets[2] = 'Home';
console.log(planets); // ['Mercury', 'Venus', 'Home', 'Mars']

// with() 不会修改原数组
const original = ['Mercury', 'Venus', 'Earth', 'Mars'];
const changed = original.with(2, 'Home');
console.log(original); // ['Mercury', 'Venus', 'Earth', 'Mars'] (原数组未变)
console.log(changed); // ['Mercury', 'Venus', 'Home', 'Mars'] (返回新数组)

// 负索引会抛出 RangeError
// console.log(original.with(-1, 'Pluto')); // RangeError
```

## 数组和对象操作相关特性

ES14 特别强化了数组操作能力，以下是所有数组和对象相关特性的汇总：

### 数组操作

| 特性                   | 描述                 | 使用频率 | 示例                              |
| ---------------------- | -------------------- | -------- | --------------------------------- |
| findLast/findLastIndex | 从后向前查找数组元素 | ★★★★★    | `array.findLast(x => x > 5)`      |
| toSorted               | 不可变排序           | ★★★★★    | `array.toSorted((a, b) => a - b)` |
| toReversed             | 不可变反转           | ★★★★☆    | `array.toReversed()`              |
| toSpliced              | 不可变拼接           | ★★★★☆    | `array.toSpliced(1, 2, 'new')`    |
| with                   | 不可变元素替换       | ★★★★★    | `array.with(2, 'new')`            |

### 对象操作

| 特性                   | 描述                        | 使用频率 | 示例                           |
| ---------------------- | --------------------------- | -------- | ------------------------------ |
| Symbol 作为 WeakMap 键 | 允许 Symbol 作为 WeakMap 键 | ★★★☆☆    | `weakMap.set(Symbol(), value)` |

## 高频使用特性

以下是 ES14 中最常用的特性，根据使用频率排序：

| 特性                   | 使用频率 | 主要优势                   |
| ---------------------- | -------- | -------------------------- |
| with()                 | ★★★★★    | 简单、安全地替换数组元素   |
| findLast/findLastIndex | ★★★★★    | 方便从后向前搜索元素       |
| toSorted()             | ★★★★★    | 函数式排序，不改变原数组   |
| toReversed()           | ★★★★☆    | 函数式反转，不改变原数组   |
| toSpliced()            | ★★★★☆    | 复杂数组修改，不改变原数组 |

## 实际应用示例

### 使用不可变数组方法简化 React 状态管理

```javascript
// React 组件中使用不可变数组方法
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: '学习 ES14', completed: false },
    { id: 2, text: '练习新数组方法', completed: false },
    { id: 3, text: '更新项目', completed: true },
  ]);

  // 添加新 todo
  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos(todos.toSpliced(todos.length, 0, newTodo));
    // 等同于 setTodos([...todos, newTodo]);
  };

  // 切换 todo 完成状态
  const toggleTodo = (id) => {
    const index = todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      const updatedTodo = { ...todos[index], completed: !todos[index].completed };
      setTodos(todos.with(index, updatedTodo));
      // 等同于 setTodos([...todos.slice(0, index), updatedTodo, ...todos.slice(index + 1)]);
    }
  };

  // 删除 todo
  const deleteTodo = (id) => {
    const index = todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      setTodos(todos.toSpliced(index, 1));
      // 等同于 setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  // 按完成状态排序 - 未完成的在前
  const sortByCompletion = () => {
    setTodos(todos.toSorted((a, b) => Number(a.completed) - Number(b.completed)));
  };

  // 渲染组件...
}
```

### 使用 findLast 查找满足条件的最新元素

```javascript
// 用户交易记录系统 - 查找最近的成功交易
const transactions = [
  { id: 101, date: '2023-01-05', status: 'success', amount: 200 },
  { id: 102, date: '2023-01-15', status: 'failed', amount: 150 },
  { id: 103, date: '2023-01-20', status: 'success', amount: 300 },
  { id: 104, date: '2023-01-25', status: 'failed', amount: 100 },
  { id: 105, date: '2023-02-01', status: 'pending', amount: 250 },
  { id: 106, date: '2023-02-05', status: 'success', amount: 175 },
];

// 时间顺序的交易，找到最近的成功交易
const lastSuccessfulTransaction = transactions.findLast((tx) => tx.status === 'success');
console.log('最近的成功交易:', lastSuccessfulTransaction);
// { id: 106, date: '2023-02-05', status: 'success', amount: 175 }

// 查找最后一个大额交易（金额超过200）的索引
const lastLargeTransactionIndex = transactions.findLastIndex((tx) => tx.amount > 200);
console.log('最后一个大额交易索引:', lastLargeTransactionIndex);
// 索引 2 - 对应 id 103 的交易

// 使用获取的索引判断下一个交易
if (lastLargeTransactionIndex !== -1 && lastLargeTransactionIndex < transactions.length - 1) {
  const nextTransaction = transactions[lastLargeTransactionIndex + 1];
  console.log('大额交易后的下一个交易:', nextTransaction);
  // { id: 104, date: '2023-01-25', status: 'failed', amount: 100 }
}
```

### 实现自定义数据表格排序

```javascript
// 数据表格组件，支持多列排序
class DataTable {
  constructor(data) {
    this.originalData = data;
    this.currentData = [...data];
    this.sortOrder = { column: null, direction: 'asc' };
  }

  // 按列排序 - 不修改原始数据
  sortBy(column) {
    // 如果点击同一列，切换排序方向
    if (this.sortOrder.column === column) {
      this.sortOrder.direction = this.sortOrder.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortOrder = { column, direction: 'asc' };
    }

    // 使用 toSorted() 获取排序后的新数组
    this.currentData = this.originalData.toSorted((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      // 根据值类型选择比较方法
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return this.sortOrder.direction === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      } else {
        return this.sortOrder.direction === 'asc' ? valueA - valueB : valueB - valueA;
      }
    });

    return this.currentData;
  }

  // 反转当前排序顺序
  reverseOrder() {
    this.currentData = this.currentData.toReversed();
    this.sortOrder.direction = this.sortOrder.direction === 'asc' ? 'desc' : 'asc';
    return this.currentData;
  }

  // 筛选数据并分页
  filter(filterFn, page = 1, pageSize = 10) {
    const filtered = this.currentData.filter(filterFn);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    // 使用 toSpliced() 的子集功能
    return filtered.toSpliced(0, start).toSpliced(pageSize, Infinity);
    // 相当于 return filtered.slice(start, end);
  }

  // 更新单个数据项
  updateItem(id, updates) {
    const index = this.originalData.findIndex((item) => item.id === id);
    if (index !== -1) {
      // 创建更新后的数据项
      const updatedItem = { ...this.originalData[index], ...updates };

      // 使用 with() 更新原始数据
      this.originalData = this.originalData.with(index, updatedItem);

      // 重新应用当前排序
      if (this.sortOrder.column) {
        this.sortBy(this.sortOrder.column);
      } else {
        this.currentData = [...this.originalData];
      }

      return true;
    }
    return false;
  }
}

// 使用示例
const employees = [
  { id: 1, name: 'Alice', department: 'Engineering', salary: 90000 },
  { id: 2, name: 'Bob', department: 'Marketing', salary: 75000 },
  { id: 3, name: 'Charlie', department: 'Engineering', salary: 85000 },
  { id: 4, name: 'David', department: 'HR', salary: 65000 },
  { id: 5, name: 'Eve', department: 'Marketing', salary: 80000 },
];

const table = new DataTable(employees);

// 按部门升序排序
console.log(table.sortBy('department'));

// 反转为降序
console.log(table.reverseOrder());

// 按薪资排序
console.log(table.sortBy('salary'));

// 更新员工薪资
table.updateItem(3, { salary: 95000 });

// 筛选工程部门员工
const engineeringStaff = table.filter((emp) => emp.department === 'Engineering');
console.log(engineeringStaff);
```

## 浏览器支持情况

| 浏览器            | 支持 ES14 起始版本 | 发布日期                    |
| ----------------- | ------------------ | --------------------------- |
| Chrome            | 110                | 2023 年 2 月                |
| Firefox           | 109-113            | 2023 年 1 月 - 2023 年 5 月 |
| Safari            | 16.4               | 2023 年 3 月                |
| Edge (Chromium)   | 110                | 2023 年 2 月                |
| Internet Explorer | 不支持             | -                           |
| Opera             | 96                 | 2023 年 2 月                |

## 与前代的演进关系

ES14 延续了 JavaScript 数组操作的增强趋势：

| 版本        | 发布日期     | 主要数组/对象操作增强                                      |
| ----------- | ------------ | ---------------------------------------------------------- |
| ES11 (2020) | 2020 年 6 月 | 可选链，空值合并                                           |
| ES12 (2021) | 2021 年 6 月 | 逻辑赋值，String.replaceAll()                              |
| ES13 (2022) | 2022 年 6 月 | 类私有字段，Object.hasOwn()，数组 at()                     |
| ES14 (2023) | 2023 年 6 月 | findLast/findLastIndex，toSorted/toReversed/toSpliced/with |

## 转译支持

主流的 JavaScript 工具对 ES14 特性的支持：

- **Babel**: 需要 @babel/preset-env 最新版本或特定插件
- **TypeScript**: 5.0+ 版本支持不可变数组方法，4.8+ 版本支持 findLast/findLastIndex
- **Node.js**: 20.0.0+ 版本支持 ES14 的大部分特性

## 结论

ES14 (ECMAScript 2023) 的更新强调了函数式和不可变编程的趋势，特别是通过引入不改变原数组的方法，使开发者能够更容易地编写可预测的代码。findLast 和 findLastIndex 方法填补了数组 API 的一个长期空白，而 toSorted、toReversed、toSpliced 和 with 方法则提供了更强大的不可变数组处理能力。

这些增强特别适合在 React、Vue 等前端框架中使用，它们可以简化状态管理并提高应用性能。随着 JavaScript 继续向更多功能化和声明式的编程风格发展，ES14 提供的工具将帮助开发者编写更简洁、更可靠的代码。
