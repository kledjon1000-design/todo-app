function addTask() {
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

    deleteBtn.onclick = function(e){
        e.stopPropagation();
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

function updateTaskCount() {
    let tasks = document.querySelectorAll("#taskList li:not(.done)");
    document.getElementById("taskCount").textContent =
        "Tasks left: " + tasks.length;
}

function saveTasks() {
    localStorage.setItem("tasks", document.getElementById("taskList").innerHTML);
}

function loadTasks() {
    let saved = localStorage.getItem("tasks");
    if(saved){
        document.getElementById("taskList").innerHTML = saved;
        let tasks = document.querySelectorAll("#taskList li");

        tasks.forEach(function(li){
            li.addEventListener("click", function(){
                li.classList.toggle("done");
                saveTasks();
                updateTaskCount();
            });

            let deleteBtn = li.querySelector(".delete-btn");
            if(deleteBtn){
                deleteBtn.onclick = function(e){
                    e.stopPropagation();
                    li.remove();
                    saveTasks();
                    updateTaskCount();
                };
            }
        });
    }
    updateTaskCount();
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        localStorage.setItem("darkMode","on");
    } else {
        localStorage.setItem("darkMode","off");
    }
}

function loadDarkMode() {
    if(localStorage.getItem("darkMode") === "on"){
        document.body.classList.add("dark");
    }
}

loadTasks();
loadDarkMode();

document.getElementById("taskInput").addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        addTask();
    }
});
