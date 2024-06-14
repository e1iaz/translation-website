let languages = {
    'English': ['Chinese'],
    'Chinese': ['English']
}

const AUTONYMS = {
    en: 'English',
    fr: 'français',
}

const base_url = "http://127.0.0.1:5000";


function doTranslate() {
    document.getElementById('progress').style.display = "block";
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
            source: document.getElementById('source_content').value
        })
    }).then(response => response.json())
        .then(result => {
            document.getElementById('target_content').value = result.translation
            document.getElementById('progress').style.display = "none";
        })
}

function fetchLanguages() {
    const select = document.getElementById('from');
    const accessCode = localStorage.getItem("accessCode");
    if (accessCode != null) {
        let passwd = document.getElementById('accessCode');
        passwd.value = accessCode;
    }
    var codeInputElem = document.getElementById('accessCode');
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
    }
}
