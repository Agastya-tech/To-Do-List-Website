const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const errorMsg = document.getElementById("errorMsg");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");


addTaskBtn.addEventListener("click", addTask);


taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});


clearCompletedBtn.addEventListener("click", clearCompletedTasks);


function addTask() {
  const taskText = taskInput.value.trim(); 

  
  if (taskText === "") {
    errorMsg.textContent = "⚠ Please enter a task before adding.";
    return; 
  }

  
  errorMsg.textContent = "";

 
  createTaskElement(taskText);

  
  taskInput.value = "";
  taskInput.focus();
}


function createTaskElement(taskText) {
  
  const li = document.createElement("li");
  li.className = "task-item";

  
  const taskLeft = document.createElement("div");
  taskLeft.className = "task-left";

 
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  
  const span = document.createElement("span");
  span.className = "task-text";
  span.textContent = taskText;

  
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "Delete";

  
  taskLeft.appendChild(checkbox);
  taskLeft.appendChild(span);

  
  li.appendChild(taskLeft);
  li.appendChild(deleteBtn);

 
  taskList.appendChild(li);

  
  checkbox.addEventListener("change", function () {
    li.classList.toggle("completed", checkbox.checked);
  });

  
  deleteBtn.addEventListener("click", function () {
    li.remove();
    checkEmptyList();
  });

  checkEmptyList();
}


function clearCompletedTasks() {
  
  const completedTasks = taskList.querySelectorAll(".task-item.completed");

  completedTasks.forEach(function (task) {
    task.remove();
  });

  checkEmptyList();
}


function checkEmptyList() {
 
  const existingMsg = document.querySelector(".empty-message");
  if (existingMsg) {
    existingMsg.remove();
  }

  
  if (taskList.children.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.className = "empty-message";
    emptyMsg.textContent = "No tasks yet. Add one above! 📝";
    taskList.appendChild(emptyMsg);
  }
}

checkEmptyList();
