let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

let currentFilter = "all";

let deleteIndex = -1;

let editIndex = -1;

function addItem() {

    if (taskInput.value.trim() == "") {

        showMessage("Please enter a task.");

    } else {

        let task = {

            name: taskInput.value,

            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            }),

            completed: false
        };


        todoList.push(task);


        localStorage.setItem(
            "todoList",
            JSON.stringify(todoList)
        );


        taskInput.value = "";


        displayItems();
    }
}

function displayItems() {

    document.getElementById("taskList").innerHTML = "";

    let shownTasks = 0;


    for (
        let index = 0;
        index < todoList.length;
        index++
    ) {

        let element = todoList[index];


        if (
            currentFilter == "active" &&
            element.completed == true
        ) {

            continue;
        }


        if (
            currentFilter == "completed" &&
            element.completed == false
        ) {

            continue;
        }


        shownTasks++;


        let completedClass = "";


        if (element.completed == true) {

            completedClass = "completed";
        }


        document.getElementById("taskList").innerHTML +=

            `<div class="task-card ${completedClass}">

                <div class="task-left">

                    <input
                        type="checkbox"
                        class="form-check-input task-checkbox"
                        onclick="completeTask(${index})"
                        ${element.completed == true ? "checked" : ""}
                    >


                    <div class="task-info">

                        <span class="task-text">
                            ${element.name}
                        </span>


                        <span class="task-time">

                            <i class="bi bi-clock"></i>

                            ${element.time}

                        </span>

                    </div>

                </div>


                <div class="task-actions">

                    <button
                        type="button"
                        onclick="editItem(${index})"
                        class="task-action edit-btn"
                    >

                        <i class="bi bi-pencil"></i>

                    </button>


                    <button
                        type="button"
                        onclick="removeItem(${index})"
                        class="task-action delete-btn"
                    >

                        <i class="bi bi-trash3"></i>

                    </button>

                </div>

            </div>`;
    }


    if (shownTasks < 1) {

        document.getElementById(
            "emptyState"
        ).style.display = "block";

    } else {

        document.getElementById(
            "emptyState"
        ).style.display = "none";
    }


    document.getElementById(
        "taskCount"
    ).innerHTML = todoList.length;


    updateStatistics();
}

function completeTask(index) {

    if (
        todoList[index].completed == false
    ) {

        todoList[index].completed = true;

    } else {

        todoList[index].completed = false;
    }


    localStorage.setItem(
        "todoList",
        JSON.stringify(todoList)
    );


    displayItems();
}

function showAll() {

    currentFilter = "all";

    setActiveButton("allBtn");

    displayItems();
}

function showActive() {

    currentFilter = "active";

    setActiveButton("activeBtn");

    displayItems();
}

function showCompleted() {

    currentFilter = "completed";

    setActiveButton("completedBtn");

    displayItems();
}

function setActiveButton(buttonId) {

    document
        .getElementById("allBtn")
        .classList.remove("active");


    document
        .getElementById("activeBtn")
        .classList.remove("active");


    document
        .getElementById("completedBtn")
        .classList.remove("active");


    document
        .getElementById(buttonId)
        .classList.add("active");
}

function removeItem(index) {

    deleteIndex = index;


    let deleteModal =
        new bootstrap.Modal(
            document.getElementById(
                "deleteModal"
            )
        );


    deleteModal.show();
}

function confirmDelete() {

    if (deleteIndex >= 0) {

        todoList.splice(
            deleteIndex,
            1
        );


        localStorage.setItem(
            "todoList",
            JSON.stringify(todoList)
        );


        deleteIndex = -1;


        displayItems();


        bootstrap.Modal
            .getInstance(
                document.getElementById(
                    "deleteModal"
                )
            )
            .hide();
    }
}

function deleteAll() {

    if (todoList.length < 1) {

        showMessage(
            "There are no tasks to delete."
        );

    } else {

        let deleteAllModal =
            new bootstrap.Modal(
                document.getElementById(
                    "deleteAllModal"
                )
            );


        deleteAllModal.show();
    }
}

function confirmDeleteAll() {

    todoList.splice(
        0,
        todoList.length
    );


    localStorage.setItem(
        "todoList",
        JSON.stringify(todoList)
    );


    displayItems();


    bootstrap.Modal
        .getInstance(
            document.getElementById(
                "deleteAllModal"
            )
        )
        .hide();
}

function editItem(index) {

    editIndex = index;


    document.getElementById(
        "editInput"
    ).value = todoList[index].name;


    document.getElementById(
        "editTime"
    ).value = "";


    let editModal =
        new bootstrap.Modal(
            document.getElementById(
                "editModal"
            )
        );


    editModal.show();
}

function saveEdit() {

    let newItem =
        document.getElementById(
            "editInput"
        ).value;


    let newTime =
        document.getElementById(
            "editTime"
        ).value;


    if (newItem.trim() == "") {

        showMessage(
            "Task should not be empty."
        );

    } else {

        todoList[editIndex].name =
            newItem;


        if (newTime != "") {

            todoList[editIndex].time =
                newTime;
        }


        localStorage.setItem(
            "todoList",
            JSON.stringify(todoList)
        );


        displayItems();


        bootstrap.Modal
            .getInstance(
                document.getElementById(
                    "editModal"
                )
            )
            .hide();
    }
}

function updateStatistics() {

    let total = todoList.length;

    let completed = 0;

    let active = 0;


    for (
        let index = 0;
        index < todoList.length;
        index++
    ) {

        if (
            todoList[index].completed == true
        ) {

            completed++;

        } else {

            active++;
        }
    }


    document.getElementById(
        "totalStat"
    ).innerHTML = total;


    document.getElementById(
        "activeStat"
    ).innerHTML = active;


    document.getElementById(
        "completedStat"
    ).innerHTML = completed;
}

function showMessage(message) {

    document.getElementById(
        "messageText"
    ).innerHTML = message;


    let messageModal =
        new bootstrap.Modal(
            document.getElementById(
                "messageModal"
            )
        );


    messageModal.show();
}

taskInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key == "Enter") {

            addItem();
        }

    }
);

displayItems();