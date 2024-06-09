console.log(cats);
console.log(temperaments);
console.log("TESTING");
console.log(cats[0].name);

const cardUl = document.querySelector(".cards");
let catName = cats.name
let catImg = cats.img

for (let i = 0; i < cats.length; i++) {
  catName = cats[i].name;
    catImg = cats[i].image;
  renderCats(catName, catImg);
}
console.log("catIMG", catImg)
console.log("catname", catName)

function getTemp(select) {
  for (let i = 0; i < temperaments.length; i++) {
    let temp = temperaments[i];
    const option = document.createElement("option");
    option.value = temp;
    option.text = temp;
    if (temp === "Affectionate") {
      option.selected = true;
    }
    select.appendChild(option);
  }
}
function renderCats(catName, catImg) {
  const cardLi = document.createElement("li");
  cardUl.appendChild(cardLi);
  const button = document.createElement("button");
  button.textContent = "Delete";
  const h2 = document.createElement("h2");
  h2.classList = "card--title";

  h2.textContent = catName;
  const img = document.createElement("img");
  img.width = "256";
  img.classList = "card--img";
  img.src = catImg;
  cardLi.append(button, h2, img);

  const form = document.createElement("form");
  cardLi.appendChild(form);
  const formList = document.createElement("ul");
  formList.classList = "card--text";
  form.appendChild(formList);

  const ageLi = document.createElement("li");
  formList.appendChild(ageLi);
  ageLi.textContent = "Age: ";
  const ageInput = document.createElement("input");
  ageInput.name = "age";
  ageInput.type = "number";
  ageInput.value = "5";
  ageLi.appendChild(ageInput);

  const breedLi = document.createElement("li");
  formList.appendChild(breedLi);
  breedLi.textContent = "Breed: ";
  const breedInput = document.createElement("input");
  breedInput.name = "breed";
  breedInput.type = "text";
  breedInput.value = "Tabby";
  breedLi.appendChild(breedInput);

  const colourLi = document.createElement("li");
  formList.appendChild(colourLi);
  colourLi.textContent = "Colour: ";
  const colourInput = document.createElement("input");
  colourInput.name = "colour";
  colourInput.type = "number";
  colourInput.value = "5";
  colourLi.appendChild(colourInput);

  const temperamentLi = document.createElement("li");
  temperamentLi.textContent = "Temperament: ";
  const select = document.createElement("select");
  select.name = "temperament";
  temperamentLi.appendChild(select);
  formList.append(ageLi, breedLi, colourLi, temperamentLi);
  getTemp(select);

  const buttonLi = document.createElement("li");
  formList.appendChild(buttonLi);
  const btn = document.createElement("button");
  btn.type = "submit";
  btn.textContent = "Update";
  buttonLi.appendChild(btn);

}
// renderCats(catName, catImg);

async function getJoke() {
    try {
      const response = await fetch('https://api.chucknorris.io/jokes/random');
      const joke = await response.json();
      console.log('async/await version : ' + joke.value);
    } catch (error) {
      console.log('error: ', error)
    }
  }

async function getAllCats() {
    return new Promise(res => {
        setTimeout(() => res(cats), 1000)
    })
}
getAllCats()