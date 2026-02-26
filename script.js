let inp = document.querySelector("input");
let list = document.querySelector("#list");
let h1 = document.querySelector("h1");
let addbtn = document.querySelector("button");

let todoTasks = [];

inp.addEventListener("keydown", (e)=>{
    if (e.key === "Enter") {
      addTasks();
    }
  })

addbtn.addEventListener("click", addTasks)

function addTasks(){
  let inpVal = inp.value.trim();
  
  if (inpVal === ""){
    h1.textContent = "Please enter a task";
    return;
  } else {
    h1.textContent = "";
  }
  
  todoTasks.push(inpVal);
  
  localStorage.setItem('tasks', JSON.stringify(todoTasks));
  
  let li = document.createElement("li");
  li.textContent = inpVal;
  li.dataset.task = inpVal;
  
  list.appendChild(li);
  
  li.addEventListener("click", ()=>{
    li.classList.toggle("strike-through");
  })
  
  let deletebtn = document.createElement("button");
  deletebtn.textContent = "Delete";
  
  li.appendChild(deletebtn);
  
  deletebtn.addEventListener("click", (e)=>{
    e.stopPropagation();
    
    let taskText = li.dataset.task;
    let index = todoTasks.indexOf(taskText);
    
    if (index !== -1) {
      todoTasks.splice(index, 1);
    }
    
    localStorage.setItem('tasks', JSON.stringify(todoTasks));
    
    li.remove();
  })
  
  inp.value = "";
}
