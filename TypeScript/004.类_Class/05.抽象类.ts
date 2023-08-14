(() => {

    /**
     *   abstract  关键字   当使用了abstract关键字,当前类为抽象类,抽象类是专门用来被继承的类
     *     抽象类概念: 当使用了abstract关键字,当前类为抽象类,抽象类和其他类区别不大,但是不能用来创建实例对象(不可以使用 new),抽象类是专门用来被继承的类
     *              语法:   abstract class 类名
     * 
     *      抽象类中可以添加抽象方法
     */


    // 定义一个公共类 Animal
    abstract class Animal {
        name: string;
        constructor(name: string,) {
            this.name = name
        }
        /**
         * 抽象方法      必须在子类中进行方法重写
         *          概念:抽象方法只能是在抽象类中使用,方法是没有方法体,同时必须在子类中对抽象方法进行方法重写
         *          语法: abstract 方法名():类型 例子: abstract sayHello(): void
         * 
         * 
         */
        abstract sayHello(): void
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



        age: number
        // 当在子类使用了constructor构造函数时,必须在子类中对于父类的构造函数进行调用
        constructor(name: string, age: number) {
            // super(name);
            super(name)
            this.age = age
        }



        // 当在子类写添加了一个方法和父类方法同名时，则子类方法会覆盖父类方法，即是方法重写
        // sayHello方法重写
        sayHello() {

            /**
             *    super 关键字    只能在继承中使用
             *          在类的方法中,super关键字表示当前类的父类
             *          语法 :super.属性,super.方法  例子 super.sayHello()
             * 
             */


            console.log('汪汪汪',)
        }
    }


    class Cat extends Animal {
        sayHello(): void {
            console.log('对抽象方法进行方法重写')
        }
    }


    const dog = new Dog('super关键字', 1)
    const cat = new Cat('abstract关键字')

    dog.sayHello()
    cat.sayHello()
})()