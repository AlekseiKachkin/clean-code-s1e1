const taskInput = document.getElementById("newTask");
const addButton = document.querySelector(".task__add");
const incompleteTaskHolder = document.getElementById("incompleteTasks");
const completedTasksHolder = document.getElementById("completedTasks");

const createNewTaskElement = function (taskString) {
  const article = document.createElement("article");
  const checkBox = document.createElement("input");
  const taskText = document.createElement("p");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const deleteButtonImg = document.createElement("img");

  article.classList.add('task', 'task_incomplete');

  taskText.innerText = taskString;
  taskText.classList.add('task__text');

  checkBox.type="checkbox";
  checkBox.classList.add('task__toggle');

  editInput.type="text";
  editInput.classList.add('task__input');
  editButton.innerText="Edit";
  editButton.classList.add("task__edit");

  deleteButton.classList.add("task__delete");
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.classList.add('removeImg');
  deleteButtonImg.alt = 'remove';
  deleteButton.append(deleteButtonImg);

  article.append(checkBox);
  article.append(taskText);
  article.append(editInput);
  article.append(editButton);
  article.append(deleteButton);
  return article;
}

const addTask = function () {
  console.log("Add Task...");
  if(!taskInput.value) return;
  const article = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(article);
  bindTaskEvents(article, taskCompleted);
  taskInput.value = "";
}

const editTask = function () {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  const article = this.parentNode;
  const editInput = article.querySelector('.task__input');
  const taskText = article.querySelector(".task__text");
  const editBtn = article.querySelector(".task__edit");
  const containsClass = article.classList.contains("task_editMode");

  if(containsClass) {
    taskText.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = taskText.innerText;
    editBtn.innerText = "Save";
  }

  article.classList.toggle("task_editMode");
}

const deleteTask = function () {
  console.log("Delete Task...");
  const article = this.parentNode;
  article.remove();
}

const taskCompleted = function(){
  console.log("Complete Task...");

  const article = this.parentNode;
  article.classList.toggle('task_completed');
  article.classList.toggle('task_incomplete');
  completedTasksHolder.append(article);
  bindTaskEvents(article, taskIncomplete);
}


const taskIncomplete = function () {
  console.log("Incomplete Task...");

  const article = this.parentNode;
  console.log(article);
  article.classList.toggle('task_completed');
  article.classList.toggle('task_incomplete');
  incompleteTaskHolder.append(article);
  bindTaskEvents(article, taskCompleted);
}

const ajaxRequest = function () {
  console.log("AJAX Request");
}

addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");
  const checkBox = taskListItem.querySelector(".task__toggle");
  const editButton = taskListItem.querySelector(".task__edit");
  const deleteButton = taskListItem.querySelector(".task__delete");
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

for (let i = 0; i < incompleteTaskHolder.children.length; i++){
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++){
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}