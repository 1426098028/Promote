window.addEventListener('load', function () {
    console.log('利用requestAnimationFrame')

    // innerHTML   比appendChild性能更好


    // 方法一    可以不推荐
    // MethodOne()
    function MethodOne() {
        const total = 10000000000  // 总数据
        // 每次添加条数
        const once = 10
        // 需要添加次数
        const loopCount = Math.ceil(total / once)
        // 需要添加次数
        let CountRender = 0
        function add() {
            CountRender++
            let li = ``
            for (let i = 0; i < once; i++) {
                li += `<li>方法三利用requestAnimationFrame${i}</li>`
            }
            document.querySelector('ul').innerHTML += li;
            funAnimation()
        }
        function funAnimation() {
            console.log(loopCount, CountRender)
            CountRender < loopCount && window.requestAnimationFrame(add)
        }
        funAnimation()
    }


    // 方法二    可以不推荐
    // MethodTwo()
    function MethodTwo() {
        const total = 10000000000  // 总数据
        // 每次添加条数
        const once = 10000
        // 需要添加次数
        const loopCount = Math.ceil(total / once)
        // 需要添加次数
        let CountRender = 0
        function add() {
            CountRender++
            for (let i = 0; i < once; i++) {
                let li = document.createElement("li");
                li.textContent = `方法二利用requestAnimationFrame${i}`;
                document.querySelector('ul').appendChild(li);
            }
            funAnimation()
        }

        function funAnimation() {
            console.log(loopCount, CountRender)
            CountRender < loopCount && window.requestAnimationFrame(add)
        }
        funAnimation()
    }



    // 最总    推荐
    Ultimately()
    function Ultimately() {
        const ul = document.querySelector('ul')
        const total = 10000000000  // 总数据
        // 每次添加条数
        const once = 1000
        // 需要添加次数
        const loopCount = Math.ceil(total / once)
        // 需要添加次数
        let CountRender = 0
        function add() {
            // 创建虚拟节点
            const Fragment = document.createDocumentFragment()
            for (let i = 0; i < once; i++) {
                let li = document.createElement("li");
                li.textContent = `方法三利用requestAnimationFrame${i}`;
                Fragment.appendChild(li);
            }
            ul.appendChild(Fragment)
            CountRender++
            funAnimation()
        }
        function funAnimation() {
            CountRender < loopCount && requestAnimationFrame(add)
        }
        funAnimation()
    }


})