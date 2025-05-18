// DOM Elements
const todoBtn = document.getElementById("todoBtn");
const notesBtn = document.getElementById("notesBtn");
const linksBtn = document.getElementById("linksBtn");
const todoSection = document.getElementById("todoSection");
const notesSection = document.getElementById("notesSection");
const linksSection = document.getElementById("linksSection");
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const sidebar = document.getElementById("sidebar");

// Mobile menu toggle
mobileMenuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

// Navigation functionality
todoBtn.addEventListener("click", () => {
  activateTab(todoBtn, todoSection);
  sidebar.classList.remove("active");
});

notesBtn.addEventListener("click", () => {
  activateTab(notesBtn, notesSection);
  sidebar.classList.remove("active");
});

linksBtn.addEventListener("click", () => {
  activateTab(linksBtn, linksSection);
  sidebar.classList.remove("active");
});

function activateTab(button, section) {
  // Deactivate all tabs
  [todoBtn, notesBtn, linksBtn].forEach((btn) =>
    btn.classList.remove("active")
  );
  [todoSection, notesSection, linksSection].forEach((sec) =>
    sec.classList.remove("active")
  );

  // Activate selected tab
  button.classList.add("active");
  section.classList.add("active");
}

// ---------------------------
// TODO LIST FUNCTIONALITY
// ---------------------------

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const clearAllBtn = document.getElementById("clearAllBtn");

// Load tasks from LocalStorage on page load
document.addEventListener("DOMContentLoaded", () => {
  // Set default date to today
  const today = new Date().toISOString().split("T")[0];
  taskDateInput.value = today;
  loadTasksForDate(today);
});

// Add task event
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

// Date change event
taskDateInput.addEventListener("change", () => {
  loadTasksForDate(taskDateInput.value);
});

// Clear all tasks event
clearAllBtn.addEventListener("click", clearAllTasks);

// Add a task
function addTask() {
  const task = taskInput.value.trim();
  const date = taskDateInput.value;
  if (task === "") {
    alert("Please enter a task!");
    return;
  }
  if (!date) {
    alert("Please select a date!");
    return;
  }

  const taskItem = createTaskElement(task, false);
  taskList.appendChild(taskItem);

  saveTaskForDate(date, task, false);
  taskInput.value = "";
}

// Create task element
function createTaskElement(task, isCompleted) {
  const taskItem = document.createElement("li");
  taskItem.className = "task-item";
  if (isCompleted) taskItem.classList.add("completed");

  // Checkbox for marking completion
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.className = "task-checkbox";
  checkBox.checked = isCompleted;
  checkBox.addEventListener("change", () => {
    taskItem.classList.toggle("completed");
    updateTaskCompletion(taskItem, checkBox.checked);
  });

  // Task text
  const taskText = document.createElement("span");
  taskText.textContent = task;
  taskText.className = "task-text";

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "task-delete";

  deleteBtn.addEventListener("click", () => {
    deleteTask(taskItem);
  });

  taskItem.appendChild(checkBox);
  taskItem.appendChild(taskText);
  taskItem.appendChild(deleteBtn);

  return taskItem;
}

// Save task for a specific date
function saveTaskForDate(date, taskText, completed) {
  const tasks = JSON.parse(localStorage.getItem("tasksByDate") || "{}");
  if (!tasks[date]) {
    tasks[date] = [];
  }
  tasks[date].push({ text: taskText, completed: completed });
  localStorage.setItem("tasksByDate", JSON.stringify(tasks));
}

// Load tasks for a specific date
function loadTasksForDate(date) {
  taskList.innerHTML = "";
  const tasks = JSON.parse(localStorage.getItem("tasksByDate") || "{}");
  if (tasks[date]) {
    tasks[date].forEach((task) => {
      const taskItem = createTaskElement(task.text, task.completed);
      taskList.appendChild(taskItem);
    });
  }
}

// Update task completion status in localStorage
function updateTaskCompletion(taskItem, completed) {
  const date = taskDateInput.value;
  const taskText = taskItem.querySelector(".task-text").textContent;
  const tasks = JSON.parse(localStorage.getItem("tasksByDate") || "{}");
  if (tasks[date]) {
    const task = tasks[date].find((t) => t.text === taskText);
    if (task) {
      task.completed = completed;
      localStorage.setItem("tasksByDate", JSON.stringify(tasks));
    }
  }
}

// Delete task
function deleteTask(taskItem) {
  const date = taskDateInput.value;
  const taskText = taskItem.querySelector(".task-text").textContent;
  taskItem.remove();
  const tasks = JSON.parse(localStorage.getItem("tasksByDate") || "{}");
  if (tasks[date]) {
    tasks[date] = tasks[date].filter((t) => t.text !== taskText);
    localStorage.setItem("tasksByDate", JSON.stringify(tasks));
  }
}

