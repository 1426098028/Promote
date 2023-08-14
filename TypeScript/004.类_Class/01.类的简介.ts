// 使用class关键字定义一个类
/**
 *    Class(对象)中主要包含两个部分：
 *                           属性 :实例属性:定义是通过new出来的实例访问到的属性
 *                           属性 :静态属性:定义是通过static修饰的属性即静态属性
 *                           方法 :实例方法:定义是通过new出来的实例访问到的方法
 *                           方法 :静态方法:定义是通过static修饰的属性即静态方法
 *                           
 * 
 */
class Person {
    /**
     *  属性分为两种: 实例属性 静态属性
     *             实例属性 :直接定义属性是实例属性，需要通过new出来对象实例才能访问到的属性 例子 : const Per = new Person() Per.name
     *             静态属性 :在属性前面加上关键字static可以定义静态属性,可以直接访问类获取到属性  例子 : Person.age
     *  属性读写权限 默认可以读写
     *      只读 :readonly     使用:在属性前面加上readonly关键字即可
     *        
     */

    // 定义实例属性  通过new出来的实例访问到的属性
    // name = 'YLM'
    // readonly name: string = 'YLM'//只读
    name: string = 'YLM'//只读
    //  定义静态属性 在属性前面加上关键字static可以定义静态属性
    // static age = 12
    static age: number = 12

    /**
     *  方法分为两种: 实例方法 静态方法
     *             实例方法 :直接定义方法是实例方法，需要通过new出来对象实例才能调用方法 例子 : const Per = new Person() Per.SayHello()
     *             静态方法 :在方法前面加上关键字static可以定义静态方法,可以直接通过类调用方法  例子 : Person.SayHello()
     */

    SayHello() {
        console.log('实例方法')
    }
    static sayHello() {
        console.log('静态方法')
    }


}

const Per = new Person()
console.log('实例属性', Per.name)
// Per.name = 'ylm' // 加上关键字readonly,是只能读不可以修改,回有报错
console.log(Per.name)
console.log('静态属性', Person.age)


// Per.SayHello = function () {
//     console.log("修改实例方法")
// }
Per.SayHello()

Person.sayHello = function () {
    console.log("修改静态方法")
}
Person.sayHello()