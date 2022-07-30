const categories = [
  {
    name: "BEEF",
    url: "beef.jpeg",
  },
  {
    name: "CHEESE",
    url: "cheese.png",
  },
  {
    name: "CHICKEN",
    url: "chicken.jpeg",
  },
  { name: "CURRY", url: "curry.jpeg" },
  { name: "DESSERT", url: "dessert.png" },
  { name: "DUCK", url: "duck.png" },
  { name: "FISH", url: "fish.jpeg" },
  { name: "LAMB", url: "lamb.jpeg" },
  { name: "MUFFINS", url: "muffins.png" },
  { name: "PASTA", url: "pasta.jpeg" },
  { name: "PORK", url: "pork.jpg" },
  { name: "RICE", url: "rice.jpeg" },
  { name: "SAUCES", url: "sauces.jpg" },
  { name: "VEAL", url: "veal.jpg" },
  { name: "VEGETABLES", url: "vegetables.jpg" },
];

function loadCategories() {
  $.ajax({
    url: "https://my-recipes-13442.nodechef.com/api/recipes",
    type: "GET",
    success: function (result) {
      //console.log(result);
      loadList(result);
    },
    error: function (error) {
      console.log("Error...", error);
    },
  });
}

function loadList(data) {
  const content = $("#content");
  const wrapper = document.createElement("div");
  wrapper.className = "category-wrapper";
  content.append(wrapper);

  let category = data[0].category;
  let div;
  let categoryList;
  let i = 0;
  let alt = 1;

  while (i < data.length) {
    categoryList = [];
    while (i < data.length && category === data[i].category) {
      categoryList.push(data[i]);
      i++;
    }
    categoryContainer = document.createElement("div");
    categoryContainer.className = "category";
    const imageContainer = document.createElement("div");
    imageContainer.className = "imageContainer";
    const img = document.createElement("img");
    img.className = "categoryImage";
    const cat = categories.filter((f) => f.name === category);
    img.src = "images/categories/" + cat[0].url;
    imageContainer.append(img);
    const h1 = document.createElement("h1");
    h1.appendChild(document.createTextNode(category));
    const listContainer = document.createElement("div");

    if (alt) {
      categoryContainer.append(imageContainer);
      listContainer.append(h1);
      loadColumn(categoryList, listContainer, "categoryList");
      categoryContainer.append(listContainer);
      alt = 0;
    } else {
      listContainer.append(h1);
      loadColumn(categoryList, listContainer, "categoryList");
      categoryContainer.append(listContainer);
      categoryContainer.append(imageContainer);
      alt = 1;
    }
    wrapper.append(categoryContainer);
    const divider = document.createElement("hr");
    divider.className = "categoryDivider";
    wrapper.append(divider);

    if (i == data.length) {
      break;
    }
    category = data[i].category;
  }
}
