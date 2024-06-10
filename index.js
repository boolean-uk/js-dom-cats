// console.log(cats);
// console.log(temperaments);

// Get all the DOM elements
const cardsContainer = document.querySelector(".cards");
const filterButton = document.getElementById("filter-button");
const breedInput = document.getElementById("breed-input");

// Function to create a cat card
function createCatCard(cat) {
  const card = document.createElement("li");
  card.classList.add("card");

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.dataset.id = cat.id;
  deleteButton.classList.add("delete-button");
  card.appendChild(deleteButton);

  const title = document.createElement("h2");
  title.classList.add("card--title");
  title.textContent = cat.name;
  card.appendChild(title);

  const img = document.createElement("img");
  img.width = 256;
  img.classList.add("card--img");
  img.src = cat.image;
  card.appendChild(img);

  const form = document.createElement("form");
  form.dataset.id = cat.id;

  const ul = document.createElement("ul");
  ul.classList.add("card--text");

  const liAge = document.createElement("li");
  const ageInput = document.createElement("input");
  ageInput.name = "age";
  ageInput.type = "number";
  ageInput.value = cat.age;
  liAge.textContent = "Age: ";
  liAge.appendChild(ageInput);
  ul.appendChild(liAge);

  const liBreed = document.createElement("li");
  const breedInput = document.createElement("input");
  breedInput.name = "breed";
  breedInput.type = "text";
  breedInput.value = cat.breed;
  liBreed.textContent = "Breed: ";
  liBreed.appendChild(breedInput);
  ul.appendChild(liBreed);

  const liColour = document.createElement("li");
  const colourInput = document.createElement("input");
  colourInput.name = "colour";
  colourInput.type = "text";
  colourInput.value = cat.colour;
  liColour.textContent = "Colour: ";
  liColour.appendChild(colourInput);
  ul.appendChild(liColour);

  const liTemperament = document.createElement("li");
  const temperamentLabel = document.createElement("label");
  temperamentLabel.textContent = "Temperament:";
  liTemperament.appendChild(temperamentLabel);
  const selectTemperament = document.createElement("select");
  selectTemperament.name = "temperament";
  temperaments.forEach((temperament) => {
    const option = document.createElement("option");
    option.value = temperament;
    option.textContent = temperament;
    if (cat.temperament === temperament) {
      option.selected = true;
    }
    selectTemperament.appendChild(option);
  });
  liTemperament.appendChild(selectTemperament);
  ul.appendChild(liTemperament);

  const liUpdate = document.createElement("li");
  const updateButton = document.createElement("button");
  updateButton.type = "submit";
  updateButton.classList.add("update-button");
  updateButton.textContent = "Update";
  liUpdate.appendChild(updateButton);
  ul.appendChild(liUpdate);

  form.appendChild(ul);
  card.appendChild(form);

  return card;
}

// Function to display cats
async function displayCats(cats) {
  cardsContainer.innerHTML = "";
  cats.forEach((cat) => {
    const catCard = createCatCard(cat);
    cardsContainer.appendChild(catCard);
  });
  addEventListeners();
}

// Function to get all cats and display them
async function loadAllCats() {
  const allCats = await getAllCats();
  displayCats(allCats);
}

// Function to get cats by breed and display them
async function loadCatsByBreed(breed) {
  const catsByBreed = await getCatsByBreed(breed);
  displayCats(catsByBreed);
}

// Event listener for filter button
filterButton.addEventListener("click", () => {
  const breed = breedInput.value;
  if (breed) {
    loadCatsByBreed(breed);
  } else {
    loadAllCats();
  }
});

// Event listener for delete button and update form
function addEventListeners() {
  document.querySelectorAll(".delete-button").forEach((button) => {
    button.addEventListener("click", async (event) => {
      const catId = parseInt(event.target.dataset.id);
      await removeCat(catId);
      loadAllCats();
    });
  });

  document.querySelectorAll(".card form").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const catId = parseInt(form.dataset.id);
      const formData = new FormData(form);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      await updateCat(catId, data);
      loadAllCats();
    });
  });
}

// Initialize
loadAllCats();

// Get cats from the cat API
// const apiKey =
//   "live_tze1wIBwdDMieNT9R1KclOjqD1T7NJyWujZrBm5PosIo1kjx0vCaplyDlUOxkOW6";
// const cardsContainer = document.querySelector(".cards");
// const filterButton = document.getElementById("filter-button");
// const breedInput = document.getElementById("breed-input");

// async function fetchCats() {
//   const response = await fetch(
//     "https://api.thecatapi.com/v1/images/search?limit=10",
//     {
//       headers: {
//         "x-api-key": apiKey,
//       },
//     }
//   );
//   const cats = await response.json();
//   return cats.map((cat) => ({
//     id: cat.id,
//     name: cat.id,
//     age: Math.floor(Math.random() * 10),
//     breed: cat.breeds.length > 0 ? cat.breeds[0].name : "Unknown",
//     colour: "Unknown",
//     temperament: "Unknown",
//     image: cat.url,
//   }));
// }

