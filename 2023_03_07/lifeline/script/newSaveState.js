'use strict'
const decissionA = document.querySelector('.decission-a-button')
const decissionB = document.querySelector('.decission-b-button')
const decissionAText = document.querySelector('.decission-a-text')
const decissionBText = document.querySelector('.decission-b-text')
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
  console.log(firstTimeVisitDb)
  if (firstTimeVisitDb !== false) {
    const startString = ['A']
    await dbSave.save.put(startString, 'all')
    await dbSave.save.put(startString, 'current')
  }
}

setStartPoint()
setFirstTimeVisit()
showStory()

decissionA.addEventListener('click', async () => {
  await setCurrentSavePointA()
  await setAllSavePoints()
  await showStory()
})

decissionB.addEventListener('click', async () => {
  await setCurrentSavePointB()
  await setAllSavePoints()
  await showStory()
})

const storyText = document.getElementById('story-text')

function typeText (text) {
  const typingElement = document.querySelector('.typing-animation')
  let index = 0
  const intervalId = setInterval(() => {
    typingElement.innerHTML =
            text.substr(0, index) + '<span class="cursor"></span>'
    index++
    if (index >= text.length) {
      clearInterval(intervalId)
      typingElement.innerHTML = text // remove the cursor and keep the final text
    }
  }, 200)
}

async function showStory () {
  const currentSavePoint = await retrieveCurrentSavePoints()
  switch (currentSavePoint) {
    case 'A':
      start()
      break
    case 'AB':
      ab()
      break
    case 'AA':
      aa()
      break
    default:
      start()
      break
  }

  function start () {
    const startText1 =
            "Jane Muror had trained her entire life for this moment. As she sat in the cockpit of her spacecraft, she couldn't help but feel a sense of excitement and nervousness. She was embarking on a mission to fly to Jupiter's moon IO, a journey that would take her farther into space than anyone had ever gone before."
    const startText2 =
            "As the spacecraft lifted off the launchpad, Jane and her crew were all smiles. But as they approached the edge of Earth's atmosphere, something went wrong. A warning light blinked on the dashboard, indicating a malfunction."
    const startText3 =
            'Jane and her crew quickly reported the issue to Mission Control, who provided them with a code that was intended to rectify the problem.'
    const startText4 =
            'Her communication with Mission Control went along these lines:'
    const startText5 =
            "Mission Control, we have detected an error code, namely 'E1023GF', on our monitors. Could you kindly advise us on the means to resolve this issue?"
    const startText6 =
            'Mission Control here. We are currently investigating the matter.'
    const startText7 =
            'Engineer, we implore you to swiftly attend to the pressing matter at hand. The ESP-32 is currently unable to receive any data, and time is of the essence, as the rocket ship is in peril of crashing. We have a limited window of two minutes for you to rectify the issue.'

    for (let i = 1; i <= 7; i++) {
      const text = eval('startText' + i)

      console.info(text)
      setTimeout(() => {
        storyText.setAttribute('data-text', text)
        typeText(text)
        console.info(i)
      }, (text.length * 200 + 2000) * i)
    }
  }

  function ab () {
    const text1 =
            'They received a code aimed at remedying the issue, but their attempts proved futile as the engines failed, and they hurtled toward Earth at an uncontrollable pace. It was a terrifying sight, and the world braced for impact.'
    const text2 =
            'The spacecraft collided with multiple SpaceX satellites, causing debris to rain down on the planet below. The once-celebrated mission had turned into a catastrophic event, leading to the deaths of 1000 civilians, Jane Muror, and her entire crew. The world was in shock; it was a dark day for space exploration.'
    const text3 =
            "The incident was investigated thoroughly, but nothing could bring back the lives lost or undo the damage done. Speculations arose over what truly caused the malfunction and who was responsible. Some blamed faulty equipment, while others pointed fingers at the crew's training."
    const text4 =
            'As the years passed, memories of the tragedy faded, but one question continued to linger in the minds of those who had witnessed it. Could it have been prevented? Was there a chance for survival? The world may never know.'
    for (let i = 1; i <= 4; i++) {
      setTimeout(() => {
        const text = eval('text' + i)

        storyText.setAttribute('data-text', text)
      }, text.length * 200 + 2000 * (i - 1))
    }
  }

  function aa () {
    const text1 =
            'For a brief period, it seemed to work, and the spacecraft continued on its path towards IO.'
    const text2 =
            'But as they approached Mars, things took a turn for the worse. Without warning, the engine suddenly veered towards the planet, and Jane and her crew found themselves hurtling towards the red planet at an alarming speed.'
    const text3 = 'She transmitted a message to Earth, conveying that: '
    const text4 =
            'Mission Control, the engines have ceased functioning, and we are now plummeting into freefall on the planet Mars.'
    const text5 =
            'Upon receiving the transmission, Mission Control promptly transmitted a signal to the last known location of the spacecraft, inquiring: '
    const text6 =
            'We have received your transmission, Jane. Are you still in operation? Could you diagnose and rectify the issue at hand?'
    const text7 = 'Mission Control received no response.'
    const text8 =
            "Despite Jane's best efforts to regain control of the spacecraft, it was too late. The impact was devastating, and the force of the crash killed everyone on board except for her."
    const text9 =
            'Jane had spent months working tirelessly to repair the communication equipment on her spacecraft. She had rationed her food harshly and had spent countless sleepless nights trying to fix the broken equipment.'
    const text10 =
            'Jane emerged from the wreckage battered and bruised, but alive. She quickly assessed her situation and realized that she was stranded on Mars with limited supplies and no way to communicate with Earth.'
    const text11 =
            'Despite the overwhelming odds against her, Jane refused to give up. She knew that her only chance of survival was to use her training to repair the communication equipment and tell earth that she needs assistance.'
    const text12 =
            'But as she finally managed to repair the dish, she was met with disappointment. Mission Control had given up on her a long time ago, and there was no one listening for signals from the red planet anymore. Or so she thought.'
    const text13 =
            'As fate would have it, there was one person still listening to the night sky, hoping to hear from aliens. It was me, a lone radio operator stationed in a remote location on Earth. I had been listening intently to the faint signals coming from the depths of space, hoping to hear something out of the ordinary.'
    const text14 =
            'And then, out of nowhere, I heard it - a very weak signal that sounded like '
    const text15 = 'SOS'
    const text16 =
            'At first, I thought it might have been a glitch in the equipment, but then I heard it again, two hours later.'

    for (let i = 1; i <= 16; i++) {
      const text = eval('text' + i)
      decissionAText.innerHTML = 'Report It to NASA'
      decissionBText.innerHTML = 'Radio a Signal Back'
      setTimeout(() => {
        storyText.setAttribute('data-text', text)
      }, text.length * 200 + 2000 * (i - 1))
    }
  }
}
