  document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("new-task-input");
  const addTaskButton = document.getElementById("add-task-button");
  const taskList = document.getElementById("task-list");
  let isEditing = false;
  let editingIndex = null;

  // Load tasks from local storage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const taskItem = document.createElement("li");
      const taskText = document.createElement("span");
      taskText.className = "task-text";
      taskText.textContent = task.text;

      const editButton = document.createElement("button");
      editButton.className = "edit";
      editButton.innerHTML = `
                <svg class="css-i6dzq1" fill="none" stroke-width="2" stroke="#FFFFFF" height="24" width="24" viewBox="0 0 24 24">
                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                </svg>
                Edit
            `;
      editButton.addEventListener("click", () => startEditTask(index));

      const deleteButton = document.createElement("button");
      deleteButton.className = "delete";
      deleteButton.innerHTML = `
                <svg class="css-i6dzq1" fill="none" stroke-width="2" stroke="#FFFFFF" height="24" width="24" viewBox="0 0 24 24">
                    <path d="M3 6h18M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m5 0v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6h16zM10 11v6m4-6v6"></path>
                </svg>
                Delete
            `;
      deleteButton.addEventListener("click", () => deleteTask(index));

      taskItem.appendChild(taskText);
      taskItem.appendChild(editButton);
      taskItem.appendChild(deleteButton);
      taskList.appendChild(taskItem);
    });
  }

  function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
      if (isEditing) {
        tasks[editingIndex].text = taskText;
        isEditing = false;
        editingIndex = null;
        addTaskButton.textContent = "Add Task";
      } else {
        tasks.unshift({ text: taskText });
      }
      taskInput.value = "";
      saveTasks();
      renderTasks();
    }
  }

  function startEditTask(index) {
    taskInput.value = tasks[index].text;
    isEditing = true;
    editingIndex = index;
    addTaskButton.textContent = "Update Task";
  }

  function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }

  addTaskButton.addEventListener("click", addTask);
  renderTasks();
});