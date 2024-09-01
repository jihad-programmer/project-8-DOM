let tasks = [];

    document.getElementById('addTaskBtn').addEventListener('click', addTask);

    function addTask() {
        const taskInput = document.getElementById('taskInput');
        const task = taskInput.value;
        const date = new Date().toLocaleDateString();

        if (task) {
            tasks.push({ task, date, done: false });
            taskInput.value = '';
            renderTasks();
        }
    }

    function renderTasks() {
        const taskTableBody = document.getElementById('taskTableBody');
        taskTableBody.innerHTML = '';

        tasks.forEach((task, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td class="border-b p-2 text-center">
                    <input type="checkbox" ${task.done ? 'checked' : ''} onchange="toggleTaskStatus(${index})">
                </td>
                <td class="border-b p-2">${task.task}</td>
                <td class="border-b p-2">${task.date}</td>
                <td class="border-b p-2 text-center">
                    <button onclick="editTask(${index})" class="text-blue-500 hover:text-blue-700 mx-1"><i class="fas fa-edit"></i></button>
                    <button onclick="deleteTask(${index})" class="text-red-500 hover:text-red-700 mx-1"><i class="fas fa-trash-alt"></i></button>
                </td>
            `;

            taskTableBody.appendChild(row);
        });
    }

    function toggleTaskStatus(index) {
        tasks[index].done = !tasks[index].done;
        renderTasks();
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
    }

    function editTask(index) {
        const newTask = prompt('Edit Task:', tasks[index].task);
        if (newTask !== null) {
            tasks[index].task = newTask;
            renderTasks();
        }
    }
