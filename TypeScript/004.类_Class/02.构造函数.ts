(() => {
    // 构造函数判断 当class中使用了constructor关键字，则为构造函数
    class Dog {
        name: string;
        age: number;

        /**
         *       constructor关键字 被称为构造函数
         * 
         *                   构造函数会在对象创建时进行调用
         * 
         */

        constructor(name: string, age: number) {
            /**
             *    this 在实例中，this就表示当前的实例
             * 
             *          在构造函数中当前对象就是新建的对象
             *          可以通过this向对象中添加属性
             */
            // console.log('constructor构造函数执行了', this)
            this.name = name
            this.age = age
        }
        bark() {
            // 在方法中可以通过this来表示当前调用方法的对象
            console.log('汪汪汪', this)
        }
    }



    const dog = new Dog('小黑', 1)
    const dog1 = new Dog('小白', 2)
    dog.bark()
    dog1.bark()

})()