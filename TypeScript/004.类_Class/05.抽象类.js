"use strict";
(() => {
    class Animal {
        constructor(name) {
            this.name = name;
        }
    }
    class Dog extends Animal {
        constructor(name, age) {
            super(name);
            this.age = age;
        }
        sayHello() {
            console.log('汪汪汪');
        }
    }
    class Cat extends Animal {
        sayHello() {
            console.log('对抽象方法进行方法重写');
        }
    }
    const dog = new Dog('super关键字', 1);
    const cat = new Cat('abstract关键字');
    dog.sayHello();
    cat.sayHello();
})();
