console.log(cats);
console.log(temperaments);
document.addEventListener("DOMContentLoaded", () => {
  const cardsContainer = document.querySelector(".cards");
  const filterButton = document.getElementById("filter-button");
  const breedInput = document.getElementById("breed-input");

  async function fetchAndDisplayCats() {
    const cats = await getAllCats();
    displayCats(cats);
  }

  function createCatCard(cat) {
    const card = document.createElement("li");
    card.className = "card";

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";
    deleteButton.dataset.id = cat.id;
    card.appendChild(deleteButton);

    const title = document.createElement("h2");
    title.className = "card--title";
    title.textContent = cat.name;
    card.appendChild(title);

    const img = document.createElement("img");
    img.className = "card--img";
    img.width = 256;
    img.src = cat.image;
    card.appendChild(img);

    const form = document.createElement("form");
    form.dataset.id = cat.id;

    const ul = document.createElement("ul");
    ul.className = "card--text";

    const ageLi = document.createElement("li");
    const ageInput = document.createElement("input");
    ageInput.name = "age";
    ageInput.type = "number";
    ageInput.value = cat.age;
    ageLi.textContent = "Age: ";
    ageLi.appendChild(ageInput);
    ul.appendChild(ageLi);

    const breedLi = document.createElement("li");
    const breedInput = document.createElement("input");
    breedInput.name = "breed";
    breedInput.type = "text";
    breedInput.value = cat.breed;
    breedLi.textContent = "Breed: ";
    breedLi.appendChild(breedInput);
    ul.appendChild(breedLi);

    const colourLi = document.createElement("li");
    const colourInput = document.createElement("input");
    colourInput.name = "colour";
    colourInput.type = "text";
    colourInput.value = cat.colour;
    colourLi.textContent = "Colour: ";
    colourLi.appendChild(colourInput);
    ul.appendChild(colourLi);

    const temperamentLi = document.createElement("li");
    const select = document.createElement("select");
    select.name = "temperament";
    temperaments.forEach((temp) => {
      const option = document.createElement("option");
      option.value = temp;
      option.textContent = temp;
      if (cat.temperament === temp) {
        option.selected = true;
      }
      select.appendChild(option);
    });
    temperamentLi.textContent = "Temperament: ";
    temperamentLi.appendChild(select);
    ul.appendChild(temperamentLi);

    const updateLi = document.createElement("li");
    const updateButton = document.createElement("button");
    updateButton.type = "submit";
    updateButton.textContent = "Update";
    updateLi.appendChild(updateButton);
    ul.appendChild(updateLi);

    form.appendChild(ul);
    card.appendChild(form);

    return card;
  }

  function displayCats(cats) {
    while (cardsContainer.firstChild) {
      cardsContainer.removeChild(cardsContainer.firstChild);
    }

    cats.forEach((cat) => {
      const card = createCatCard(cat);
      cardsContainer.appendChild(card);
    });

    addEventListeners();
  }

  function addEventListeners() {
    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", async (event) => {
        const catId = parseInt(event.target.dataset.id);
        await removeCat(catId);
        fetchAndDisplayCats();
      });
    });

    const updateForms = document.querySelectorAll("form");
    updateForms.forEach((form) => {
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const catId = parseInt(event.target.dataset.id);
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        await updateCat(catId, data);
        fetchAndDisplayCats();
      });
    });
  }

  filterButton.addEventListener("click", async () => {
    const breed = breedInput.value.trim();
    if (breed) {
      const cats = await getCatsByBreed(breed);
      displayCats(cats);
    } else {
      fetchAndDisplayCats();
    }
  });

  fetchAndDisplayCats();
});
