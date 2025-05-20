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
    })

    Object.keys(elements.checkboxes).forEach(type => {
        elements.checkboxes[type].addEventListener('change', () => {
            config[type] = elements.checkboxes[type].checked;
            generatePassword()
        })
    })



    elements.generateBth.addEventListener('click', generatePassword)

    // elements.copyBtn.addEventListener('click' copyPassword)
}


function generatePassword() {
    const atLeastOneSelected = Object.values(config).some(value => typeof value === 'boolean' && value === true)
    if (!atLeastOneSelected) {
        elements.resultBox.textContent = 'Select at least one setting!'
        // updateStrength(0)
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
        password + randomChar
    })

    for (let i = selectedTypes.length; i < config.length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length)
        password += allChars.charAt(randomIndex)
    }

    password = shufleString(password)

    elements.resultBox.textContent = password
    // updateStrength(calculateStength())
}

function shufleString(str) {
    const array = str.split('')
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
            ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array.join('')
}

function init() {
    initEvent()
    generatePassword()
}

document.addEventListener('DOMContentLoaded', init)