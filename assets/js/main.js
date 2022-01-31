const inputnewtask = document.querySelector('.input-new-task');
const btnaddtask = document.querySelector('.btn-add-task');
const tasks = document.querySelector('.tasks');

function createLi() {
    const li = document.createElement('li');
    return li;
}

inputnewtask.addEventListener('keypress', function(e) {
    if (e.keyCode == 13) {
        if (!inputnewtask.value) return;
        createtask(inputnewtask.value);

    }
});

function cleanInput() {
    inputnewtask.value = '';
    inputnewtask.focus();
}

function createButtonClean (li) {
    li.innerText += ' ';
    const buttonClean = document.createElement('button');
    buttonClean.innerText = 'Clean';
    buttonClean.setAttribute('class', 'clean');
    buttonClean.setAttribute('title', 'Clean this task');
    li.appendChild(buttonClean);
}

function createtask (textInput) {
    const li = createLi();
    li.innerText = textInput;
    tasks.appendChild(li);
    cleanInput();
    createButtonClean(li);
    saveTasks();
}

btnaddtask.addEventListener('click', function(){
    if (!inputnewtask.value) return;
    createtask(inputnewtask.value);
});

document.addEventListener('click', function(e) {
    const el = e.target;

    if(el.classList.contains('clean')){
        el.parentElement.remove();
        saveTasks();
    }
});

function saveTasks() {
    const liTasks = saveTasks.querySelectorAll('li');
    const toDoList = [];

    for(let task of liTasks ) {
        let taskText = task.innerText;
        taskText = taskText.replace('Clean', '').trim();
        toDoList.push(taskText);
    }

    const tasksJSON = JSON.stringify(toDoList);
    localStorage.setItem('tasks', tasksJSON);
}

function addTaskSaves () {
    const tasks = localStorage.getItem('tasks');
    const ToDoList = JSON.parse(tasks);
    
    for (let task of ToDoList) {
        createtask(task);
    }
}
addEventListener();
