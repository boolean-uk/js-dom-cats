document.addEventListener('DOMContentLoaded', async function () {
    // Function to create a cat card
    function createCatCard(cat) {
        const catCard = document.createElement('li');
        catCard.classList.add('card')

        // Fill in cat data
        catCard.innerHTML = `
            <button class="card--delete">Delete</button>
            <h2 class="card--title">${cat.name}</h2>
            <img class="card--img" src="${cat.image}" alt="${cat.name}" width="256"/>
            <form>
                <ul class="card--text">
                    <li>Age: <input name="age" type="number" value="${cat.age}" /></li>
                    <li>Breed: <input name="breed" type="text" value="${cat.breed}" /></li>
                    <li>Colour: <input name="colour" type="text" value="${cat.colour}" /></li>
                    <li>
                        Temperament: 
                        <select name="temperament">
                            <option value="Affectionate" ${cat.temperament === 'Affectionate' ? 'selected' : ''}>Affectionate</option>
                            <!-- Other options omitted for brevity -->
                        </select>
                    </li>
                    <li>
                        <button type="submit">Update</button>
                    </li>
                </ul>
            </form>
        `

        // Add event listener to delete button
        catCard.querySelector('.card--delete').addEventListener('click', async () => {
            await removeCat(cat.id)
            catCard.remove() // Remove the card after deletion
        });

        return catCard
    }

    // Populate the UI with cat cards
    async function populateCatList(filter = null) {
        let cats = await getAllCats()
        if (filter) {
            cats = cats.filter(cat => cat.breed.toLowerCase().includes(filter.toLowerCase()))
        }
        const catListContainer = document.querySelector('.cards');
        catListContainer.innerHTML = '' // Clear previous content
        cats.forEach(cat => {
            const catCard = createCatCard(cat);
            catListContainer.appendChild(catCard);
        })
    }

    // Add event listener to breed filter button
    document.getElementById('filter-button').addEventListener('click', async () => {
        const breedFilter = document.getElementById('breed-input').value.trim();
        populateCatList(breedFilter);
    })

    // Populate the initial list of cats when the page loads
    populateCatList();
})
