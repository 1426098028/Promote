const bufferSize = 5   // 缓冲值
const ItemHeight = 50    // 列表中的每一项高是50px     固定高度虚拟列表
const Contain = document.querySelector('.contain');
const ContainArea = document.querySelector('.contain-area');
const List = document.querySelector('.list');
const LsitData = new Array(10003).fill(null).map((_, index) => `内容:${index + 1}`) // 总条数
function createEl(El) {
    const Fragment = document.createDocumentFragment()
    for (let index = 0; index < El.length; index++) {
        const div = document.createElement('div')
        div.innerText = El[index]
        div.style.lineHeight = `${ItemHeight}px`
        div.style.height = `${ItemHeight}px`
        div.className = 'list-item'
        Fragment.appendChild(div)
    }
    List.innerHTML = ''
    List.appendChild(Fragment)
}
window.addEventListener('load', () => {
    ContainArea.style.height = `${LsitData.length * ItemHeight}px`
    const ContainHeight = Contain.clientHeight
    const VisibleItem = Math.ceil(ContainHeight / ItemHeight) + bufferSize
    onScroll({ target: { scrollTop: Contain.scrollTop } })
    Contain.addEventListener('scroll', onScroll)
    function onScroll({ target: { scrollTop } }) {
        const startIndex = Math.floor(scrollTop / ItemHeight)
        const endIndex = Math.ceil(startIndex + VisibleItem)
        const VisibleData = LsitData.slice(startIndex, endIndex)
        const startOffset = startIndex * ItemHeight
        List.setAttribute('style', `transform:translateY(${startOffset}px)`)
        createEl(VisibleData)
    }
})