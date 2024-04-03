console.log(cats)
console.log(temperaments)

const cards = document.querySelector(".cards")
const breedSearch = document.querySelector("#breed-input")
const filterButton = document.querySelector("#filter-button")

function render() {
    getAllCats()
    .then((catsArr) => {catsArr.forEach((e, i) => {
        const newCard = cardCreate(e, i)
        cards.append(newCard)
    })})
}

function cardCreate(e) {
    const card = document.createElement("li")

    const deleteButton = document.createElement("button")
    deleteButton.innerHTML = "Delete"

    const heading = document.createElement("h2")
    heading.className = "card--title"
    heading.innerHTML = e.name

    const image = document.createElement("img")

    image.src = e.image
    
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

    const colourItem = document.createElement("li")
    colourItem.innerHTML = "Colour: "

    const colourInput = document.createElement("input")
    colourInput.name = "colour"
    colourInput.type = "text"
    colourInput.value = e.colour

    colourItem.append(colourInput)

    const temperamentItem = document.createElement("li")
    temperamentItem.innerHTML = "Temperament: "

    const temperamentInput = document.createElement("select")
    temperaments.forEach((e, index) => {
        const temperamentOption = document.createElement("option")
        temperamentOption.value = e
        if (index === 0) {
            temperamentOption.selected = true
        }

        temperamentOption.innerHTML = e
        temperamentInput.append(temperamentOption)
    })

    temperamentItem.append(temperamentInput)

    const submitButton = document.createElement("button")
    submitButton.type = "submit"
    submitButton.innerHTML = "Update"

    cardText.append(ageItem)
    cardText.append(breedItem)
    cardText.append(colourItem)
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
