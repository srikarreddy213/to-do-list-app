// Your element references
var addbtn = document.getElementById("addtsk-btn");
var tskin = document.getElementById("taskinput");
var list = document.getElementById("list");
var form = document.getElementById("taskform");

function saveTasks() {
    var tasks = [];
    var items = list.getElementsByTagName("li");
    for (var i = 0; i < items.length; i++) {
        var text = items[i].childNodes[0].nodeValue;
        var completed = items[i].className === "completed";
        tasks.push({ text: text, completed: completed });
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    var tasks = localStorage.getItem("tasks");
    if (tasks) {
        tasks = JSON.parse(tasks);
        for (var i = 0; i < tasks.length; i++) {
            addTaskToList(tasks[i].text, tasks[i].completed);
        }
    }
}

function addTaskToList(task, completed) {
    var li = document.createElement("li");
    li.textContent = task;
    if (completed) {
        li.className = "completed";
    }
    li.onclick = function() {
        if (li.className === "completed") {
            li.className = "";
        } else {
            li.className = "completed";
        }
        saveTasks();
    };
    var del = document.createElement("button");
    del.textContent = "Delete";
    del.className = "deletebtn";
    del.onclick = function(e) {
        e.stopPropagation();
        list.removeChild(li);
        saveTasks();
    };
    li.appendChild(del);
    list.appendChild(li);
}

form.onsubmit = function(e) {
    e.preventDefault();
    var task = tskin.value.trim();
    if (task === "") {
        tskin.focus();
        return;
    }
    addTaskToList(task, false);
    saveTasks();
    tskin.value = "";
    tskin.focus();
};

window.onload = function() {
    loadTasks();
};
