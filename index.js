// Global variables and DOM element references

// Logging the cats and temperaments arrays for debugging purposes
console.log(cats)
console.log(temperaments)

// Select the container element where the cat cards will be displayed
const cards = document.querySelector(".cards")
// Select the input field for entering the breed to filter by
const searchBreed = document.querySelector("#breed-input")
// Select the button that triggers the filter action
const filterButton = document.querySelector('#filter-button')

// Define a function to render all cats
function render() {
    // Clear the existing content of the cards container to prepare for re-rendering
    cards.innerHTML = ""

    // Fetch all cats asynchronously using the getAllCats function
    getAllCats().then((catsArr) => {
        // Clear the existing content again to ensure no duplication
        cards.innerHTML = ""
        
        // Iterate through the array of cats
        catsArr.forEach((e, i) => {
            // Create a new card for each cat using the createCard function
            const newCard = createCard(e, i)
            // Append the new card to the cards container
            cards.append(newCard)
        })
    })
}

// Add an event listener to the filter button to handle filter actions
filterButton.addEventListener("click", (e) => {
    // Call the filterRender function with the value from the search input field
    filterRender(searchBreed.value)
})

// Define a function to render cats filtered by breed
function filterRender(breed) {
    // Clear the existing content of the cards container to prepare for re-rendering
    cards.innerHTML = ""

    // Fetch cats of the specified breed asynchronously using the getCatsByBreed function
    getCatsByBreed(breed).then((catsArr) => {
        // Clear the existing content again to ensure no duplication
        cards.innerHTML = ""

        // Check if any cats match the breed
        if (catsArr.length > 0) {
            // Iterate through the array of filtered cats
            catsArr.forEach((e, i) => {
                // Create a new card for each cat using the createCard function
                const newCard = createCard(e, i)
                // Append the new card to the cards container
                cards.append(newCard)
            })
        } else {
            // If no cats match the breed, render all cats
            render()
        }
    })
}

// Define a function to create a card for a cat
function createCard(e) {
    // Create the main card element as a list item (li)
    const card = document.createElement("li")

    // Create and configure the delete button for the card
    const deleteButton = document.createElement("button")
    deleteButton.innerHTML = "Delete" // Set the button text to "Delete"

    // Set up the delete functionality with an event listener
    deleteButton.addEventListener("click", (event) => {
        // Find the cat by name from the DOM
        const catName = event.currentTarget.nextElementSibling.innerHTML
        // Fetch all cats asynchronously to find the cat to delete
        getAllCats().then((catsArr) => {
            // Find the cat object that matches the clicked delete button
            const catElement = catsArr.find((cat) => cat.name === catName)
            // Call the removeCat function to delete the cat and then re-render the list
            removeCat(catElement.id).then(render)
        })
    })

    // Create and configure the heading element for the cat's name
    const heading = document.createElement("h2")
    heading.className = "card--title" // Add a class for styling
    heading.innerHTML = e.name // Set the inner HTML to the cat's name

    // Create and configure the image element for the cat
    const image = document.createElement("img")
    image.src = e.image // Set the image source to the cat's image URL
    image.width = 256 // Set the image width
    image.className = "card--img" // Add a class for styling

    // Create the form element to update cat details
    const form = document.createElement("form")

    // Create the list element to contain the cat detail inputs
    const cardText = document.createElement("ul")
    cardText.className = "card--text" // Add a class for styling

    // Create and configure the age input field within a list item
    const ageItem = document.createElement("li")
    ageItem.innerHTML = "Age: " // Set the label text
    const ageInput = document.createElement("input")
    ageInput.name = "age" // Set the input name attribute
    ageInput.type = "number" // Set the input type to number
    ageInput.value = e.age // Set the input value to the cat's age
    ageItem.append(ageInput) // Append the input to the list item

    // Create and configure the breed input field within a list item
    const breedItem = document.createElement("li")
    breedItem.innerHTML = "Breed: " // Set the label text
    const breedInput = document.createElement("input")
    breedInput.name = "breed" // Set the input name attribute
    breedInput.type = "text" // Set the input type to text
    breedInput.value = e.breed // Set the input value to the cat's breed
    breedItem.append(breedInput) // Append the input to the list item

    // Create and configure the color input field within a list item
    const colorItem = document.createElement("li")
    colorItem.innerHTML = "Colour: " // Set the label text
    const colorInput = document.createElement("input")
    colorInput.name = "colour" // Set the input name attribute
    colorInput.type = "text" // Set the input type to text
    colorInput.value = e.colour // Set the input value to the cat's colour
    colorItem.append(colorInput) // Append the input to the list item

    // Create and configure the temperament select input within a list item
    const temperamentItem = document.createElement("li")
    temperamentItem.innerHTML = "Temperament: " // Set the label text
    const temperamentInput = document.createElement("select")

    // Populate the select input with options for each temperament
    temperaments.forEach((item, index) => {
        const temperamentOption = document.createElement("option")
        temperamentOption.value = item // Set the option value
        if (index === e.temperament) {
            temperamentOption.selected = true // Set the selected option
        }
        temperamentOption.innerHTML = item // Set the option display text
        temperamentInput.append(temperamentOption) // Append the option to the select input
    })

    temperamentItem.append(temperamentInput) // Append the select input to the list item

    // Create and configure the update button for the form
    const submitButton = document.createElement("button")
    submitButton.type = "submit" // Set the button type to submit
    submitButton.innerHTML = "Update" // Set the button text to "Update"

    // Set up the update functionality with an event listener
    submitButton.addEventListener("click", (event) => {
        // Prevent the default form submission behavior
        event.preventDefault()

        // Collect new values from the form inputs
        const cardSelector = event.currentTarget.closest("li")
        const catName = cardSelector.querySelector(".card--title").innerHTML
        const newAge = cardSelector.querySelector(".card--text").children[0].lastElementChild.value
        const newBreed = cardSelector.querySelector(".card--text").children[1].lastElementChild.value
        const newColour = cardSelector.querySelector(".card--text").children[2].lastElementChild.value
        const newTemperament = cardSelector.querySelector(".card--text").children[3].lastElementChild.value

        // Create a data object with the updated cat details
        const data = { name: catName, age: newAge, breed: newBreed, colour: newColour, temperament: newTemperament }

        // Fetch all cats asynchronously to find the cat to update
        getAllCats().then(async (catsArr) => {
            // Find the cat object that matches the form submission
            const catElement = catsArr.find((cat) => cat.name === catName)
            try {
                // Call the updateCat function to update the cat and then re-render the list
                await updateCat(catElement.id, data).then(render)
            } catch (error) {
                // Display an alert if the update fails
                alert("Failed to update cat")
                // Throw an error to stop execution
                throw new Error(error)
            }
        })
    })

    // Append all elements to the card
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

    return card // Return the created card element
}

// Initial render of all cats
render()
