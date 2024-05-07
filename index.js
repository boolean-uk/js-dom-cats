console.log(cats)
console.log(temperaments)

function createInput(type, name, value) {
    const input = document.createElement('input')
    input.setAttribute("name", name)
    input.setAttribute("type", type)
    input.setAttribute("value", value)

    return input
}

function createDetailsInput(detailsType, value, inputType = "text") {
    const detailsLi = document.createElement('li')
    detailsLi.style.textTransform = 'capitalize'
    const input = createInput(inputType, detailsType, value)
    const text = `${detailsType}:`
    detailsLi.append(text, input)

    return detailsLi
}

function renderCatTemperament(temp, selected) {
    const option = document.createElement('option')

    option.setAttribute('value', temp)
    option.innerText = temp

    if (selected) {
        option.setAttribute('selected', selected)
    }

    return option
}

function renderCatTemperaments(cat) {
    const containerLi = document.createElement('li')

    const select = document.createElement('select')
    select.setAttribute('name', 'temperament')

    const options = temperaments.map((temp) => renderCatTemperament(temp, cat.temperament === temp))
    select.append(...options)

    containerLi.append('Temperament: ', select)

    return containerLi
}

function renderCatDetails(cat) {
    const form = document.createElement('form')
    const ul = document.createElement('ul')
    ul.classList.add('card--text')

    const ageLi = createDetailsInput("age", cat.age, 'number')
    const breedLi = createDetailsInput("breed", cat.breed)
    const colourLi = createDetailsInput("colour", cat.colour)

    const temps = renderCatTemperaments(cat)

    const updateLi = document.createElement('li')
    const updateBtn = document.createElement('button')
    updateBtn.setAttribute('type', 'submit')
    updateBtn.innerHTML = 'Update'

    updateLi.append(updateBtn)

    ul.append(ageLi, breedLi, colourLi, temps, updateLi)

    form.append(ul)

    return form
}

function renderCatDeleteBtn(cat) {
    const deleteBtn = document.createElement('button')
    deleteBtn.innerText = 'Delete'

    deleteBtn.addEventListener('click', async () => {
        console.log('should delete', cat.name)

        await removeCat(cat.id)
        render()
    })

    return deleteBtn
}

function renderCat(cat) {
    console.log('rendering a cat')
    const cardLi = document.createElement('li')
    cardLi.classList.add("card")

    const deleteBtn = renderCatDeleteBtn(cat)

    const nameH2 = document.createElement('h2')
    nameH2.classList.add('card--title')
    nameH2.innerText = cat.name

    const catImg = document.createElement('img')
    catImg.setAttribute("src", cat.image)
    catImg.setAttribute("width", 256)
    catImg.classList.add("card--img")

    const details = renderCatDetails(cat)

    cardLi.append(deleteBtn, nameH2, catImg, details)

    return cardLi
}



function renderCats(cats) {
    console.log('rendering cats')
    const cardsUl = document.querySelector('.cards')
    if (!cardsUl) {
        throw new Error("cannot find card container")
    }
    cardsUl.innerHTML = ''
    const catCards = cats.map((cat) => renderCat(cat))
    cardsUl.append(...catCards)
}

async function render() {
    console.log('Rendering...')
    const cats = await getAllCats()
    renderCats(cats)
}

async function filterByBreed(breed) {
    console.log('should filter by', breed)
    if (!breed) {
        render()
        return
    }
    const filteredCats = await getCatsByBreed(breed)
    renderCats(filteredCats)
}

function setUpBreedFilter() {
    const filterButton = document.querySelector('#filter-button')
    if (!filterButton) {
        throw new Error('filter button gone yo')
    }

    filterButton.addEventListener('click', () => {
        const breedInput = document.querySelector('#breed-input')
        if (!breedInput) {
            throw new Error('filter input gone yo')
        }

        const breedValue = breedInput.value
        filterByBreed(breedValue)
    })
}

function setUpFilters() {
    setUpBreedFilter()
}

function main() {
    setUpFilters()
    render()
}

main()