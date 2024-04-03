// - `getAllCats()` which returns an array of all cats
// - `getCatsByBreed(breed)` which accepts a breed string and returns all cats of that breed
// - `removeCat(catId)` which accepts a cat ID number and removes the cat from the array
// - `updateCat(catId, data)` which accepts a cat ID number and an object. Properties and values on the provided object will overwrite those that exist on the original cat object

// Cat obj
// age: 3;
// breed: "Persian";
// colour: "White";
// id: 1;
// image: "https://www.dutch.com/cdn/shop/articles/shutterstock_538333303.jpg";
// name: "Fluffy";
// temperament: "Friendly";

//=====================================

//HTML REFS
const input = document.querySelector("#breed-input");
const filterBtn = document.querySelector('.container button[type="submit"');
const list = document.querySelector(".cards");

//

function CatCardElement(cat) {
	const li = document.createElement("li");
	li.innerHTML = `
    <li class="card">
    <button>Delete</button>
    <h2 class="card--title">${cat.name}</h2>
    <img
        width="256"
        class="card--img"
        src="${cat.image}"
    />
    <form>
        <ul class="card--text">
            <li>Age: <input name="age" type="number" value="${cat.age}" /></li>
            <li>Breed: <input name="breed" type="text" value="${cat.breed}" /></li>
            <li>Colour: <input name="colour" type="text" value="${cat.colour}" /></li>
            <li>
                Temperament: 
                <select name="temperament" >
                    <option value="Affectionate">Affectionate</option>
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
</li>
    `;

	const delBtn = li.querySelector("button");
	const submitBtn = li.querySelector('button[type="submit"]');
	const selectInput = li.querySelector("select");

	delBtn.addEventListener("click", (e) => removeCat(cat.id));
	submitBtn.addEventListener("click", (e) => e.preventDefault());
	selectInput.selectedIndex = temperaments.indexOf(cat.temperament);

	return li;
}

async function renderCats(filtered) {
	console.log("Waiting for cats");
	const cats = filtered || (await getAllCats());
	console.log("Got cats");
	list.replaceChildren(...cats.map((e) => CatCardElement(e)));
}

//
async function renderSelectOptions() {
	const select = document.createElement("select");
	select.id = "breed-input";

	console.log("Waiting for select");
	const catList = await getAllCats();
	console.log("Got select");
	catList
		.reduce(
			(arr, el) => (arr.includes(el.breed) ? arr : [...arr, el.breed]),
			[]
		)
		.map((e) => {
			const opt = document.createElement("option");
			opt.text = e;
			opt.value = e;
			select.add(opt);
		});

	filterBtn.addEventListener("click", () => {
		renderCats(catList.filter((e) => e.breed === select.value));
	});
	input.replaceWith(select);
}

renderSelectOptions();
renderCats();
