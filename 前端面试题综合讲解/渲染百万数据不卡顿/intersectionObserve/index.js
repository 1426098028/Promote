
const container = document.getElementById('container');
const Arr = new Array(100)
const T = 100
let loopCount = 0

const CountRender = Arr.length / T
function creatEl() {
    const Fragment = document.createDocumentFragment()
    for (let index = 0; index < T; index++) {
        const div = document.createElement('div')
        div.className = 'item'
        div.innerText = loopCount + index
        div.style.height = `${(Math.random() * 30) + 50}px`
        Observer.observe(div)
        Fragment.appendChild(div)
    }
    container.appendChild(Fragment)
    Animation()
    loopCount++
}
const Observer = new IntersectionObserver(Intersection)
function Intersection(entries, observer) {
    for (let index = 0; index < entries.length; index++) {
        const { isIntersecting, target } = entries[index]
        isIntersecting && observer.unobserve(target);
    }
}
Animation()
function Animation() {
    CountRender > loopCount && requestAnimationFrame(creatEl)
}
