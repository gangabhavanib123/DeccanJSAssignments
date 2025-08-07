let inputBox = document.getElementById("input-box");
let errorMsg = document.getElementById("error-msg");
const todoDiv = document.querySelector(".todo");

// Creating dynamic unordered list

const listContainer = document.createElement("ul");
listContainer.id = "list-container";
todoDiv.appendChild(listContainer);

const status = document.getElementById("status");
const completedTasks = document.getElementById("completed");
const remainingTasks = document.getElementById("remaining");


function addTask() {
    if (inputBox.value === '') {
        errorMsg.textContent = "You must write something!";
    }
    else {
        errorMsg.textContent = "";

        // Creating list
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        // Adding delete button
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        inputBox.value = "";
        saveData();
        tasksStatus();
    }

}
// Clicking events
listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    }
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
    }
    saveData();
    tasksStatus();
});


//Storing data in local storage
function saveData() {
    let tasks = [];
    let items = listContainer.querySelectorAll("li");

    items.forEach(item => {
        tasks.push({
            text: item.textContent.replace("×", "").trim(), // remove delete button
            checked: item.classList.contains("checked")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Getting data from local storage
function showTask() {
    listContainer.innerHTML = ""; // Clear existing list
    let savedTasks = JSON.parse(localStorage.getItem("tasks"));

    if (savedTasks === null) return;

    savedTasks.map(task => {
        let li = document.createElement("li");
        li.textContent = task.text;
        if (task.checked) {
            li.classList.add("checked");
        }

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        listContainer.appendChild(li);
    });
    tasksStatus();
}
// Displaying the number of completed and incompleted tasks
function tasksStatus() {
    let allTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    let completedTasks = allTasks.filter(task => task.checked);
    let remainingTasks = allTasks.filter(task => !task.checked);

    completed.textContent = completedTasks.length;
    remaining.textContent = remainingTasks.length;
}

// Initial render
showTask();
