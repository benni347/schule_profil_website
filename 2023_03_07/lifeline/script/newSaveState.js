'use strict'
const decissionA = document.querySelector('.decission-a-button')
const decissionB = document.querySelector('.decission-b-button')
const dbVersionSave = 1

// Initialize the Dexie.js database
const dbSave = new Dexie('newSavePoints')
dbSave.version(dbVersionSave).stores({
  page: '++id, firstTimeVisit',
  save: ''
})

// Set the gender value in the Dexie.js database
async function setAllSavePoints () {
  const currentSavePoint = await retrieveCurrentSavePoints()
  const allSavePoints = await retrieveAllSavePoints()
  allSavePoints.push(currentSavePoint)
  await dbSave.save.put(allSavePoints, 'all')
}

// Retrieve the gender value from the Dexie.js database
async function retrieveAllSavePoints () {
  return await dbSave.save.get('all')
}

// Function to store whether it is the first time visiting the page
async function setFirstTimeVisit () {
  await dbSave.page.add({ firstTimeVisit: false })
}

// Function to retrieve whether it is the first time visiting the page
async function retrieveFirstTimeVisit () {
  const result = await dbSave.page.get({ id: 1 })
  return result ? result.firstTimeVisit : true
}

async function setCurrentSavePointA () {
  const currentString = await retrieveCurrentSavePoints()
  const newCurrentString = currentString + 'A'
  await dbSave.save.put(newCurrentString, 'current')
}

async function setCurrentSavePointB () {
  const currentString = await retrieveCurrentSavePoints()
  const newCurrentString = currentString + 'B'
  await dbSave.save.put(newCurrentString, 'current')
}

async function retrieveCurrentSavePoints () {
  try {
    const savePointValue = await dbSave.save.get('current')
    return savePointValue || ''
  } catch (error) {
    console.error(error)
    return ''
  }
}

async function setStartPoint () {
  const firstTimeVisitDb = await retrieveFirstTimeVisit()

  if (firstTimeVisitDb !== false) {
    const startString = ['A']
    await dbSave.save.put(startString, 'all')
    await dbSave.save.put(startString, 'current')
  }
}

setStartPoint()
setFirstTimeVisit()

decissionA.addEventListener('click', async () => {
  await setCurrentSavePointA()
  await setAllSavePoints()
})

decissionB.addEventListener('click', async () => {
  await setCurrentSavePointB()
  await setAllSavePoints()
})
