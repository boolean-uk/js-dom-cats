const cards = document.querySelector('.cards')
const catTemperament = temperaments
const filterButton = document.querySelector('#filter-button')
const filterInput = document.querySelector('#breed-input')

async function getData() {
    const allCats = await getAllCats()

    createCatCards(allCats)
}

function createCatCards(data) {
    cards.innerHTML = ''
    data.forEach((cat, index) => {
        const catLi = createCard(cat, index)

        cards.append(catLi)
    });
}

function createCard(cat, index) {
    const li = document.createElement('li')
    const deleteButton = document.createElement('button')
    const cardTitle = document.createElement('h2')
    const catImage = document.createElement('img')
    const form = document.createElement('form')
    const catForm = createForm(cat)

    li.classList.add('card')
    deleteButton.innerText = 'Delete'
    cardTitle.classList.add('card--title')
    cardTitle.innerText = cat.name
    catImage.classList.add('card--img')
    catImage.setAttribute('width', '256')
    catImage.setAttribute('src',  cat.image)

    li.append(deleteButton)
    li.append(cardTitle)
    li.append(catImage)
    li.append(form)
    form.append(catForm)

    deleteButton.addEventListener('click', () => {
        cats.splice(cats.findIndex(catItem => catItem.name === cat.name), 1)
        console.log(cats)
        getData()
    })

    return li
}

function createForm(cat) {
    const cardText = document.createElement('ul')
    const ageLi = document.createElement('li')
    const breedLi = document.createElement('li')
    const colourLi = document.createElement('li')
    const temperamentLi = document.createElement('li')
    const buttonLi = document.createElement('li')
    const ageInput = document.createElement('input')
    const breedInput = document.createElement('input')
    const colourInput = document.createElement('input')
    const temperamentSelect = document.createElement('select')
    const submitButton = document.createElement('button')

    cardText.classList.add('card--text')
    ageLi.innerText = 'Age: '
    breedLi.innerText = 'Breed: '
    colourLi.innerText = 'Colour: '
    temperamentLi.innerText = 'Temperament: '
    submitButton.setAttribute('type', 'submit')
    submitButton.innerText = 'Update'

    ageInput.setAttribute('name', 'age')
    ageInput.setAttribute('type', 'number')
    ageInput.setAttribute('value', cat.age)

    breedInput.setAttribute('name', 'breed')
    breedInput.setAttribute('type', 'text')
    breedInput.setAttribute('value', cat.breed)

    colourInput.setAttribute('name', 'colour')
    colourInput.setAttribute('type', 'text')
    colourInput.setAttribute('value', cat.colour)

    catTemperament.forEach((temperament) => {
        const temperamentOption = document.createElement('option')

        temperamentOption.setAttribute('value', temperament)
        temperamentOption.innerText = temperament
        
        if (temperament === cat.temperament) {
            temperamentOption.setAttribute('selected', true)
        }

        temperamentSelect.append(temperamentOption)
    })

    cardText.append(ageLi)
    ageLi.append(ageInput)
    cardText.append(breedLi)
    breedLi.append(breedInput)
    cardText.append(colourLi)
    colourLi.append(colourInput)
    cardText.append(temperamentLi)
    temperamentLi.append(temperamentSelect)
    cardText.append(buttonLi)
    buttonLi.append(submitButton)

    return cardText
}

filterButton.addEventListener('click', async () => {
    const filterCats = await getCatsByBreed(filterInput.value)
    createCatCards(filterCats)
})

getData()