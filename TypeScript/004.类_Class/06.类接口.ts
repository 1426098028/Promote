// 类接口和抽象类,很像
(() => {
    // 创建一个对象类的别名
    type myType = {
        name: string,
        age: number,
    }
    const Obj: myType = {
        name: 'YLM',
        age: 11
    }


    /**
     * 
     * 接口
     * 
     * 概念:接口是用来定义一个类中应该包含哪些属性和方法,同时接口也可以当成类型声明去使用
     * 特点:
     *          可以重复声明,当接口名一样时会进行合并
     *          接口可以在定义类的时候去限制类的结构
     *          接口中的所有的属性都不能有实际的值,方法没有方法体的,并且所有的方法都是抽象方法
     *          是接口只定义对象的结构,不考虑实际的值
     * 
     * 使用接口定义一个类的结构
     * 语法: interface 名字
     * 
     * 
     */
    interface MyInterface {
        name: string,
        age: number,
    }
    interface MyInterface {
        gender: string,
    }
    const ObjInterface: MyInterface = {
        name: 'YLM',
        age: 11,
        gender: '男'
    }
    /**
     * 接口可以在定义类的时候去限制类的结构
     * 
     */
    interface ClassInterface {
        name: string,
        sayHaello(): void
    }

    /**
     * implements 关键字
     * 使用implements关键字定义类,可以实现一个接口
     *      实现的类是满足接口的要求
     * 
     */

    class MyClass implements ClassInterface {
        name: string
        constructor(name: string) {
            this.name = name
        }
        sayHaello(): void {
            console.log('实现的类是满足接口的要求')
        }
    }
    const myClass = new MyClass('YLM')
    myClass.sayHaello()
})()