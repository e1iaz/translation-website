let languages = {
    'English': ['Chinese', 'French'],
    'Chinese': ['English', 'French'],
}

const AUTONYMS = {
    en: 'English',
    fr: 'français',
}

let COUNTRIES = {
    'English': ['United States', 'United Kingdom'],
    'Chinese': ['China'],
    'French': ['France'],
}

const base_url = "http://127.0.0.1:5000";


function doTranslate() {
    document.getElementById('progress').style.display = "block";
    document.getElementById('target_content').value = "";
    var accessCode = document.getElementById('accessCode').value;
    localStorage.setItem("accessCode", accessCode);
    fetch(base_url + '/api/translate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            from: document.getElementById('from').value,
            to: document.getElementById('to').value,
            source: document.getElementById('source_content').value,
            country: document.getElementById('country').value,
            accessCode: document.getElementById('accessCode').value,
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok: " + response.statusText);
        }
        return response.json();
    })
    .then(result => {
        document.getElementById('target_content').value = result.translation
        document.getElementById('progress').style.display = "none";
    })
    .catch(error=>{
        document.getElementById('progress').style.display = "none";
        alert("Translation failed. Please try again.");
    })
}

function fetchLanguages() {
    const select = document.getElementById('from');
    const accessCode = localStorage.getItem("accessCode");
    var codeInputElem = document.getElementById('accessCode');
    if (accessCode != null) {
        codeInputElem.value = accessCode;
    }
    codeInputElem.addEventListener('input', function(event) {
        var inputValue = event.target.value;
        localStorage.setItem("accessCode", inputValue);
    })
    select.innerHTML = '';
    const sourceLangs = Object.keys(languages);
    for (let i = 0; i < sourceLangs.length; i++) {
        let opt = document.createElement('option');
        opt.value = sourceLangs[i];
        opt.innerHTML = AUTONYMS[sourceLangs[i]] || sourceLangs[i];
        select.appendChild(opt);
        if (i === 0) {
            selectLanguage(sourceLangs[i])
        }
    }
}

function selectLanguage() {
    const sourceLang = document.getElementById('from').value;
    const select = document.getElementById('to')
    select.innerHTML = '';
    const targetLangs = languages[sourceLang];
    for (let i = 0; i < targetLangs.length; i++) {
        let opt = document.createElement('option');
        opt.value = targetLangs[i];
        opt.innerHTML = AUTONYMS[targetLangs[i]] || targetLangs[i];
        select.appendChild(opt);
        if (i === 0) {
            selectCountry(targetLangs[i])
        }
    }
}

function selectCountry() {
    const targetLang = document.getElementById('to').value;
    const select = document.getElementById('country')
    select.innerHTML = '';
    const countries = COUNTRIES[targetLang];

    if (countries != null) {
        for (let i = 0; i < countries.length; ++i) {
            let opt = document.createElement('option');
            opt.value = countries[i];
            opt.innerHTML = countries[i];
            select.appendChild(opt);
        }
    }
    let opt = document.createElement('option');
    opt.value = "NO_COUNTRY";
    opt.innerHTML = "NO_COUNTRY";
    select.appendChild(opt);
}

function doClear(){
    document.getElementById('progress').style.display = "none";
    document.getElementById('source_content').value = "";
    document.getElementById('target_content').value = "";
}
