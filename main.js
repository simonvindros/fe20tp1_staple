// Quire - **Rough** functional draft

// tinymce.init({
//     init_instance_callback: function(editor) {
//         editor.on('input', function() {
//             saveNote();
//         });
//     },
//     selector: '#body-text-area',
//     inline: true,
//     toolbar: false,
//     menubar: false,
//     plugins: 'quickbars',
//     quickbars_insert_toolbar: false,
//     placeholder: 'Enter note here'
// });

const titleInput = document.querySelector("#title-input");
const newNoteBtn = document.querySelector("#new-note-btn");
const deleteNoteBtn = document.querySelector("#delete-note-btn");
const noteList = document.querySelector("#note-list");

let noteListArray;
let activeObjId;

class NoteConstructor {
    constructor() {
        this.id = Date.now();
        this.favorite = false;
        this.title = `Untitled ${noteListArray.length + 1}`; // should check title number instead of length
        this.body = "";
        this.tags = [];
        this.date = getDate(); // maybe redundant, and fix locale
    }
}

window.addEventListener("load", function() {
    if (localStorage.getItem("noteListKey")) {
        noteListArray = JSON.parse(localStorage.getItem("noteListKey"));
        for (let i = 0; i < noteListArray.length; i++) {
            renderNote(noteListArray[i]);
            if (i == 0) {
                viewNote(noteListArray[i]);
            }
        }
    } else {
        noteListArray = [];
        newNote();
    }
});

titleInput.addEventListener("input", function() {
    saveNote();
});

newNoteBtn.addEventListener("click", function() {
    newNote();
});

deleteNoteBtn.addEventListener("click", function() {
    if (confirm(`Are you sure you want to delete "${document.title.slice(8)}?"`)) { // not best way to get title
        deleteNote();
    }
});

// newNote() --> Creates a new note, and pushes it to the array

function newNote() {
    let note = new NoteConstructor();
    noteListArray.push(note);

    tinymce.get("body-text-area").focus();

    renderNote(note);
    viewNote(note);
}

// renderNote(obj) --> Shows the note in the note list

function renderNote(obj) {
    let noteItem = document.createElement("li");
    noteItem.innerHTML = `<h3>${obj.title}</h3><p>${obj.body}</p>`;
    noteItem.setAttribute("data-id", obj.id);
    noteList.appendChild(noteItem);

    noteItem.addEventListener("click", function() {
        viewNote(obj);
    });
}

// viewNote(obj) --> Loads the note data into the input fields

function viewNote(obj) {
    titleInput.value = obj.title;
    tinymce.get("body-text-area").setContent(obj.body);

    document.title = `Quire - ${obj.title}`;

    activeObjId = obj.id;
}

// saveNote() --> Finds the active note in the array, updates the data, and then saves it to local storage

function saveNote() {
    for (let i = 0; i < noteListArray.length; i++) {
        if (noteListArray[i].id == activeObjId) {
            noteListArray[i].title = titleInput.value;
            noteListArray[i].body = tinymce.get("body-text-area").getContent();

            let noteItem = document.querySelector([`[data-id="${noteListArray[i].id}"]`]);

            // make obj.body plain text, and 'squish' linebreaks

            noteItem.innerHTML = `<h3>${noteListArray[i].title}</h3><p>${noteListArray[i].body}</p>`;

            document.title = `Quire - ${noteListArray[i].title}`;

            localStorage.setItem("noteListKey", JSON.stringify(noteListArray));
        }
    }
}

// deleteNote() --> Finds the active note in the array and deletes it

function deleteNote() {
    for (let i = 0; i < noteListArray.length; i++) {
        if (noteListArray[i].id == activeObjId) {

            if (noteListArray.length > 1 && i == noteListArray.length - 1) {
                viewNote(noteListArray[i - 1]);
            } else if (noteListArray.length > 1) {
                viewNote(noteListArray[i + 1]);
            }

            let noteItem = document.querySelector([`[data-id="${noteListArray[i].id}"]`]);
            noteItem.remove();

            noteListArray.splice(i, 1);
            localStorage.setItem("noteListKey", JSON.stringify(noteListArray));
        }
    }
    if (noteListArray.length == 0) {
        localStorage.removeItem("noteListKey");
        newNote();
    }
}

// Miscellaneous

function getDate() {
    let dateObj = new Date();
    let day = dateObj.getDate();
    let month = dateObj.getMonth() + 1;
    let year = dateObj.getFullYear();

    return `${day}/${month}-${year}`;
}

/* NON-EDITOR CODE */

// Light & Dark Theme
