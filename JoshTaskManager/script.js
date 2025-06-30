const addBtn = document.getElementById('addBtn');
const voiceBtn = document.getElementById('voiceBtn');
const taskInput = document.getElementById('taskInput');
const dueDateInput = document.getElementById('dueDateInput');
const taskList = document.getElementById('taskList');
const addSound = document.getElementById('addSound');
const deleteSound = document.getElementById('deleteSound');

addBtn.addEventListener('click', addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  const dueDate = dueDateInput.value;

  if (!taskText) return;

  const li = document.createElement('li');
  li.classList.add('task-item');
  if (dueDate) li.classList.add('task-due');

  const textContent = dueDate
    ? `${taskText} (Due: ${dueDate})`
    : taskText;

  li.textContent = textContent;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '❌';
  deleteBtn.addEventListener('click', () => {
    deleteSound.play();
    li.remove();
  });

  li.addEventListener('click', () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    li.remove();
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
  addSound.play();

  taskInput.value = '';
  dueDateInput.value = '';
}

// (Optional) Add voice input functionality
voiceBtn.addEventListener('click', () => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.start();

  recognition.onresult = (event) => {
    taskInput.value = event.results[0][0].transcript;
  };
});