// Clear all tasks
function clearAllTasks() {
  if (confirm("Are you sure you want to clear all tasks for this date?")) {
    const date = taskDateInput.value;
    taskList.innerHTML = "";
    const tasks = JSON.parse(localStorage.getItem("tasksByDate") || "{}");
    if (tasks[date]) {
      delete tasks[date];
      localStorage.setItem("tasksByDate", JSON.stringify(tasks));
    }
  }
}

// ---------------------------
// NOTES FUNCTIONALITY
// ---------------------------

// DOM Elements
const notebooksView = document.getElementById("notebooksView");
const notesListView = document.getElementById("notesListView");
const noteEditorView = document.getElementById("noteEditorView");
const notebooksList = document.getElementById("notebooksList");
const notesList = document.getElementById("notesList");
const selectedNotebookTitle = document.getElementById("selectedNotebookTitle");
const newNotebookName = document.getElementById("newNotebookName");
const newNoteContent = document.getElementById("newNoteContent");
const noteContent = document.getElementById("noteContent");
const addNotebookBtn = document.getElementById("addNotebookBtn");
const addNoteBtn = document.getElementById("addNoteBtn");
const updateNoteBtn = document.getElementById("updateNoteBtn");
const backToNotebooks = document.getElementById("backToNotebooks");
const backToNotes = document.getElementById("backToNotes");
const coverForm = document.getElementById("coverForm");

// State variables
let notebooks = {};
let selectedNotebook = null;
let selectedNoteIndex = null;

// Load notebooks on page load
document.addEventListener("DOMContentLoaded", loadNotebooks);

// Event Listeners
addNotebookBtn.addEventListener("click", addNotebook);
newNotebookName.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addNotebook();
});

addNoteBtn.addEventListener("click", addNote);
newNoteContent.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addNote();
});

updateNoteBtn.addEventListener("click", updateNote);
backToNotebooks.addEventListener("click", showNotebooksView);
backToNotes.addEventListener("click", showNotesListView);

// Functions
function loadNotebooks() {
  const storedNotebooks = localStorage.getItem("notebooks");
  if (storedNotebooks) {
    notebooks = JSON.parse(storedNotebooks);
  }
  renderNotebooks();
}

function saveNotebooks() {
  localStorage.setItem("notebooks", JSON.stringify(notebooks));
}

function addNotebook() {
  const name = newNotebookName.value.trim();
  if (!name) {
    alert("Please enter a notebook name");
    return;
  }

  if (notebooks[name]) {
    alert("A notebook with this name already exists");
    return;
  }

  const selectedCover = document.querySelector('input[name="cover"]:checked');
  const coverValue = selectedCover ? selectedCover.value : "#FFFFFF";
  const coverType = selectedCover ? selectedCover.dataset.type : "color";

  notebooks[name] = {
    cover: coverValue,
    coverType: coverType,
    notes: [],
  };

  saveNotebooks();
  renderNotebooks();
  newNotebookName.value = "";
}

function renderNotebooks() {
  notebooksList.innerHTML = "";

  for (const name in notebooks) {
    const notebookCard = document.createElement("div");
    notebookCard.className = "notebook-card";

    // Apply cover styling
    if (notebooks[name].coverType === "image") {
      // Use the actual cover image path
      notebookCard.style.backgroundImage = `url('${notebooks[name].cover}')`;
      notebookCard.style.backgroundSize = "cover";
      notebookCard.style.backgroundPosition = "center";
    } else {
      notebookCard.style.backgroundColor = notebooks[name].cover;
    }

    // Create title
    const title = document.createElement("div");
    title.className = "notebook-title";
    title.textContent = name;

    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "notebook-delete";
    deleteBtn.innerHTML = "✕";
    deleteBtn.onclick = (e) => {
      e.stopPropagation();
      deleteNotebook(name);
    };

    notebookCard.appendChild(title);
    notebookCard.appendChild(deleteBtn);

    notebookCard.addEventListener("click", () => {
      openNotebook(name);
    });

    notebooksList.appendChild(notebookCard);
  }
}

function deleteNotebook(name) {
  if (confirm(`Are you sure you want to delete the notebook "${name}"?`)) {
    delete notebooks[name];
    saveNotebooks();
    renderNotebooks();

    if (selectedNotebook === name) {
      showNotebooksView();
    }
  }
}

function openNotebook(name) {
  selectedNotebook = name;
  selectedNotebookTitle.textContent = name;
  renderNotes();
  showNotesListView();
}

function renderNotes() {
  notesList.innerHTML = "";

  notebooks[selectedNotebook].notes.forEach((note, index) => {
    const noteCard = document.createElement("div");
    noteCard.className = "note-card";

    // Note preview
    const preview = document.createElement("div");
    preview.className = "note-preview";
    preview.textContent =
      note.split("\n")[0].slice(0, 50) + (note.length > 50 ? "..." : "");

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "note-delete";
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = (e) => {
      e.stopPropagation();
      deleteNote(index);
    };

    noteCard.appendChild(preview);
    noteCard.appendChild(deleteBtn);

    noteCard.addEventListener("click", () => {
      openNote(index);
    });

    notesList.appendChild(noteCard);
  });
}

