document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const completedCount = document.getElementById('completedCount');

    let tasks = [];

    function updateCompletedCount() {
        const count = tasks.filter(task => task.completed).length;
        completedCount.textContent = count;
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `
                <span>${task.text}</span>
                <button onclick="toggleTask(${index})">${task.completed ? '取消' : '完成'}</button>
                <button onclick="deleteTask(${index})">删除</button>
            `;
            taskList.appendChild(li);
        });
        updateCompletedCount();
    }

    window.toggleTask = function(index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    };

    window.deleteTask = function(index) {
        tasks.splice(index, 1);
        renderTasks();
    };

    addTaskBtn.addEventListener('click', function() {
        const text = taskInput.value.trim();
        if (text !== '') {
            tasks.push({ text, completed: false });
            taskInput.value = '';
            renderTasks();
        }
    });

    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTaskBtn.click();
        }
    });

    renderTasks();
});