console.log(cats);
console.log(temperaments);

const temperament = temperaments;

const breedInput = document.querySelector("#breed-input");

const filterButton = document.querySelector("#filter-button");

const cards = document.querySelector(".cards");

async function fetching() {
  const allCats = await getAllCats();
  newCards(allCats);
}

function cardFunction(cat) {
  const li = document.createElement("li");
  const deleteButton = document.createElement("button");
  const cardTitle = document.createElement("h2");
  const catImage = document.createElement("img");
  const catForm = createCatForm(cat);

  li.classList.add("card");
  deleteButton.innerText = "Delete";
  cardTitle.classList.add("card--title");
  cardTitle.innerText = cat.name;
  catImage.classList.add("card--img");
  catImage.setAttribute("width", "256");
  catImage.setAttribute("src", cat.image);

  li.append(deleteButton);
  li.append(cardTitle);
  li.append(catImage);
  li.append(catForm);

  deleteButton.addEventListener("click", async () => {
    const deletedCat = await removeCat(cat.id);
    fetching();
  });

  return li;
}

function newCards(data) {
  cards.innerHTML = "";
  data.forEach((cat) => {
    const catLi = cardFunction(cat);
    cards.append(catLi);
  });
}

function createCatForm(index) {
  const form = document.createElement("form");

  const cardText = document.createElement("ul");
  cardText.classList.add("card--text");
  form.append(cardText);
  const listofAges = document.createElement("li");
  listofAges.innerText = "Age: ";

  const listofBreeds = document.createElement("li");
  listofBreeds.innerText = "Breed: ";
  cardText.append(listofBreeds);
  const listofColours = document.createElement("li");
  listofColours.innerText = "Colour: ";

  const listofTemperaments = document.createElement("li");
  listofTemperaments.innerText = "Temperament: ";
  cardText.append(listofTemperaments);
  const listofButtons = document.createElement("li");
  const submitButton = document.createElement("button");
  submitButton.setAttribute("type", "submit");
  submitButton.innerText = "Update";
  listofButtons.append(submitButton);
  const ageInput = document.createElement("input");
  ageInput.setAttribute("name", "age");
  ageInput.setAttribute("type", "number");
  ageInput.setAttribute("value", index.age);
  listofAges.append(ageInput);
  const breedInput = document.createElement("input");
  breedInput.setAttribute("name", "breed");
  breedInput.setAttribute("type", "text");

  breedInput.setAttribute("value", index.breed);
  listofBreeds.append(breedInput);
  const colourInput = document.createElement("input");

  colourInput.setAttribute("name", "colour");
  colourInput.setAttribute("type", "text");
  colourInput.setAttribute("value", index.colour);
  cardText.append(listofColours);
  listofColours.append(colourInput);
  cardText.append(listofAges);
  cardText.append(listofButtons);
  const temperamentSelect = document.createElement("select");
  temperament.forEach((temperament) => {
    const temperamentOption = document.createElement("option");
    temperamentOption.setAttribute("value", temperament);
    listofTemperaments.append(temperamentSelect);
    temperamentOption.innerText = temperament;
    if (temperament === index.temperament) {
      temperamentOption.setAttribute("selected", true);
    }
    temperamentSelect.append(temperamentOption);
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      const updatedCat = {
        age: ageInput.value,
        colour: colourInput.value,
        breed: breedInput.value,
        temperament: temperamentSelect.value,
      };

      await addingAPI(cat.id, updatedCat);
      fetching();
    } catch (errorMessage) {
      alert(errorMessage);
    }
  });

  return form;
}

filterButton.addEventListener("click", async () => {
  const findingCat = await findingBreed(breedInput.value);
  newCards(findingCat);
});

fetching();
