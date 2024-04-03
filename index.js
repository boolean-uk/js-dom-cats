console.log(cats)
console.log(temperaments)

const cardsContainer = document.querySelector('.cards');
const breedInput = document.getElementById('breed-input');
const filterButton = document.getElementById('filter-button');

async function displayAllCats() {
    try {
      const cats = await getAllCats();
      cardsContainer.innerHTML = '';
  
      cats.forEach(cat => {
        const catCard = document.createElement('li');
        catCard.classList.add('card');
        catCard.innerHTML = `
          <img src="${cat.image}" alt="${cat.name}">
          <h3>${cat.name}</h3>
          <p>Breed: ${cat.breed}</p>
          <p>Temperament: ${cat.temperament}</p>
          <button class="delete-btn" data-cat-id="${cat.id}">Delete</button>
        `;
        cardsContainer.appendChild(catCard);
      });
    } catch (error) {
      console.error('Error fetching cats:', error);
    }
  }
  
  async function filterCatsByBreed() {
    const breed = breedInput.value;
  
    try {
      const filteredCats = await getCatsByBreed(breed);
      cardsContainer.innerHTML = '';
  
      filteredCats.forEach(cat => {
        const catCard = document.createElement('li');
        catCard.classList.add('card');
        catCard.innerHTML = `
          <img src="${cat.image}" alt="${cat.name}">
          <h3>${cat.name}</h3>
          <p>Breed: ${cat.breed}</p>
          <p>Temperament: ${cat.temperament}</p>
          <button class="delete-btn" data-cat-id="${cat.id}">Delete</button>
        `;
        cardsContainer.appendChild(catCard);
      });
    } catch (error) {
      console.error('Error filtering cats by breed:', error);
    }
  }

async function filterCatsByBreed() {
  const breed = breedInput.value;

  try {
    const filteredCats = await getCatsByBreed(breed);
    cardsContainer.innerHTML = '';

    filteredCats.forEach(cat => {
      const catCard = document.createElement('li');
      catCard.classList.add('card');
      catCard.innerHTML = `
        <img src="${cat.image}" alt="${cat.name}">
        <h3>${cat.name}</h3>
        <p>Breed: ${cat.breed}</p>
        <p>Temperament: ${cat.temperament}</p>
        <button class="delete-btn" data-cat-id="${cat.id}">Delete</button>
      `;
      cardsContainer.appendChild(catCard);
    });
  } catch (error) {
    console.error('Error filtering cats by breed:', error);
  }
}

async function deleteCat(catId) {
    try {
      await removeCat(parseInt(catId));
      displayAllCats();
    } catch (error) {
      console.error('Error deleting cat:', error);
    }
  }

filterButton.addEventListener('click', filterCatsByBreed);

cardsContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-btn')) {
    const catId = event.target.getAttribute('data-cat-id');
    deleteCat(catId);
  }
});

displayAllCats();