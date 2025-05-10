# ECMAScript 5 (ES5) 新特性

ECMAScript 5 于 2009 年 12 月发布，是对 JavaScript 的一次重要更新，引入了许多现代 JavaScript 编程中常用的特性和改进。

## 主要新增特性

### 1. 严格模式 (Strict Mode)

- 通过 `"use strict"` 声明开启严格模式
- 消除 JavaScript 语言中一些不合理、不严谨的地方
- 提高代码的安全性和健壮性

```javascript
'use strict';
// 在严格模式下执行的代码
```

### 2. JSON 对象

- 引入了内置的 JSON 对象，用于 JSON 数据的解析和序列化
- 提供了 `JSON.parse()` 和 `JSON.stringify()` 方法

```javascript
// 将 JSON 字符串转换为 JavaScript 对象
const obj = JSON.parse('{"name":"张三","age":30}');
console.log(obj.name); // 张三

// 将 JavaScript 对象转换为 JSON 字符串
const json = JSON.stringify({ name: '李四', age: 25 });
console.log(json); // {"name":"李四","age":25}
```

### 3. Function.prototype.bind()

- 创建一个新函数，将 this 绑定到指定对象
- 允许设置部分参数（柯里化）

```javascript
const module = {
  x: 42,
  getX: function () {
    return this.x;
  },
};

const unboundGetX = module.getX;
console.log(unboundGetX()); // undefined，this 指向全局对象

const boundGetX = unboundGetX.bind(module);
console.log(boundGetX()); // 42，this 被绑定到 module
```

### 4. 对象属性特性

- 引入了属性描述符对象
- 可以定义属性是否可写、可枚举、可配置
- 支持存取器属性（getter/setter）

```javascript
const person = {};

// 定义属性
Object.defineProperty(person, 'name', {
  value: '张三',
  writable: true, // 是否可写
  enumerable: true, // 是否可枚举
  configurable: true, // 是否可配置
});

// 定义存取器属性
let age = 25;
Object.defineProperty(person, 'age', {
  get: function () {
    return age;
  },
  set: function (newValue) {
    if (newValue > 0) age = newValue;
  },
  enumerable: true,
  configurable: true,
});

person.age = 30;
console.log(person.age); // 30
```

### 5. 访问器属性（Getter 和 Setter）

- 允许在对象字面量中直接定义 getter 和 setter 方法

```javascript
const person = {
  firstName: '张',
  lastName: '三',
  get fullName() {
    return this.firstName + this.lastName;
  },
  set fullName(name) {
    const parts = name.split(' ');
    this.firstName = parts[0];
    this.lastName = parts[1] || '';
  },
};

console.log(person.fullName); // 张三
person.fullName = '李 四';
console.log(person.firstName); // 李
console.log(person.lastName); // 四
```

## 数组和对象操作相关的新特性

### 数组方法

1. **Array.isArray()** - 检查对象是否为数组

   ```javascript
   console.log(Array.isArray([])); // true
   console.log(Array.isArray({})); // false
   ```

2. **Array.prototype.forEach()** - 为数组中的每个元素执行回调函数

   ```javascript
   const numbers = [1, 2, 3, 4];
   numbers.forEach(function (num) {
     console.log(num * 2); // 2, 4, 6, 8
   });
   ```

3. **Array.prototype.map()** - 创建一个新数组，由回调函数处理原数组每个元素后的返回值组成

   ```javascript
   const numbers = [1, 2, 3, 4];
   const doubled = numbers.map(function (num) {
     return num * 2;
   });
   console.log(doubled); // [2, 4, 6, 8]
   ```

4. **Array.prototype.filter()** - 创建一个符合条件的新数组

   ```javascript
   const numbers = [1, 2, 3, 4, 5, 6];
   const even = numbers.filter(function (num) {
     return num % 2 === 0;
   });
   console.log(even); // [2, 4, 6]
   ```

5. **Array.prototype.reduce()** - 将数组元素计算为单个值

   ```javascript
   const numbers = [1, 2, 3, 4];
   const sum = numbers.reduce(function (accumulator, current) {
     return accumulator + current;
   }, 0);
   console.log(sum); // 10
   ```

6. **Array.prototype.reduceRight()** - 从右到左计算

   ```javascript
   const numbers = [1, 2, 3, 4];
   const result = numbers.reduceRight(function (accumulator, current) {
     return accumulator - current;
   });
   console.log(result); // 4 - 3 - 2 - 1 = -2
   ```

7. **Array.prototype.every()** - 检查所有元素是否都符合条件

   ```javascript
   const numbers = [2, 4, 6, 8];
   const allEven = numbers.every(function (num) {
     return num % 2 === 0;
   });
   console.log(allEven); // true
   ```

8. **Array.prototype.some()** - 检查是否至少有一个元素符合条件

   ```javascript
   const numbers = [1, 3, 5, 6];
   const hasEven = numbers.some(function (num) {
     return num % 2 === 0;
   });
   console.log(hasEven); // true，6是偶数
   ```

