const cardsClass = document.querySelector('.cards')
const filterBtn = document.querySelector('#filter-button')

const tmp = temperaments

function createCard() {
  const liCardList = document.createElement('li')
  liCardList.classList.add('card')

  const deleteBtn = document.createElement('button')
  deleteBtn.innerText = 'Delete'

  const h2Title = document.createElement('h2')
  h2Title.classList.add('card--title')
  h2Title.innerText = 'Fluffy'

  const image = document.createElement('img')
  image.setAttribute('width',256)
  image.setAttribute('src',"https://neaterpets.com/cdn/shop/articles/mainecoon.jpg")
  image.classList.add('card--img')

  const form = document.createElement('form')
  const ulCardText = document.createElement('ul')
  ulCardText.classList.add('card--text')

  const liAge = document.createElement('li')
  liAge.innerText = 'Age: '

  const inputAge = document.createElement('input')
  inputAge.name = 'age'
  inputAge.type = 'number'
  inputAge.value = 5
  liAge.append(inputAge)

  const liBreed = document.createElement('li')
  liBreed.innerText = 'breed: '

  const inputBreed = document.createElement('input')
  inputBreed.name = 'breed'
  inputBreed.type = 'text'
  inputBreed.value = 'Tabby'
  liBreed.append(inputBreed)

  const liColor = document.createElement('li')
  liColor.innerText = 'Color: '

  const inputColor = document.createElement('input')
  inputColor.name = 'color'
  inputColor.type = 'text'
  inputColor.value = 'Brown'
  liColor.append(inputColor)

  const liTemperament = document.createElement('li')
  liTemperament.innerText = 'Temperament:'
  
  const select = document.createElement('select')
  select.name = 'temperament'
  
  for(index in tmp){
    const option = document.createElement('option')
    option.value = tmp[index]
    if(index === 0 ){
      option.selected = true
    }
    option.innerText = tmp[index]
    select.append(option)
  }
  liTemperament.append(select)
  
  const liUpdate = document.createElement('li')
  const updateBtn = document.createElement('button')
  updateBtn.innerText = 'Update'
  updateBtn.type = 'submit'
  liUpdate.append(updateBtn)

  ulCardText.append(liAge, liBreed, liColor, liTemperament, liUpdate)
  form.append(ulCardText)
  liCardList.append(deleteBtn, h2Title, image, form)

  cardsClass.append(liCardList)
}

function render() { 
  createCard()
 }

render()

// console.log(cats)
// console.log(temperaments)