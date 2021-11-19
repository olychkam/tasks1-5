
const firstRequest  = new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open("GET", 'https://jsonplaceholder.typicode.com/posts/1', true)
    xhr.onload = () => resolve(xhr.responseText)
    xhr.onerror = () => reject(xhr.statusText)
    xhr.send()
})
const secondRequest = new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open("PUT", 'https://jsonplaceholder.typicode.com/posts/2', true)
    xhr.onload = () => resolve(xhr.responseText)
    xhr.onerror = () => reject(xhr.statusText)
    xhr.send()
})
const rez = Promise.all([firstRequest,secondRequest]).then(it=>{
    console.log("оба ответа получены.")
    return it
})