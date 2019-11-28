var tasks;

if (localStorage.todoTasks) {
    tasks = JSON.parse(localStorage.todoTasks);
} else {
    let todoTasks = '[{"task":"Do intro test","id":1,"isDone":true},{"task":"Learn about JS basics","id":2,"isDone":true},{"id":3,"task":"Implement TODO list","isDone":false},{"id":4,"task":"Implement Kanban","isDone":false}]';

    tasks = JSON.parse(todoTasks);
}

var nextId = 0;

const $tasksElm = $("#tasks");
const $addButton = $("#btAddTask");
const $removeButton = $("#btRemoveTask");
const $input = $("#nTaskName");

for (let i = 0, len = tasks.length; i < len; i++) {
    if (nextId <= tasks[i].id) {
        nextId = tasks[i].id + 1;
    }
    addTaskToHTML(tasks[i], $tasksElm);
}

$addButton.on("click", function (event) {
    event.preventDefault();
    let taskNameStr = $input.val().trim();
    if (taskNameStr) {
        let taskObj = { "id": nextId, "task": taskNameStr, "isDone": false };
        nextId++;
        tasks.push(taskObj);
        addTaskToHTML(taskObj, $tasksElm);
    }
    $input.val("").focus();
});

function addTaskToHTML(taskObj, $whereToAdd) {
    if (taskObj) {
        let $newItem = $('<div class="task">' + taskObj.task + '</div>');
        if (taskObj.isDone) {
            $newItem.addClass("done");
        } else {
            $newItem.addClass("active");
        }
        $newItem.on("click", function () {
            $newItem.toggleClass("done");
            $newItem.toggleClass("active");
            for (let i = 0, len = tasks.length; i < len; i++) {
                if (tasks[i].id == taskObj.id) {
                    tasks[i].isDone = !tasks[i].isDone;
                }
            }
            localStorage.todoTasks = JSON.stringify(tasks);
        });
        localStorage.todoTasks = JSON.stringify(tasks);
        $whereToAdd.append($newItem);
    }
}

$removeButton.on("click", function (event) {
    event.preventDefault();
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].isDone) {
            $(".done").remove();
            tasks.splice(i, 1);
        }
    }
    localStorage.todoTasks = JSON.stringify(tasks);
});