function createItem(page = 1, size = 10) {
    const fragment = document.createDocumentFragment()
    const box = document.createElement("div");
    box.className = `page_${page}`;
    for (let i = 0; i < size; i++) {
        const element = document.createElement("div");

        element.style.width = "100%";
        element.style.height = "50px";
        element.style.color = "#fff";
        element.className = `item_${page * (i + 1)}`;
        element.innerText = `我是item——${((page - 1) * size) + i + 1}`;
        box.appendChild(element);
    }

    fragment.appendChild(box);
    console.log(fragment, box)

    return { fragment, box };
}


GenerateVirtualList()
function GenerateVirtualList() {
    let startIndex = 0;
    let page = 1;
    let size = 20;
    let height = 50;
    let preLoadNum = 3; // 同时展示载页数
    const box = document.querySelector("#box");
    const boxContainer = document.querySelector("#box_container");
    let listArr = [];// 用于存放列表数据

    const { fragment, box: boxList } = createItem(page, size)

    listArr.push(boxList);
    boxContainer.appendChild(fragment);

    let boxHeight = 500;
    let paddingTop = ((page - 1) * boxHeight);
    let paddingBottom = 50;
    let nextHeight = paddingTop + boxHeight + paddingBottom;

    boxContainer.style.paddingBottom = `${paddingBottom}px`;
    boxContainer.style.paddingTop = `${paddingTop}px`;

    box.addEventListener("scroll", (e) => {
        const scrollTop = e.target.scrollTop
        if (scrollTop >= nextHeight) {
            page++;
            paddingTop = (page - preLoadNum) * (size * height) + paddingBottom;
            nextHeight = (page - 1) * (size * height) + paddingBottom + boxHeight;
            let fragment;
            if (!listArr[page - 1]) {
                const { fragment: element, box: boxList } = createItem(page, size)
                fragment = element;
                listArr.push(boxList);
            } else {
                fragment = listArr[page - 1]
            }
            boxContainer.appendChild(fragment);
            const hideElem = document.querySelector(`.page_${page - preLoadNum}`);
            if (hideElem) {
                boxContainer.removeChild(hideElem);
                boxContainer.style.paddingTop = `${paddingTop}px`;
            }
        } else if (scrollTop <= (page - preLoadNum + 1) * size * height + paddingBottom && page > preLoadNum) {
            page--;
            paddingTop = (page - preLoadNum) * (size * height) + paddingBottom;
            nextHeight = (page - 1) * (size * height) + paddingBottom + boxHeight;
            const fragment = listArr[page - preLoadNum];
            boxContainer.insertBefore(fragment, boxContainer.childNodes[0]);
            const hideElem = document.querySelector(`.page_${page + 1}`);
            if (hideElem) {
                boxContainer.removeChild(hideElem);
                boxContainer.style.paddingTop = `${paddingTop}px`;
            }
        }
    }, false);
}