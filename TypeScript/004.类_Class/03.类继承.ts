(() => {
    // 定义一个公共类 Animal
    class Animal {
        name: string;
        age: number;
        constructor(name: string, age: number) {
            this.name = name
            this.age = age
        }
        sayHello() {
            console.log('在叫')
        }
    }

    /**
     *      类继承 (使用关键字extends)
     *      概念: 继承成功后子类将会有父类所有属性和方法，通过继承可以将多个类中相同的代码写到一个父类中，这样只需要一次代码让所有子类同时有相同的方法和属性，如果想在子类中添加一些父类没有的方法或者属性，可以直接在子类上添加即可
     *      语法 : 子类名 extends 父类名  例子   class Dog extends Animal {}
     *              
     *      方法重写
     *          当在子类写添加了一个方法和父类方法同名时，则子类方法会覆盖父类方法，子类方法覆盖父类方法,即称为方法重写
     * 
     * 
     */

    // 定义一个表示狗的类   
    // 使Dog类继承Animal类
    class Dog extends Animal {
        run() {
            console.log('我在子类中添加了一个方法run,用于获取属性name', this.name)
        }
        // 当在子类写添加了一个方法和父类方法同名时，则子类方法会覆盖父类方法，即是方法重写
        // sayHello方法重写
        sayHello() {
            console.log('汪汪汪')
        }
    }

    // 定义一个表示猫的类
    // 使猫继承Animal类
    class Cat extends Animal {
        sayHello() {
            console.log('喵喵喵')
        }
    }



    const dog = new Dog('旺财', 1)
    const cat = new Cat('咪咪', 2)
    // console.log(dog)
    dog.run()
    dog.sayHello()
    cat.sayHello()
    // console.log(cat)

})()