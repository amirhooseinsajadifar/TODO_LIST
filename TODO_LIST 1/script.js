document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskList = document.getElementById("task-list");
  
    // Load tasks from LocalStorage
    const loadTasks = () => {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.forEach(task => createTaskElement(task.text, task.completed));
    };
  
    // Save tasks to LocalStorage
    const saveTasks = () => {
      const tasks = [];
      document.querySelectorAll("li").forEach(task => {
        tasks.push({
          text: task.querySelector(".task-text").textContent,
          completed: task.classList.contains("completed")
        });
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    };
  
    // Create task element
    const createTaskElement = (text, completed = false) => {
      const li = document.createElement("li");
      if (completed) li.classList.add("completed");
  
      const taskText = document.createElement("span");
      taskText.textContent = text;
      taskText.className = "task-text";
      li.appendChild(taskText);
  
      const actions = document.createElement("div");
      actions.className = "task-actions";
  
      const completeBtn = document.createElement("button");
      completeBtn.textContent = "✔";
      completeBtn.className = "complete";
      completeBtn.addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasks();
      });
  
      const editBtn = document.createElement("button");
      editBtn.textContent = "✏";
      editBtn.className = "edit";
      editBtn.addEventListener("click", () => {
        const newText = prompt("Edit task:", taskText.textContent);
        if (newText) {
          taskText.textContent = newText;
          saveTasks();
        }
      });
  
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "❌";
      deleteBtn.className = "delete";
      deleteBtn.addEventListener("click", () => {
        li.remove();
        saveTasks();
      });
  
      actions.appendChild(completeBtn);
      actions.appendChild(editBtn);
      actions.appendChild(deleteBtn);
  
      li.appendChild(actions);
      taskList.appendChild(li);
  
      saveTasks();
    };
  
    // Add new task
    addTaskBtn.addEventListener("click", () => {
      const taskText = taskInput.value.trim();
      if (taskText) {
        createTaskElement(taskText);
        taskInput.value = "";
      }
    });
  
    loadTasks();
  });
  