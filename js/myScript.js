const form = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const taskText = taskInput.value.trim();

    if(taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
    }
})

function addTask(text) {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task-item');

    const taskSpan = document.createElement('span');
    taskSpan.textContent = text;

    const buttonsDiv = document.createElement('div');

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    editBtn.classList.add('edit-btn');

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.classList.add('delete-btn');

    buttonsDiv.appendChild(editBtn);
    buttonsDiv.appendChild(deleteBtn);

    taskDiv.appendChild(taskSpan);
    taskDiv.appendChild(buttonsDiv);

    taskList.appendChild(taskDiv);
}