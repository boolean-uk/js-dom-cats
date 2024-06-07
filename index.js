async function render(htmlParent = null) {
    getAllCats()
        .then((cats) => {
            if (htmlParent != null) {
                htmlParent.innerHTML = ''
            }
            console.log(cats)
            cats.forEach((cat) => generateCard(cat))
        })
        .catch((error) => {
            throw new Error('ERROR: Could not re-render page: ' + error.message)
        })
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
        render(cardsUL)
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

    // Temperament
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
    temperamentContainer.appendChild(temperament)
    textUL.appendChild(temperamentContainer)

    // Submit action
    const submit = document.createElement('li')
    const submitButton = document.createElement('button')
    submitButton.setAttribute('type', 'submit')
    submitButton.innerText = 'Update'
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const newData = new FormData(form)
        const newCat = {
            age: newData.get('age'),
            breed: newData.get('breed'),
            colour: newData.get('colour'),
            temperament: newData.get('temperament'),
        }
        updateCat(cat.id, newCat)
        console.log(newData)
        render(cardsUL)
    })

    submit.appendChild(submitButton)
    textUL.appendChild(submit)

    form.appendChild(textUL)
    card.appendChild(form)
    cardsUL.appendChild(card)
}

document.addEventListener('DOMContentLoaded', render())