// async function fetchBreeds() {
//   const response = await fetch("https://api.thecatapi.com/v1/breeds", {
//     headers: {
//       "x-api-key": apiKey,
//     },
//   });
//   const breeds = await response.json();
//   return breeds;
// }

// function createCatCard(cat) {
//   const card = document.createElement("li");
//   card.classList.add("card");

//   const deleteButton = document.createElement("button");
//   deleteButton.textContent = "Delete";
//   deleteButton.dataset.id = cat.id;
//   deleteButton.classList.add("delete-button");
//   card.appendChild(deleteButton);

//   const title = document.createElement("h2");
//   title.classList.add("card--title");
//   title.textContent = cat.name;
//   card.appendChild(title);

//   const img = document.createElement("img");
//   img.width = 256;
//   img.classList.add("card--img");
//   img.src = cat.image;
//   card.appendChild(img);

//   const form = document.createElement("form");
//   form.dataset.id = cat.id;

//   const ul = document.createElement("ul");
//   ul.classList.add("card--text");

//   const liAge = document.createElement("li");
//   liAge.innerHTML = `Age: <input name="age" type="number" value="${cat.age}" />`;
//   ul.appendChild(liAge);

//   const liBreed = document.createElement("li");
//   liBreed.innerHTML = `Breed: <input name="breed" type="text" value="${cat.breed}" />`;
//   ul.appendChild(liBreed);

//   const liColour = document.createElement("li");
//   liColour.innerHTML = `Colour: <input name="colour" type="text" value="${cat.colour}" />`;
//   ul.appendChild(liColour);

//   const liTemperament = document.createElement("li");
//   const temperamentLabel = document.createElement("label");
//   temperamentLabel.textContent = "Temperament:";
//   liTemperament.appendChild(temperamentLabel);
//   const selectTemperament = document.createElement("select");
//   selectTemperament.name = "temperament";
//   temperaments.forEach((temperament) => {
//     const option = document.createElement("option");
//     option.value = temperament;
//     option.textContent = temperament;
//     if (cat.temperament === temperament) {
//       option.selected = true;
//     }
//     selectTemperament.appendChild(option);
//   });
//   liTemperament.appendChild(selectTemperament);
//   ul.appendChild(liTemperament);

//   const liUpdate = document.createElement("li");
//   const updateButton = document.createElement("button");
//   updateButton.type = "submit";
//   updateButton.classList.add("update-button");
//   updateButton.textContent = "Update";
//   liUpdate.appendChild(updateButton);
//   ul.appendChild(liUpdate);

//   form.appendChild(ul);
//   card.appendChild(form);

//   return card;
// }

// async function displayCats(cats) {
//   cardsContainer.innerHTML = "";
//   cats.forEach((cat) => {
//     const catCard = createCatCard(cat);
//     cardsContainer.appendChild(catCard);
//   });
//   addEventListeners();
// }

// async function loadAllCats() {
//   const allCats = await fetchCats();
//   displayCats(allCats);
// }

// async function loadCatsByBreed(breed) {
//   const breeds = await fetchBreeds();
//   const breedData = breeds.find(
//     (b) => b.name.toLowerCase() === breed.toLowerCase()
//   );
//   if (breedData) {
//     const response = await fetch(
//       `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${breedData.id}`,
//       {
//         headers: {
//           "x-api-key": apiKey,
//         },
//       }
//     );
//     const cats = await response.json();
//     const formattedCats = cats.map((cat) => ({
//       id: cat.id,
//       name: cat.id,
//       age: Math.floor(Math.random() * 10),
//       breed: breedData.name,
//       colour: "Unknown",
//       temperament: "Unknown",
//       image: cat.url,
//     }));
//     displayCats(formattedCats);
//   }
// }

// filterButton.addEventListener("click", () => {
//   const breed = breedInput.value;
//   if (breed) {
//     loadCatsByBreed(breed);
//   } else {
//     loadAllCats();
//   }
// });

// function addEventListeners() {
//   document.querySelectorAll(".delete-button").forEach((button) => {
//     button.addEventListener("click", async (event) => {
//       const catId = event.target.dataset.id;
//       // Remove the cat card directly from DOM
//       const card = event.target.closest(".card");
//       card.remove();
//     });
//   });

//   document.querySelectorAll(".card form").forEach((form) => {
//     form.addEventListener("submit", async (event) => {
//       event.preventDefault();
//       const catId = form.dataset.id;
//       const formData = new FormData(form);
//       const data = {};
//       formData.forEach((value, key) => {
//         data[key] = value;
//       });
//       // Log the updated data
//       console.log(`Update cat ${catId} with data:`, data);
//     });
//   });
// }

// loadAllCats();
