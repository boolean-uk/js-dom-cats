let cats = [
  {
    id: 1,
    name: "Fluffy",
    age: 3,
    breed: "Persian",
    colour: "White",
    temperament: "Friendly",
    image: "https://www.dutch.com/cdn/shop/articles/shutterstock_538333303.jpg",
  },
  {
    id: 2,
    name: "Whiskers",
    age: 2,
    breed: "Siamese",
    colour: "Brown",
    temperament: "Playful",
    image:
      "https://d3544la1u8djza.cloudfront.net/APHI/Blog/2016/June/06-23/Siamese+Cat+Facts+_+Siamese+cat+lying+on+an+ottoman+-min.jpg",
  },
  {
    id: 3,
    name: "Mittens",
    age: 5,
    breed: "Maine Coon",
    colour: "Gray",
    temperament: "Calm",
    image: "https://neaterpets.com/cdn/shop/articles/mainecoon.jpg",
  },
  {
    id: 4,
    name: "Snowball",
    age: 1,
    breed: "Scottish Fold",
    colour: "White",
    temperament: "Curious",
    image:
      "https://www.catster.com/wp-content/uploads/2023/11/white-scottish-fold-cat_Hetman-Bohdan_Shutterstock.jpg",
  },
  {
    id: 5,
    name: "Oreo",
    age: 4,
    breed: "Persian",
    colour: "Black and White",
    temperament: "Independent",
    image: "https://nplimages.infradoxxs.com/cache/pcache2/01216103.jpg",
  },
  {
    id: 6,
    name: "Simba",
    age: 2,
    breed: "Siamese",
    colour: "Cream",
    temperament: "Affectionate",
    image:
      "https://www.yourcat.co.uk/images/legacy/catimages/Breed_Siamese/siamesekitten.jpg",
  },
  {
    id: 7,
    name: "Luna",
    age: 3,
    breed: "Maine Coon",
    colour: "Calico",
    temperament: "Energetic",
    image:
      "https://www.catster.com/wp-content/uploads/2023/12/Calico-maine-coon-cat-sitting-outside_Nils-Jacobi_Shutterstock.jpg",
  },
  {
    id: 8,
    name: "Gizmo",
    age: 1,
    breed: "Scottish Fold",
    colour: "Gray and White",
    temperament: "Shy",
    image:
      "https://images.wagwalkingweb.com/media/daily_wag/blog_articles/hero/1692195226.8633204/scottish-fold.jpg",
  },
  {
    id: 9,
    name: "Shadow",
    age: 3,
    breed: "Siamese",
    colour: "Black",
    temperament: "Reserved",
    image:
      "https://cdn.shopify.com/s/files/1/0477/1263/2993/files/black_siamese_cats_3_1_600x600.webp?v=1655163703",
  },
  {
    id: 10,
    name: "Cleo",
    age: 2,
    breed: "Maine Coon",
    colour: "Tabby",
    temperament: "Sociable",
    image:
      "https://img.pixers.pics/pho_wat(s3:700/FO/41/66/76/70/700_FO41667670_b776c5b2831a9b149c8a8859b7dd1809.jpg,700,464,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,480,414,jpg)/wall-murals-liegende-maine-coon-in-der-farbe-black-tabby-1.jpg.jpg",
  },
  {
    id: 11,
    name: "Milo",
    age: 4,
    breed: "Persian",
    colour: "Cream",
    temperament: "Playful",
    image:
      "https://www.catster.com/wp-content/uploads/2023/12/longhair-cat-golden-blue-chinchilla-with-green-eyes_OksanaSusoeva_shutterstock.jpg",
  },
  {
    id: 12,
    name: "Smokey",
    age: 3,
    breed: "Scottish Fold",
    colour: "Gray",
    temperament: "Calm",
    image:
      "https://imagevars.gulfnews.com/2018/8/3/1_16a08500d3c.2261003_127640103_16a08500d3c_medium.jpg",
  },
  {
    id: 13,
    name: "Tiger",
    age: 2,
    breed: "Maine Coon",
    colour: "Orange",
    temperament: "Bold",
    image:
      "https://www.katdootje.nl/wp-content/uploads/Orange-Maine-Coon-on-Stone-Wall.webp",
  },
  {
    id: 14,
    name: "Bella",
    age: 1,
    breed: "Siamese",
    colour: "Blue Point",
    temperament: "Loyal",
    image:
      "https://www.hepper.com/wp-content/uploads/2021/05/Blue-Point-Siamese.jpg",
  },
];

const temperaments = [
  "Affectionate",
  "Bold",
  "Calm",
  "Curious",
  "Energetic",
  "Friendly",
  "Independent",
  "Loyal",
  "Playful",
  "Reserved",
  "Shy",
  "Sociable",
];

function getAllCats() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(cats), 1000);
  });
}

function getCatsByBreed(breed) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const found = cats.filter(
        (cat) => cat.breed.toLowerCase() === breed.trim().toLowerCase()
      );
      resolve(found);
    }, 1000);
  });
}

function removeCat(catId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      cats = cats.filter((cat) => cat.id !== catId);
      resolve();
    }, 1000);
  });
}

function updateCat(catId, data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const i = cats.findIndex((cat) => cat.id === catId);

      if (i < 0) {
        return reject(`Cat with ID ${catId} not found`);
      }

      cats[i] = { ...cats[i], ...data, id: catId };
      resolve(cats[i]);
    }, 1000);
  });
}
