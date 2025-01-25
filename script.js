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
    deleteBtn.style.textDecoration='none';
    
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

// const notebooks = JSON.parse(localStorage.getItem("notebooks")) || {};

// const notebooksSection = document.getElementById("notebooks-section");
// const notesSection = document.getElementById("notes-section");
// const noteViewSection = document.getElementById("note-view-section");

// const notebooksList = document.getElementById("notebooks-list");
// const notesList = document.getElementById("notes-list");

// const selectedNotebookTitle = document.getElementById("selected-notebook-title");
// const noteContentTextarea = document.getElementById("note-content");

// let selectedNotebook = null;
// let selectedNoteIndex = null;

// const create=document.getElementById("create");
// const createSection=document.getElementById("create-section");
// const form = document.getElementById('coverForm');

// create.addEventListener("click",()=>{
//   createSection.style.display="block";
//   create.style.display="none";
// });

// // Save notebooks to localStorage
// function saveNotebooks() {
//   localStorage.setItem("notebooks", JSON.stringify(notebooks));
// }

// // Add notebook
// document.getElementById("add-notebook").addEventListener("click", () => {
//   const notebookName = document.getElementById("new-notebook-name").value.trim();
//   if (notebookName && !notebooks[notebookName]) {
//     notebooks[notebookName] = [];
//     saveNotebooks();
//     updateNotebooksList();
//   }
//   document.getElementById("new-notebook-name").value = "";
//   if(screenWidth<=480){
//     createSection.style.display="none";
//     create.style.display="block";
//   }

// });

// // Delete notebook
// function deleteNotebook(notebookName) {
//   delete notebooks[notebookName];
//   saveNotebooks();
//   updateNotebooksList();
//   notebooksSection.style.display = "block";
//   notesSection.style.display = "none";
  
// }

// // Update notebooks list
// function updateNotebooksList() {
//   notebooksList.innerHTML = "";
//   for (const notebookName in notebooks) {
//     const li = document.createElement("li");
//     const h2=document.createElement("h2")
//     h2.textContent = notebookName;
//     li.classList.add('cover1');

//     // Add delete button
//     const deleteBtn = document.createElement("button");
//     deleteBtn.textContent = "Remove Book";
//     deleteBtn.style.margin = "10px";
//     deleteBtn.style.marginLeft = "0px";
//     deleteBtn.style.padding = "10px";
//     deleteBtn.addEventListener("click", (e) => {
//       e.stopPropagation();
//       if (confirm(`Are you sure you want to delete the notebook "${notebookName}"?`)) {
//         deleteNotebook(notebookName);
//       }
//     });

//     // const selectedOption = form.cover.value;
//     // const selectedType = form.querySelector('input[name="cover"]:checked').dataset.type;
  
//     // if (selectedOption) {
//     //   if (selectedType === 'image') {
//     //     li.style.backgroundImage = `url(${selectedOption})`;
//     //     li.style.backgroundColor = '';
//     //     li.style.backgroundSize = 'cover';
//     //   } else if (selectedType === 'color') {
        
//     //     li.style.backgroundColor = selectedOption;
//     //   }
//     // } else {
//     //   li.style.backgroundImage = '';
//     // }
  

//     li.appendChild(h2)
//     li.appendChild(deleteBtn);
//     li.addEventListener("click", () => openNotebook(notebookName));
//     notebooksList.appendChild(li);
//     // notebooksList.appendChild(deleteBtn);
//   }
// }

// // Open a notebook
// function openNotebook(notebookName) {
//   selectedNotebook = notebookName;
//   selectedNotebookTitle.textContent = notebookName;
//   updateNotesList();
//   notebooksSection.style.display = "none";
//   notesSection.style.display = "block";
//   noteViewSection.style.display = "none";
// }

// // Add a note
// document.getElementById("add-note").addEventListener("click", () => {
//   const noteContent = document.getElementById("new-note-content").value.trim();
//   if (noteContent) {
//     notebooks[selectedNotebook].push(noteContent);
//     saveNotebooks();
//     updateNotesList();
//   }
//   document.getElementById("new-note-content").value = "";
// });

// // Delete note
// function deleteNote(index) {
//   notebooks[selectedNotebook].splice(index, 1);
//   saveNotebooks();
//   updateNotesList();
// }

