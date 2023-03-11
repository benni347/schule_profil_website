"use strict";
const genderSelect = document.getElementById("gender");
const ttsTogle = document.getElementById("tts");
const dbVersion = 1;
const dbName = "mydb";
const genderStoreName = "gender";
const ttsStoreName = "tts";

// Create a database and set up object stores
const request = indexedDB.open(dbName, dbVersion);
request.onupgradeneeded = function (event) {
	const db = event.target.result;
	db.createObjectStore(genderStoreName);
	db.createObjectStore(ttsStoreName);
};

async function setGender() {
	const gender = genderSelect.value;
	const db = await openDatabase();
	const transaction = db.transaction(genderStoreName, "readwrite");
	transaction.objectStore(genderStoreName).put(gender, "gender");
}

async function retrieveGender() {
	let genderValue = undefined;
	const db = await openDatabase();
	const transaction = db.transaction(genderStoreName, "readonly");
	const getRequest = transaction.objectStore(genderStoreName).get("gender");
	return new Promise((resolve, reject) => {
		getRequest.onsuccess = function (event) {
			const genderValue = event.target.result;
			resolve(genderValue);
		};
		getRequest.onerror = function (event) {
			reject(event.target.error);
		};
	});
}

async function setGenderSelect() {
	const gender = await retrieveGender();
	if (gender === undefined) {
		genderSelect.value = "female";
	} else {
		genderSelect.value = gender;
	}
}

async function setTts() {
	const tts = ttsTogle.checked;
	const db = await openDatabase();
	const transaction = db.transaction(ttsStoreName, "readwrite");
	transaction.objectStore(ttsStoreName).put(tts, "tts_enabled");
}

async function retrieveTts() {
	let ttsValue = undefined;
	const db = await openDatabase();
	const transaction = db.transaction(ttsStoreName, "readonly");
	const getRequest = transaction.objectStore(ttsStoreName).get("tts_enabled");
	return new Promise((resolve, reject) => {
		getRequest.onsuccess = function (event) {
			const ttsValue = event.target.result;
			resolve(ttsValue);
		};
		getRequest.onerror = function (event) {
			reject(event.target.error);
		};
	});
}

async function setTtsToggle() {
	const tts = await retrieveTts;
	if (tts === undefined) {
		tts.value = true;
	} else {
		tts.value = tts;
	}
}

async function openDatabase() {
	const db = await new Promise((resolve, reject) => {
		const request = indexedDB.open(dbName, dbVersion);
		request.onerror = () => reject(request.error);
		request.onsuccess = () => resolve(request.result);
	});
	return db;
}

async function setFavicon() {
	let gender = await retrieveGender();
	const faviconElement = document.querySelector("link[rel='icon']");

	if (gender === undefined || gender === "female") {
		faviconElement.href = "../images/favicons/female.png";
	} else {
		faviconElement.href = "../images/favicons/male.png";
	}
}

// Gender Specific
setGenderSelect();
setFavicon();

genderSelect.addEventListener("change", async () => {
	await setGender();
	await setFavicon();
});

// Tts specific
setTtsToggle();

ttsTogle.addEventListener("change", async () => {
	await setTts();
});
