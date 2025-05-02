export const NodeChanges = (el, ElFun) => {
    const config = { attributes: true, childList: true, subtree: true };
    const ObserverCallback = ([mutations], observer) => {
        console.log(mutations)
        console.log('子节点变化');
        if (mutations.type === 'childList') {
            ElFun && ElFun();
            observer.disconnect()
        }
    }
    const Observer = new MutationObserver(ObserverCallback)
    Observer.observe(el, config)
}
