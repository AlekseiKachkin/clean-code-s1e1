var taskInput=document.getElementById("newTask");
var addButton=document.querySelector(".task__add");
var incompleteTaskHolder=document.getElementById("incompleteTasks");
var completedTasksHolder=document.getElementById("completedTasks");



var createNewTaskElement=function(taskString){
  var article=document.createElement("article");
  var checkBox=document.createElement("input");
  var taskText=document.createElement("p");
  var editInput=document.createElement("input");
  var editButton=document.createElement("button");
  var deleteButton=document.createElement("button");
  var deleteButtonImg=document.createElement("img");

  article.classList.add('task', 'task_incomplete')

  taskText.innerText=taskString;
  taskText.classList.add('task__text');

  checkBox.type="checkbox";
  checkBox.classList.add('task__toggle');

  editInput.type="text";
  editInput.classList.add('task__input');
  editButton.innerText="Edit";
  editButton.classList.add("task__edit");

  deleteButton.classList.add("task__delete");
  deleteButtonImg.src='./remove.svg';
  deleteButtonImg.classList.add('removeImg');
  deleteButtonImg.alt='remove';
  deleteButton.append(deleteButtonImg);

  article.append(checkBox);
  article.append(taskText);
  article.append(editInput);
  article.append(editButton);
  article.append(deleteButton);
  return article;
}



var addTask=function(){
  console.log("Add Task...");
  if (!taskInput.value) return;
  var article=createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(article);
  bindTaskEvents(article, taskCompleted);
  taskInput.value="";
}

var editTask=function(){
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  var article=this.parentNode;
  var editInput=article.querySelector('.task__input');
  var taskText=article.querySelector(".task__text");
  var editBtn=article.querySelector(".task__edit");
  var containsClass=article.classList.contains("task_editMode");
  if(containsClass){
    taskText.innerText=editInput.value;
    editBtn.innerText="Edit";
  }else{
    editInput.value=taskText.innerText;
    editBtn.innerText="Save";
  }

  article.classList.toggle("task_editMode");
};

var deleteTask=function(){
  console.log("Delete Task...");
  var article=this.parentNode;
  article.remove();
}

var taskCompleted=function(){
  console.log("Complete Task...");

  var article=this.parentNode;
  article.classList.toggle('task_completed');
  article.classList.toggle('task_incomplete');
  completedTasksHolder.append(article);
  bindTaskEvents(article, taskIncomplete);
}


var taskIncomplete=function(){
  console.log("Incomplete Task...");

  var article=this.parentNode;
  console.log(article)
  article.classList.toggle('task_completed');
  article.classList.toggle('task_incomplete');
  incompleteTaskHolder.append(article);
  bindTaskEvents(article,taskCompleted);
}

var ajaxRequest=function(){
  console.log("AJAX Request");
}

addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);

var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
  console.log("bind list item events");
  var checkBox=taskListItem.querySelector(".task__toggle");
  var editButton=taskListItem.querySelector(".task__edit");
  var deleteButton=taskListItem.querySelector(".task__delete");
  editButton.onclick=editTask;
  deleteButton.onclick=deleteTask;
  checkBox.onchange=checkBoxEventHandler;
}

for (var i=0; i<incompleteTaskHolder.children.length;i++){
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

for (var i=0; i<completedTasksHolder.children.length;i++){
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}