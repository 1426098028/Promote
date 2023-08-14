"use strict";
let a;
a = 1;
a = 22;
console.log(a);
let b;
b = '只能是字符串类型';
console.log(b);
let c = true;
console.log(c);
let d = true;
let e;
e = 10;
console.log(e);
let f;
f = '字面量';
f = '或者这';
console.log(f);
let g;
g = 12;
g = '任意类型';
g = true;
console.log(g);
let h;
h = 123;
h = '任意类型';
h = true;
console.log(g);
function fun() {
}
function funN() {
    throw new Error('用来表示永远不会返回结果');
}
console.log('类型断言', h);
console.log('类型断言', c);
let l;
l = {};
l = function () { };
let O;
O = { name: 'YLM', age1: 20, gender: '男' };
console.log(O);
let funObj;
funObj = function (fun1, fun2) { return fun1 + fun2; };
console.log(funObj(1, 2));
let Arr1;
Arr1 = ['1', '2'];
let Arr2;
Arr2 = [12, 1, 12];
console.log(Arr1, Arr2);
let Arrlen;
Arrlen = ['固定长度', 2];
console.log(Arrlen);
var Gender;
(function (Gender) {
    Gender[Gender["Male"] = 0] = "Male";
    Gender[Gender["Female"] = 1] = "Female";
})(Gender || (Gender = {}));
let EnumObj;
EnumObj = { name: 'YLM', gender: Gender.Female };
console.log(EnumObj);
let n;
let M;
n = 1;
M = 4;
console.log(1, 4);
function sum(a, b) { return a + b; }
console.log(sum(123, 456));
