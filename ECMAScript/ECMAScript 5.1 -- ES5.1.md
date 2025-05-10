# ECMAScript 5.1 (ES5.1) 新特性

ECMAScript 5.1 于 2011 年 6 月发布，是对 ECMAScript 5 的维护性更新，主要修正了 ES5 规范中的错误和不一致之处，完善了标准的实现细节。

## ES5.1 与 ES5 的主要区别

ES5.1 没有引入完全新的语言特性，而是对 ES5 进行了重要的澄清和修正：

1. **修复了规范中的技术错误和不一致性**
2. **统一了浏览器实现之间的差异**
3. **更好地对齐了规范与实际实现**
4. **改进了一些关键 API 的定义**
5. **JSON 规范正式整合，遵循 RFC 4627**

实质上，ES5.1 更像是 ES5 的一个"勘误表"，使规范更加明确，减少了浏览器实现上的分歧。

## 从 ES5 继承的主要特性

ES5.1 保留了 ES5 的所有特性。为了完整性，以下是 ES5/ES5.1 中的主要特性：

### 严格模式 (Strict Mode)

- 通过 `"use strict"` 声明开启更严格的错误检查和安全措施
- 消除语言设计中的一些不合理之处

```javascript
'use strict';
// 不允许使用未声明的变量
x = 3.14; // 错误：x 未定义
```

### JSON 支持

- 内置 JSON 对象，用于解析和序列化 JSON 数据
- ES5.1 进一步确保了 JSON 解析与 RFC 4627 的一致性

```javascript
const jsonStr = '{"name":"张三","age":30,"city":"北京"}';
const obj = JSON.parse(jsonStr);
console.log(obj.name); // 张三

const newJson = JSON.stringify({ name: '李四', age: 25 });
console.log(newJson); // {"name":"李四","age":25}
```

## 数组和对象操作相关的特性

ES5.1 保留并澄清了 ES5 引入的所有数组和对象操作方法。

### 数组方法

1. **Array.isArray()** - 可靠地检测数组类型

   ```javascript
   console.log(Array.isArray([])); // true
   console.log(Array.isArray({})); // false
   ```

2. **Array.prototype.forEach()** - 为数组每个元素执行函数

   ```javascript
   const colors = ['红', '绿', '蓝'];
   colors.forEach(function (color) {
     console.log(color); // 红, 绿, 蓝
   });
   ```

3. **Array.prototype.map()** - 映射数组元素并返回新数组

   ```javascript
   const numbers = [1, 4, 9];
   const roots = numbers.map(Math.sqrt);
   console.log(roots); // [1, 2, 3]
   ```

4. **Array.prototype.filter()** - 过滤数组元素

   ```javascript
   const numbers = [1, 2, 3, 4, 5, 6];
   const evenNumbers = numbers.filter(function (n) {
     return n % 2 === 0;
   });
   console.log(evenNumbers); // [2, 4, 6]
   ```

5. **Array.prototype.reduce()** - 累积计算

   ```javascript
   const numbers = [1, 2, 3, 4];
   const sum = numbers.reduce(function (prev, curr) {
     return prev + curr;
   }, 0);
   console.log(sum); // 10
   ```

6. **Array.prototype.every()** - 检查所有元素是否满足条件

   ```javascript
   const numbers = [1, 2, 3, 4, 5];
   const allPositive = numbers.every(function (x) {
     return x > 0;
   });
   console.log(allPositive); // true
   ```

7. **Array.prototype.some()** - 检查是否至少有一个元素满足条件

   ```javascript
   const numbers = [1, 2, 3, -4, 5];
   const hasNegative = numbers.some(function (x) {
     return x < 0;
   });
   console.log(hasNegative); // true
   ```

8. **Array.prototype.indexOf()** - 查找元素首次出现的索引

   ```javascript
   const fruits = ['苹果', '香蕉', '橙子', '苹果'];
   console.log(fruits.indexOf('香蕉')); // 1
   console.log(fruits.indexOf('梨')); // -1（不存在）
   ```

9. **Array.prototype.lastIndexOf()** - 查找元素最后出现的索引
   ```javascript
   const fruits = ['苹果', '香蕉', '橙子', '苹果'];
   console.log(fruits.lastIndexOf('苹果')); // 3
   ```

### 对象操作方法

1. **Object.create()** - 基于指定的原型创建新对象

   ```javascript
   const parent = {
     greet: function () {
       return '你好';
     },
   };

   const child = Object.create(parent);
   console.log(child.greet()); // "你好"
   ```

2. **Object.getPrototypeOf()** - 获取对象的原型

   ```javascript
   const proto = {};
   const obj = Object.create(proto);
   console.log(Object.getPrototypeOf(obj) === proto); // true
   ```

3. **Object.getOwnPropertyNames()** - 获取对象自身所有属性名

   ```javascript
   const obj = { a: 1, b: 2 };
   Object.defineProperty(obj, 'c', { value: 3, enumerable: false });
   console.log(Object.getOwnPropertyNames(obj)); // ["a", "b", "c"]
   ```

