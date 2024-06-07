console.log(cats);
console.log(temperaments);

async function getData() {
  const catArray = await getAllCats();
  console.log(catArray);
  createCatCards(catArray);
}

function createCatCards(catArray) {
  const cardsContainer = document.querySelector(".cards");
  cardsContainer.innerHTML = "";

  catArray.forEach((cat) => {
    const catCard = document.createElement("li");
    catCard.className = "card";
    cardsContainer.append(catCard);

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    catCard.append(deleteButton);

    deleteButton.addEventListener("click", async () => {
      const deletedCat = await removeCat(cat.id);
      getData();
    });

    const cardTitle = document.createElement("h2");
    cardTitle.className = "card--title";
    cardTitle.innerHTML = cat.name;
    catCard.append(cardTitle);

    const catImg = document.createElement("img");
    catImg.width = "256";
    catImg.className = "card--img";
    catImg.src = cat.image;
    catCard.append(catImg);

    catCard.append(createCatForm(cat));
  });
}

function createCatForm(cat) {
  const temperamentArray = temperaments;

  const catForm = document.createElement("form");

  const cardText = document.createElement("ul");
  cardText.className = "card--text";
  catForm.append(cardText);

  const ageLi = document.createElement("li");
  ageLi.innerText = "Age: ";
  catForm.append(ageLi);

  const ageInput = document.createElement("input");
  ageInput.name = "age";
  ageInput.type = "number";
  ageInput.value = cat.age;
  ageLi.append(ageInput);

  const breedLi = document.createElement("li");
  breedLi.innerText = "Breed: ";
  catForm.append(breedLi);

  const breedInput = document.createElement("input");
  breedInput.name = "breed";
  breedInput.type = "text";
  breedInput.value = cat.breed;
  breedLi.append(breedInput);

  const colourLi = document.createElement("li");
  colourLi.innerText = "Colour: ";
  catForm.append(colourLi);

  const colourInput = document.createElement("input");
  colourInput.name = "colour";
  colourInput.type = "text";
  colourInput.value = cat.colour;
  colourLi.append(colourInput);

  const temperamentLi = document.createElement("li");
  temperamentLi.textContent = "Temperament: ";
  catForm.append(temperamentLi);

  const temperamentSelect = document.createElement("select");
  temperamentSelect.name = "temperament";
  temperamentLi.append(temperamentSelect);

  temperamentArray.forEach((temperament) => {
    const temperamentOpt = document.createElement("option");
    temperamentOpt.value = temperament;
    temperamentOpt.textContent = temperament;
    if (cat.temperament === temperament) {
      temperamentOpt.selected = "true";
    }
    temperamentSelect.append(temperamentOpt);
  });

  const submitli = document.createElement("li");
  catForm.append(submitli);

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Update";
  submitli.append(submitButton);

  submitButton.addEventListener("click", async () => {
    event.preventDefault();
    const data = {};
    data.age = ageInput.value;
    data.breed = breedInput.value;
    data.colour = colourInput.value;
    data.temperament = temperamentSelect.value;
    const updatedCat = await updateCat(cat.id, data);
    getData();
  });
  return catForm;
}

const filterButton = document.querySelector("#filter-button");
const filterInput = document.querySelector("#breed-input");

filterButton.addEventListener("click", async () => {
  const filteredCats = await getCatsByBreed(filterInput.value);
  createCatCards(filteredCats);
});

getData();
