"use strict";
class Person {
    constructor() {
        this.name = 'YLM';
    }
    SayHello() {
        console.log('实例方法');
    }
    static sayHello() {
        console.log('静态方法');
    }
}
Person.age = 12;
const Per = new Person();
console.log('实例属性', Per.name);
console.log(Per.name);
console.log('静态属性', Person.age);
Per.SayHello();
Person.sayHello = function () {
    console.log("修改静态方法");
};
Person.sayHello();