// // Update notes list
// function updateNotesList() {
//   notesList.innerHTML = "";
//   notebooks[selectedNotebook].forEach((note, index) => {
//     const li = document.createElement("li");

//     // Show the first 50 characters as a preview
//     const p = document.createElement('p');
//     p.textContent = note.split("\n")[0].slice(0, 20) + "...";
//     li.append(p);

//     // Add delete button
//     const deleteBtn = document.createElement("button");
//     deleteBtn.textContent = "Delete Note";
//     // deleteBtn.style.marginLeft = "10px";
//     deleteBtn.addEventListener("click", (e) => {
//       e.stopPropagation();
//       if (confirm("Are you sure you want to delete this note?")) {
//         deleteNote(index);
//       }
//     });

//     li.appendChild(deleteBtn);
//     li.addEventListener("click", () => viewNoteDetails(index));
//     notesList.appendChild(li);
//     // notesList.appendChild(deleteBtn);
//     // notesList.appendChild(span);
//   });
// }

// // View a note
// function viewNoteDetails(index) {
//   selectedNoteIndex = index;
//   noteContentTextarea.value = notebooks[selectedNotebook][index];
//   notesSection.style.display = "none";
//   noteViewSection.style.display = "block";
//   if (screenWidth <= 480) {
//     // For small screens
//     noteContent.style.width = "90%";
//     noteContent.style.minheight="80%";
//     noteContent.style.fontSize = "0.9em";
//   } else if (screenWidth <= 768) {
//     // For medium screens
//     noteContent.style.width = "80%";
//     noteContent.style.height = "200px";
//     noteContent.style.fontSize = "1em";
//   } else {
//     // For large screens
//     noteContent.style.width = "80%";
//     noteContent.style.minheight = "80%";
//     noteContent.style.fontSize = "1.2em";
//   }
  
// }

// // Update note
// document.getElementById("update-note").addEventListener("click", () => {
//   notebooks[selectedNotebook][selectedNoteIndex] = noteContentTextarea.value;
//   saveNotebooks();
//   updateNotesList();
//   backToNotes();
// });

// // Back to notebooks
// document.getElementById("back-to-notebooks").addEventListener("click", () => {
//   notesSection.style.display = "none";
//   notebooksSection.style.display = "block";
// });

// // Back to notes
// document.getElementById("back-to-notes").addEventListener("click", backToNotes);

// function backToNotes() {
//   noteViewSection.style.display = "none";
//   notesSection.style.display = "block";
// }

// // Initialize the application
// updateNotebooksList();

// Declare global variables
let notebooks = {}; // Store notebooks data
let selectedNotebook = null; // Store the selected notebook
const notebooksList = document.getElementById('notebooks-list');
const notesList = document.getElementById('notes-list');
const selectedNotebookTitle = document.getElementById('selected-notebook-title');
const notesSection = document.getElementById('notes-section');
const notebooksSection = document.getElementById('notebooks-section');
const noteViewSection = document.getElementById('note-view-section');
const newNoteContent = document.getElementById('new-note-content');
const noteContent = document.getElementById('note-content');
const backToNotebooksButton = document.getElementById('back-to-notebooks');
const backToNotesButton = document.getElementById('back-to-notes');
const updateNoteButton = document.getElementById('update-note');
const addNoteButton = document.getElementById('add-note');
const addNotebookButton = document.getElementById('add-notebook');
const createButton = document.getElementById('create');
const newNotebookName = document.getElementById('new-notebook-name');
const coverForm = document.getElementById('coverForm');
const createSection = document.getElementById('create-section');

// Load notebooks data from localStorage
function loadNotebooks() {
  const storedNotebooks = localStorage.getItem("notebooks");
  if (storedNotebooks) {
    notebooks = JSON.parse(storedNotebooks); // Parse and load data
  } else {
    notebooks = {}; // Initialize empty object if no data
  }
  renderNotebooks();
}

// Save notebooks data to localStorage
function saveNotebooks() {
  localStorage.setItem("notebooks", JSON.stringify(notebooks));
}

