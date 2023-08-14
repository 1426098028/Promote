"use strict";
(() => {
    class Animal {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }
        sayHello() {
            console.log('在叫');
        }
    }
    class Dog extends Animal {
        run() {
            console.log('我在子类中添加了一个方法run,用于获取属性name', this.name);
        }
        sayHello() {
            console.log('汪汪汪');
        }
    }
    class Cat extends Animal {
        sayHello() {
            console.log('喵喵喵');
        }
    }
    const dog = new Dog('旺财', 1);
    const cat = new Cat('咪咪', 2);
    dog.run();
    dog.sayHello();
    cat.sayHello();
})();
