console.log('原生卡顿')

const total = 100000
let li = ``
for (let i = 0; i < total; i++) {
    console.log(`<li>原生卡顿${i}</li>`)
    li += `<li>原生卡顿${i}</li>`
    li += `<li>原生卡顿${i}</li>`
    li += `<li>原生卡顿${i}</li>`
}
document.querySelector('ul').innerHTML = li