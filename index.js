console.log(cats)
console.log(temperaments)

async function displayBreed() {
    const breedInput = document.querySelector('#breed-input')
    const breedBtn = document.querySelector('#filter-button')

    try {
        breedBtn.addEventListener('click', async () => {
            const breedFiltered = breedInput.value.trim()

            if (breedFiltered === '') {
                displayCards()
            } else {
                const filteredCats = await getCatsByBreed(breedFiltered)
                displayCards(filteredCats)
            }
        })
    } catch (error) {
        console.log('Error:', error)
    }
}

async function displayCards(filteredCats) {
    const cards = document.querySelector('.cards')
    cards.innerHTML = ''

    try {
        const catsList = filteredCats || await getAllCats()
        
        for (let i = 0; i < catsList.length; i++) {
            const card = document.createElement('li')
            card.classList.add('card')
            cards.append(card)

            const deleteBtn = document.createElement('button')
            deleteBtn.innerText = 'Delete'
            card.append(deleteBtn)

            deleteBtn.addEventListener('click', async () => {
                await removeCat(catsList[i].id)
                displayCards()
            })

            const cardTitle = document.createElement('h2')
            cardTitle.classList.add('card--title')
            cardTitle.innerText = catsList[i].name
            card.append(cardTitle)

            const cardImage = document.createElement('img')
            cardImage.classList.add('card--img')
            cardImage.setAttribute('width', '256')
            cardImage.setAttribute('src', catsList[i].image)
            card.append(cardImage)

            const cardForm = document.createElement('form')
            card.append(cardForm)

            const cardText = document.createElement('ul')
            cardText.classList.add('card--text')
            cardForm.append(cardText)

            const cardLiAge = document.createElement('li')
            cardLiAge.innerText = 'Age: '
            cardText.append(cardLiAge)

            const cardInputAge = document.createElement('input')
            cardInputAge.setAttribute('name', 'age')
            cardInputAge.setAttribute('type', 'number')
            cardInputAge.setAttribute('value', catsList[i].age)
            cardLiAge.append(cardInputAge)

            const cardLiBreed = document.createElement('li')
            cardLiBreed.innerText = 'Breed: '
            cardText.append(cardLiBreed)

            const cardInputBreed = document.createElement('input')
            cardInputBreed.setAttribute('name', 'breed')
            cardInputBreed.setAttribute('type', 'text')
            cardInputBreed.setAttribute('value', catsList[i].breed)
            cardLiBreed.append(cardInputBreed)

            const cardLiColour = document.createElement('li')
            cardLiColour.innerText = 'Colour: '
            cardText.append(cardLiColour)

            const cardInputColour = document.createElement('input')
            cardInputColour.setAttribute('name', 'colour')
            cardInputColour.setAttribute('type', 'text')
            cardInputColour.setAttribute('value', catsList[i].colour)
            cardLiColour.append(cardInputColour)

            const cardLiTemperament = document.createElement('li')
            cardLiTemperament.innerText = 'Temperament: '
            cardText.append(cardLiTemperament)

            const cardSelectName = document.createElement('select')
            cardSelectName.setAttribute('name', 'temperament')
            cardLiTemperament.append(cardSelectName)

            const cardOption = document.createElement('option')
            cardOption.setAttribute('value', catsList[i].temperament)
            cardOption.innerText = catsList[i].temperament
            cardOption.setAttribute('selected', 'true')
            cardSelectName.append(cardOption)

            for (let j = 0; j < temperaments.length; j++) {            
                const allCardOptions = document.createElement('option')
                allCardOptions.setAttribute('value', temperaments[j])
                allCardOptions.innerText = temperaments[j]
                cardSelectName.append(allCardOptions)

                if (allCardOptions.innerText === cardOption.innerText) {
                    allCardOptions.style.display = 'none'
                }
            }

            const cardLiUpdate = document.createElement('li')
            cardText.append(cardLiUpdate)

            const updateBtn = document.createElement('button')
            updateBtn.setAttribute('type', 'submit')
            updateBtn.innerText = 'Update'
            cardLiUpdate.append(updateBtn)
        }
    } catch (error) {
        console.log('Error:', error)
    }
}

displayBreed()
displayCards()