document.addEventListener('DOMContentLoaded', loadTask);
let cunt=0;

function loadTask(){
    let allTasks = JSON.parse(localStorage.getItem('todo')) || [];
    allTasks.forEach(element => {
        addNewTask(element);
    });

    let doneTask = JSON.parse(localStorage.getItem('done')) || [];
    doneTask.forEach(element =>{
        addDone(element);
    });
}


function addTask(){
    let task = document.getElementById('inputTask').value;
    if(task === '' || task.trim()===''){
        alert('Empty task is not a task bro!');
        document.getElementById('inputTask').value = '';
        return;
    }else{
        addNewTask(task);
    }
    
    let allTasks = JSON.parse(localStorage.getItem('todo')) || [];
    allTasks.push(task);
    localStorage.setItem('todo',JSON.stringify(allTasks));

    let doneTask = JSON.parse(localStorage.getItem('done')) || [];
}

function addNewTask(task){
    let ul = document.getElementById('taskList');
    let li = document.createElement('li');
    li.innerHTML = `<span class=fs-3>${task}</span>
        <span>
            <span onclick="doneTask(this)" class="btn btn-success"><i class="fa-solid fa-check"></i></span>
            <span onclick="editTask(this)" class="btn btn-primary"><i class="fa-solid fa-pen-to-square"></i></span>
            <span onclick="deleteTask(this)" class="btn btn-danger"><i class="fa-solid fa-trash"></i></span>
        </span>`;
    ul.appendChild(li);
    document.getElementById('inputTask').value = '';
}

function addDone(task){
    let ul = document.getElementById('taskList');
    let li = document.createElement('li');
    li.innerHTML = `<span class="text-decoration-line-through fs-3">${task}</span>
        <span>
            <span onclick="doneTask(this)" class="btn btn-success"><i class="fa-solid fa-check"></i></span>
            <span onclick="editTask(this)" class="btn btn-primary"><i class="fa-solid fa-pen-to-square"></i></span>
            <span onclick="deleteTask(this)" class="btn btn-danger"><i class="fa-solid fa-trash"></i></span>
        </span>`;
    ul.appendChild(li);
}

function doneTask(element){
    cunt++;
    console.log(cunt);
    let li = element.parentElement.parentElement;
    let taskText= li.firstElementChild.innerText;

    if(cunt%2==1){
        li.innerHTML = `<span class="text-decoration-line-through fs-3">${taskText}</span>
        <span>
            <span onclick="doneTask(this)" class="btn btn-success"><i class="fa-solid fa-check"></i></span>
            <span onclick="editTask(this)" class="btn btn-primary"><i class="fa-solid fa-pen-to-square"></i></span>
            <span onclick="deleteTask(this)" class="btn btn-danger"><i class="fa-solid fa-trash"></i></span>
        </span>`;

        let doneTask = JSON.parse(localStorage.getItem('done')) || [];
        doneTask.push(taskText)
        localStorage.setItem('done',JSON.stringify(doneTask));

        let allTasks = JSON.parse(localStorage.getItem('todo')) || [];
        allTasks = allTasks.filter(task=> task !== taskText);
        localStorage.setItem('todo',JSON.stringify(allTasks));
    }else{
        li.innerHTML = `<span class="fs-3">${taskText}</span>
        <span>
            <span onclick="doneTask(this)" class="btn btn-success"><i class="fa-solid fa-check"></i></span>
            <span onclick="editTask(this)" class="btn btn-primary"><i class="fa-solid fa-pen-to-square"></i></span>
            <span onclick="deleteTask(this)" class="btn btn-danger"><i class="fa-solid fa-trash"></i></span>
        </span>`;

        let allTasks = JSON.parse(localStorage.getItem('todo')) || [];
        allTasks.push(taskText)
        localStorage.setItem('todo',JSON.stringify(allTasks));

        let doneTask = JSON.parse(localStorage.getItem('done')) || [];
        doneTask = doneTask.filter(task=> task !== taskText);
        localStorage.setItem('done',JSON.stringify(doneTask));
    }

    
}

function editTask(element){
    let li = element.parentElement.parentElement;
    let taskText= li.firstElementChild.innerText;

    let newTask = prompt("Edit your task...",taskText);
    
    if (newTask !== null && newTask.trim() !== "") {
        li.innerHTML = `<span class=fs-3>${newTask}</span>
        <span>
            <span onclick="doneTask(this)" class="btn btn-success"><i class="fa-solid fa-check"></i></span>
            <span onclick="editTask(this)" class="btn btn-primary"><i class="fa-solid fa-pen-to-square"></i></span>
            <span onclick="deleteTask(this)" class="btn btn-danger"><i class="fa-solid fa-trash"></i></span>
        </span>`;
    }else{
        alert('Empty task is not a task bro!');
        return;
    }

    let allTasks = JSON.parse(localStorage.getItem('todo')) || [];
    for(let i=0;i<allTasks.length;i++){
        if(allTasks[i]==taskText){
            allTasks[i] = newTask;
            break;
        }
    }
    localStorage.setItem('todo',JSON.stringify(allTasks));
}

function deleteTask(element){
    let li = element.parentElement.parentElement;
    let taskText= li.firstElementChild.innerText;
    li.remove();

    let allTasks = JSON.parse(localStorage.getItem('todo')) || [];
    allTasks = allTasks.filter(task=> task !== taskText);
    localStorage.setItem('todo',JSON.stringify(allTasks));

    let doneTask = JSON.parse(localStorage.getItem('done')) || [];
    doneTask = doneTask.filter(task=> task !== taskText);
    localStorage.setItem('done',JSON.stringify(doneTask));
}