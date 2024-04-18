console.log(cats);
console.log(temperaments);

let catsArray = [];
const buttonFilter = document.getElementById("filter-button");
buttonFilter.addEventListener("click", async () => {
  const term = document.getElementById("breed-input").value;
  if (term.length < 1) {
    render(await getAllCats());
    return;
  }
  render(await getCatsByBreed(term));
});
const handleOnSubmitCatUpdateForm = async (event) => {
  event.preventDefault();
  let id = Number(event.target.elements["id"].value);
  let age = event.target.elements["age"].value;
  let breed = event.target.elements["breed"].value;
  let colour = event.target.elements["colour"].value;
  let temperament = event.target.elements["temperament"].value;

  console.log({ id, age, breed, colour, temperament });
  await updateCat(id, { id, age, breed, colour, temperament });
  render(await getAllCats());
};
const handleOnClickDeleteCat = async (event) => {
  await removeCat(Number(event.target.value));
  render(await getAllCats());
};
const render = (catsArray) => {
  let listOfCats = document.querySelector("ul");
  listOfCats.innerHTML = null;

  catsArray.forEach((cat) => {
    let catForm = document.createElement("form");
    catForm.innerHTML = `
        <form>
                <ul class="card--text">
                <input type="hidden" name="id" value=${cat.id}>
                    <li>Age: <input name="age" type="number" value="${
                      cat.age
                    }" /></li>
                    <li>Breed: <input name="breed" type="text" value="${
                      cat.breed
                    }" /></li>
                    <li>Colour: <input name="colour" type="text" value="${
                      cat.colour
                    }" /></li>
                    <li>
                        Temperament: 
                        <select name="temperament">
                            <option value="Affectionate" ${
                              cat.temperament === "Affectionate"
                                ? "selected"
                                : null
                            }>Affectionate</option>
                            <option value="Bold" ${
                              cat.temperament === "Bold" ? "selected" : null
                            }>Bold</option>
                            <option value="Calm" ${
                              cat.temperament === "Calm" ? "selected" : null
                            }>Calm</option>
                            <option value="Curious" ${
                              cat.temperament === "Curious" ? "selected" : null
                            }>Curious</option>
                            <option value="Energetic" ${
                              cat.temperament === "Energetic"
                                ? "selected"
                                : null
                            }>Energetic</option>
                            <option value="Friendly" ${
                              cat.temperament === "Friendly" ? "selected" : null
                            }>Friendly</option>
                            <option value="Independent" ${
                              cat.temperament === "Independent"
                                ? "selected"
                                : null
                            }>Independent</option>
                            <option value="Loyal" ${
                              cat.temperament === "Loyal" ? "selected" : null
                            }>Loyal</option>
                            <option value="Playful" ${
                              cat.temperament === "Playful" ? "selected" : null
                            }>Playful</option>
                            <option value="Reserved" ${
                              cat.temperament === "Reserved" ? "selected" : null
                            }>Reserved</option>
                            <option value="Shy" ${
                              cat.temperament === "Shy" ? "selected" : null
                            }>Shy</option>
                            <option value="Sociable" ${
                              cat.temperament === "Sociable" ? "selected" : null
                            }>Sociable</option>
                        </select>
                    </li>
                    <li>
                        <button type="submit">Update</button>
                    </li>
                </ul>
            </form>`;
    catForm.addEventListener("submit", handleOnSubmitCatUpdateForm);

    let buttonDelete = document.createElement("button");
    buttonDelete.innerText = "Delete";
    buttonDelete.value = cat.id;
    buttonDelete.addEventListener("click", handleOnClickDeleteCat);

    let catListItem = document.createElement("li");
    catListItem.className = "card";
    catListItem.innerHTML = `
            <h2 class="card--title">${cat.name}</h2>
            <img
                width="256"
                class="card--img"
                src="${cat.image}"
            />
        `;
    catListItem.prepend(buttonDelete);
    catListItem.append(catForm);
    listOfCats.append(catListItem);
  });
};

const init = async () => {
  render(await getAllCats());
};

init();
