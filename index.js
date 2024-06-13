// console.log(cats);
// console.log(temperaments);

const CARDS_UL = document.querySelector(".cards");

function addCardToPage(theCat) {
  console.log(theCat);
  const H2 = document.createElement("h2");
  H2.textContent = theCat.name;
  CARDS_UL.appendChild(H2);
}

async function getKitterAll() {
  const result = await getAllCats();
  for (let i = 0; i < result.length; i++) {
    let theCat = result[i];
    addCardToPage(theCat);
  }
}

getKitterAll();
