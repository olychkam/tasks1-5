

function messageProcessing(e) {

    const  data = e.data
    if (data.method === "set") {
        localStorage.setItem(data.key, data.value)
        window.top.postMessage({
            "method": data.method,
            "value": data.value,
            "key": data.key,
        }, "*")

    } else if (data.method === "get") {
        const value = localStorage.getItem(data.key)
        window.top.postMessage({
            "method":"get",
            "value": value,
            "key":data.key,
        }, "*")


    } else if (data.method === "delete") {
        const value = localStorage.getItem(data.key)
        window.top.postMessage({
            "method": "delete",
            "value": value,
            "key":data.key
        }, "*")
        localStorage.removeItem(data.key)
    }
}
window.addEventListener("message", messageProcessing, false);