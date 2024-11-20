const Todo = document.getElementById('todo');
const Note = document.getElementById('note');
const Link = document.getElementById('links');
const Todoe = document.getElementById('todoele');
const Notee = document.getElementById('noteele');
const Linke = document.getElementById('linksele');
Todo.addEventListener('click',function (){
    Todoe.style.display = 'block';
    Todo.classList.add('active');
    Notee.style.display = 'none';
    Note.classList.remove('active');
    Linke.style.display = 'none';
    Link.classList.remove('active');

});
Note.addEventListener('click',function (){
    Todoe.style.display = 'none';
    Todo.classList.remove('active');
    Notee.style.display = 'block';
    Note.classList.add('active');
    Linke.style.display = 'none'
    Link.classList.remove('active');
});
Link.addEventListener('click',function (){
    Todoe.style.display = 'none';
    Todo.classList.remove('active');
    Notee.style.display = 'none';
    Note.classList.remove('active');
    Linke.style.display = 'block'
    Link.classList.add('active');
});


// ----Todo-List----

// Get references to DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const clearAllBtn = document.getElementById('clearAllBtn');

// Load tasks from LocalStorage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task event
addTaskBtn.addEventListener('click', addTask);

// Clear all tasks event
clearAllBtn.addEventListener('click', clearAllTasks);

// Add a task
function addTask() {
    const task = taskInput.value.trim();
    if (task === '') {
        alert('Please enter a task!');
        return;
    }

    const taskItem = createTaskElement(task, false);
    taskList.appendChild(taskItem);

    saveTasks();
    taskInput.value = '';
}

// Create task element
function createTaskElement(task, isCompleted) {
    const taskItem = document.createElement('li');
    if (isCompleted) taskItem.classList.add('completed');

    // Checkbox for marking completion
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.checked = isCompleted;
    checkBox.addEventListener('change', () => {
        taskItem.classList.toggle('completed');
        saveTasks();
    });

    // Task text
    const taskText = document.createElement('span');
    taskText.textContent = task;

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    
    deleteBtn.addEventListener('click', () => {
        taskItem.remove();
        saveTasks();
    });

    taskItem.appendChild(checkBox);
    taskItem.appendChild(taskText);
    taskItem.appendChild(deleteBtn);

    return taskItem;
}

// Save tasks to LocalStorage
function saveTasks() {
    const tasks = Array.from(taskList.children).map(item => ({
        text: item.querySelector('span').textContent,
        completed: item.classList.contains('completed')
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from LocalStorage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        const taskItem = createTaskElement(task.text, task.completed);
        taskList.appendChild(taskItem);
    });
}

// Clear all tasks
function clearAllTasks() {
    taskList.innerHTML = '';
    saveTasks();
}


// ---notebooks----

const notebooks = JSON.parse(localStorage.getItem("notebooks")) || {};

const notebooksSection = document.getElementById("notebooks-section");
const notesSection = document.getElementById("notes-section");
const noteViewSection = document.getElementById("note-view-section");

const notebooksList = document.getElementById("notebooks-list");
const notesList = document.getElementById("notes-list");

const selectedNotebookTitle = document.getElementById("selected-notebook-title");
const noteContentTextarea = document.getElementById("note-content");

let selectedNotebook = null;
let selectedNoteIndex = null;

// Save notebooks to localStorage
function saveNotebooks() {
  localStorage.setItem("notebooks", JSON.stringify(notebooks));
}

// Add notebook
document.getElementById("add-notebook").addEventListener("click", () => {
  const notebookName = document.getElementById("new-notebook-name").value.trim();
  if (notebookName && !notebooks[notebookName]) {
    notebooks[notebookName] = [];
    saveNotebooks();
    updateNotebooksList();
  }
  document.getElementById("new-notebook-name").value = "";
});

// Delete notebook
function deleteNotebook(notebookName) {
  delete notebooks[notebookName];
  saveNotebooks();
  updateNotebooksList();
  notebooksSection.style.display = "block";
  notesSection.style.display = "none";
}

// Update notebooks list
function updateNotebooksList() {
  notebooksList.innerHTML = "";
  for (const notebookName in notebooks) {
    const li = document.createElement("li");
    const h2=document.createElement("h2")
    h2.textContent = notebookName;

    // Add delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Remove Book";
    deleteBtn.style.margin = "10px";
    deleteBtn.style.marginLeft = "0px";
    deleteBtn.style.padding = "10px";
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (confirm(`Are you sure you want to delete the notebook "${notebookName}"?`)) {
        deleteNotebook(notebookName);
      }
    });
    li.appendChild(h2)
    li.appendChild(deleteBtn);
    li.addEventListener("click", () => openNotebook(notebookName));
    notebooksList.appendChild(li);
    // notebooksList.appendChild(deleteBtn);
  }
}

// Open a notebook
function openNotebook(notebookName) {
  selectedNotebook = notebookName;
  selectedNotebookTitle.textContent = notebookName;
  updateNotesList();
  notebooksSection.style.display = "block";
  notesSection.style.display = "block";
  noteViewSection.style.display = "none";
}

// Add a note
document.getElementById("add-note").addEventListener("click", () => {
  const noteContent = document.getElementById("new-note-content").value.trim();
  if (noteContent) {
    notebooks[selectedNotebook].push(noteContent);
    saveNotebooks();
    updateNotesList();
  }
  document.getElementById("new-note-content").value = "";
});

// Delete note
function deleteNote(index) {
  notebooks[selectedNotebook].splice(index, 1);
  saveNotebooks();
  updateNotesList();
}

// Update notes list
function updateNotesList() {
  notesList.innerHTML = "";
  notebooks[selectedNotebook].forEach((note, index) => {
    const li = document.createElement("li");

    // Show the first 50 characters as a preview
    const p = document.createElement('p');
    p.textContent = note.split("\n")[0].slice(0, 50) + "...";
    li.append(p);

    // Add delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete Note";
    // deleteBtn.style.marginLeft = "10px";
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (confirm("Are you sure you want to delete this note?")) {
        deleteNote(index);
      }
    });

    li.appendChild(deleteBtn);
    li.addEventListener("click", () => viewNoteDetails(index));
    notesList.appendChild(li);
    // notesList.appendChild(deleteBtn);
    // notesList.appendChild(span);
  });
}

// View a note
function viewNoteDetails(index) {
  selectedNoteIndex = index;
  noteContentTextarea.value = notebooks[selectedNotebook][index];
  notesSection.style.display = "none";
  noteViewSection.style.display = "block";
  
}

// Update note
document.getElementById("update-note").addEventListener("click", () => {
  notebooks[selectedNotebook][selectedNoteIndex] = noteContentTextarea.value;
  saveNotebooks();
  updateNotesList();
  backToNotes();
});

// Back to notebooks
// document.getElementById("back-to-notebooks").addEventListener("click", () => {
//   notesSection.style.display = "none";
//   notebooksSection.style.display = "block";
// });

// Back to notes
document.getElementById("back-to-notes").addEventListener("click", backToNotes);

function backToNotes() {
  noteViewSection.style.display = "none";
  notesSection.style.display = "block";
}

// Initialize the application
updateNotebooksList();
