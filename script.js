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
});

let deleteBtn = document.createElement("button");
deleteBtn.classList.add("delete-btn");
deleteBtn.textContent = "X";

deleteBtn.onclick = function(){
    li.remove();
    saveTasks();
};

li.ondblclick = function(){
    let newTask = prompt("Edit task:", li.firstChild.textContent);
    if(newTask){
        li.firstChild.textContent = newTask;
        saveTasks();
    }
}

li.appendChild(deleteBtn);

document.getElementById("taskList").appendChild(li);

input.value = "";

saveTasks();
}

function toggleDarkMode(){
    document.body.classList.toggle("dark");
}

function saveTasks(){
    localStorage.setItem("tasks", document.getElementById("taskList").innerHTML);
}

function loadTasks(){
    let saved = localStorage.getItem("tasks");

    if(saved){
        document.getElementById("taskList").innerHTML = saved;

        document.querySelectorAll("#taskList li").forEach(li => {

            li.onclick = function(){
                li.classList.toggle("done");
                saveTasks();
            };

            let btn = li.querySelector("button");

            if(btn){
                btn.onclick = function(){
                    li.remove();
                    saveTasks();
                };
            }

        });
    }
}

window.onload = loadTasks;


// ENTER KEY FEATURE
document.getElementById("taskInput").addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        addTask();
    }
});