4. **Object.keys()** - 获取对象自身所有可枚举属性名

   ```javascript
   const obj = { a: 1, b: 2 };
   Object.defineProperty(obj, 'c', { value: 3, enumerable: false });
   console.log(Object.keys(obj)); // ["a", "b"]
   ```

5. **Object.defineProperty()** - 定义或修改对象的单个属性

   ```javascript
   const obj = {};
   Object.defineProperty(obj, 'name', {
     value: '张三',
     writable: false,
     configurable: true,
     enumerable: true,
   });
   obj.name = '李四'; // 在严格模式下会报错
   console.log(obj.name); // 仍然是"张三"
   ```

6. **Object.defineProperties()** - 同时定义或修改多个属性

   ```javascript
   const obj = {};
   Object.defineProperties(obj, {
     name: {
       value: '张三',
       writable: true,
     },
     age: {
       value: 30,
       writable: false,
     },
   });
   console.log(obj.name, obj.age); // 张三 30
   ```

7. **Object.getOwnPropertyDescriptor()** - 获取属性的描述符

   ```javascript
   const obj = { name: '张三' };
   const descriptor = Object.getOwnPropertyDescriptor(obj, 'name');
   console.log(descriptor);
   // {value: "张三", writable: true, enumerable: true, configurable: true}
   ```

8. **Object.preventExtensions()** - 阻止添加新属性

   ```javascript
   const obj = { x: 1 };
   Object.preventExtensions(obj);
   obj.y = 2; // 在严格模式下会报错
   console.log(obj.y); // undefined
   ```

9. **Object.isExtensible()** - 检查对象是否可扩展

   ```javascript
   const obj = {};
   console.log(Object.isExtensible(obj)); // true
   Object.preventExtensions(obj);
   console.log(Object.isExtensible(obj)); // false
   ```

10. **Object.seal()** - 封闭对象（防止添加/删除属性）

    ```javascript
    const obj = { x: 1 };
    Object.seal(obj);
    obj.y = 2; // 添加失败
    delete obj.x; // 删除失败
    obj.x = 3; // 修改成功
    console.log(obj); // {x: 3}
    ```

11. **Object.isSealed()** - 检查对象是否被封闭

    ```javascript
    const obj = {};
    console.log(Object.isSealed(obj)); // false
    Object.seal(obj);
    console.log(Object.isSealed(obj)); // true
    ```

12. **Object.freeze()** - 冻结对象（防止任何修改）

    ```javascript
    const obj = { x: 1 };
    Object.freeze(obj);
    obj.x = 2; // 修改失败
    obj.y = 2; // 添加失败
    console.log(obj); // {x: 1}
    ```

13. **Object.isFrozen()** - 检查对象是否被冻结
    ```javascript
    const obj = {};
    console.log(Object.isFrozen(obj)); // false
    Object.freeze(obj);
    console.log(Object.isFrozen(obj)); // true
    ```

## ES5.1 规范的主要改进

ES5.1 对规范文档本身进行了大量改进：

1. **更精确的行为定义**

   - 函数调用、属性访问和操作符的行为定义更加明确

2. **更一致的 API 文档**

   - 标准化了 API 描述的格式和风格
   - 澄清了一些方法的返回值和异常处理

3. **对象内部方法更清晰**

   - 详细说明了对象的内部方法和属性
   - 更明确地定义了对象属性访问器的行为

4. **JSON 解析行为标准化**
   - 确保 JSON.parse 和 JSON.stringify 的行为符合 RFC 4627

## 高频使用和高级特性分类表格

### 高频使用特性

| 特性           | 描述                      | 示例                                         |
| -------------- | ------------------------- | -------------------------------------------- |
| JSON 对象      | 解析和序列化 JSON         | `JSON.parse()`, `JSON.stringify()`           |
| 数组函数式方法 | 遍历、过滤和转换数组      | `forEach()`, `map()`, `filter()`             |
| 对象属性操作   | 精确控制对象属性          | `Object.defineProperty()`                    |
| 原型访问       | 获取和设置原型            | `Object.create()`, `Object.getPrototypeOf()` |
| 严格模式       | 更严格、安全的 JavaScript | `"use strict"`                               |

### 高级特性

| 特性           | 描述             | 示例                                                             |
| -------------- | ---------------- | ---------------------------------------------------------------- |
| 对象元数据操作 | 控制对象内部状态 | `Object.preventExtensions()`, `Object.seal()`, `Object.freeze()` |
| 属性描述符     | 精细控制属性特性 | `Object.defineProperties()`, `Object.getOwnPropertyDescriptor()` |
| 函数绑定       | 控制函数上下文   | `Function.prototype.bind()`                                      |
| 高阶数组操作   | 复杂的数组转换   | `reduce()`, `reduceRight()`                                      |
| 对象反射方法   | 获取对象内部信息 | `Object.keys()`, `Object.getOwnPropertyNames()`                  |

