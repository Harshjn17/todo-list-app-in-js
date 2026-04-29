// Improved todo app version 

const input = document.querySelector('#input');
const addBtn = document.querySelector('#addBtn');
const list = document.querySelector('#list');

let allTask = [];

const addTodo = () => {
  let inputVal = input.value;
  
  if (inputVal.trim() === "") {
    alert('Please Enter some task');
    return;
  };
  
  let todo = {
    id: Date.now(),
    title: inputVal,
    completed: false
  };

  allTask.push(todo);
  createTodo(todo);
  saveTask();
  input.value = "";
};

function createTodo(task){
   let li = document.createElement('li');
   
   let span = document.createElement('span');
   span.textContent = task.title;
   
   if (task.completed) {
    li.classList.add('mark');
  }
   
   li.addEventListener('click', ()=>{
    task.completed = !task.completed;
    li.classList.toggle('mark');
    saveTask();
  }
);
   
   let deleteBtn = document.createElement('button');
   deleteBtn.textContent = 'Delete';
   
   let editBtn = document.createElement('button');
   editBtn.textContent = 'Edit';
   
   // DELETE BUTTON FUNCTIONALITY
   deleteBtn.addEventListener('click',deleteTodo);
   
   editBtn.addEventListener('click',editTodo);
   
   function deleteTodo(e){
     e.stopPropagation();
     allTask = allTask.filter(elem => elem.id !== task.id)
     li.remove();
     saveTask();
   }
   
   function editTodo(ve){
     ve.stopPropagation();
     
    let editVal = prompt('Enter your edited task');
    
    if (editVal === null) {
      return;
    }
    
    if (editVal.trim() === "") {
      alert('Enter some task');
      return;
    } else {
      task.title = editVal;
      span.textContent = editVal;
      saveTask();
    }
   };
   
   li.appendChild(span);
   li.appendChild(editBtn);
   li.appendChild(deleteBtn);
   list.appendChild(li);
}

function saveTask(){
  localStorage.setItem('todoData', JSON.stringify(allTask));
};
function loadTask(){
  let savedTask = localStorage.getItem('todoData');
  
  if (savedTask) {
    allTask = JSON.parse(savedTask);
    list.innerHTML = "";
    
    for(let task of allTask){
      createTodo(task);
    }
  }
};
loadTask();
addBtn.addEventListener('click', addTodo);

let allBtn = document.querySelector('#allBtn');
let completedBtn = document.querySelector('#completedBtn');
let pendingBtn = document.querySelector('#pendingBtn');

let addFilter = (arr) => {
  list.innerHTML = "";
  for(let task of arr){
    createTodo(task);
  }
}

let completeFilter = (arr) => {
  list.innerHTML = "";
  let completeView = arr.filter(elem => elem.completed === true);
  for(let task of completeView){
    createTodo(task);
  };
};

let pendingFilter = (arr) => {
  list.innerHTML = "";
  let pendingView = arr.filter(elem => elem.completed === false);
  for(let task of pendingView){
    createTodo(task);
  };
};

allBtn.addEventListener('click',()=>{
  addFilter(allTask);
});

completedBtn.addEventListener('click',()=>{
  completeFilter(allTask);
});

pendingBtn.addEventListener('click', ()=>{ pendingFilter(allTask);
});
