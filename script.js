//JS code

//Variables

const taskInput = document.querySelector(".task-input input"),
    filters = document.querySelectorAll(".filters span"),
    clearAll = document.querySelector(".clear-btn"),
    taskBox = document.querySelector(".task-box");

let editId;
let isEditableTask = false;

//getting localstorage todo-list
let todos = JSON.parse(localStorage.getItem("todo-list"));

//Step-7
filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove
            ("active");
        btn.classList.add("active");
        showToDoList(btn.id);
    })
})

//Step 2
function showToDoList(filter) {
    let liTag = "";
    if (todos) {
        todos.forEach((todo, id) => {

            let isCompleted = todo.status == "completed" ? "checked" : "";


            if (filter == todo.status || filter == "all") {
                //Template Literals
                liTag += `  
            <li class="task">
            <label for="${id}">
                <input onclick ="updateStatus(this)" type="checkbox" name="" id="${id}" ${isCompleted}>
                <p class="${isCompleted}">${todo.name}</p>
            </label>
            <div class="settings">
                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                <ul class="task-menu">
                    <li onclick='editTask(${id}, "${todo.name}")'><i class="uil uil-pen"></i>Edit</li>
                    <li onclick='deleteTask(${id},"${filter}")'><i class="uil uil-trash"></i>Delete</li>
                </ul>
            </div>
            </li>
        `;

            }
            // console.log(todo, id)
        });
    }

    //If li isn't empty,insert this value inside taskbox else insert span
    taskBox.innerHTML = liTag || `<span> You don't have any task here</span>`;
}
showToDoList("all");

// Step-4
function showMenu(selectedTask) {
    let menuDiv = selectedTask.parentElement.lastElementChild;
    menuDiv.classList.add("show");

    document.addEventListener("click", e => {
        if (e.target.tagName != "I" || e.target != selectedTask) {
            menuDiv.classList.remove("show");
        }
    })
}

//Step-5
function deleteTask(deleteId, filter) {
    //removeing selected task from array/todos
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    // console.log(deleteId);
    showToDoList(filter)
}

//Step-7
clearAll.addEventListener("click", () => {
    todos.splice(0, todos.length);//removing all items of array/todos
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showToDoList("all");
})

//Step-6
function editTask(taskId, taskName) {
    editId = taskId;
    isEditableTask = true;
    taskInput.value = taskName;
    // console.log(taskId, taskName);

}

//Step-3
function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    if (selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
    // console.log(selectedTask);
}


//Step 1
taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();

    if (e.key == "Enter" && userTask) {

        if (!isEditableTask) {//if isEditableTask isn't true
            //If Todos isn't exist, pass an empty array to todos
            if (!todos) {
                todos = [];
            }
            //Array
            let taskInfo = { name: userTask, status: "pending" }
            // todos = !todos ? [] : todos;
            todos.push(taskInfo); //adding new task to todos or append
        } else {
            isEditableTask = false;
            todos[editId].name = userTask;
        }
        taskInput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));

        showToDoList("all");
    }
    // console.log(userTask);
})