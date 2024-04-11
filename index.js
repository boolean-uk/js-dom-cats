console.log(cats)
console.log(temperaments)

getAllCats()
.then((theDataReturned) => {
    console.log(theDataReturned)
    displayCats(theDataReturned)
})

const cardsContainer = document.querySelector(".cards")

// create display cats function then put in asych code
function displayCats (data) {
    // data = cats to display
    cardsContainer.innerHTML = ""
    data.forEach((cat) => {
        const card = document.createElement("li")
        card.classList.add("card")

        const button = document.createElement("button")
        button.innerText = "Delete"
        button.addEventListener("click", () => {
            removeCat(cat.id)
            .then(() => {
                getAllCats()
                .then((theDataReturned) => {
                    displayCats(theDataReturned)
                })
            })

        })

        const h2 = document.createElement("h2")
        h2.classList.add(".card--title")
        h2.innerText = cat.name

        const img = document.createElement("img")
        img.setAttribute("width", "256")
        img.classList.add("card--title")
        img.setAttribute("src", cat.image)

        card.append(button, h2, img)

        // add form
        const form = document.createElement("form")
        const ul = document.createElement("ul")
        ul.classList.add("card--text")

        const age = document.createElement("li")
        age.setAttribute("name", "age")
        age.setAttribute("type", "number")
        age.setAttribute("value", cat.age)
        age.innerText = "Age: "

        const breed = document.createElement("li")
        breed.setAttribute("name", "breed")
        breed.setAttribute("type", "text")
        breed.setAttribute("value", cat.breed)
        breed.innerText = "Breed: "

        const colour = document.createElement("li")
        colour.setAttribute("name", "colour")
        colour.setAttribute("type", "text")
        colour.setAttribute("value", cat.colour)
        colour.innerText = "Colour: "

        ul.append(age, breed, colour)

        const tempLi = document.createElement("li")
        tempLi.innerText = "Temperament: "

        const temperament = document.createElement("select")
        temperament.setAttribute("name", "temperament")

        // add if conditions

        const affectionate = document.createElement("option")
        affectionate.setAttribute("value", "Affectionate")
        if (cat.temperament === "Affectionate") {
            affectionate.setAttribute("selected", "true")
        }
        affectionate.innerText = "Affectionate"
        
        const bold = document.createElement("option")
        bold.setAttribute("value", "Bold")
        if (cat.temperament === "Bold") {
            bold.setAttribute("selected", "true")
        }
        bold.innerText = "Bold"

        const calm = document.createElement("option")
        calm.setAttribute("value", "Calm")
        if (cat.temperament === "Calm") {
            calm.setAttribute("selected", "true")
        }
        calm.innerText = "Calm"
        
        const curious = document.createElement("option")
        curious.setAttribute("value", "Curious")
        if (cat.temperament === "Curious") {
            curious.setAttribute("selected", "true")
        }
        curious.innerText = "Curious"
        
        const energetic = document.createElement("option")
        energetic.setAttribute("value", "Energetic")
        if (cat.temperament === "Energetic") {
            energetic.setAttribute("selected", "true")
        }
        energetic.innerText = "Energetic"
        
        const friendly = document.createElement("option")
        friendly.setAttribute("value", "Friendly")
        if (cat.temperament === "Friendly") {
            friendly.setAttribute("selected", "true")
        }
        friendly.innerText = "Friendly"

        const independent = document.createElement("option")
        independent.setAttribute("value", "Independent")
        if (cat.temperament === "Independent") {
            independent.setAttribute("selected", "true")
        }
        independent.innerText = "Independent"

        const loyal = document.createElement("option")
        loyal.setAttribute("value", "Loyal")
        if (cat.temperament === "Loyal") {
            loyal.setAttribute("selected", "true")
        }
        loyal.innerText = "Loyal"

        const playful = document.createElement("option")
        playful.setAttribute("value", "Playful")
        if (cat.temperament === "Playful") {
            playful.setAttribute("selected", "true")
        }
        playful.innerText = "Playful"

        const reserved = document.createElement("option")
        reserved.setAttribute("value", "Reserved")
        if (cat.temperament === "Reserved") {
            reserved.setAttribute("selected", "true")
        }
        reserved.innerText = "Reserved"

        const shy = document.createElement("option")
        shy.setAttribute("value", "Shy")
        if (cat.temperament === "Shy") {
            shy.setAttribute("selected", "true")
        }
        shy.innerText = "Shy"

        
        const sociable = document.createElement("option")
        sociable.setAttribute("value", "Sociable")
        if (cat.temperament === "Sociable") {
            sociable.setAttribute("selected", "true")
        }
        sociable.innerText = "Sociable"

        temperament.append(affectionate, bold, calm, curious, energetic, friendly, independent, loyal, playful, reserved, shy, sociable)
        tempLi.append(temperament)

        const liUpdate = document.createElement("li")
        const update = document.createElement("button")
        update.setAttribute("type", "submit")
        update.innerText = "Update"
        liUpdate.append(update)

        ul.append(tempLi, liUpdate)
        form.append(ul)
        card.append(form)
        cardsContainer.append(card)
    });

}

//filter section
const filterButton = document.querySelector("#filter-button")
const breedInput = document.querySelector("#breed-input")

filterButton.addEventListener("click", () => {
    // console.log(breedInput.value)
    getCatsByBreed(breedInput.value)
    .then((theDataReturned) => {
        displayCats(theDataReturned)
        breedInput.value = ""
    })
})