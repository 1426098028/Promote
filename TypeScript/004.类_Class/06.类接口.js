"use strict";
(() => {
    const Obj = {
        name: 'YLM',
        age: 11
    };
    const ObjInterface = {
        name: 'YLM',
        age: 11,
        gender: '男'
    };
    class MyClass {
        constructor(name) {
            this.name = name;
        }
        sayHaello() {
            console.log('实现的类是满足接口的要求');
        }
    }
    const myClass = new MyClass('YLM');
    myClass.sayHaello();
})();
