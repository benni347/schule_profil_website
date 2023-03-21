"use strict";
const genderSelect = document.getElementById("gender");
const ttsTogle = document.getElementById("tts");
const floatingSettings = document.querySelector(".floating-settings");
const dbVersion = 3;

// Initialize the Dexie.js database
const db = new Dexie("settings");
db.version(dbVersion).stores({
  page: "++id, firstTimeVisit",
  gender: "",
  tts: "",
});

// Set the gender value in the Dexie.js database
async function setGender() {
  const gender = genderSelect.value;
  await db.gender.put(gender, "gender");
}

// Retrieve the gender value from the Dexie.js database
async function retrieveGender() {
  return await db.gender.get("gender");
}

// Set the gender select element value based on the gender value in the Dexie.js database
async function setGenderSelect() {
  const gender = await retrieveGender();
  if (gender === undefined || gender === "female") {
    genderSelect.value = "female";
  } else {
    genderSelect.value = gender;
  }
}

// Set the tts_enabled value in the Dexie.js database
async function setTts() {
  const tts = ttsTogle.checked;
  await db.tts.put(tts, "tts_enabled");
}

// Set the start options in the Dexie.js database
async function setStartOptions() {
  const firstTimeVisit = await retrieveFirstTimeVisit();
  if (firstTimeVisit !== false) {
    await db.gender.put("female", "gender");
    await db.tts.put(true, "tts_enabled");
    await db.tts.put(1.0, "tts_volume");
  }
}

// Function to store whether it is the first time visiting the page
async function setFirstTimeVisit() {
  await db.page.add({ firstTimeVisit: false });
}

// Function to retrieve whether it is the first time visiting the page
async function retrieveFirstTimeVisit() {
  const result = await db.page.get({ id: 1 });
  return result ? result.firstTimeVisit : true;
}

// Retrieve the tts_enabled value from the Dexie.js database
async function retrieveTts() {
  return await db.tts.get("tts_enabled");
}

// Set the tts toggle element value based on the tts_enabled value in the Dexie.js database
async function setTtsToggle() {
  const tts = await retrieveTts();
  ttsTogle.checked = tts;
}

// Set the tts volume visibility based on the tts_enabled value in the Dexie.js database

async function setTtsVolumeVisability() {
  const tts = await retrieveTts();
  const existingDetails = document.querySelector("#tts-details");
  if (tts == undefined || tts === true) {
    // Create a new details element if it doesn't exist
    if (!existingDetails) {
      const newDetails = document.createElement("details");
      const paragraph = document.createElement("p");
      const summary = document.createElement("summary");
      const div = document.createElement("div");
      const rangeInput = document.createElement("input");

      summary.textContent = "TTS";
      paragraph.textContent = "Volume";
      paragraph.setAttribute("id", "tts-volume-text");
      div.classList.add("tts-misc");
      rangeInput.setAttribute("type", "range");
      rangeInput.setAttribute("name", "volume");
      rangeInput.setAttribute("min", "0");
      rangeInput.setAttribute("max", "100");
      rangeInput.setAttribute("step", "1");
      rangeInput.setAttribute("value", "255");
      div.appendChild(paragraph);
      div.appendChild(rangeInput);
      newDetails.appendChild(summary);
      newDetails.appendChild(div);
      newDetails.setAttribute("id", "tts-details");
      floatingSettings.appendChild(newDetails);
    }
  } else if (tts === false) {
    // Remove the details element if it exists
    if (existingDetails) {
      existingDetails.remove();
    }
  } else {
    console.error(tts);
  }
}

async function setFavicon() {
  const gender = await retrieveGender();
  let faviconElement = document.querySelector("link[rel='icon']");
  if (!faviconElement) {
    faviconElement = document.createElement("link");
    faviconElement.rel = "icon";
    document.head.appendChild(faviconElement);
  }
  if (faviconElement == null || gender === undefined || gender === "female") {
    faviconElement.href = "../images/favicons/female.png";
    faviconElement.type = "image/x-icon";
  } else {
    faviconElement.href = "../images/favicons/male.png";
    faviconElement.type = "image/x-icon";
  }
}

async function setBackground() {
  const gender = await retrieveGender();
  const mainElement = document.getElementsByTagName("main")[0];
  if (mainElement == null || gender === undefined || gender === "female") {
    mainElement.style.backgroundImage =
      "url('../images/backgrounds/female.png')";
  } else {
    mainElement.style.backgroundImage = "url('../images/backgrounds/male.png')";
  }
}

setStartOptions();
setFirstTimeVisit();

// Gender Specific
setGenderSelect();
setFavicon();
setBackground();

genderSelect.addEventListener("change", async () => {
  await setGender();
  await setFavicon();
  await setBackground();
});

// Tts specific
setTtsToggle();
setTts();
setTtsVolumeVisability();

ttsTogle.addEventListener("change", async () => {
  await setTts();
  await setTtsVolumeVisability();
});