9. **Array.prototype.indexOf()** - 返回元素在数组中的第一个索引

   ```javascript
   const fruits = ['苹果', '香蕉', '橙子', '苹果'];
   console.log(fruits.indexOf('苹果')); // 0
   console.log(fruits.indexOf('梨')); // -1（不存在）
   ```

10. **Array.prototype.lastIndexOf()** - 返回元素在数组中的最后一个索引
    ```javascript
    const fruits = ['苹果', '香蕉', '橙子', '苹果'];
    console.log(fruits.lastIndexOf('苹果')); // 3
    ```

### 对象方法

1. **Object.create()** - 创建一个新对象，使用现有对象作为新创建对象的原型

   ```javascript
   const person = {
     isHuman: true,
     printInfo: function () {
       console.log(`我是人类: ${this.isHuman}`);
     },
   };

   const me = Object.create(person);
   me.name = '张三';
   me.printInfo(); // 我是人类: true
   ```

2. **Object.defineProperty()** - 直接在对象上定义新属性，或修改现有属性

   ```javascript
   const obj = {};
   Object.defineProperty(obj, 'property1', {
     value: 42,
     writable: false,
   });
   console.log(obj.property1); // 42
   obj.property1 = 77; // 在严格模式下会抛出错误
   console.log(obj.property1); // 仍然是 42
   ```

3. **Object.defineProperties()** - 同时定义多个属性

   ```javascript
   const obj = {};
   Object.defineProperties(obj, {
     property1: {
       value: 42,
       writable: true,
     },
     property2: {
       value: 'Hello',
       writable: false,
     },
   });
   ```

4. **Object.getOwnPropertyDescriptor()** - 返回对象属性的描述符

   ```javascript
   const obj = {
     get foo() {
       return 17;
     },
   };
   console.log(Object.getOwnPropertyDescriptor(obj, 'foo'));
   // { configurable: true, enumerable: true, get: [Function: get foo], set: undefined }
   ```

5. **Object.getOwnPropertyNames()** - 返回对象的所有自有属性（包括不可枚举的）

   ```javascript
   const obj = { a: 1, b: 2 };
   Object.defineProperty(obj, 'c', { value: 3, enumerable: false });
   console.log(Object.getOwnPropertyNames(obj)); // ["a", "b", "c"]
   ```

6. **Object.getPrototypeOf()** - 返回对象的原型

   ```javascript
   const prototype = {};
   const obj = Object.create(prototype);
   console.log(Object.getPrototypeOf(obj) === prototype); // true
   ```

7. **Object.keys()** - 返回对象的可枚举属性数组

   ```javascript
   const obj = { a: 1, b: 2 };
   Object.defineProperty(obj, 'c', { value: 3, enumerable: false });
   console.log(Object.keys(obj)); // ["a", "b"]
   ```

8. **Object.preventExtensions()** - 防止向对象添加新属性

   ```javascript
   const obj = { a: 1 };
   Object.preventExtensions(obj);
   obj.b = 2; // 在严格模式下会抛出错误
   console.log(obj.b); // undefined
   ```

9. **Object.isExtensible()** - 判断对象是否可扩展

   ```javascript
   const obj = {};
   console.log(Object.isExtensible(obj)); // true
   Object.preventExtensions(obj);
   console.log(Object.isExtensible(obj)); // false
   ```

10. **Object.seal()** - 封闭对象（阻止添加/删除属性）

    ```javascript
    const obj = { a: 1 };
    Object.seal(obj);
    obj.b = 2; // 添加失败
    delete obj.a; // 删除失败
    obj.a = 3; // 修改成功
    console.log(obj); // { a: 3 }
    ```

11. **Object.isSealed()** - 判断对象是否被密封

    ```javascript
    const obj = {};
    console.log(Object.isSealed(obj)); // false
    Object.seal(obj);
    console.log(Object.isSealed(obj)); // true
    ```

12. **Object.freeze()** - 冻结对象（不能修改/添加/删除属性）

    ```javascript
    const obj = { a: 1 };
    Object.freeze(obj);
    obj.a = 2; // 修改失败
    obj.b = 2; // 添加失败
    console.log(obj); // { a: 1 }
    ```

13. **Object.isFrozen()** - 判断对象是否被冻结
    ```javascript
    const obj = {};
    console.log(Object.isFrozen(obj)); // false
    Object.freeze(obj);
    console.log(Object.isFrozen(obj)); // true
    ```

## 高频使用和高级特性分类表格

### 高频使用特性

| 特性                             | 描述                       | 示例                               |
| -------------------------------- | -------------------------- | ---------------------------------- |
| JSON 对象                        | 解析和序列化 JSON 数据     | `JSON.parse()`, `JSON.stringify()` |
| 数组方法（forEach, map, filter） | 简化数组操作的函数式方法   | `array.forEach()`, `array.map()`   |
| Object.keys()                    | 获取对象的可枚举属性       | `Object.keys(obj)`                 |
| 严格模式                         | 更安全的 JavaScript 代码   | `"use strict"`                     |
| Function.prototype.bind()        | 创建绑定特定 this 值的函数 | `func.bind(obj)`                   |

