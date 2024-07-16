const main = document.querySelector(".main");
const addListBtn = document.querySelector(".add-another-list");

let inputContainer;
let dragTask = null;

addListBtn.addEventListener("click", () => {
  const listTitleForm = document.createElement("form");
  const listTitle = document.createElement("input");
  const submitList = document.createElement("button");
  const deleteList = document.createElement("button");

  listTitle.classList.add("list-title");
  submitList.classList.add("add-list");
  deleteList.classList.add("delete-list");

  listTitle.setAttribute("type", "text");
  listTitle.setAttribute("placeholder", "Enter list title");

  submitList.textContent = "Add List";
  deleteList.textContent = "X";

  submitList.addEventListener("click", () => {
    const listTitleValue = listTitle.value.trim();

    if (listTitleValue !== "") {
      createListItem(listTitleValue);
      listTitle.value = "";
    } else {
      alert("Please Enter List Title");
    }
  });

  deleteList.addEventListener("click", () => {
    if (main.contains(inputContainer)) {
      main.removeChild(inputContainer);
      main.appendChild(addListBtn);
    }
  });

  listTitle.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
      event.preventDefault();
      submitList.click();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key == "Escape") {
      deleteList.click();
    }
  });

  inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");

  inputContainer.appendChild(listTitleForm);
  listTitleForm.appendChild(listTitle);
  inputContainer.appendChild(submitList);
  inputContainer.appendChild(deleteList);

  main.removeChild(addListBtn);
  main.appendChild(inputContainer);
});

let savedTasks = JSON.parse(localStorage.getItem("savedTasks"));

if (!savedTasks) {
  savedTasks = {};
}

const createListItem = (text) => {
  const cardContainer = document.createElement("div");
  const dynamicList = document.createElement("ol");
  const listItem = document.createElement("li");
  const cardInputContainer = document.createElement("div");
  const cardTitle = document.createElement("h3");
  const cardTitleTextarea = document.createElement("input");
  const taskCardForm = document.createElement("form");
  const cardAddBtn = document.createElement("input");

  cardAddBtn.setAttribute("type", "text");
  cardAddBtn.setAttribute("placeholder", "+ Add a card");

  cardTitle.textContent = text;
  cardTitle.classList.add("card-title");

  cardTitleTextarea.value = text;
  cardTitleTextarea.classList.add("card-textarea");
  cardTitleTextarea.style.display = "none";

  listItem.classList.add("list-item");
  cardContainer.classList.add("card-container");
  cardInputContainer.classList.add("card-input-container");
  cardAddBtn.classList.add("add-card-button");

  cardInputContainer.appendChild(cardTitle);
  cardInputContainer.appendChild(cardTitleTextarea);
  cardInputContainer.appendChild(taskCardForm);
  taskCardForm.appendChild(cardAddBtn);
  listItem.appendChild(cardInputContainer);
  dynamicList.appendChild(listItem);
  cardContainer.appendChild(dynamicList);
  main.appendChild(cardContainer);

  main.insertBefore(cardContainer, inputContainer);

  cardInputContainer.addEventListener("dragleave", (event) =>
    event.preventDefault()
  );
  cardInputContainer.addEventListener("dragover", (event) =>
    event.preventDefault()
  );

  cardInputContainer.addEventListener("drop", (event) => {
    event.preventDefault();

    const selectedTask = event.target;
    if (selectedTask === taskCardForm) {
      cardInputContainer.insertBefore(dragTask, taskCardForm);
    } else if (selectedTask.classList.contains("card-task")) {
      selectedTask.parentElement.insertBefore(dragTask, selectedTask);
    } else if (selectedTask.classList.contains("card-input-container")) {
      selectedTask.appendChild(dragTask);
    }
  });

  cardTitle.addEventListener("click", () => {
    cardTitle.style.display = "none";
    cardTitleTextarea.style.display = "block";
    cardTitleTextarea.value = cardTitle.textContent.trim();
    cardTitleTextarea.focus();
  });

  cardTitleTextarea.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
      cardTitle.textContent = cardTitleTextarea.value.trim();
      cardTitleTextarea.style.display = "none";
      cardTitle.style.display = "block";
    } else if (event.key == "Escape") {
      cardTitle.style.display = "block";
      cardTitleTextarea.style.display = "none";
    }
  });

  const addTask = (event) => {
    event.preventDefault();

    const value = cardAddBtn.value.trim();
    if (value !== "") {
      const cardPara = document.createElement("p");
      const cardText = document.createTextNode(value);

      cardPara.classList.add("card-task");
      cardPara.setAttribute("draggable", "true");
      cardPara.appendChild(cardText);

      cardPara.addEventListener("mousedown", (event) => {
        dragTask = event.target;
      });

      cardInputContainer.insertBefore(cardPara, taskCardForm);
      cardAddBtn.value = "";

      if (!savedTasks[text]) {
        savedTasks[text] = [];
      }
      savedTasks[text].push(value);
      localStorage.setItem("savedTasks", JSON.stringify(savedTasks));
    }
  };

  taskCardForm.addEventListener("submit", addTask);
};

document.addEventListener("click", (event) => {
  if (!inputContainer.contains(event.target) && event.target !== addListBtn) {
    if (main.contains(inputContainer)) {
      main.removeChild(inputContainer);
      main.appendChild(addListBtn);
    }
  }
});
