const form = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const taskText = taskInput.value.trim();

    if(taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
        //Agrego guardarTarea para guardar la tarea en el localStorage
        guardarTareas();
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
    editBtn.addEventListener('click', function () {
        const isEditing = taskDiv.classList.contains('editing');
        
        if(!isEditing) {
            const currentText = taskSpan.textContent;
            const input = document.createElement('input');
            input.type = 'text';
            input.value = currentText;
            input.classList.add('edit-input');

            taskDiv.replaceChild(input, taskSpan);
            editBtn.textContent = 'Guardar';
            taskDiv.classList.add('editing');
        } else {
            if(confirm("¿Guardar cambios?")) {
                const input = taskDiv.querySelector('.edit-input');
                const updatedText = input.value;

                taskSpan.textContent = updatedText;
                taskDiv.replaceChild(taskSpan, input);
                editBtn.textContent = 'Editar';
                taskDiv.classList.remove('editing');

                alert("Tarea actualizada correctamente");
                //Agrego guardarTarea para guardar la tarea en el localStorage al editarla
                guardarTareas();
            }
        }
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function () {
        if(confirm("¿Estas seguro de eliminar esta tarea?")) {
            taskDiv.remove();
            guardarTareas(); // Actualiza el localStorage después de eliminar
            alert("Tarea eliminada");
        }
    });

    buttonsDiv.appendChild(editBtn);
    buttonsDiv.appendChild(deleteBtn);

    taskDiv.appendChild(taskSpan);
    taskDiv.appendChild(buttonsDiv);

    taskList.appendChild(taskDiv);
}


//Aqui agrego la funcion para guardar las tareas en el localStorage
function guardarTareas() {
    const tareas = [];
    document.querySelectorAll('.task-item span').forEach(span => {
        tareas.push(span.textContent);
    });

    localStorage.setItem('tareas', JSON.stringify(tareas));
}

//Aqui agrego la funcion para cargar las tareas desde el localStorage
function cargarTareas() {
    const tareasGuardadas = localStorage.getItem('tareas');
    if(tareasGuardadas) {
        const tareas = JSON.parse(tareasGuardadas);
        tareas.forEach(texto => addTask(texto));
    }
}

//Agrego cargarTareas para cargar las tareas desde el localStorage
cargarTareas();