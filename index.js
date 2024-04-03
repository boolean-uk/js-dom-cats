const container = document.querySelector('.container')
const breedFilterBtn = document.getElementById('filter-button')
const cardsList = document.querySelector('.cards')

const breedInput = document.getElementById('breed-input')

const breedSearchArea = document.querySelectorAll('div')
const breedSearchDiv = breedSearchArea[1]


breedFilterBtn.addEventListener('click', () => {
    const catBreedInput = `${breedInput.value}`
    getCatsByBreed(catBreedInput)
        .then((filteredCatsList) =>
            console.log(filteredCatsList))
        .catch((errorMessage) => {
            const breedSearchDiv = breedSearchArea[1]
            breedSearchDiv.innerHTML = 
            `
            <p>${errorMessage}</p>
            `
        })
})




getAllCats()
    .then((allCats) => {
        createCard(allCats)
    })
    

function createCard(allCats) {
    
    for(let i = 0; i < allCats.length; i++) {
        const catInfo = allCats[i]

    const listItem = document.createElement('li')
    listItem.classList.add('card')

    const deleteBtn = document.createElement('button')
    deleteBtn.innerText = 'Delete'
    listItem.append(deleteBtn)

    deleteBtn.addEventListener('click', () => {
        removeCat()
            .then((removeCatFromList) =>
                {removeCatFromList, listItem.remove()})
    })

    const catName = document.createElement('h2')
    catName.classList.add('card--title')
    catName.innerText = `${catInfo.name}`
    listItem.append(catName)
    

    const catImg = document.createElement('img')
    catImg.width = '256'
    catImg.classList.add('card--img')
    catImg.setAttribute('src', catInfo.image)
    listItem.append(catImg)

    
    const form = document.createElement('form')

    const cardText = document.createElement('ul')
    cardText.classList.add('card--text')

    const catAge = document.createElement('li')
    catAge.innerText = 'Age:'
    const catAgeInput = document.createElement('input')
    catAgeInput.name = 'age'
    catAgeInput.type = 'number'
    catAgeInput.value = `${catInfo.age}`
    catAge.append(catAgeInput)
    cardText.append(catAge)

    const catBreed = document.createElement('li')
    catBreed.innerText = 'Breed:'
    const catBreedInput = document.createElement('input')
    catBreedInput.name = 'breed'
    catBreedInput.type = 'text'
    catBreedInput.value = `${catInfo.breed}`
    catBreed.append(catBreedInput)
    cardText.append(catBreed)

    const catColour = document.createElement('li')
    catColour.innerText = 'Colour:'
    const catColourInput = document.createElement('input')
    catColourInput.name = 'colour'
    catColourInput.type = 'text'
    catColourInput.value = `${catInfo.colour}`
    catColour.append(catColourInput)
    cardText.append(catColour)

    const temperamentList = document.createElement('li')
    temperamentList.innerText = 'Temperament:'

    const selectList = document.createElement('select')
    selectList.name = 'temperament'


    const affectionateOption = document.createElement('option')
    affectionateOption.value = 'Affectionate'
    affectionateOption.innerText = 'Affectionate'
    selectList.append(affectionateOption)

    const boldOption = document.createElement('option')
    boldOption.value = 'Bold'
    boldOption.innerText = 'Bold'
    selectList.append(boldOption)

    const calmOption = document.createElement('option')
    calmOption.value = 'Calm'
    calmOption.innerText = 'Calm'
    selectList.append(calmOption)

    const curiousOption = document.createElement('option')
    curiousOption.value = 'Curious'
    curiousOption.innerText = 'Curious'
    selectList.append(curiousOption)
    
    const energeticOption = document.createElement('option')
    energeticOption.value = 'Energetic'
    energeticOption.innerText = 'Energetic'
    selectList.append(energeticOption)

    const friendlyOption = document.createElement('option')
    friendlyOption.value = 'Friendly'
    friendlyOption.innerText = 'Friendly'
    selectList.append(friendlyOption)

    const independentOption = document.createElement('option')
    independentOption.value = 'Independent'
    independentOption.innerText = 'Independent'
    selectList.append(independentOption)

    const loyalOption = document.createElement('option')
    loyalOption.value = 'Loyal'
    loyalOption.innerText = 'Loyal'
    selectList.append(loyalOption)

    const playfulOption = document.createElement('option')
    playfulOption.value = 'Playful'
    playfulOption.innerText = 'Playful'
    selectList.append(playfulOption)

    const reservedOption = document.createElement('option')
    reservedOption.value = 'Reserved'
    reservedOption.innerText = 'Reserved'
    selectList.append(reservedOption)

    const shyOption = document.createElement('option')
    shyOption.value = 'Shy'
    shyOption.innerText = 'Shy'
    selectList.append(shyOption)

    const sociableOption = document.createElement('option')
    sociableOption.value = 'Sociable'
    sociableOption.innerText = 'Sociable'
    selectList.append(sociableOption)

    temperamentList.append(selectList)
    cardText.append(temperamentList)
    

    const submitBtn = document.createElement('button')
    submitBtn.type = 'submit'
    submitBtn.innerText = 'Sociable'
    cardText.append(submitBtn)

    form.append(cardText)
    listItem.append(form)

    cardsList.append(listItem)
    }

}




