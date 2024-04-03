const buildCatCard = cat => {
    const cardsUL = document.querySelector('.cards')

    const cardLi = document.createElement('li')
    cardLi.classList.add('card')

    const deleteButton = document.createElement('button')
    deleteButton.innerText = 'Delete'
    deleteButton.classList.add('delete-button')
    deleteButton.addEventListener('click', () => {
        deleteCat(cat.id)
    })
    cardLi.append(deleteButton)

    const cardH2 = document.createElement('h2')
    cardH2.classList.add('card--title')
    cardH2.innerText = cat.name
    cardLi.append(cardH2)
    
    const cardIMG = document.createElement('img')
    cardIMG.classList.add('card--img')
    cardIMG.setAttribute('src', cat.image)
    cardIMG.setAttribute('width', 256)
    cardLi.append(cardIMG)

    const form = document.createElement('form')

    const formUl = document.createElement('ul')
    formUl.classList.add('card--text')

    const ageLi = document.createElement('li')
    ageLi.innerText = "Age: "
    const ageInput = newInput('age', 'number', cat.age)
    ageLi.append(ageInput)
    formUl.append(ageLi)

    const breedLi = document.createElement('li')
    breedLi.innerText = "Breed: "
    const breedInput = newInput('breed', 'text', cat.breed)
    breedLi.append(breedInput)
    formUl.append(breedLi)

    const colourLi = document.createElement('li')
    colourLi.innerText = "Colour: "
    const colourInput = newInput('colour', 'text', cat.colour)
    colourLi.append(colourInput)
    formUl.append(colourLi)

    const temperamentLi = document.createElement('li')
    temperamentLi.innerText = "Temperament: "

    const temperamentSelect = document.createElement('select')
    temperamentSelect.setAttribute('name', 'temperament')
    temperamentLi.append(temperamentSelect)

    temperaments.forEach(el => {
        const option = newOption(cat, el)
        temperamentSelect.append(option)
    })
    formUl.append(temperamentLi)
    
    const buttonLi = document.createElement('button')
    buttonLi.setAttribute('type', 'submit')
    buttonLi.innerText = "Update"
    buttonLi.addEventListener('click', () => {
        event.preventDefault()
        updateCatDetails(cat.id, {age: Number(ageInput.value), breed: breedInput.value, colour: colourInput.value, temperament: temperamentSelect.value})
    })
    formUl.append(buttonLi)

    form.append(formUl)
    cardLi.append(form)
    cardsUL.append(cardLi)
}

//Build input element
const newInput = (name, type, value) => {
    const input = document.createElement('input')
    input.setAttribute('name', `${name}`) 
    input.setAttribute('type', `${type}`) 
    input.setAttribute('value', `${value}`) 
    return input
} 

//Build option element
const newOption = (cat, value) => {
    const option = document.createElement('option')
    option.innerText = value
    option.setAttribute('value', value)
    if (cat.temperament === value) {
        option.setAttribute('selected', 'true')
    }
    return option
}

//Render cards
const render = catList => {
    const cardsUL = document.querySelector('.cards')
    cardsUL.innerHTML = ''
    catList.forEach(buildCatCard)
}

render(cats)

//Filter by breed
const filterButton = document.querySelector('#filter-button')
filterButton.addEventListener('click', async () => {
    const breedInput = document.querySelector('#breed-input').value
    const filteredCats = await getCatsByBreed(breedInput)
    render(filteredCats)
})

//Remove cat with delete button
const deleteCat = async (catID) => {
    await removeCat(catID)
    const catsWithoutCat = await getAllCats()
    render(catsWithoutCat)
}

//Update cat details
const updateCatDetails = async (catID, data) => {
    await updateCat(catID, data)
    const updatedCats = await getAllCats()
    console.log(updatedCats)
    render(updatedCats)
}


