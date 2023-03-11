"use strict"
const genderSelect = document.getElementById("gender")
const ttsTogle = document.getElementById("tts")
const dbVersion = 1
const dbName = "mydb"
const genderStoreName = "gender"
const ttsStoreName = "tts"

// Create a database and set up object stores
const request = indexedDB.open(dbName, dbVersion)
request.onupgradeneeded = function (event) {
    const db = event.target.result
    db.createObjectStore(genderStoreName)
    db.createObjectStore(ttsStoreName)
}

// Set the gender value in the indexedDB database
async function setGender() {
    const gender = genderSelect.value
    const db = await openDatabase()
    const transaction = db.transaction(genderStoreName, "readwrite")
    transaction.objectStore(genderStoreName).put(gender, "gender")
}

// Retrieve the gender value from the indexedDB database
async function retrieveGender() {
    let genderValue = undefined
    const db = await openDatabase()
    const transaction = db.transaction(genderStoreName, "readonly")
    const getRequest = transaction.objectStore(genderStoreName).get("gender")
    return new Promise((resolve, reject) => {
        getRequest.onsuccess = function (event) {
            const genderValue = event.target.result
            resolve(genderValue)
        }
        getRequest.onerror = function (event) {
            reject(event.target.error)
        }
    })
}

// Set the gender select element value based on the gender value in the indexedDB database
async function setGenderSelect() {
    const gender = await retrieveGender()
    if (gender === undefined || gender === "female") {
        genderSelect.value = "female"
    } else {
        genderSelect.value = gender
    }
}
// Set the tts_enabled value in the indexedDB database
async function setTts() {
    const tts = ttsTogle.checked
    const db = await openDatabase()
    const transaction = db.transaction(ttsStoreName, "readwrite")
    transaction.objectStore(ttsStoreName).put(tts, "tts_enabled")
}
// Retrieve the tts_enabled value from the indexedDB database
async function retrieveTts() {
    let ttsValue = undefined
    const db = await openDatabase()
    const transaction = db.transaction(ttsStoreName, "readonly")
    const getRequest = transaction.objectStore(ttsStoreName).get("tts_enabled")
    return new Promise((resolve, reject) => {
        getRequest.onsuccess = function (event) {
            const ttsValue = event.target.result
            resolve(ttsValue)
        }
        getRequest.onerror = function (event) {
            reject(event.target.error)
        }
    })
}
// Set the tts toggle element value based on the tts_enabled value in the indexedDB database
async function setTtsToggle() {
    const tts = await retrieveTts
    if (tts === undefined || tts === true) {
        tts.value = true
    } else {
        tts.value = tts
    }
}
// Open the indexedDB database
async function openDatabase() {
    const db = await new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, dbVersion)
        request.onerror = () => reject(request.error)
        request.onsuccess = () => resolve(request.result)
    })
    return db
}
// Set the favicon based on the gender value in the indexedDB database
async function setFavicon() {
    const gender = await retrieveGender()
    let faviconElement = document.querySelector("link[rel='icon']")
    if (!faviconElement) {
        faviconElement = document.createElement("link")
        faviconElement.rel = "icon"
        document.head.appendChild(faviconElement)
    }
    if (faviconElement == null || gender === undefined || gender === "female") {
        faviconElement.href = "../images/favicons/female.png"
        faviconElement.type = "image/x-icon"
    } else {
        faviconElement.href = "../images/favicons/male.png"
        faviconElement.type = "image/x-icon"
    }
}

async function setBackground() {
    const gender = await retrieveGender()
    const mainElement = document.getElementsByTagName("main")[0]
    if (mainElement == null || gender === undefined || gender === "female") {
        mainElement.style.backgroundImage =
            "url('../images/backgrounds/female.png')"
    } else {
        mainElement.style.backgroundImage =
            "url('../images/backgrounds/male.png')"
    }
}

// Gender Specific
setGenderSelect()
setFavicon()
setBackground()

genderSelect.addEventListener("change", async () => {
    await setGender()
    await setFavicon()
    await setBackground()
})

// Tts specific
setTtsToggle()

ttsTogle.addEventListener("change", async () => {
    await setTts()
})
