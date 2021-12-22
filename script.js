/* 
let p1 =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est totam laboriosam debitis magnam voluptatum, incidunt neque. Totam ullam non quis, repellendus molestiae in itaque natus labore quos ipsum alias, veritatis nihil! Quisquam labore, sequi minima expedita necessitatibus omnis error amet recusandae atque commodi quia! Vel laborum recusandae voluptatum rerum id harum, fuga beatae ut, consequuntur repellendus ipsum temporibus libero itaque.";
let p2 =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde quod tempore quaerat deserunt. Voluptatibus possimus, magni quas rem adipisci, esse ipsa fuga, fugit eos repellendus quis? Dicta perferendis, doloremque provident repellendus natus fugit obcaecati, voluptate odio, nulla similique officia. Iure at aliquam dicta provident nulla modi optio maiores. Similique eos molestiae earum voluptatum nostrum porro, consequuntur nihil ex earum. Voluptatum placeat labore necessitatibus repellat. Repudiandae velit suscipit amet tenetur, mollitia aut dolor ipsa delectus a autem ut quibusdam incidunt? Nisi facilis voluptatem omnis debitis laborum cupiditate pariatur inventore molestiae eveniet!";

let blog = {
  articles: [
    {
      title: "The complete guide to explore Trasilvania, with your bike",
      category: "Destination Europe",
      author: "Jonnathan Mercadina",
      date: "July 01, 2018",
      img: "img/bike.jpg",
      imgAlt: "Bike",
      saying:
        "Life is like riding a bicycle, to keep your balance you must keep moving",
      paragraph1: p1,
      paragraph2: p2,
    },
    {
      title: "Romania: The land of dreams",
      category: "Village",
      author: "Jonnathan Mercadina",
      date: "June 17, 2018",
      img: "img/village.jpg",
      imgAlt: "Village",
      saying: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      paragraph1: p1,
      paragraph2: p2,
    },
    {
      title: "Sarmale - stuffed cabbage rolls. Good or bad?",
      category: "Food",
      author: "Jonnathan Mercadina",
      date: "December 29, 2017",
      img: "img/sarmale.jpg",
      imgAlt: "Sarmale",
      saying: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      paragraph1: p1,
      paragraph2: p2,
    },
  ],
  navigation: ["Home", "Travel updates", "Reviews", "About", "Contact"],
}; */

let navigation = ["Home", "Travel updates", "Reviews", "About", "Contact"];

let navContainer = window.document.getElementById("nav-container");
const nav = createNav(navigation);
navContainer.appendChild(nav);

