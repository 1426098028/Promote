"use strict";
(() => {
    class Person {
        constructor(name, age, gender) {
            this.name = name;
            this.age = age;
            this.gender = gender;
        }
        getAge() {
            return this.age;
        }
        setAge(age) {
            if (!this.checkAge(age))
                return console.log('年龄不合法');
            this.age = age;
            console.log(this.getAge());
        }
        get Age() {
            return this.age;
        }
        set Age(age) {
            console.log(this.checkAge(age));
            if (!this.checkAge(age)) {
                console.log('年龄不合法');
            }
            else {
                this.age = age;
                console.log(this.getAge());
            }
        }
        checkAge(age) {
            return age >= 0;
        }
    }
    const Per = new Person('YLM', 12, '男');
    console.log(Per.Age);
    Per.Age = 32;
    console.log(Per);
    class Son extends Person {
        get Gender() {
            return this.gender;
        }
        set Gender(gender) {
            this.gender = gender;
        }
    }
    const son = new Son('继承类', 1, '男');
    console.log(son.Gender);
    son.Gender = '女';
    console.log(son);
    class Abbreviation {
        constructor(name, age, gender) {
            this.name = name;
            this.age = age;
            this.gender = gender;
        }
    }
})();
