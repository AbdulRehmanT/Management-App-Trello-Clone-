const main = document.querySelector(".main");
const addListBtn = document.querySelector(".add-another-list");

let dropTask = null;

const createTask = (event) => {
  event.preventDefault();

  const activeForm = event.target;
  const value = activeForm.elements[0].value;
  const parent = activeForm.parentElement;
  const ticket = addTask(value);

  if (!value) return;

  parent.insertBefore(ticket, activeForm);

  const h3Value = parent.children[0].innerText;

  if (!Array.isArray(savedTasks[h3Value])) {
    savedTasks[h3Value] = [];
  }

  savedTasks[h3Value].push(value);

  localStorage.setItem("savedTasks", JSON.stringify(savedTasks));

  activeForm.reset();
};

const createList = (listTitle) => {

  const listDiv = document.createElement("div");
  const listH3 = document.createElement("h3");
  const cardForm = document.createElement("form");
  const cardInput = document.createElement("input");

  const h3List = document.createTextNode(listTitle);

  listDiv.classList.add("list");
  listH3.classList.add("list-title");
  cardForm.classList.add("card-form");
  cardInput.classList.add("card-form-input");

  cardInput.setAttribute("type", "text");
  cardInput.setAttribute("placeholder", "+ Add a card");

  listH3.appendChild(h3List);
  listDiv.appendChild(listH3);

  cardForm.appendChild(cardInput);
  listDiv.appendChild(cardForm);

  cardForm.addEventListener("submit", createTask);

  listDiv.addEventListener("dragleave", (event) => event.preventDefault());
  listDiv.addEventListener("dragover", (event) => event.preventDefault());

  listDiv.addEventListener("drop", (event) => {
    event.preventDefault();
    const dropTarget = event.target;

    if (dropTarget.classList.contains("list")) {
      dropTarget.appendChild(dropTask);
    }
    else if (dropTarget.classList.contains("card-task")) {
      dropTarget.parentElement.appendChild(dropTask);
    }

  });
  return listDiv;
}

const addTask = (value) => {
  const cardPara = document.createElement("p");
  const cardText = document.createTextNode(value);

  cardPara.classList.add("card-task");
  cardPara.setAttribute("draggable", "true");
  cardPara.appendChild(cardText);

  cardPara.addEventListener("mousedown", (event) => {
    dropTask = event.target;
  });

  return cardPara;
};

let savedTasks = JSON.parse(localStorage.getItem("savedTasks"));

if (!savedTasks) {
  savedTasks = {};
}

for (const title in savedTasks) {
  const card = createList(title);

  const arrayOfTasks = savedTasks[title];

  for (let i = 0; i < arrayOfTasks.length; i++) {
    const p = addTask(arrayOfTasks[i]);

    card.insertBefore(p, card.lastElementChild);
  }

  main.insertBefore(card, addListBtn);
}

addListBtn.addEventListener("click", () => {
  const listTitle = prompt("Enter list title");

  if (!listTitle) return;

  const taskCard = createList(listTitle);

  main.insertBefore(taskCard, addListBtn);
});
