console.log('利用Worker')

// const total = 100000
const total = 1000
let li = ``
for (let i = 0; i < total; i++) {
    // console.log(`<li>利用Worker${i}</li>`)
    li += `<li>利用Worker${i}</li>`
}




self.postMessage(li)
