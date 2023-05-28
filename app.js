
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('tasks');

const tasks = [];

taskForm.addEventListener('submit', e => {
    e.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
    }
});

function addTask(taskText) {
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);

    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span>${task.text}</span>
            <button class="complete-btn">Complete</button>
            <button class="delete-btn">Delete</button>
        `;

        if (task.completed) {
            taskItem.classList.add('completed');
        }

        taskItem.querySelector('.complete-btn').addEventListener('click', () => {
            toggleTaskCompletion(task.id);
        });

        taskItem.querySelector('.delete-btn').addEventListener('click', () => {
            deleteTask(task.id);
        });

        taskList.appendChild(taskItem);
    });
}

function toggleTaskCompletion(taskId) {
    tasks.forEach(task => {
        if (task.id === taskId) {
            task.completed = !task.completed;
        }
    });

    renderTasks();
}

function deleteTask(taskId) {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    tasks.splice(taskIndex, 1);

    renderTasks();
}

renderTasks();