## 浏览器支持情况

ES5.1 发布后很快得到了各大浏览器的广泛支持：

| 浏览器            | 支持版本                      |
| ----------------- | ----------------------------- |
| Chrome            | 19+ (完全支持)                |
| Firefox           | 21+ (完全支持)                |
| Safari            | 6+                            |
| Edge              | 12+                           |
| Internet Explorer | 9+ (部分支持), 10+ (完全支持) |
| Opera             | 12.10+                        |

## 与前代版本的演进关系

ES5.1 是对 ES5 的维护性更新，同时是 ES3 到 ES6 过渡的重要一步：

1. **ES3 → ES5**：ES5 添加了新的语言特性和 API
2. **ES5 → ES5.1**：纠正和澄清，使规范更精确
3. **ES5.1 → ES6**：ES5.1 奠定了稳固基础，使 ES6 的大规模扩展成为可能

ES5.1 是现代 JavaScript 的基础，也是 ES6 (ES2015) 之前最完善的标准版本。

## 实际应用示例

### 1. 安全的对象属性访问

```javascript
function createPerson(name, age) {
  const person = {};

  Object.defineProperties(person, {
    name: {
      value: name,
      writable: true,
      enumerable: true,
    },
    age: {
      value: age,
      writable: true,
      enumerable: true,
    },
    adult: {
      get: function () {
        return this.age >= 18;
      },
      enumerable: true,
    },
  });

  return person;
}

const zhang = createPerson('张三', 20);
console.log(zhang.name); // 张三
console.log(zhang.adult); // true
```

### 2. 安全的数据处理管道

```javascript
function processDatabaseResults(data) {
  'use strict';

  // 过滤有效记录
  const validRecords = data.filter(function (record) {
    return record && record.id && record.value;
  });

  // 转换数据格式
  const processedData = validRecords.map(function (record) {
    return {
      id: record.id,
      normalizedValue: record.value.toFixed(2),
      timestamp: new Date().toISOString(),
    };
  });

  // 计算汇总统计
  const stats = {
    count: processedData.length,
    sum: processedData.reduce(function (sum, record) {
      return sum + parseFloat(record.normalizedValue);
    }, 0),
    ids: processedData.map(function (record) {
      return record.id;
    }),
  };

  return {
    records: processedData,
    stats: stats,
  };
}

// 模拟数据
const dbResults = [{ id: 1, value: 10.345 }, { id: 2, value: 23.7343 }, { id: 3, value: 5.12 }, null, { value: 7.2 }];

console.log(processDatabaseResults(dbResults));
```

### 3. 不可变配置对象

```javascript
const appConfig = Object.freeze({
  apiUrl: 'https://api.example.com',
  timeout: 3000,
  retryCount: 3,
  debug: {
    enabled: false,
    verboseLevel: 1,
  },
});

// 尝试修改被冻结的对象
try {
  appConfig.timeout = 5000; // 在严格模式下会抛出错误
} catch (e) {
  console.log('无法修改已冻结的配置');
}

// 注意：嵌套对象需要单独冻结
Object.freeze(appConfig.debug);

function initializeApp() {
  console.log('使用配置初始化应用:', appConfig.apiUrl);
  console.log('超时设置:', appConfig.timeout);
}

initializeApp();
```

### 4. 基于原型的继承模式

```javascript
'use strict';

// 基础构造函数
function Vehicle(type) {
  this.type = type;
  this.speed = 0;
}

// 原型方法
Vehicle.prototype.accelerate = function (amount) {
  this.speed += amount;
  console.log(this.type + ' 当前速度: ' + this.speed);
};

// 创建子类型
function Car(brand, model) {
  // 调用父构造函数
  Vehicle.call(this, 'car');
  this.brand = brand;
  this.model = model;
}

// 设置原型链
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

// 添加子类型特有方法
Car.prototype.honk = function () {
  console.log(this.brand + ' ' + this.model + ' 按喇叭: 嘟嘟!');
};

// 创建实例
const myCar = new Car('比亚迪', '汉');
myCar.accelerate(50); // car 当前速度: 50
myCar.honk(); // 比亚迪 汉 按喇叭: 嘟嘟!
```

## 转译工具支持情况

ES5.1 被所有现代浏览器原生支持，因此通常不需要转译。但对于需要支持非常旧的浏览器（如 IE8 及以下）的情况，可以使用以下工具：

1. **ES5-Shim** - 为旧浏览器提供 ES5 方法的 polyfill
2. **ES5-Sham** - 为不可能完全模拟的 ES5 功能提供部分支持
3. **Modernizr** - 检测浏览器对 ES5 特性的支持情况
4. **jQuery** - 在 1.x 版本中提供了许多与 ES5 兼容的辅助函数

随着时间推移，对 ES5.1 的转译需求已经大大减少。现代转译工具如 Babel 主要关注将 ES6+ 转换为 ES5，而不是将 ES5.1 转换为更早的版本，因为 ES5.1 已经成为基础标准。
