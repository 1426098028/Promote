const bufferSize = 5   // 缓冲值
const ItemHeight = 50    // 列表中的每一项高是50px
const ListContainer = document.querySelector('.list-container');
const ListContainerInner = document.querySelector('.list-container-inner');
const Lsit = new Array(10003).fill(null).map((_, index) => `内容:${index + 1}`) // 总条数
// 生成列表标签
function createEl(EL = 10) {
    const Fragment = document.createDocumentFragment()
    for (let index = 0; index < EL.length; index++) {
        const div = document.createElement('div')
        div.className = 'List_Item'
        div.style.height = `${ItemHeight}px`
        div.innerText = EL[index]
        Fragment.appendChild(div)
    }
    ListContainerInner.innerHTML = '' // 避免生成过多标签，造成卡顿
    ListContainerInner.appendChild(Fragment)
}
window.addEventListener('load', () => {

    // 滚动高度 500   // 可见高度
    const SumListContainer = ListContainer.clientHeight

    // 可见条数 向上取正 9
    const VisibleItem = Math.ceil(SumListContainer / ItemHeight) + bufferSize

    onScroll({ target: { scrollTop: ListContainer.scrollTop } })

    // 处理滚动事件
    ListContainer.addEventListener('scroll', onScroll)

    // 生成滚动数据
    function onScroll({ target: { scrollTop } }) {

        // 求出在可见高度中第一个项目(ItemHeight)的滚动偏移位置(相当于滚动标签的高度来说) 需要向下取整
        let startIndex = Math.floor(scrollTop / ItemHeight)

        // 求出在可见高度中最后个项目(ItemHeight)的滚动偏移位置(相当于滚动标签的高度来说) 需要向上取整
        let endIndex = Math.ceil(startIndex + VisibleItem)

        // 利用求出的startIndex和endIndex值取截取需要的渲染的条数
        let VisibleData = Lsit.slice(startIndex, endIndex)

        createEl(VisibleData) // 渲染的条数

        // 求出startInde在上下滚动偏移量
        let startOffset = startIndex * ItemHeight

        // 求出endIndex在上下滚动偏移量
        let endOffset = (Lsit.length - endIndex) * ItemHeight

        // 添加已经删除的ItemHeight总高度 模拟滚动
        ListContainerInner.setAttribute('style', `padding-top: ${startOffset}px; padding-bottom: ${endOffset}px`)
    }
})

