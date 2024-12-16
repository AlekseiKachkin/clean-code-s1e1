//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput=document.getElementById("newTask");//Add a new task.
var addButton=document.querySelector(".task__add");//add button
var incompleteTaskHolder=document.getElementById("incompleteTasks");//ul of #incompleteTasks
var completedTasksHolder=document.getElementById("completedTasks");//ul of #completedTasks


//New task list item
var createNewTaskElement=function(taskString){

  var article=document.createElement("article");

  //input (checkbox)
  var checkBox=document.createElement("input");//checkbox
  //label
  var label=document.createElement("p");//label
  //input (text)
  var editInput=document.createElement("input");//text
  //button.edit
  var editButton=document.createElement("button");//edit button

  //button.delete
  var deleteButton=document.createElement("button");//delete button
  var deleteButtonImg=document.createElement("img");//delete button image

  article.classList.add('task', 'task_incomplete')

  label.innerText=taskString;
  label.classList.add('task__text');

  //Each elements, needs appending
  checkBox.type="checkbox";
  checkBox.classList.add('task__toggle')
  editInput.type="text";
  editInput.classList.add('task__input');

  editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
  editButton.classList.add("task__edit");

  deleteButton.classList.add("task__delete");
  deleteButtonImg.src='./remove.svg';
  deleteButtonImg.setAttribute('alt', 'remove');
  deleteButton.append(deleteButtonImg);


  //and appending.
  article.append(checkBox);
  article.append(label);
  article.append(editInput);
  article.append(editButton);
  article.append(deleteButton);
  return article;
}



var addTask=function(){
  console.log("Add Task...");
  //Create a new list item with the text from the #newTask:
  if (!taskInput.value) return;
  var article=createNewTaskElement(taskInput.value);

  //Append article to incompleteTaskHolder
  incompleteTaskHolder.append(article);
  bindTaskEvents(article, taskCompleted);

  taskInput.value="";

}

//Edit an existing task.

var editTask=function(){
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");


  var article=this.parentNode;
  var editInput=article.querySelector('.task__input');
  var label=article.querySelector(".task__text");
  var editBtn=article.querySelector(".task__edit");
  var containsClass=article.classList.contains("task_editMode");
  //If class of the parent is .task_editMode
  if(containsClass){
    //switch to .task_editMode
    //label becomes the inputs value.
    label.innerText=editInput.value;
    editBtn.innerText="Edit";
  }else{
    editInput.value=label.innerText;
    editBtn.innerText="Save";
  }

  //toggle .task_editMode on the parent.
  article.classList.toggle("task_editMode");
};


//Delete task.
var deleteTask=function(){
  console.log("Delete Task...");

  var article=this.parentNode;
  article.remove();

}


//Mark task completed
var taskCompleted=function(){
  console.log("Complete Task...");

  //Append the task list item to the #completedTasks
  var article=this.parentNode;
  article.classList.toggle('task_completed');
  article.classList.toggle('task_incomplete');
  completedTasksHolder.append(article);
  bindTaskEvents(article, taskIncomplete);
}


var taskIncomplete=function(){
  console.log("Incomplete Task...");
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
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

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
  console.log("bind list item events");
  //select ListItems children
  var checkBox=taskListItem.querySelector(".task__toggle");
  var editButton=taskListItem.querySelector(".task__edit");
  var deleteButton=taskListItem.querySelector(".task__delete");


  //Bind editTask to edit button.
  editButton.onclick=editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick=deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

  //bind events to list items children(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
  //bind events to list items children(tasksIncomplete)
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.