const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addBtn = document.getElementById("addBtn");
const voiceBtn = document.getElementById("voiceBtn");

addBtn.addEventListener("click", addTask);
voiceBtn.addEventListener("click", startListening);

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  const timeStamp = new Date().toLocaleString();
  const taskItem = document.createElement("li");
  taskItem.className = "task-item";

  taskItem.innerHTML = `
    <span><strong>${text}</strong><br><small>${timeStamp}</small></span>
    <div>
      <button onclick="editTask(this)">✏️</button>
      <button onclick="deleteTask(this)">🗑️</button>
    </div>
  `;

  taskList.appendChild(taskItem);
  taskInput.value = "";
}

function editTask(btn) {
  const taskText = btn.parentElement.previousElementSibling.querySelector("strong");
  const newTask = prompt("Edit task:", taskText.textContent);
  if (newTask) taskText.textContent = newTask;
}

function deleteTask(btn) {
  const taskItem = btn.closest("li");
  taskList.removeChild(taskItem);
}

function startListening() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.start();

  recognition.onresult = (event) => {
    taskInput.value = event.results[0][0].transcript;
  };
}