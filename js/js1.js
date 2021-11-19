const inputText = document.querySelector ("#inp_text");
const currentValue = 'Hello!';

inputText.addEventListener ("input", function () {
    if (inputText.value !== currentValue)
        inputText.className = "red";
    else if (inputText.value === currentValue)
        inputText.className = "";
})
