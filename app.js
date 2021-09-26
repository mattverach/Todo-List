//Selectores
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Eventos
document,addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//Funciones
function addTodo(event){
    event.preventDefault();
    //TODO DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //GUARDAR TODO EN LOCAL STORAGE
    saveLocalTodos(todoInput.value);
    //BOTON HECHO
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class= "fas fa-check"> </i>'
    completedButton.classList.add("completed-btn")
    todoDiv.appendChild(completedButton);
    //BOTON DESCARTAR
    const descartButton = document.createElement("button");
    descartButton.innerHTML = '<i class= "fas fa-trash"> </i>'
    descartButton.classList.add("descart-btn")
    todoDiv.appendChild(descartButton);
    //A LA LISTA
    todoList.appendChild(todoDiv);
    //LIMPIAR INPUT
    todoInput.value = "";


}

function deleteCheck(e){
    const item = e.target;
    //BORRAR
    if(item.classList[0] === "descart-btn"){
        const todo = item.parentElement;
        //ANIMACION
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function(){
            todo.remove();
        });
        
    }
    //HECHO
    if(item.classList[0] === "completed-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

//FILTRO
function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
    switch(e.target.value){
        case 'all':
            todo.style.display = 'flex';
            break;
        case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
        case 'uncompleted':
            if(!todo.classList.contains('completed')){
                todo.style.display = 'flex';
            }else{
                todo.style.display = 'none';
            }
            break;
        
    }
    });
}

function saveLocalTodos(todo){
    let todos;
    //REVISA SI TENGO TODOS EN LOCAL STORAGE Y LOS PONE EN UN ARRAY
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
    //TODO DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //BOTON HECHO
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class= "fas fa-check"> </i>'
    completedButton.classList.add("completed-btn")
    todoDiv.appendChild(completedButton);
    //BOTON DESCARTAR
    const descartButton = document.createElement("button");
    descartButton.innerHTML = '<i class= "fas fa-trash"> </i>'
    descartButton.classList.add("descart-btn")
    todoDiv.appendChild(descartButton);
    //A LA LISTA
    todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}
