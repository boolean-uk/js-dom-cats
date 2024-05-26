const cards = document.querySelector(".cards")
const searchBreed = document.querySelector("#breed-input")
const filterButton = document.querySelector('#filter-button')

function render() {
    cards.innerHTML = ""

    getAllCats().then((catsArr) => {
        cards.innerHTML = ""
        catsArr.forEach((e, i) => {
            const newCard = createCard(e, i)
            cards.append(newCard)
        })
    })
}

filterButton.addEventListener("click", (e) => {
    filterRender(searchBreed.value)
})

function filterRender(breed) {
    cards.innerHTML = ""

    getCatsByBreed(breed).then((catsArr) => {
        cards.innerHTML = ""
        if (catsArr.length > 0) {
            catsArr.forEach((e, i) => {
                const newCard = createCard(e, i)
                cards.append(newCard)
            })
        } else {
            render()
        }
    })
}

function createCard(e) {
    const card = document.createElement("li")

    const deleteButton = document.createElement("button")
    deleteButton.innerHTML = "Delete"

    deleteButton.addEventListener("click", (event) => {
        const catName = event.currentTarget.nextElementSibling.innerHTML
        getAllCats().then((catsArr) => {
            const catElement = catsArr.find((cat) => cat.name === catName)
            removeCat(catElement.id).then(render)
        })
    })

    const heading = document.createElement("h2")
    heading.className = "card--title"
    heading.innerHTML = e.name

    const image = document.createElement("img")
    image.src = e.image
    image.width = 256
    image.className = "card--img"

    const form = document.createElement("form")

    const cardText = document.createElement("ul")
    cardText.className = "card--text"

    const ageItem = document.createElement("li")
    ageItem.innerHTML = "Age: "

    const ageInput = document.createElement("input")
    ageInput.name = "age"
    ageInput.type = "number"
    ageInput.value = e.age

    ageItem.append(ageInput)

    const breedItem = document.createElement("li")
    breedItem.innerHTML = "Breed: "

    const breedInput = document.createElement("input")
    breedInput.name = "breed"
    breedInput.type = "text"
    breedInput.value = e.breed

    breedItem.append(breedInput)

    const colorItem = document.createElement("li")
    colorItem.innerHTML = "Colour: "

    const colorInput = document.createElement("input")
    colorInput.name = "colour"
    colorInput.type = "text"
    colorInput.value = e.colour

    colorItem.append(colorInput)

    const temperamentItem = document.createElement("li")
    temperamentItem.innerHTML = "Temperament: "

    const temperamentInput = document.createElement("select")
    temperaments.forEach((item, index) => {
        const temperamentOption = document.createElement("option")
        temperamentOption.value = item
        if (index === e.temperament) {
            temperamentOption.selected = true
        }

        temperamentOption.innerHTML = item
        temperamentInput.append(temperamentOption)
    })

    temperamentItem.append(temperamentInput)

    const submitButton = document.createElement("button")
    submitButton.type = "submit"
    submitButton.innerHTML = "Update"

    submitButton.addEventListener("click", (event) => {
        event.preventDefault()
        const cardSelector = event.currentTarget.closest("li")
        const catName = cardSelector.querySelector(".card--title").innerHTML
        const newAge = cardSelector.querySelector(".card--text").children[0].lastElementChild.value
        const newBreed = cardSelector.querySelector(".card--text").children[1].lastElementChild.value
        const newColour = cardSelector.querySelector(".card--text").children[2].lastElementChild.value
        const newTemperament = cardSelector.querySelector(".card--text").children[3].lastElementChild.value

        const data = { name: catName, age: newAge, breed: newBreed, colour: newColour, temperament: newTemperament }

        getAllCats().then(async (catsArr) => {
            const catElement = catsArr.find((cat) => cat.name === catName)
            try {
                await updateCat(catElement.id, data).then(render)
            } catch (error) {
                alert("Failed to update cat")
                throw new Error(error)
            }
        })
    })

    cardText.append(ageItem)
    cardText.append(breedItem)
    cardText.append(colorItem)
    cardText.append(temperamentItem)
    cardText.append(submitButton)

    form.append(cardText)

    card.append(deleteButton)
    card.append(heading)
    card.append(image)
    card.append(form)

    return card
}

render()
