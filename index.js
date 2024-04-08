console.log(cats);
console.log(temperaments);

const catsList = document.querySelector(".cards");
const input = document.querySelector("#breed-input");
const filterBtn = document.querySelector("#filter-button");

getAllCats().then((cats) => {
  createCatCard(cats);
});

filterBtn.addEventListener("click", (event) => {
  const breed = input.value;
  getCatsByBreed(breed).then((found) => {
    createCatCard(found);
  });
});

function createCatCard(array) {
  catsList.innerHTML = "";
  array.forEach((cat) => {
    catsList.insertAdjacentHTML(
      "beforeend",
      `<li class="card" data-id=${cat.id}>
            <button id="delete">Delete</button>
            <h2 class="card--title">${cat.name}</h2>
            <img
                width="256"
                class="card--img"
                src=${cat.image}
             />
            <form>
                 <ul class="card--text">
                     <li>Age: <input name="age" type="number" value="5" /></li>
                    <li>Breed: <input name="breed" type="text" value="Tabby" /></li>
                    <li>Colour: <input name="colour" type="text" value="Brown" /></li>
                    <li>
                        Temperament: 
                        <select name="temperament">
                            <option value="Affectionate" selected="true">Affectionate</option>
                            <option value="Bold">Bold</option>
                            <option value="Calm">Calm</option>
                            <option value="Curious">Curious</option>
                            <option value="Energetic">Energetic</option>
                            <option value="Friendly">Friendly</option>
                            <option value="Independent">Independent</option>
                            <option value="Loyal">Loyal</option>
                            <option value="Playful">Playful</option>
                            <option value="Reserved">Reserved</option>
                            <option value="Shy">Shy</option>
                            <option value="Sociable">Sociable</option>
                        </select>
                    </li>
                    <li>
                        <button type="submit">Update</button>
                    </li>
                </ul>
            </form>
        </li>`
    );
  });
  const deleteBtns = document.querySelectorAll("#delete");
  getCatId(deleteBtns);
}

function getCatId(deleteBtns) {
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const catId = +btn.parentElement.dataset.id;

      removeCat(catId).then(() => {
        createCatCard(cats);
      });
    });
  });
}
