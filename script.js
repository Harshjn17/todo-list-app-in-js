let input = document.querySelector('#input');
let addBtn = document.querySelector('#addBtn');
let list = document.querySelector('#list');
let clearBtn = document.querySelector('#clear');
let searchInput = document.querySelector('#searchInput');
let searchBtn = document.querySelector('#searchBtn');

let todoDatabase = [];

function addTodo(){
  let inputVal = input.value;
  
  if (inputVal.trim() === "") {
    alert('Please Enter Some Todo Bro!!');
    return;
  };
  
  let data = {
    id: Date.now(),
    todo: inputVal.toLowerCase(),
    complete: false
  };
  
  todoDatabase.push(data);
  render(todoDatabase);
  saveTodo();
  input.value = "";
};

function render(arr){
  list.innerHTML = "";
  arr.forEach((elem)=>{
    let li = document.createElement('li');
    
    let span = document.createElement('span');
    span.textContent = elem.todo;
    
    if(elem.complete){
      span.style.textDecoration = 'line-through';
    }
    
    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    
    let completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete';
    
    let editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    
    function deleteTodo(e){
      e.stopPropagation();
      
      todoDatabase = todoDatabase.filter(val => val.id !== elem.id);
      saveTodo();
      render(todoDatabase);
    };
    
    function checkComplete(e){
      e.stopPropagation();
      
      elem.complete = !elem.complete;
      
      saveTodo();
      render(todoDatabase);
    };
    
    function editTodo(e){
      e.stopPropagation();
      
      let newTodo = prompt('Enter your new Todo');
      
      if(newTodo === "" || newTodo === null){
        alert('Enter some todo bro!!');
        return;
      };
      
      elem.todo = newTodo;
      saveTodo();
      render(todoDatabase);
    };
    
    deleteBtn.addEventListener('click', deleteTodo);
    completeBtn.addEventListener('click', checkComplete);
    editBtn.addEventListener('click', editTodo);
    
    li.appendChild(span);
    li.appendChild(deleteBtn);
    li.appendChild(completeBtn);
    li.appendChild(editBtn);
    list.appendChild(li);
    
  })
};

function clearAllTodo(){
  todoDatabase = [];
  saveTodo();
  render(todoDatabase);
};

function searchTodo(){
  let searchVal = searchInput.value.trim().toLowerCase();
  
  if(searchVal === ""){
    render(todoDatabase);
    return;
  }
  
  let filtered = todoDatabase.filter(elem => {
    return elem.todo.toLowerCase().includes(searchVal);
  });
  render(filtered);
  saerchInout.value = "";
};

function saveTodo(){
  localStorage.setItem('Tododata', JSON.stringify(todoDatabase));
};
function loadTodos(){
  let loadData = JSON.parse(localStorage.getItem('Tododata'));
  
  if(loadData){
    todoDatabase = loadData;
  } else {
    todoDatabase = [];
  }
  render(todoDatabase);
};
loadTodos();

addBtn.addEventListener('click', addTodo);
clearBtn.addEventListener('click', clearAllTodo);
searchBtn.addEventListener('click', searchTodo);
