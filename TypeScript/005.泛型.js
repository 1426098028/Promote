"use strict";
(() => {
    function fu(a) {
        return a;
    }
    let res = fu(12);
    let res1 = fu('YLM');
    console.log("不指定泛型，Ts可以自动对类型判断，推出准确的类型", res);
    console.log('指定泛型为字符串', res1);
    function fun(a, b) {
        return a;
    }
    fun(123, "YLM");
    function fun1(I) {
        return I.lingth;
    }
    console.log(fun1({ lingth: 123 }));
    class MyClass {
        constructor(name) {
            this.name = name;
        }
    }
    const My = new MyClass('YLM');
    console.log('类使用泛型', My.name);
})();
