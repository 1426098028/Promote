(() => {
    class Person {

        /**
         * 剩余关键字
         * 
         *      public:公共属性  关键字表示属性可以任意修改访问(包括子类)   默认值
         * 
         * 
         *      private:私有属性 关键字表示属性只能在类类里面进行修改访问   
         *              属性修改:通过在类中添加方法使的属性可以被外部访问和修改
         *                      访问只能在当前的类访问,不能在子类访问
         * 
         *      protected:受包含属性,只能在当前类和当前子类(类继承)中访问修改
         */
        public name: string
        private age: number
        protected gender: string
        constructor(name: string, age: number, gender: string) {
            this.name = name
            this.age = age
            this.gender = gender
        }
        // js方式 属性:获取或修改    开始

        // 属性获取
        getAge(): number {
            return this.age
        }
        // 属性修改
        setAge(age: number) {
            if (!this.checkAge(age)) return console.log('年龄不合法')
            this.age = age
            console.log(this.getAge())
        }

        // 结束





        // Ts方式 属性:获取或修改    开始

        get Age(): number {
            return this.age
        }
        set Age(age: number) {
            console.log(this.checkAge(age))
            if (!this.checkAge(age)) { console.log('年龄不合法') } else {
                this.age = age
                console.log(this.getAge())
            }
        }
        // 结束

















        // 检查年龄是否合法
        checkAge(age: number): boolean {
            return age >= 0
        }
    }
    const Per = new Person('YLM', 12, '男')

    /**
     * 现在类属性可以在对象中设置,可以任意修改
     *       属性可以任意修改是会导致数据变的不安全
     */
    // js方式 调用  开始
    // console.log(Per.getAge())
    // Per.setAge(22)
    // 结束





    // Ts方式 属性:获取或修改    开始

    console.log(Per.Age)
    Per.Age = 32
    // 结束



    console.log(Per)



    class Son extends Person {
        get Gender(): string {
            return this.gender
        }
        set Gender(gender) {
            this.gender = gender
        }
    }

    const son = new Son('继承类', 1, '男')


    console.log(son.Gender)
    son.Gender = '女'
    console.log(son)






    // 类属性简写 
    class Abbreviation {
        // 可以直接把属性定义在构造函数中
        constructor(public name: string, private age: number, protected gender: string) {

        }
    }



})()