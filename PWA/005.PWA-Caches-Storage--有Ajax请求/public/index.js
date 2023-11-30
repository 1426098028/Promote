async function getData() {
    const res = await fetch('/api/NodeExpress')
    const json = await res.json()
    document.querySelector('#Caches').innerHTML = `<div>${JSON.stringify(json)}<div>`
}



function Sw() {
    window.addEventListener('load', () => {
        if (!'serviceWorker' in navigator) return false
        navigator.serviceWorker.register('./SW.js')
    })
}

getData()
Sw()