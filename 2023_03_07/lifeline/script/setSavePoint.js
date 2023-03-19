"use strict";
const decissionA = document.querySelector(".decission-a");
const decissionB = document.querySelector(".decission-b");
const savePointStoreName = "savePoint";
const dbVersionSave = 1;
const dbNameSave = "save";

const requestSave = indexedDB.open(dbNameSave, dbVersionSave);
requestSave.onupgradeneeded = function (event) {
  const db = event.target.result;
  db.createObjectStore(savePointStoreName);
};

async function retrieveAllSavePoints() {
  const db = await openDatabase();
  const transaction = db.transaction(savePointStoreName, "readonly");
  const getRequest = transaction.objectStore(savePointStoreName).get("all");
  return new Promise((resolve, reject) => {
    getRequest.onsuccess = function (event) {
      const savePointValue = event.target.result;
      resolve(savePointValue);
    };
    getRequest.onerror = function (event) {
      reject(event.target.error);
    };
  });
}

async function retrieveCurrentSavePoints() {
  const db = await openDatabase();
  const transaction = db.transaction(savePointStoreName, "readonly");
  const getRequest = transaction
    .objectStore(savePointStoreName)
    .get("current");
  return new Promise((resolve, reject) => {
    getRequest.onsuccess = function (event) {
      const savePointValue = event.target.result;
      resolve(savePointValue);
    };
    getRequest.onerror = function (event) {
      reject(event.target.error);
    };
  });
}

async function setCurrentSavePointA() {
  const db = await openDatabase();
  const currentString = await retrieveCurrentSavePoints();
  const newCurrentString = currentString + "A";
  const transaction = db.transaction(savePointStoreName, "readwrite");
  transaction.objectStore(savePointStoreName).put(newCurrentString, "current");
}

async function setCurrentSavePointB() {
  const db = await openDatabase();
  const currentString = (await retrieveCurrentSavePoints()) + "B";
  const transaction = db.transaction(savePointStoreName, "readwrite");
  transaction.objectStore(savePointStoreName).put(currentString, "current");
}

async function setAllSavePoints() {
  const db = await openDatabase();
  const currentSavePoint = await retrieveCurrentSavePoints();
  const allSavePoints = await retrieveAllSavePoints();
  allSavePoints.push(currentSavePoint);
  const transaction = db.transaction(savePointStoreName, "readwrite");
  transaction.objectStore(savePointStoreName).put(allSavePoints, "all");
}

async function setStartPoint() {
  const db = await openDatabase();
  const firstTimeVisitDb = await retrieveFirstTimeVisit();

  const startString = ["A"];
  if (firstTimeVisitDb != false) {
    const transaction = db.transaction(savePointStoreName, "readwrite");
    transaction.objectStore(savePointStoreName).put(startString, "current");
    transaction.objectStore(savePointStoreName).put(startString, "all");
  }
}

// Open the indexedDB database
async function openDatabase() {
  const db = await new Promise((resolve, reject) => {
    const request = indexedDB.open(dbNameSave, dbVersionSave);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
  return db;
}

async function retrieveFirstTimeVisit() {
  const db = await openDatabase();
  const transaction = db.transaction(savePointStoreName, "readonly");
  const getRequest = transaction
    .objectStore(savePointStoreName)
    .get("current");
  return new Promise((resolve, reject) => {
    getRequest.onsuccess = function (event) {
      const savePointValue = event.target.result;
      resolve(savePointValue);
    };
    getRequest.onerror = function (event) {
      reject(event.target.error);
    };
  });
}

async function setfirstTimeVisit() {
  const db = await openDatabase();
  const firstTimeVisitDb = await retrieveFirstTimeVisit();
  let firstTimeVisit = "yes";
  if (firstTimeVisitDb != false) {
    firstTimeVisit = false;
  }
  const transaction = db.transaction(savePointStoreName, "readwrite");
  transaction
    .objectStore(savePointStoreName)
    .put(firstTimeVisit, "firstTimeVisit");
}

setStartPoint();
setfirstTimeVisit();

decissionA.addEventListener("click", () => {
  setfirstTimeVisit();
  setCurrentSavePointA();
  setAllSavePoints();
});

decissionB.addEventListener("click", () => {
  setfirstTimeVisit();
  setCurrentSavePointB();
  setAllSavePoints();
});
