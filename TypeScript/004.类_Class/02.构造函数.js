"use strict";
(() => {
    class Dog {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }
        bark() {
            console.log('汪汪汪', this);
        }
    }
    const dog = new Dog('小黑', 1);
    const dog1 = new Dog('小白', 2);
    dog.bark();
    dog1.bark();
})();
