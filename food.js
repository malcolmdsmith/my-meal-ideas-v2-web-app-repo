function loadFood() {
  const list = document.createElement("div");
  list.className = "foodPicList";
  $("#content").append(list);

  const images = [
    { name: "apricot-chicken", ext: "png" },
    { name: "beef", ext: "jpeg" },
    { name: "chicken-laksa", ext: "jpeg" },
    { name: "chicken", ext: "jpeg" },
    { name: "curry", ext: "jpeg" },
    { name: "dessert", ext: "jpeg" },
    { name: "duck", ext: "jpeg" },
    { name: "fish", ext: "jpeg" },
    { name: "fudge", ext: "png" },
    { name: "lamb", ext: "jpeg" },
    { name: "pasta", ext: "jpeg" },
    { name: "pork", ext: "jpeg" },
    { name: "salmon-spiced-sweetpotato", ext: "jpeg" },
    { name: "sauces", ext: "jpeg" },
    { name: "tuna-casserole", ext: "jpeg" },
    { name: "veal", ext: "jpeg" },
    { name: "vealwrapped", ext: "jpeg" },
    { name: "vegetables", ext: "jpeg" },
  ];

  for (let i = 0; i < images.length; i++) {
    let div = document.createElement("div");
    div.className = "foodImgContainer";
    let img = document.createElement("img");
    img.className = "foodImages";
    img.src = "images/food/" + images[i].name + "." + images[i].ext;

    let label = document.createElement("div");
    label.className = "foodImgLabel";
    label.innerText = images[i].name;

    let stars = document.createElement("span");
    stars.className = "starsContainer";
    addStars(stars, Math.floor(Math.random() * 5 + 1));

    label.append(stars);
    div.appendChild(img);
    div.appendChild(label);
    list.append(div);
  }
}

function addStars(span, num) {
  const stars = getStars(num);

  for (let i = 0; i < 5; i++) {
    let star = document.createElement("img");
    star.src = "images/" + stars[i];
    star.width = 15;
    star.height = 15;
    span.append(star);
  }
}

function getStars(rating) {
  const stars = [];

  for (let i = 5; i >= 0; i--) {
    //console.info(i, rating, stars);
    if (i >= rating) {
      stars.push("star-outline.png");
    } else {
      if (i + 0.5 === parseFloat(rating)) {
        stars.push("star-half.png");
      } else {
        stars.push("star.png");
      }
    }
  }
  return stars.reverse();
}

function loadRecipes() {
  $.ajax({
    url: "https://my-recipes-13442.nodechef.com/api/recipes",
    type: "GET",
    success: function (result) {
      //console.log(result);
      loadTextList(result);
    },
    error: function (error) {
      console.log("Error...", error);
    },
  });
}

function loadTextList(data) {
  const num = Math.floor(data.length / 2);
  const foodList = document.createElement("div");
  foodList.className = "foodTitleList";
  $("#content").append(foodList);

  let columnData = [];
  for (let i = 0; i < num; i++) {
    columnData.push(data[i]);
  }
  loadColumn(columnData, foodList);

  columnData = [];
  for (let i = num; i < data.length; i++) {
    columnData.push(data[i]);
  }
  loadColumn(columnData, foodList, "titleList");
}

function loadColumn(data, list, className) {
  const column = document.createElement("div");
  column.className = className;
  for (let i = 0; i < data.length; i++) {
    const div = document.createElement("div");
    div.className = "foodTitle";
    const span = document.createElement("span");
    addStars(span, data[i].rating);
    span.className = "starRating";
    div.append(span);
    const anchor = document.createElement("a");
    anchor.href = "recipe/" + data[i].recipeId;
    anchor.innerText = data[i].recipeTitle;
    div.append(anchor);
    column.append(div);
  }
  list.append(column);
}

function showTypeChange(type) {
  $("#content").empty();
  if (type == 1) {
    loadRecipes();
  } else if (type == 2) {
    loadFood();
  } else {
    loadCategories();
  }
}