function getArticles() {
  fetch("http://localhost:3000/articles")
    .then(function (response) {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }

      // Examine the text in the response
      response.json().then(function (data) {
        console.log(data);
        //hide loading
        createPage(data);
      });
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
}

function getArticle(id) {
  fetch("http://localhost:3000/articles")
    .then(function (response) {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }

      // Examine the text in the response
      response.json().then(function (data) {
        console.log(data);
        //hide loading
        createDetails(data, id);
      });
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
}

function deleteArticle(id) {
  fetch("http://localhost:3000/articles/" + id, {
    method: "DELETE",
  })
    .then(json)
    .then(function (data) {
      console.log("Request succeeded with JSON response", data);
      window.location.hash = "#/home/";
    })
    .catch(function (error) {
      console.log("Request failed", error);
    });
}

function addArticle() {
  const titleInput = document.getElementById("modal__title");
  const categoryInput = document.getElementById("category");
  const authorInput = document.getElementById("author");
  const imageInput = document.getElementById("image_url");
  const dateInput = document.getElementById("date");
  const sayingInput = document.getElementById("saying");
  const contentInput1 = document.getElementById("paragraph1");
  const contentInput2 = document.getElementById("paragraph2");
  //console.log(contentInput1.value);
  //console.log(contentInput2.value);
  if (
    titleInput.value !== "" &&
    categoryInput.value !== "" &&
    authorInput.value !== "" &&
    imageInput.value !== "" &&
    dateInput.value !== "" &&
    sayingInput.value !== "" &&
    contentInput1.value !== "" &&
    contentInput2.value !== ""
  ) {
    object = {
      title: titleInput.value,
      category: categoryInput.value,
      author: authorInput.value,
      date: dateInput.value,
      img: imageInput.value,
      saying: sayingInput.value,
      paragraph1: contentInput1.value,
      paragraph2: contentInput2.value,
    };

    fetch("http://localhost:3000/articles", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(object),
    })
      .then(json)
      .then(function (data) {
        console.log("Request succeeded with JSON response", data);
        window.location.hash = "#/home/";
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
  }
}

function editArticle(id) {
  fetch("http://localhost:3000/articles/" + id, {
    method: "put",
  })
    .then(json)
    .then(function (data) {
      console.log("Request succeeded with JSON response", data);
    })
    .catch(function (error) {
      console.log("Request failed", error);
    });
}

function createArticle(article, index) {
  let domArticle = document.createElement("article");

  const domTitle = document.createElement("h2");
  domTitle.textContent = article.title;
  domTitle.setAttribute("class", "title");
  domArticle.appendChild(domTitle);

  const info = createArticleInfo(article);
  domArticle.appendChild(info);

  const actions = createArticleActions(article.id);
  domArticle.appendChild(actions);

  const domImg = document.createElement("img");
  domImg.setAttribute("src", article.img);
  domArticle.appendChild(domImg);

  const content = createArticleContent(article);
  domArticle.appendChild(content);

  if (index != undefined) {
    const domReadMore = document.createElement("div");
    domReadMore.className = "readmore__container";

    const domButton = document.createElement("button");
    domButton.setAttribute("id", index);
    domButton.setAttribute("class", "button");
    domButton.addEventListener("click", () => gotoHash(`#/details/${index}`));
    //domButton.setAttribute("onclick", "createDetails(this.id)");
    //domButton.setAttribute("onclick", "window.location.href='details.html';");
    domButton.innerText = "Read More";
    domReadMore.appendChild(domButton);

    domArticle.appendChild(domReadMore);
  }

  return domArticle;
}

function createNav(navigation) {
  let nav = document.createElement("nav");
  nav.className = "nav";

  let switchDiv = document.createElement("div");
  switchDiv.className = "theme-switch-wrapper";

  let labelSwitch = document.createElement("label");
  labelSwitch.className = "theme-switch";
  labelSwitch.setAttribute("for", "checkbox");

  let inputSwitch = document.createElement("input");
  inputSwitch.setAttribute("type", "checkbox");
  inputSwitch.setAttribute("id", "checkbox");

  let slider = document.createElement("div");
  slider.className = "slider round";

  labelSwitch.appendChild(inputSwitch);
  labelSwitch.appendChild(slider);

  switchDiv.appendChild(labelSwitch);

  let switchEm = document.createElement("em");
  switchEm.textContent = "Dark theme";

  switchDiv.appendChild(switchEm);

  let ul = document.createElement("ul");
  ul.className = "nav__container";

  for (let i = 0; i < navigation.length; i++) {
    let li = document.createElement("li");
    li.className = "nav__item";

    let a = document.createElement("a");
    a.className = "nav__link";
    a.innerText = navigation[i];
    if (i === 0) {
      a.addEventListener("click", () => gotoHash("#/home/"));
    }

    li.appendChild(a);
    ul.appendChild(li);
  }

  nav.appendChild(switchDiv);
  nav.appendChild(ul);

  return nav;
}

function createArticleInfo(article) {
  let ul = document.createElement("ul");
  ul.setAttribute("class", "info__container");

  const li1 = document.createElement("li");
  li1.className = "info__item";
  li1.textContent = article.category;
  ul.appendChild(li1);

  const li2 = document.createElement("li");
  li2.className = "info__item";
  li2.textContent = "Added by ";

  const span = document.createElement("span");
  span.className = "info__mark";
  span.textContent = article.author;
  li2.appendChild(span);
  ul.appendChild(li2);

  const li3 = document.createElement("li");
  li3.className = "info__item";
  li3.textContent = article.date;
  ul.appendChild(li3);

  return ul;
}

function createArticleActions(id) {
  let div = document.createElement("div");
  div.className = "actions__container";

  const button1 = document.createElement("button");
  button1.setAttribute("type", "button");
  button1.setAttribute("class", "actions__btn");
  button1.innerText = "Edit";
  div.appendChild(button1);

  const span = document.createElement("span");
  span.className = "bar";
  span.textContent = " | ";
  div.appendChild(span);

  const button2 = document.createElement("button");
  button2.setAttribute("type", "button");
  button2.setAttribute("class", "actions__btn");
  button2.innerText = "Delete";
  button2.addEventListener("click", () => deleteArticle(id));
  div.appendChild(button2);

  return div;
}

function createArticleContent(article) {
  let div = document.createElement("div");
  div.className = "content__container";

  const paragraph1 = document.createElement("p");
  paragraph1.textContent = article.paragraph1;
  div.appendChild(paragraph1);

  const saying = document.createElement("p");
  saying.setAttribute("id", "say");
  saying.classList.add("saying");
  saying.textContent = article.saying;
  div.appendChild(saying);

  const paragraph2 = document.createElement("p");
  paragraph2.textContent = article.paragraph2;
  div.appendChild(paragraph2);

  return div;
}

function createAdd() {
  let addContainer = document.createElement("div");
  addContainer.className = "add__container";

  const domButton = document.createElement("button");
  domButton.setAttribute("type", "button");
  domButton.setAttribute("class", "button open__modal");
  domButton.addEventListener("click", () => displayModal("add"));
  domButton.innerText = "+ Add Article";
  addContainer.appendChild(domButton);

  return addContainer;
}

function createFooter() {
  let footer = document.createElement("footer");
  footer.setAttribute("class", "footer");

  const button1 = document.createElement("button");
  button1.setAttribute("class", "footer__link footer__link--previous");
  button1.innerText = "previous";
  footer.appendChild(button1);

  const button2 = document.createElement("button");
  button2.setAttribute("class", "footer__link footer__link--next");
  button2.innerText = "next";
  footer.appendChild(button2);

  return footer;
}

function createModal() {
  let inputs = ["title", "category", "author", "date", "image_url", "saying"];

  let overlay = document.createElement("div");
  overlay.setAttribute("class", "modal__overlay");
  overlay.setAttribute("id", "id01");

  let modal = document.createElement("div");
  modal.setAttribute("class", "modal");

  const exit = document.createElement("span");
  exit.addEventListener("click", () => {
    document.getElementById("id01").style.display = "none";
  });
  exit.setAttribute("class", "open__modal");
  exit.innerHTML = "&times;";

  modal.appendChild(exit);

  modalContent = document.createElement("div");
  modalContent.setAttribute("class", "modal__content");

  let title = document.createElement("h2");
  title.setAttribute("id", "modal__title");
  title.textContent = "Add/Edit article";
  modalContent.appendChild(title);

  let inputsContainer = document.createElement("div");
  inputsContainer.setAttribute("class", "inputs__container");

  for (let i = 0; i < inputs.length; i++) {
    let input = document.createElement("input");
    input.setAttribute("id", inputs[i]);
    input.setAttribute("class", "input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Please enter " + inputs[i]);
    inputsContainer.appendChild(input);
  }
  modalContent.appendChild(inputsContainer);

  let textarea1 = document.createElement("textarea");
  textarea1.setAttribute("id", "paragraph1");
  textarea1.setAttribute("class", "textarea");
  textarea1.setAttribute("name", "content");
  textarea1.setAttribute("cols", "28");
  textarea1.setAttribute("rows", "5");
  textarea1.setAttribute("placeholder", "Please enter content");
  modalContent.appendChild(textarea1);

  let textarea2 = document.createElement("textarea");
  textarea2.setAttribute("id", "paragraph2");
  textarea2.setAttribute("class", "textarea");
  textarea2.setAttribute("name", "content");
  textarea2.setAttribute("cols", "28");
  textarea2.setAttribute("rows", "5");
  textarea2.setAttribute("placeholder", "Please enter content");
  modalContent.appendChild(textarea2);

  let modalButtons = document.createElement("div");
  modalButtons.setAttribute("class", "modal__buttons");

  let cancelBttn = document.createElement("button");
  cancelBttn.setAttribute("class", "button close__modal");
  cancelBttn.setAttribute("type", "button");
  cancelBttn.addEventListener("click", () => {
    document.getElementById("id01").style.display = "none";
  });
  cancelBttn.textContent = "Cancel";
  modalButtons.appendChild(cancelBttn);

  let saveBttn = document.createElement("button");
  saveBttn.setAttribute("id", "save");
  saveBttn.setAttribute("class", "button button--pink");
  saveBttn.setAttribute("type", "button");
  saveBttn.textContent = "Save";
  modalButtons.appendChild(saveBttn);

  modalContent.appendChild(modalButtons);
  modal.appendChild(modalContent);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

function displayModal(operation) {
  if (operation == "add") {
    document.getElementById("id01").style.display = "block";
    document
      .getElementById("save")
      .addEventListener("click", () => addArticle());
  }
  if (operation == "edit") {
    document.getElementById("id01").style.display = "block";
    document
      .getElementById("save")
      .addEventListener("click", () => editArticle());
  }
}

const container = window.document.getElementById("container");

function createPage(blog) {
  clearContainer();
  //const nav = createNav(navigation);
  //container.appendChild(nav);

  const addArticle = createAdd();
  container.appendChild(addArticle);

  const main = document.createElement("main");
  for (let i = 0; i < blog.length; i++) {
    const article = createArticle(blog[i], i);
    main.appendChild(article);
  }

  container.appendChild(main);
  //const footer = createFooter();
  //container.appendChild(footer);
  createModal();
  document.getElementById("id01").style.display = "none";
}

function createDetails(articles, id) {
  let index = parseInt(id);
  console.log(index);

  clearContainer();
  //const nav = createNav(navigation);
  //container.appendChild(nav);

  const main = document.createElement("main");

  const article = createArticle(articles[index]);
  main.appendChild(article);

  console.log(articles[index]);

  container.appendChild(main);
  let saying = document.getElementById("say");
  saying.classList.remove("saying");

  const footer = createFooter();
  container.appendChild(footer);

  var previous = document.querySelector(".footer__link--previous");
  var next = document.querySelector(".footer__link--next");

  if (index === 0) {
    previous.classList.add("hidden");
    next.addEventListener("click", () => gotoHash(`#/details/${index + 1}`));
  } else if (index > 0 && index < articles.length - 1) {
    previous.addEventListener("click", () =>
      gotoHash(`#/details/${index - 1}`)
    );
    next.addEventListener("click", () => gotoHash(`#/details/${index + 1}`));
  } else if (index === articles.length - 1) {
    previous.addEventListener("click", () =>
      gotoHash(`#/details/${index - 1}`)
    );
    next.classList.add("hidden");
  }
}

////////////////////// Router ///////////////////////////////////

function gotoHash(hash) {
  window.location.hash = hash;
}

function clearContainer() {
  container.innerHTML = "";
}

function locationHashChanged() {
  if (location.hash === "#/home/") {
    getArticles();
  }
  if (location.hash.startsWith("#/details/")) {
    const articleId = location.hash.substr(10);
    getArticle(articleId);
    //createDetails(articleId);
  }
  //dark theme
  const toggleSwitch = document.querySelector(
    '.theme-switch input[type="checkbox"]'
  );
  console.log(toggleSwitch);
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);
    if (currentTheme === "dark") {
      toggleSwitch.checked = true;
    }
  }
  function switchTheme(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }
  toggleSwitch.addEventListener("change", switchTheme, false);
}

window.onhashchange = locationHashChanged;

document.addEventListener("DOMContentLoaded", () => {
  window.location.hash = "#/home/";
});
