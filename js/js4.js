const iframe = document.querySelector('.iframeTwo');
iframe.onload = function () {
    console.log("iframe загрузился");
}
iframe.onerror = function () {
    console.log("Что-то пошло не так, давай, ищи ошибку!");
}
// var frameTwo = window.open("forthtaskDomeinTwo.html")
// const content = iframe.contentWindow.document
// const set = frameTwo.querySelector("#setForm")
document.querySelector("#setForm").querySelector("#btn_Set").addEventListener("click", (e) => {
    e.preventDefault()
    let key = document.querySelector("[name=keySet]").value
    let value = document.querySelector("[name=valueSet]").value
    if (key && value) {
        // localStorage.setItem(key, value)
        // console.log(`written data  key ${key} value ${value}`)
        iframe.contentWindow.postMessage({
            "method": "set",
            "key": key,
            "value": value
        }, "*")
        console.log(`written key ${key} value ${value}` )

    } else {
        console.log("Вы ввели не все данные ")
    }


})

document.querySelector("#getForm").querySelector("#btn_Get").addEventListener("click", (e) => {
    e.preventDefault()
    let key = document.querySelector("[name=keyGet]").value
    iframe.contentWindow.postMessage({
        "method": "get",
        "key": key,
    }, "*")
    window.onmessage = function (e) {
        e.data.value? console.log(`key ${key} value ${e.data.value}`): console.log("Ключ ${key} отсутсвтует в localStorage DomainTwo ")
    }
})

document.querySelector("#deleteForm").querySelector("#btn_Del").addEventListener("click", (e) => {
    e.preventDefault()
    let key = document.querySelector("[name=keyDel]").value
    iframe.contentWindow.postMessage({
        "method": "delete",
        "key": key,
    }, "*")
    window.onmessage = function (e) {
        e.data.value ? console.log(`removed key ${key} value ${e.data.value}`) : console.log("Ключ ${key} отсутсвтует в localStorage DomainTwo ")
    }
})
function messageProcessing(e) {
    const data = e.data
    function cb(e) {
        let  overlay = document.querySelector(".rezult-response")
        if(overlay) {
            overlay.innerHTML =""
        } else {
            overlay = document.createElement("div")
        }
        const text = document.createElement("p")
        text.innerHTML = `<span>Method: ${e.method}</span><span>Key: ${e.key}<span> <span>Value: ${e.value}</span>`
        overlay.appendChild(text)
        overlay.classList.add("rezult-response")
        document.body.appendChild(overlay)
    }
    if(data.value&&data.key) {
        cb(data)
    }
}
window.addEventListener("message", messageProcessing, false);
