const button = document.querySelector(".btn") /*identify button*/
const input = document.querySelector(".main-input") /*identify input*/
const fullList = document.querySelector(".list-tasks")  /*identify all the tasks and put it in HTML code/screen"*/

let myTasks = []; /*array to keep all the information from the input*/

function inputTask() { /*when the button is active, call the function*/
    if (input.value.trim() === '') { /*check if the input is empty or only spaces*/
        showError('Task not found'); /*show error if the input is empty*/
        input.classList.add('error'); /*add error class to input*/
        return; /*do nothing if the input is empty*/
    }
    input.classList.remove('error'); /*remove error class from input*/

    myTasks.push({
        taskinfo: input.value, /*push all the information from the input*/
        status: false
    });

    input.value = ''; /*after sending a task from the input, input is cleared to type a new task*/

    showTasks(); /*after pushing all the inputs, you have to call the function showTasks, to show everything on the screen*/
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerText = message;
    document.body.appendChild(errorDiv);
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

function showTasks() { /*show all tasks -> screen*/
    let newTask = '';

    myTasks.forEach((tasks, index) => { /*index shows the position of the information in the array*/
        newTask += `

<li class="tasks ${tasks.status && "done"}">
    <img title="Done" class="img-done" src="./assets/check.png" alt="task-checked" onclick="taskDone(${index})">
    <p> ${tasks.taskinfo} </p>
    <img title="Edit" class="img-edit" src="./assets/edit.png" alt="task-edit" onclick="editTask(${index})">
    <img title="Delete" class="img-delete" src="./assets/delete.png" alt="task-deleted" onclick="deleteTask(${index})">
</li>
`
    })

    fullList.innerHTML = newTask /*show all tasks -> screen*/
    localStorage.setItem('mytaskslist', JSON.stringify(myTasks))
}

function editTask (index) {
    const taskElement = fullList.children[index];
    taskElement.style.textDecoration = 'none'; //tirar o subscrito no campo de edição//
    const taskEditing = myTasks[index].taskinfo;

    function editTask (index) {
        const taskElement = fullList.children[index];
        taskElement.classList.remove('completed'); // Assumindo que 'completed' aplica o subscrito
        const taskEditing = myTasks[index].taskinfo;
        
        // Resto do código...
    }
    
    taskElement.innerHTML = `
    <input type="text" class="edit-input" value="${taskEditing}">
    <button class="edit-save-btn" onclick="saveEdit(${index})">Save</button>
`;

    const editInput = taskElement.querySelector('.edit-input');
    editInput.focus();
    editInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            saveEdit(index);
        }
    });
}

function saveEdit(index) {
    const taskElement = fullList.children[index];
    const editInput = taskElement.querySelector('.edit-input');
    const newText = editInput.value.trim();

    if (newText !== '') {
        myTasks[index].taskinfo = newText;
        showTasks();
    } else {
        showError('Task cannot be empty');
    }
}

function taskDone (index) {
myTasks[index].status = !myTasks[index].status /*done is false, when use ! it invert the position, become true  */

showTasks()
}

function deleteTask(index) {
myTasks.splice(index, 1)

showTasks()
}

function reloadItems() {
const tasksLocalStorage = localStorage.getItem('mytaskslist')

if (tasksLocalStorage) {
    myTasks = JSON.parse(tasksLocalStorage)
}

showTasks()
}

function clearAllTasks ( ) { //retirar as tasks da tela quando clica no botão//
myTasks = []
localStorage.removeItem ('mytaskslist'); // Remove do localStorage

showTasks()
}


async function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');

    // Salvar preferência do usuário
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode ? 'true' : 'false');

    showTasks();
}

// Verifica se o usuário já tinha selecionado o modo dark anteriormente
const darkModeEnabled = localStorage.getItem('darkMode') === 'true';

// Aplica o modo dark se estiver ativado
if (darkModeEnabled) {
    document.body.classList.add('dark-mode');
  
}

reloadItems()
button.addEventListener('click', inputTask)
input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        inputTask();
    }
});