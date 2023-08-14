(() => {
    /**
 *    泛型应用场景
 *     
 *    在定义函数或是类Calss时，遇到类型不确定时，就可以使用泛型
 *         泛型可以同时指定多个 例子看32行
 *         任意字符 extends 接口名 表示泛型 ”任意字符“ 必须是 interface 实现类或者是子类
 *    
 *    基础语法: <任意字符> 例子 function fn<T>(a:T):T{return a}
 *    限制语法(继承接口): <任意字符 extends 接口名> 例子  interface Inter {length：number}      function fn<T extends Inter>(I:T):T{return I.length}
 * 
 * 
 */

    function fu<T>(a: T): T {
        return a
    }


    // 可以直接调用具有泛型的函数
    let res = fu(12) // 不指定泛型，Ts可以自动对类型判断，推出准确的类型
    let res1 = fu<string>('YLM') // 指定泛型为字符串


    console.log("不指定泛型，Ts可以自动对类型判断，推出准确的类型", res)
    console.log('指定泛型为字符串', res1)




    // 泛型可以同时指定多个
    function fun<T, K>(a: T, b: K): T {
        return a
    }
    fun(123, "YLM")

    // 定义一个接口
    interface Inter {
        lingth: number
    }

    function fun1<T extends Inter>(I: T): number {
        return I.lingth
    }
    console.log(fun1({ lingth: 123 }))


    // 类使用泛型
    class MyClass<T>{
        name: T
        constructor(name: T) {
            this.name = name
        }
    }
    const My = new MyClass('YLM')
    console.log('类使用泛型', My.name)
})()