function addNote() {
  const content = newNoteContent.value.trim();
  if (!content) {
    alert("Please enter note content");
    return;
  }

  notebooks[selectedNotebook].notes.push(content);
  saveNotebooks();
  renderNotes();
  newNoteContent.value = "";
}

function deleteNote(index) {
  if (confirm("Are you sure you want to delete this note?")) {
    notebooks[selectedNotebook].notes.splice(index, 1);
    saveNotebooks();
    saveNotebooks();
    renderNotes();
  }
}

function openNote(index) {
  selectedNoteIndex = index;
  noteContent.value = notebooks[selectedNotebook].notes[index];
  showNoteEditorView();
}

function updateNote() {
  const content = noteContent.value.trim();
  if (!content) {
    alert("Note content cannot be empty");
    return;
  }

  notebooks[selectedNotebook].notes[selectedNoteIndex] = content;
  saveNotebooks();
  showNotesListView();
  renderNotes();
}

function showNotebooksView() {
  notebooksView.style.display = "block";
  notesListView.style.display = "none";
  noteEditorView.style.display = "none";
  selectedNotebook = null;
}

function showNotesListView() {
  notebooksView.style.display = "none";
  notesListView.style.display = "block";
  noteEditorView.style.display = "none";
  renderNotes();
}

function showNoteEditorView() {
  notebooksView.style.display = "none";
  notesListView.style.display = "none";
  noteEditorView.style.display = "block";
}

// ---------------------------
// LINKS FUNCTIONALITY
// ---------------------------

const linkTitleInput = document.getElementById("linkTitleInput");
const linkUrlInput = document.getElementById("linkUrlInput");
const addLinkBtn = document.getElementById("addLinkBtn");
const linksList = document.getElementById("linksList");

// Load links on page load
document.addEventListener("DOMContentLoaded", loadLinks);

// Add link event
addLinkBtn.addEventListener("click", addLink);

// Functions
function loadLinks() {
  const savedLinks = JSON.parse(localStorage.getItem("links")) || [];
  renderLinks(savedLinks);
}

function saveLinks(links) {
  localStorage.setItem("links", JSON.stringify(links));
}

function addLink() {
  const title = linkTitleInput.value.trim();
  let url = linkUrlInput.value.trim();

  if (!title || !url) {
    alert("Please enter both title and URL");
    return;
  }

  // Add https:// if not present
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  // Validate URL
  try {
    new URL(url);
  } catch (e) {
    alert("Please enter a valid URL");
    return;
  }

  const links = JSON.parse(localStorage.getItem("links")) || [];
  links.push({ title, url });
  saveLinks(links);
  renderLinks(links);

  linkTitleInput.value = "";
  linkUrlInput.value = "";
}

function renderLinks(links) {
  linksList.innerHTML = "";

  links.forEach((link, index) => {
    const linkCard = document.createElement("div");
    linkCard.className = "link-card";

    const title = document.createElement("h3");
    title.className = "link-title";

    // Extract base URL for favicon
    let faviconUrl = "";
    try {
      const urlObj = new URL(link.url);
      faviconUrl = urlObj.origin + "/favicon.ico";
    } catch (e) {
      faviconUrl = "";
    }

    // Create favicon image element
    const faviconImg = document.createElement("img");
    faviconImg.src = faviconUrl;
    faviconImg.alt = "favicon";
    faviconImg.style.width = "20px";
    faviconImg.style.height = "20px";
    faviconImg.style.marginRight = "8px";
    faviconImg.style.verticalAlign = "middle";
    faviconImg.onerror = function () {
      this.style.display = "none";
    };

    title.appendChild(faviconImg);
    title.appendChild(document.createTextNode(link.title));

    const url = document.createElement("div");
    url.className = "link-url";
    url.textContent = link.url;

    const actionsDiv = document.createElement("div");
    actionsDiv.className = "link-actions";

    const visitBtn = document.createElement("button");
    visitBtn.className = "link-visit";
    visitBtn.textContent = "Visit Link";
    visitBtn.addEventListener("click", () => {
      window.open(link.url, "_blank");
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "link-delete";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      deleteLink(index);
    });

    actionsDiv.appendChild(visitBtn);
    actionsDiv.appendChild(deleteBtn);

    linkCard.appendChild(title);
    linkCard.appendChild(url);
    linkCard.appendChild(actionsDiv);

    linksList.appendChild(linkCard);
  });
}

function deleteLink(index) {
  if (confirm("Are you sure you want to delete this link?")) {
    const links = JSON.parse(localStorage.getItem("links")) || [];
    links.splice(index, 1);
    saveLinks(links);
    renderLinks(links);
  }
}
