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
	const db = await openDatabase();
	const transaction = db.transaction(genderStoreName, "readonly");
	const gender = await transaction.objectStore(genderStoreName).get("gender");
	return gender;
}

async function setGenderSelect() {
	const gender = await retrieveGender();
	if (gender === undefined) {
		genderSelect.value = "male";
	} else {
		const db = await openDatabase();
		const transaction = db.transaction(genderStoreName, "readonly");
		const getRequest = transaction.objectStore(genderStoreName).get("gender");
		getRequest.onsuccess = function (event) {
			const genderValue = event.target.result;
			genderSelect.value = genderValue;
		};
	}
}

async function setTts() {
	const tts = ttsTogle.checked;
	const db = await openDatabase();
	const transaction = db.transaction(ttsStoreName, "readwrite");
	transaction.objectStore(ttsStoreName).put(tts, "tts_enabled");
}

async function retrieveTts() {
	const db = await openDatabase();
	const transaction = db.transaction(ttsStoreName, "readonly");
	const tts = await transaction.objectStore(ttsStoreName).get("tts_enabled");
	return tts;
}

async function setTtsToggle() {
	const tts = await retrieveTts;
	if (tts === undefined) {
		tts.value = true;
	} else {
		const db = await openDatabase();
		const transaction = db.transaction(ttsStoreName, "readonly");
		const getRequest = transaction.objectStore(ttsStoreName).get("tts_enabled");
		getRequest.onsuccess = function (event) {
			const ttsValue = event.target.result;
			tts.value = ttsValue;
		};
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

setGenderSelect();
setTtsToggle();

genderSelect.addEventListener("change", async () => {
	await setGender();
});

ttsTogle.addEventListener("change", async () => {
	await setTts();
});
