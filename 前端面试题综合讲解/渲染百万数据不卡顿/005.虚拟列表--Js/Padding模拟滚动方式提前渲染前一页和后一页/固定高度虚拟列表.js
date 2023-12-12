const bufferSize = 5   // 缓冲值
const ItemHeight = 50    // 列表中的每一项高是50px
const ListContainer = document.querySelector('.list-container');
const ListContainerInner = document.querySelector('.list-container-inner');
// const Lsit = new Array(10003).fill(null).map((_, index) => `内容:${index + 1}`) // 总条数
const Lsit = new Array(1003).fill(null).map((_, index) => `内容:${index}`) // 总条数
const PreLoadNum = 3; // 同时展示载页数
let CachePageLoad = []  // 缓存已经展示的页面





function createEl(EL, page) {
    const Fragment = document.createDocumentFragment()
    const pageTop = document.createElement('div')
    pageTop.className = `Page_${page}`
    for (let index = 0; index < EL.length; index++) {
        const div = document.createElement('div')
        div.className = 'List_Item'
        div.style.height = ItemHeight + 'px'
        div.style.lineHeight = ItemHeight + 'px'
        div.innerText = EL[index]
        pageTop.appendChild(div)
    }
    Fragment.appendChild(pageTop)

    ListContainerInner.appendChild(Fragment)
    CachePageLoad.push(Fragment)
}
window.addEventListener('load', () => {
    let page = 1;
    const ListContainerHeight = ListContainer.clientHeight
    const VisibleItem = Math.ceil(ListContainerHeight / ItemHeight) + bufferSize
    const startIndex = Math.floor(ListContainer.scrollTop / ItemHeight)
    const endIndex = Math.ceil(startIndex + VisibleItem)
    const VisibleData = Lsit.slice(startIndex, endIndex)
    createEl(Lsit, page)


    // const startOffset = startIndex * ItemHeight
    // const endOffset = (Lsit.length - endIndex) * ItemHeight



    let startOffset = VisibleItem * ItemHeight * (page - 1)
    // let endOffset = VisibleItem * ItemHeight * (page + 1)
    let endOffset = 0
    ListContainerInner.setAttribute('style', `padding:${startOffset}px 0 ${endOffset}px 0`)



    ListContainer.addEventListener('scroll', ({ target: { scrollTop } }) => {
        if (scrollTop >= startOffset) {

        }
    })
})