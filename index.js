// console.log(cats);
// console.log(temperaments);

const state = {
  catsArray: [],
};

const CARDS_UL = document.querySelector(".cards");

async function deleteKitter(catId) {
  await removeCat(catId);
  getKitterAll();
}

function createCatForm(currentCat) {
  const catForm = document.createElement("form");
  const catFormUl = document.createElement("ul");
  catFormUl.className = "card--text";

  const ageLi = document.createElement("li");
  ageLi.textContent = "Age: ";
  const ageInput = document.createElement("input");
  ageInput.name = "age";
  ageInput.type = "number";
  ageInput.value = currentCat.age;
  ageLi.appendChild(ageInput);

  const breedLi = document.createElement("li");
  breedLi.textContent = "Breed: ";
  const breedInput = document.createElement("input");
  breedInput.name = "breed";
  breedInput.type = "text";
  breedInput.value = currentCat.breed;
  breedLi.appendChild(breedInput);

  const colourLi = document.createElement("li");
  colourLi.textContent = "Colour: ";
  const colourInput = document.createElement("input");
  colourInput.name = "colour";
  colourInput.type = "text";
  colourInput.value = currentCat.colour;
  colourLi.appendChild(colourInput);

  const temperamentLi = document.createElement("li");
  colourLi.textContent = "Temperament: ";
  const temperamentSelect = document.createElement("select");
  temperamentSelect.name = "temperament";
  for (let i = 0; i < temperaments.length; i++) {
    const currentTemperament = temperaments[i];
    const temperamentOption = document.createElement("option");
    temperamentOption.value = currentTemperament;
    temperamentOption.textContent = currentTemperament;
    if (currentTemperament == currentCat.temperament) {
      temperamentOption.setAttribute("selected", "true");
    }
    temperamentSelect.appendChild(temperamentOption);
  }
  temperamentLi.appendChild(temperamentSelect);

  const buttonLi = document.createElement("li");
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Update";
  buttonLi.appendChild(submitButton);

  catFormUl.append(ageLi, breedLi, colourLi, temperamentLi, buttonLi);
  catForm.appendChild(catFormUl);

  return catForm;
}

function renderCat(currentCat) {
  const cardItselfLi = document.createElement("li");
  cardItselfLi.className = "card";

  const delButton = document.createElement("button");
  delButton.id = "delete-button";
  delButton.textContent = "Delete";

  delButton.addEventListener("click", () => {
    deleteKitter(currentCat.id);
  });

  const catTitleH2 = document.createElement("h2");
  catTitleH2.className = "card--title";
  catTitleH2.textContent = currentCat.name;

  const catImg = document.createElement("img");
  catImg.width = "256";
  catImg.className = "card--img";
  catImg.src = currentCat.image;

  const catForm = createCatForm(currentCat);

  cardItselfLi.append(delButton, catTitleH2, catImg, catForm);
  CARDS_UL.appendChild(cardItselfLi);
}

function renderCats() {
  CARDS_UL.innerHTML = "";
  for (let i = 0; i < state.catsArray.length; i++) {
    const currentCat = state.catsArray[i];
    renderCat(currentCat);
  }
  console.log(state.catsArray);
}

async function getKitterAll() {
  state.catsArray = await getAllCats();
  renderCats();
}

async function getKitterByBreed(breed) {
  state.catsArray = await getCatsByBreed(breed);
  renderCats();
}

getKitterAll();

const filterButton = document.querySelector("#filter-button");

filterButton.addEventListener("click", () => {
  event.preventDefault();
  let breedInput = document.querySelector("#breed-input").value;
  breedInput = breedInput.charAt(0).toUpperCase() + breedInput.slice(1);
  getKitterByBreed(breedInput);
  if (breedInput == "") {
    getKitterAll();
  }
});
