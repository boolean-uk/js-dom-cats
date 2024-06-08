async function render() {
    getAllCats()
        .then((cats) => {
            breedFilter()
            loadCatList(cats)
        })
        .catch((error) => {
            throw new Error('ERROR: Could not render page: ' + error.message)
        })
}

function loadCatList(cats) {
    const cardsUL = document.querySelector('.cards')
    cardsUL.innerHTML = ''
    cats.forEach((cat) => generateCard(cat))
    return console.log('INFO: Finished loading', cats)
}

function breedFilter() {
    const breedInputElement = document.getElementById('breed-input')
    const breedButton = document.getElementById('filter-button')
    breedButton.addEventListener('click', () => {
        const inputValue =
            breedInputElement.value[0].toUpperCase() +
            breedInputElement.value.slice(1)
        if (!inputValue) return console.error('ERROR: No input provided')
        getCatsByBreed(inputValue)
            .then((found) => {
                loadCatList(found)
            })
            .catch(() => {
                throw new Error('ERROR: Failed to sort by ', inputValue)
            })
    })
}

function createTemper(cat) {
    const temperamentContainer = document.createElement('li')
    const temperament = document.createElement('select')
    temperament.name = 'temperament'

    temperaments.forEach((temper) => {
        const option = document.createElement('option')
        option.value = temper
        option.innerText = temper
        if (temper === cat.temperament) {
            option.selected = true
        }
        temperament.appendChild(option)
    })
    return temperamentContainer
}

function generateCard(cat) {
    const cardsUL = document.querySelector('.cards')

    // Card
    const card = document.createElement('li')
    card.classList.add('card')

    // Delete Button
    const deleteButton = document.createElement('button')
    deleteButton.innerText = 'Delete'
    deleteButton.addEventListener('click', async () => {
        removeCat(cat.id)
            .then(() => {
                render()
            })
            .catch(() => {
                throw new Error('ERROR: Failed to delete ', cat.id)
            })
    })
    card.appendChild(deleteButton)

    // Card Title
    const cardTitle = document.createElement('h2')
    cardTitle.classList.add('card--title')
    cardTitle.innerText = cat.name
    card.appendChild(cardTitle)

    // Card Image
    const cardImage = document.createElement('img')
    cardImage.width = 256
    cardImage.classList.add('card--img')
    cardImage.src = cat.image
    card.appendChild(cardImage)

    // Form
    const form = document.createElement('form')

    // List
    const textUL = document.createElement('ul')
    textUL.classList.add('card--text')

    // Age
    const age = document.createElement('li')
    age.innerText = 'Age: '
    const ageInput = document.createElement('input')
    ageInput.name = 'age'
    ageInput.type = 'number'
    ageInput.value = cat.age
    age.appendChild(ageInput)
    textUL.appendChild(age)

    // Breed
    const breed = document.createElement('li')
    breed.innerText = 'Breed: '
    const breedInput = document.createElement('input')
    breedInput.name = 'breed'
    breedInput.type = 'text'
    breedInput.value = cat.breed
    breed.appendChild(breedInput)
    textUL.appendChild(breed)

    // Colour
    const colour = document.createElement('li')
    colour.innerText = 'Colour: '
    const colourInput = document.createElement('input')
    colourInput.name = 'colour'
    colourInput.type = 'text'
    colourInput.value = cat.colour
    colour.appendChild(colourInput)
    textUL.appendChild(colour)
    textUL.appendChild(createTemper(cat))

    // Submit action
    const submit = document.createElement('li')
    const submitButton = document.createElement('button')
    submitButton.setAttribute('type', 'submit')
    submitButton.innerText = 'Update'
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const newData = new FormData(form)
        const newCat = {
            age: Number(newData.get('age')),
            breed: newData.get('breed'),
            colour: newData.get('colour'),
            temperament: newData.get('temperament'),
        }
        updateCat(cat.id, newCat)
            .then(() => {
                render()
            })
            .catch(() => {
                throw new Error('ERROR: Could not update ', cat.id, newCat)
            })
    })

    submit.appendChild(submitButton)
    textUL.appendChild(submit)

    form.appendChild(textUL)
    card.appendChild(form)
    cardsUL.appendChild(card)
}

document.addEventListener('DOMContentLoaded', render())
