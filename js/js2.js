addEventListener("DOMContentLoaded", function(){
    'use strict';

    let url = (window.location.href);

    function getUrlVars() {

        let vars = {};
        let parts =  url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;

    }

    url = 'http://mysite.com/filter?size=M&color=1,2&manufacturer=aaa,eee';

    console.log(`Start Url: ${url}`);

    let size = getUrlVars()["size"];
    let color = getUrlVars()["color"];
    let manufacturer = getUrlVars()["manufacturer"];

    const form = document.forms.form

    form.elements.size.value = size;

    if (color){
        const colorArr = color.split(",");
        for (let i = 0 ; i<form.elements.color.length ; i++){
            for (let j=0; j<colorArr.length; j++){
                if (form.elements.color[i].value === colorArr[j])
                    form.elements.color[i].checked = 'true';
            }
        }
    }

    const manufacturerArr = manufacturer.split(",");


    let manufact = document.querySelector('#manufacturer');

    // let manuf = $('#manufacturer');
    // manuf.val(manufArr); //так быстрее сделал

    console.log(manufacturerArr);

    for (let i=0 ; i < manufact.length; i++) {
        for (let j=0; j<manufacturerArr.length; j++){
            if (manufact[i].value === manufacturerArr[j] )
                manufact[i].selected = 'true';
        }
    }


    document.getElementById('colors').addEventListener('input', createNewUrl);
    document.getElementById('sizes').addEventListener('input', createNewUrl);
    document.getElementById('manufacturer').addEventListener('input', createNewUrl);

    const urlObj = {};
    urlObj.first_part_url = `http://mysite.com/filter?`;
    urlObj.size_part_url = 'size=';
    urlObj.color_part_url = '&color=';
    urlObj.manufacturer_part_url = '&manufacturer=';


    function createNewUrl(){

        let let_size = form.elements.size.value;

        let s = '';

        for (let i = 0 ; i<form.elements.color.length ; i++){
            if (form.elements.color[i].checked)
                s += `${form.elements.color[i].value},`;
        }

        if (s.length > 1)
            s  = s.substring(0, s.length-1);

        let let_color = s;

        let result = '';

        for (let i=0 ; i < manufact.length; i++) {
            if (manufact[i].selected)
                result += `${manufact[i].value},`;
        }

        if (result.length > 1)
            result  = result.substring(0, result.length-1);

        let let_manuf = result;

        urlObj.size_part_url=`size=${let_size}`;
        urlObj.color_part_url=`&color=${let_color}`;
        urlObj.manufacturer_part_url=`&manufacturer=${let_manuf}`;
        urlObj.full_url = urlObj.first_part_url + urlObj.size_part_url + urlObj.color_part_url + urlObj.manufacturer_part_url;
        consoleLog(urlObj.full_url);
    }

    function consoleLog(url){
        console.log(url);
    }


});