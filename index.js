console.log(cats)
console.log(temperaments)

function renderCat(cat) {
  const newCard = document.createElement('li')

  const deleteButton = document.createElement('button')
  deleteButton.textContent = 'Delete'
  newCard.appendChild(deleteButton)

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
  catAge.textContent = `Age: ${cat.age}`
  catAge.setAttribute('name', 'age')
  catAge.setAttribute('type', 'number')
  catAge.setAttribute('value', cat.age)
  formList.appendChild(catAge)

  const catBreed = document.createElement('li')
  catBreed.textContent = `Breed: ${cat.breed}`
  catBreed.setAttribute('name', 'breed')
  catBreed.setAttribute('type', 'text')
  catBreed.setAttribute('value', cat.breed)
  formList.appendChild(catBreed)

  const catColour = document.createElement('li')
  catColour.textContent = `Colour: ${cat.colour}`
  catColour.setAttribute('name', 'colour')
  catColour.setAttribute('type', 'text')
  catColour.setAttribute('value', cat.colour)
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
          console.log(selectedTemp)
    }
}

async function renderPageFiltered(breed) {
    document.querySelector('.cards').innerHTML = ""
    const catsArray = await getCatsByBreed(breed)
    console.log(catsArray)
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
    // inputBreed = `${inputBreed[0].toUpperCase()}${inputBreed.slice(1)}`
    renderPageFiltered(inputBreed)
    console.log('event')
})

renderPage()