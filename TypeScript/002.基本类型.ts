// 声明一个变量。类型为数字 number
let a: number;
a = 1;
a = 22;
//  a ='只能是数字'    // 有报错   ， 变量a只能是数字类型
console.log(a)

let b: string
b = '只能是字符串类型'
console.log(b)

// 只能是布尔值
let c: boolean = true
console.log(c)

// 当变量声明和赋值是同时进行的，Ts可以自动对于变量类型检测
let d = true   // （理解成类型简写就好了）




// 只能是字面量
let e: 10
e = 10
console.log(e)


// 也可以使用|来来接多个类型值(联合类型)
let f: '字面量' | '或者这'
f = '字面量'
f = '或者这'
console.log(f)

// any 任意类型，没有限制(理解成对变量关闭了Ts类型检测),不推荐使用
let g: any
g = 12
g = '任意类型'
g = true
console.log(g)

// unknown 任意类型，一个安全的any，有一些限制(理解成对变量关闭了Ts类型检测),不推荐使用
let h: unknown
h = 123
h = '任意类型'
h = true
console.log(g)



// void 用来表示空 ，一般应用在函数上 ，表示函数没有任何返回
function fun(): void {

}

// never 用来表示永远不会返回结果
function funN(): never {
    throw new Error('用来表示永远不会返回结果')
}




// 类型断言

console.log('类型断言', h as unknown)
console.log('类型断言', <boolean>c)



// object 表示一个对象,没有限制的对象
let l: object
l = {}
l = function () { }

/**
 * {} 使用指定对象中可以包含哪些属性
 * 基础语法：{属性名:类型}(必填)
 * 属性名可选语法：{属性名?:类型}(选填)
 * 动态属性名语法：{[任意属性名:类型]:类型}(选填)
 */
let O: { name: string, age1?: number, [propName: string]: any }
O = { name: 'YLM', age1: 20, gender: '男' }
console.log(O)

/**
 *  设置函数结构是类型声明
 *  语法：(形参:类型,形参:类型,...)=>类型
 */

let funObj: (a: number, b: number) => number
funObj = function (fun1, fun2) { return fun1 + fun2 }
console.log(funObj(1, 2))


/**
 *   数组的类型声明
 *   语法一 类型[]
 *   语法二 Array<类型>
 */

let Arr1: string[]//只能是字符串
Arr1 = ['1', '2']
let Arr2: Array<number>// 只能是数字
Arr2 = [12, 1, 12]
console.log(Arr1, Arr2)

/**
 * tuple
 *    元组，固定长度数组
 * 
 *       语法:[类型，类型]
 * 
 */

let Arrlen: [string, number]
Arrlen = ['固定长度', 2]
console.log(Arrlen)


/**
 *    enum
 * 
 *    枚举
 * 
 */
enum Gender {
    Male = 0,
    Female = 1
}


let EnumObj: { name: string, gender: Gender }
EnumObj = { name: 'YLM', gender: Gender.Female }
console.log(EnumObj)


// 类型的别名
type numType = 1 | 2 | 3 | 4
let n: numType
let M: numType
n = 1
M = 4
console.log(1, 4)

// 方法应用
// 函数中的参数类型是数字             函数的返回类型也要是数字类型，实例  sum(参数):number
function sum(a: number, b: number): number { return a + b }
console.log(sum(123, 456)) 