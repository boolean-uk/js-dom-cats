// console.log(cats)
// console.log(temperaments)

//Add missing Temperament
temperaments.push("Vicious evil monster")

// Create cat-cards
function createCatCards(cat) {
	const cardsList = document.querySelector(".cards")
	const catCard = document.createElement("li")
	catCard.className = "card"

	// Create delete button
	const deleteBtn = document.createElement("button")
	deleteBtn.innerText = "Delete"
	deleteBtn.addEventListener("click", () => {
		deleteCat(cat.id)
	})

	// Create cat-name
	const catName = document.createElement("h2")
	catName.className = "card--title"
	catName.innerText = cat.name

	// Create cat picture
	const catPic = document.createElement("img")
	catPic.setAttribute("width", "256")
	catPic.className = "card--img"
	catPic.src = cat.image

	// Create form
	const form = document.createElement("form")

	// Create form_options-list
	const formOptionsUl = document.createElement("ul")
	formOptionsUl.className = "card--text"

	// Create Li's for Age, Breed, Colour, Temperament
	const ageLi = document.createElement("li")
	ageLi.innerText = "Age: "
	const ageInput = document.createElement("input")
	ageInput.setAttribute("name", "age")
	ageInput.setAttribute("type", "number")
	ageInput.setAttribute("value", cat.age)
	ageLi.appendChild(ageInput)

	const breedLi = document.createElement("li")
	breedLi.innerText = "Breed: "
	const breedInput = document.createElement("input")
	breedInput.setAttribute("name", "breed")
	breedInput.setAttribute("type", "text")
	breedInput.setAttribute("value", cat.breed)
	breedLi.appendChild(breedInput)

	const colourLi = document.createElement("li")
	colourLi.innerText = "Colour: "
	const colourInput = document.createElement("input")
	colourInput.setAttribute("name", "colour")
	colourInput.setAttribute("type", "text")
	colourInput.setAttribute("value", cat.colour)
	colourLi.appendChild(colourInput)

	const temperamentLi = document.createElement("li")
	temperamentLi.innerText = "Temperament: "
	const temperamentOptions = document.createElement("select")
	temperamentOptions.setAttribute("name", "temperament")

	temperaments.forEach((optionText) => {
		const option = document.createElement("option")
		option.innerText = optionText
		if (optionText === cat.temperament) {
			option.setAttribute("selected", "true")
		}
		temperamentOptions.appendChild(option)
	})
	temperamentLi.appendChild(temperamentOptions)

	//Create update_cat button
	const submitLi = document.createElement("li")
	const submitBtn = document.createElement("button")
	submitBtn.setAttribute("type", "submit")
	submitBtn.innerText = "Update"
	submitBtn.addEventListener("click", (event) => {
		event.preventDefault()
		updateCats(cat.id, {
			age: ageInput.value,
			breed: breedInput.value,
			colour: colourInput.value,
			temperament: temperamentOptions.value,
		})
	})
	submitLi.appendChild(submitBtn)

	// Append all elements to their parent elements
	formOptionsUl.appendChild(ageLi)
	formOptionsUl.appendChild(breedLi)
	formOptionsUl.appendChild(colourLi)
	formOptionsUl.appendChild(temperamentLi)
	formOptionsUl.appendChild(submitLi)
	//BruceLi
	//JetLi
	//LianLi

	form.appendChild(formOptionsUl)

	catCard.appendChild(deleteBtn)
	catCard.appendChild(catName)
	catCard.appendChild(catPic)
	catCard.appendChild(form)

	cardsList.appendChild(catCard)

	// return cardsList
}

function renderCatCards(cats) {
	const cardsList = document.querySelector(".cards")
	cardsList.innerHTML = ""
	cats.forEach(createCatCards)
}

renderCatCards(cats)

//Add filter-button functionality
const filterBtn = document.querySelector("#filter-button")
function capitalizeFirstLetter(input) {
	return input.charAt(0).toUpperCase() + input.slice(1)
}
filterBtn.addEventListener("click", async () => {
	const breedInput = document.querySelector("#breed-input").value
	const cptlzedFirstLetter = capitalizeFirstLetter(breedInput)
	const filteredCatsArr = await getCatsByBreed(cptlzedFirstLetter)
	renderCatCards(filteredCatsArr)
})

//Add delete-button functionality
async function deleteCat(catId) {
	await removeCat(catId)
	const newCatsArr = await getAllCats()
	renderCatCards(newCatsArr)
}

//Add update_cat-button functionality
async function updateCats(catId, data) {
	await updateCat(catId, data)
	const updCats = await getAllCats()
	renderCatCards(updCats)
}
