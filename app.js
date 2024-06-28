document.addEventListener('DOMContentLoaded', () => {

  const form = document.querySelector('form');
  const inputValue = document.querySelector('inputValue');


  const task = (value) => {

    const newTask = document.createElement('div');
    const taskText = document.createElement('p');
    const text = document.createTextNode(value);
    

    newTask.classList.add('task-list')

    taskText.appendChild(text);
    newTask.appendChild(taskText)

    return newTask
  }

  const addTask = (event) => {
    event.preventDefault();

    const form = event.target
    const value = form.elements[0].value;
    const parent = form.parentElement;
    const taskAdded = task(value);


    parent.insertBefore(taskAdded,form)


    form.reset()
  }


  form.addEventListener('submit', addTask)
})