### 高级特性

| 特性                     | 描述                            | 示例                                       |
| ------------------------ | ------------------------------- | ------------------------------------------ |
| 属性描述符               | 精确控制对象属性行为            | `Object.defineProperty()`                  |
| 存取器属性               | 使用 getter/setter 控制属性访问 | `get prop()`, `set prop()`                 |
| Object.create()          | 基于原型创建对象                | `Object.create(proto)`                     |
| Object.freeze()/seal()   | 不可变对象和受限对象            | `Object.freeze(obj)`                       |
| Array.prototype.reduce() | 复杂的数组计算和转换            | `array.reduce((acc, cur) => acc + cur, 0)` |

## 浏览器支持情况

| 浏览器            | 完全支持版本                  |
| ----------------- | ----------------------------- |
| Chrome            | 19+                           |
| Firefox           | 21+                           |
| Safari            | 6+                            |
| Edge              | 12+                           |
| Internet Explorer | 9+ (部分支持), 10+ (完全支持) |
| Opera             | 12.10+                        |

## 与前代版本的演进关系

ES5 相较于 ES3（ECMAScript 第三版，1999 年）引入了许多重要改进：

1. 增加了严格模式，解决了语言中的一些缺陷
2. 引入了更多数组方法，促进了函数式编程风格
3. 增强了对象操作能力，提供了更精细的属性控制
4. 原生支持 JSON，简化了数据交换
5. 改进了错误处理和调试能力

ES5 成为了现代 JavaScript 开发的基础，解决了很多 ES3 中的问题，并为后续版本（如 ES6）中的更大改进铺平了道路。

## 实际应用示例

### 1. 使用 JSON 处理 API 数据

```javascript
// 从服务器获取数据并解析
fetch('https://api.example.com/data')
  .then((response) => response.text())
  .then((data) => {
    const parsedData = JSON.parse(data);
    // 处理数据
    console.log(parsedData);
  });

// 准备发送到服务器的数据
const user = {
  name: '张三',
  age: 30,
  interests: ['编程', '阅读'],
};

const jsonData = JSON.stringify(user);
// 发送到服务器
```

### 2. 使用数组方法进行数据处理

```javascript
const products = [
  { id: 1, name: '手机', price: 3999, category: '电子产品' },
  { id: 2, name: '书籍', price: 59, category: '文化用品' },
  { id: 3, name: '冰箱', price: 2599, category: '家电' },
  { id: 4, name: '键盘', price: 299, category: '电子产品' },
];

// 过滤电子产品
const electronics = products.filter((product) => product.category === '电子产品');

// 获取所有商品名称
const productNames = products.map((product) => product.name);

// 计算所有商品总价
const totalPrice = products.reduce((sum, product) => sum + product.price, 0);

console.log('电子产品:', electronics);
console.log('商品名称:', productNames);
console.log('总价:', totalPrice);
```

### 3. 使用 Object.create() 实现继承

```javascript
// 基础对象
const Vehicle = {
  type: '交通工具',
  displayType: function () {
    console.log(this.type);
  },
};

// 创建一个继承自 Vehicle 的对象
const car = Object.create(Vehicle);
car.type = '汽车';
car.brand = '比亚迪';
car.displayBrand = function () {
  console.log(this.brand);
};

car.displayType(); // 汽车
car.displayBrand(); // 比亚迪
```

### 4. 使用 defineProperty 创建可控属性

```javascript
function User(name, initialBalance) {
  let balance = initialBalance; // 私有变量

  this.name = name;

  // 定义余额属性，只能通过 deposit 和 withdraw 方法修改
  Object.defineProperty(this, 'balance', {
    get: function () {
      return balance;
    },
    enumerable: true,
  });

  this.deposit = function (amount) {
    if (amount > 0) {
      balance += amount;
      return true;
    }
    return false;
  };

  this.withdraw = function (amount) {
    if (amount > 0 && balance >= amount) {
      balance -= amount;
      return true;
    }
    return false;
  };
}

const user = new User('张三', 1000);
console.log(user.name, user.balance); // 张三 1000
user.deposit(500);
console.log(user.balance); // 1500
user.withdraw(200);
console.log(user.balance); // 1300
```

## 转译工具支持情况

ES5 现在被大多数现代浏览器原生支持，但对于需要支持旧版浏览器的情况，可以使用以下工具：

1. **Babel** - 可以将 ES6+ 代码转换为 ES5，但通常不需要将 ES5 进一步降级
2. **ES5-shim/ES5-sham** - 为不支持 ES5 的浏览器提供 polyfills
3. **es5-compat-table** - 提供各浏览器对 ES5 特性的支持情况
4. **Modernizr** - 可以检测浏览器是否支持特定的 ES5 特性

随着时间的推移，对 ES5 的转译需求已经大大减少，现在大多数转译工具主要关注将更新版本的 ECMAScript（ES6 及以上）转换为 ES5，因为 ES5 已经被视为基础标准。
