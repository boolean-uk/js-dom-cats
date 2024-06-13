// console.log(cats);
// console.log(temperaments);

async function getKitterAll() {
  const result = await getAllCats();
  return result;
}

console.log(getKitterAll());
