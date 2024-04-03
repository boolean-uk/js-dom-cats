// console.log(cats)
// console.log(temperaments)

// <li class="card">
//     <button>Delete</button>
//     <h2 class="card--title">Fluffy</h2>
//     <img
//         width="256"
//         class="card--img"
//         src="https://neaterpets.com/cdn/shop/articles/mainecoon.jpg"
//     />
//     <form>
//         <ul class="card--text">
//             <li>Age: <input name="age" type="number" value="5" /></li>
//             <li>Breed: <input name="breed" type="text" value="Tabby" /></li>
//             <li>Colour: <input name="colour" type="text" value="Brown" /></li>
//             <li>
//                 Temperament: 
//                 <select name="temperament">
//                     <option value="Affectionate" selected="true">Affectionate</option>
//                     <option value="Bold">Bold</option>
//                     <option value="Calm">Calm</option>
//                     <option value="Curious">Curious</option>
//                     <option value="Energetic">Energetic</option>
//                     <option value="Friendly">Friendly</option>
//                     <option value="Independent">Independent</option>
//                     <option value="Loyal">Loyal</option>
//                     <option value="Playful">Playful</option>
//                     <option value="Reserved">Reserved</option>
//                     <option value="Shy">Shy</option>
//                     <option value="Sociable">Sociable</option>
//                 </select>
//             </li>
//             <li>
//                 <button type="submit">Update</button>
//             </li>
//         </ul>
//     </form>
// </li>

//Build Form
const buildCatCard = cat => {
    const cardsUL = document.querySelector('.cards')

    const cardLi = document.createElement('li')
    cardLi.classList.add('card')

    const deleteButton = document.createElement('button')
    deleteButton.innerText = 'Delete'
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

//Filter by breed
const filterButton = document.querySelector('#filter-button')
filterButton.addEventListener('click', async () => {
    const cardsUL = document.querySelector('.cards')
    cardsUL.innerHTML = ''
    const breedInput = document.querySelector('#breed-input').value
    const filteredCats = await getCatsByBreed(breedInput)
    filteredCats.forEach(buildCatCard)
})




cats.forEach(buildCatCard)