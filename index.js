console.log(cats)
console.log(temperaments)

function renderCat(cat) {
  const newCard = document.createElement('li')

  const deleteButton = document.createElement('button')
  deleteButton.textContent = 'Delete'
  newCard.appendChild(deleteButton)

  deleteButton.addEventListener('click', (event) => {
    event.preventDefault()
    console.log(cat.id)
    removeCat(cat.id)
    renderPage()
  })

  const catName = document.createElement('h2')
  catName.classList.add('card--title')
  catName.textContent = cat.name
  newCard.appendChild(catName)

  const catImg = document.createElement('img')
  catImg.setAttribute('width', '256')
  catImg.classList.add('card--img')
  catImg.setAttribute('src', cat.image)
  newCard.appendChild(catImg)

  const cardForm = document.createElement('form')
  const formList = document.createElement('ul')

  const catAge = document.createElement('li')
  catAge.textContent = 'Age: '
  const catAgeInput = document.createElement('input')
  catAgeInput.setAttribute('name', 'age')
  catAgeInput.setAttribute('type', 'number')
  catAgeInput.setAttribute('value', cat.age)
  catAge.appendChild(catAgeInput)
  formList.appendChild(catAge)

  const catBreed = document.createElement('li')
  catBreed.textContent = 'Breed: '
  const catBreedInput = document.createElement('input')
  catBreedInput.setAttribute('name', 'breed')
  catBreedInput.setAttribute('type', 'text')
  catBreedInput.setAttribute('value', cat.breed)
  catBreed.appendChild(catBreedInput)
  formList.appendChild(catBreed)

  const catColour = document.createElement('li')
  catColour.textContent = 'Colour: '
  const catColourInput = document.createElement('input')
  catColourInput.setAttribute('name', 'colour')
  catColourInput.setAttribute('type', 'text')
  catColourInput.setAttribute('value', cat.colour)
  catColour.appendChild(catColourInput)
  formList.appendChild(catColour)

  const catTemp = document.createElement('li')
  catTemp.textContent = 'Temperament: '
  const tempSelect = document.createElement('select')
  for (let i = 0; i < temperaments.length; i++) {
    const option = document.createElement('option')
    option.setAttribute('value', temperaments[i])
    option.textContent = temperaments[i]
    tempSelect.appendChild(option)
  }
  catTemp.appendChild(tempSelect)
  formList.appendChild(catTemp)
  const catUpdate = document.createElement('li')
  const updateButton = document.createElement('button')
  updateButton.setAttribute('type', 'submit')
  updateButton.textContent = 'Update'
  catUpdate.appendChild(updateButton)
  formList.appendChild(catUpdate)

  updateButton.addEventListener('click', (event) => {
    event.preventDefault()
    let updates = {
        age: catAgeInput.value,
        breed: catBreedInput.value,
        colour: catColourInput.value,
        // temperament: catTemp

        // TODO: add ID to each select element when rendering. this can match the ID of the cat. temperament element
        // can then be selected by ID, change the rendering step that selects the default option as well.

    }
    updateCat(cat.id, updates)
    renderPage()
  })

  cardForm.appendChild(formList)
  newCard.appendChild(cardForm)

  cardsSection = document.querySelector('.cards')
  cardsSection.appendChild(newCard)
}

async function renderPage() {
    document.querySelector('.cards').innerHTML = ""
    const catsArray = await getAllCats()
    for (let i = 0; i < catsArray.length; i++) {
        renderCat(catsArray[i])
          const selectedTemp = document.querySelectorAll(`option[value="${catsArray[i].temperament}"]`)
          const elementToChange = selectedTemp[selectedTemp.length - 1]
          elementToChange.setAttribute('selected', 'true')
    }
}

async function renderPageFiltered(breed) {
    document.querySelector('.cards').innerHTML = ""
    const catsArray = await getCatsByBreed(breed)
    for (let i = 0; i < catsArray.length; i++) {
        renderCat(catsArray[i])
          const selectedTemp = document.querySelectorAll(`option[value="${catsArray[i].temperament}"]`)
          const elementToChange = selectedTemp[selectedTemp.length - 1]
          elementToChange.setAttribute('selected', 'true')
    }
}

document.querySelector('#filter-button').addEventListener('click', (event) => {
    event.preventDefault()
    let inputBreed = document.querySelector('#breed-input').value
    if (inputBreed === "") {
        renderPage()
    } else {
    renderPageFiltered(inputBreed)
    }
})

renderPage()