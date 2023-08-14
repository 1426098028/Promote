"use strict";
(() => {
    class Animal {
        constructor(name) {
            this.name = name;
        }
        sayHello() {
            console.log('super关键字');
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
    const dog = new Dog('super关键字', 1);
    dog.sayHello();
})();