// Render notebooks in the UI
function renderNotebooks() {
  notebooksList.innerHTML = "";
  for (const name in notebooks) {
    const li = document.createElement("li");
    const h2 = document.createElement("h2");
    h2.textContent = name;
    if (notebooks[name].cover.includes(".jpg") || notebooks[name].cover.includes(".png")) {
      li.style.backgroundImage = `url(${notebooks[name].cover})`;
      li.style.backgroundSize = "cover"; // Make sure the background image covers the entire list item
      li.style.backgroundPosition = "center";
    } else {
      li.style.backgroundColor = notebooks[name].cover; // If it's a color code, set the background color
    }


    // Add delete button for notebook
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.style.zIndex="10";
    deleteBtn.onclick = () => deleteNotebook(name);
    li.appendChild(h2)
    li.appendChild(deleteBtn);
    li.addEventListener("click", () => {
      selectedNotebook = name;
      showNotesSection();
    });

    notebooksList.appendChild(li);
  }
}

// Render notes of the selected notebook
function renderNotes() {
  notesList.innerHTML = "";
  notebooks[selectedNotebook].notes.forEach((note, index) => {
    const li = document.createElement("li");
    li.textContent = note.split("\n")[0].slice(0, 20) + "...";

    // Add delete button for note
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.onclick = () => deleteNote(index);

    li.addEventListener("click", () => {
      showNoteView(index);
    });

    li.appendChild(deleteBtn);
    notesList.appendChild(li);
  });
}

// Show notes section when a notebook is selected
function showNotesSection() {
  selectedNotebookTitle.textContent = selectedNotebook;
  notesSection.style.display = "block";
  notebooksSection.style.display = "none";
  renderNotes();
}

// Show notebook section when back button is clicked
backToNotebooksButton.addEventListener('click', () => {
  notesSection.style.display = "none";
  notebooksSection.style.display = "block";
});

// Show note view section when a note is clicked
backToNotesButton.addEventListener('click', () => {
  noteViewSection.style.display = "none";
  notesSection.style.display = "block";
});

// Show note update section when a note is selected
updateNoteButton.addEventListener('click', () => {
  notebooks[selectedNotebook].notes[selectedNoteIndex] = noteContent.value;
  saveNotebooks();
  renderNotes();
  noteViewSection.style.display = "none";
  notesSection.style.display = "block";
});

// Add a new note to the selected notebook
addNoteButton.addEventListener('click', () => {
  if (newNoteContent.value.trim()) {
    notebooks[selectedNotebook].notes.push(newNoteContent.value.trim());
    saveNotebooks();
    newNoteContent.value = ''; // Clear input
    renderNotes();
  }
});

// Add a new notebook
addNotebookButton.addEventListener('click', () => {
  const notebookName = newNotebookName.value.trim();
  if (notebookName && !notebooks[notebookName]) {
    const selectedCover = document.querySelector('input[name="cover"]:checked');
    const cover = selectedCover.value; // Default color if no cover selected
   
    notebooks[notebookName] = {
      cover: cover,
      notes: []
    };
    saveNotebooks();
    newNotebookName.value = ''; // Clear input
    renderNotebooks();
  }
});

// Delete a specific notebook
function deleteNotebook(notebookName) {
  notesSection.style.display = "none";
  if (notebooks[notebookName]) {
    delete notebooks[notebookName]; // Remove notebook from the list
    saveNotebooks(); // Save updated data to localStorage
    if (selectedNotebook === notebookName) {
      selectedNotebook = null; // Clear selected notebook if it's the one being deleted
      notebooksSection.style.display = "block";
      notesSection.style.display = "none";
      
    }
    renderNotebooks(); // Update the UI
  } else {
    alert("Notebook not found!");
  }

}

// Delete a specific note
function deleteNote(noteIndex) {
  if (notebooks[selectedNotebook] && notebooks[selectedNotebook].notes[noteIndex] !== undefined) {
    notebooks[selectedNotebook].notes.splice(noteIndex, 1); // Remove the note from the array
    saveNotebooks(); // Save updated data to localStorage
    renderNotes(); // Update the UI
  } else {
    alert("Note not found!");
  }
}

// Show the selected note in the note-view section
function showNoteView(index) {
  selectedNoteIndex = index; // Store the selected note index
  noteContent.value = notebooks[selectedNotebook].notes[index]; // Populate the note content
  notesSection.style.display = "none";
  noteViewSection.style.display = "block";
}

// Initialize the app by loading notebooks from localStorage
window.onload = loadNotebooks;
