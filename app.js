const main = document.querySelector(".main");
const addListBtn = document.querySelector(".add-another-list");

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

  const h3List = document.createTextNode(listTitle)

  listDiv.classList.add("list");
//   listH3.classList.add("list-title");

  cardInput.setAttribute("type", "text");
  cardInput.setAttribute("placeholder", "Enter a title for this card");

  listH3.setAttribute("value", listTitle)

  listH3.appendChild(h3List);
  listDiv.appendChild(h3List);

  cardForm.appendChild(cardInput);
  listDiv.appendChild(cardForm);

  cardForm.addEventListener("submit", createTask);

  return listDiv;
};
const addTask = (value) => {
  const cardPara = document.createElement("p");
  const cardText = document.createTextNode(value);

  cardPara.setAttribute("draggable", "true");
  cardPara.appendChild(cardText);

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

  const taskCard = createList(listTitle);

  main.insertBefore(taskCard, addListBtn);
});
