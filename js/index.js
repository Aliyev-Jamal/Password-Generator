const config = {
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
}

const charSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-={}[]:;,.<>/?',
}

let elements = {
    lengthSlider: document.getElementById('length-bar'),
    lengthValue: document.querySelector('.length-value'),
    resultBox: document.querySelector('.result-box'),
    copyBtn: document.getElementById('copy-btn'),
    generateBth: document.getElementById('generate-bth'),
    strengthValue: document.getElementById('rate-info'),
    checkboxes: {
        uppercase: document.getElementById('uppercase'),
        lowercase: document.getElementById('lowercase'),
        numbers: document.getElementById('numbers'),
        symbols: document.getElementById('symbols'),
    }
}

function initEvent() {
    elements.lengthSlider.addEventListener('input', () => {
        const length = elements.lengthSlider.value
        config.length = length
        elements.lengthValue.textContent = length
        generatePassword()
    })

    Object.keys(elements.checkboxes).forEach(type => {
        elements.checkboxes[type].addEventListener('change', () => {
            config[type] = elements.checkboxes[type].checked;
            generatePassword()
        })
    })



    elements.generateBth.addEventListener('click', generatePassword)

    elements.copyBtn.addEventListener('click', copyPassword)
}


function generatePassword() {
    const atLeastOneSelected = Object.values(config).some(value => typeof value === 'boolean' && value === true)
    if (!atLeastOneSelected) {
        elements.resultBox.textContent = 'Select at least one setting!'
        updateStrength(0)
        return
    }

    let allChars = ''
    Object.keys(charSets).forEach(type => {
        if (config[type]) {
            allChars += charSets[type]
        }
    })

    let password = ''
    const length = config.length

    const selectedTypes = Object.keys(charSets).filter(type => config[type])

    selectedTypes.forEach(type => {
        const charSet = charSets[type]
        const randomChar = charSet.charAt(Math.floor(Math.random() * charSet.length))
        password += randomChar
    })

    for (let i = selectedTypes.length; i < config.length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length)
        password += allChars.charAt(randomIndex)
    }

    password = shufleString(password)

    elements.resultBox.textContent = password
    updateStrength(calculateStength())
}

function calculateStength(){
    const { length, uppercase, lowercase, numbers, symbols} = config
    let strength = Math.min(5, Math.floor(length / 6))

    let varietyScore = 0
    if(uppercase) varietyScore++
    if(lowercase) varietyScore++
    if(numbers) varietyScore++
    if(symbols) varietyScore++

    return Math.min(4, Math.floor((strength + varietyScore) / 2))
}

function updateStrength(strength){
    const strengthLables = ['very easy', 'easy', 'medium', 'hard', 'very hard']
    elements.strengthValue.textContent = strengthLables[strength]
    
    const colors = ['red', 'orange', 'yellow', 'greenyellow', 'lightgreen']
    elements.strengthValue.style.color = colors[strength]
}

function shufleString(str) {
    const array = str.split('')
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
            ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array.join('')
}

function copyPassword(){
    const password = elements.resultBox.textContent

    if(!password || password === 'Select at least one symbol!'){
        return
    }
    navigator.clipboard
        .writeText(password)
        .then(() => {
            const originalText = elements.copyBtn.innerHTML
            elements.copyBtn.querySelector('img').src = `./assets/check.svg`

            setTimeout(() => {
                elements.copyBtn.querySelector('img').src = `./assets/copy.png`
            }, 1500);

        })
}

function init() {
    initEvent()
    generatePassword()
}

document.addEventListener('DOMContentLoaded', init)