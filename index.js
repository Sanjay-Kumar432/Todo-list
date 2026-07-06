const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {

    window.location.href = "Login.html";

}
document.getElementById("welcomeUser").textContent =
`Welcome, ${loggedInUser.name} 👋`;
// Create a unique storage key for each user
const taskKey = `tasks_${loggedInUser.email}`;
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {

    const confirmLogout = confirm("Are you sure you want to logout?");

    if(confirmLogout){

        localStorage.removeItem("loggedInUser");

        window.location.href = "Login.html";

    }

});
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskContainer = document.getElementById("taskContainer");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

const allBtn = document.getElementById("allBtn");
const pendingBtn = document.getElementById("pendingBtn");
const completedBtn = document.getElementById("completedBtn");

const searchInput =
document.getElementById("searchInput");
let searchText = "";

searchInput.addEventListener("input", (e) => {
    searchText = e.target.value.toLowerCase();
    renderTasks();
});

let tasks = [];
// Add Task Button
addBtn.addEventListener("click", addTask);
// Enter Key Support
taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});
// Add Task Function
function addTask() {
    const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Please enter a task");
        return;
        }
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false,
        date: new Date().toLocaleDateString()
    };
        tasks.push(task);
        saveTasks();
        renderTasks();
        taskInput.value = "";
}
// Create Task Card
function createTaskCard(task) {
    const taskCard = document.createElement("div");
        taskCard.classList.add("task-card");
        if (task.completed) {
            taskCard.classList.add("completed");
        }
        taskCard.innerHTML = `
        <div class="task-left">
            <input type="checkbox" ${task.completed ? "checked" : ""} >
            <div>
                <h3>${task.text}</h3>
                <p>${task.date}</p>
            </div>
        </div>
        <div class="task-actions">
            <button class="edit-btn"> ✏️ </button>
            <button class="delete-btn"> 🗑️ </button>
        </div>
        `;
    // Delete Task
    const deleteBtn = taskCard.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", () => {
            tasks = tasks.filter(
            t => t.id !== task.id
            );
        saveTasks();
        renderTasks();
        });
    // Complete Task
    const checkbox = taskCard.querySelector("input");
        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            saveTasks();
            renderTasks();
        });
    // Edit Task
    const editBtn = taskCard.querySelector(".edit-btn");
        editBtn.addEventListener("click", () => {
            const updatedTask = prompt(
                "Edit Task",
                task.text
            );
        if (
            updatedTask !== null &&
            updatedTask.trim() !== ""
        ) {
            task.text = updatedTask.trim();
                saveTasks();
                renderTasks();
            }
        });
        taskContainer.appendChild(taskCard);
}
// Render Tasks
function renderTasks() {
    taskContainer.innerHTML = "";
    let filteredTasks = [...tasks];

// Search
filteredTasks = filteredTasks.filter(task =>
    task.text.toLowerCase().includes(searchText)
);

// Filter
if (currentFilter === "pending") {
    filteredTasks = filteredTasks.filter(task => !task.completed);
} else if (currentFilter === "completed") {
    filteredTasks = filteredTasks.filter(task => task.completed);
}
    filteredTasks.forEach(task => {
        createTaskCard(task);
    });
    updateStats();
}
// Update Statistics
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(
        task => task.completed
    ).length;
    const pending = total - completed;
    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    pendingTasks.textContent = pending;
}
// Save to Local Storage
function saveTasks() {
    localStorage.setItem(
        taskKey,
        JSON.stringify(tasks)
    );
}
let currentFilter = "all";
allBtn.addEventListener("click", () => {
    currentFilter = "all";
    renderTasks();
});
pendingBtn.addEventListener("click", () => {
    currentFilter = "pending";
    renderTasks();
});
completedBtn.addEventListener("click", () => {
    currentFilter = "completed";
    renderTasks();
});
// Load from Local Storage
function loadTasks() {

    const savedTasks = JSON.parse(
        localStorage.getItem(taskKey)
    ) || [];

    tasks = savedTasks;

    renderTasks();

}
// Start App
loadTasks();