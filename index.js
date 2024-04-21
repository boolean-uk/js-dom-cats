console.log(cats);
console.log(temperaments);

const container = document.querySelector(".container");
const breedFilter = document.getElementById("filter-button");

// 2. Enable the breed filter form by adding a click event listener to the button.
breedFilter.addEventListener('click', () => {
    if (breedFilter === cats[i].breed){
        catsCard.append()
    }
})



for (let i = 0; i < cats.length; i++) {
  const cardsList = document.querySelector(".cards");

  const catsCard = document.createElement("li");
  catsCard.classList.add("card");
  cardsList.append(catsCard);

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  catsCard.append(deleteBtn);

  deleteBtn.addEventListener("click", () => {
    catsCard.remove();
  });

  const h2 = document.createElement("h2");
  h2.classList.add("card--title");
  h2.innerText = cats[i].name;
  catsCard.append(h2);

  const image = document.createElement("img");
  image.setAttribute('width','256')
  image.classList.add("card--img");
  image.setAttribute("src", cats[i].image);
  catsCard.append(image);

  const form = document.createElement("form");
  catsCard.append(form);

  const cardText = document.createElement("ul");
  cardText.classList.add("card--text");
  form.append(cardText);

  const catAge = document.createElement("li");
  form.append(catAge);

  const catAgeInput = document.createElement("input");
  catAge.innerText = "Age: ";
  catAgeInput.setAttribute("name", "age");
  catAgeInput.setAttribute("type", "number");
  catAgeInput.setAttribute("value", cats[i].age);
  catAge.append(catAgeInput);

  const catBreed = document.createElement("li");
  form.append(catBreed);

  const catBreedInput = document.createElement("input");
  catBreed.innerText = "Breed: ";
  catBreedInput.setAttribute("name", "breed");
  catBreedInput.setAttribute("type", "text");
  catBreedInput.setAttribute("value", cats[i].breed);
  catBreed.append(catBreedInput);

  const catColour = document.createElement("li");
  form.append(catColour);

  const catColourInput = document.createElement("input");
  catColour.innerText = "Colour: ";
  catColourInput.setAttribute("name", "colour");
  catColourInput.setAttribute("type", "text");
  catColourInput.setAttribute("value", cats[i].colour);
  catColour.append(catColourInput);

  const tempLi = document.createElement("li");
  tempLi.innerText = "Temperament: ";
  form.append(tempLi);

  const temperament = document.createElement("select");
  temperament.setAttribute("name", "temperament");
  tempLi.append(temperament);

  const tempOption1 = document.createElement("option");
  tempOption1.setAttribute("value", "Affectionate");
  tempOption1.setAttribute("selected", "true");
  tempOption1.innerText = "Affectionate";
  temperament.append(tempOption1);

  const tempOption2 = document.createElement("option");
  tempOption2.setAttribute("value", "Bold");
  tempOption2.innerText = "Bold";
  temperament.append(tempOption2);

  const tempOption3 = document.createElement("option");
  tempOption3.setAttribute("value", "Calm");
  tempOption3.innerText = "Calm";
  temperament.append(tempOption3);

  const tempOption4 = document.createElement("option");
  tempOption4.setAttribute("value", "Curious");
  tempOption4.innerText = "Curious";
  temperament.append(tempOption4);

  const tempOption5 = document.createElement("option");
  tempOption5.setAttribute("value", "Energetic");
  tempOption5.innerText = "Energetic";
  temperament.append(tempOption5);

  const tempOption6 = document.createElement("option");
  tempOption6.setAttribute("value", "Friendly");
  tempOption6.innerText = "Friendly";
  temperament.append(tempOption6);

  const tempOption7 = document.createElement("option");
  tempOption7.setAttribute("value", "Independent");
  tempOption7.innerText = "Independent";
  temperament.append(tempOption7);

  const tempOption8 = document.createElement("option");
  tempOption8.setAttribute("value", "Loyal");
  tempOption8.innerText = "Loyal";
  temperament.append(tempOption8);

  const tempOption9 = document.createElement("option");
  tempOption9.setAttribute("value", "Playful");
  tempOption9.innerText = "Playful";
  temperament.append(tempOption9);

  const tempOption10 = document.createElement("option");
  tempOption10.setAttribute("value", "Reserved");
  tempOption10.innerText = "Reserved";
  temperament.append(tempOption10);

  const tempOption11 = document.createElement("option");
  tempOption11.setAttribute("value", "Shy");
  tempOption11.innerText = "Shy";
  temperament.append(tempOption11);

  const tempOption12 = document.createElement("option");
  tempOption12.setAttribute("value", "Sociable");
  tempOption12.innerText = "Sociable";
  temperament.append(tempOption12);

  const submitLi = document.createElement("li");
  tempLi.append(submitLi);

  const submitBtn = document.createElement("button");
  submitBtn.setAttribute("type", "submit");
  submitBtn.innerText = "Update";
  submitLi.append(submitBtn);
}

