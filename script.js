function addTask(){

let input = document.getElementById("taskInput");
let category = document.getElementById("category").value;
let task = input.value;

if(task === "") return;

let li = document.createElement("li");
li.textContent = "[" + category + "] " + task;

li.addEventListener("click", function(){
    li.classList.toggle("done");
    saveTasks();
    updateTaskCount();
});

let deleteBtn = document.createElement("button");
deleteBtn.classList.add("delete-btn");
deleteBtn.textContent = "X";

deleteBtn.onclick = function(){
    li.remove();
    saveTasks();
    updateTaskCount();
};

li.appendChild(deleteBtn);

document.getElementById("taskList").appendChild(li);

input.value = "";

saveTasks();
updateTaskCount();
}

function updateTaskCount(){
let tasks = document.querySelectorAll("#taskList li:not(.done)");
document.getElementById("taskCount").textContent =
"Tasks left: " + tasks.length;
}

function saveTasks(){
localStorage.setItem("tasks", document.getElementById("taskList").innerHTML);
}

function loadTasks(){
let saved = localStorage.getItem("tasks");
if(saved){
document.getElementById("taskList").innerHTML = saved;
}
updateTaskCount();
}

function toggleDarkMode(){
document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){
    localStorage.setItem("darkMode","on");
}else{
    localStorage.setItem("darkMode","off");
}
}

function loadDarkMode(){
if(localStorage.getItem("darkMode") === "on"){
    document.body.classList.add("dark");
}
}

loadTasks();
loadDarkMode();
