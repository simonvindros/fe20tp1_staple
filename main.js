// Quire - **Rough** functional draft

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
	
	let plainTextBody = obj.body.replace(/<(\S*?)[^>]*>.*?|<.*? \/>/g, ""); // fix line-break removal ellipsis
	plainTextBody = plainTextBody.replaceAll("&nbsp;", " ");

    if (obj.favorite) {
        noteItem.innerHTML = `<div class="note-wrapper"><div class="content-wrapper"><h3>${obj.title}</h3><p>${plainTextBody}</p></div><div class="info-wrapper"><div class="tag-wrapper"><p>#food</p></div><div class="date-wrapper"><p>${obj.date}</p></div></div></div><div class="toolbar-wrapper"><button><i class="fas fa-star"></i></button></div>`;
    } else {
        noteItem.innerHTML = `<div class="note-wrapper"><div class="content-wrapper"><h3>${obj.title}</h3><p>${plainTextBody}</p></div><div class="info-wrapper"><div class="tag-wrapper"><p>#food</p></div><div class="date-wrapper"><p>${obj.date}</p></div></div></div><div class="toolbar-wrapper"><button><i class="far fa-star"></i></button></div>`;
    }

    noteItem.setAttribute("data-id", obj.id);
    noteList.appendChild(noteItem);

    noteItem.addEventListener("click", function(evt) {
        if (evt.target.closest("i")) {
            if (evt.target.classList.contains("far")) {
                evt.target.classList.remove("far");
                evt.target.classList.add("fas");
                obj.favorite = true;
            } else if (evt.target.classList.contains("fas")) {
                evt.target.classList.remove("fas");
                evt.target.classList.add("far");
                obj.favorite = false;
            }

            localStorage.setItem("noteListKey", JSON.stringify(noteListArray));
            
        } else {
           viewNote(obj); 
        }
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

			let plainTextBody = tinymce.get("body-text-area").getContent({ format: "text" }); // fix line-break removal ellipsis
			
			let noteItem = document.querySelector([`[data-id="${noteListArray[i].id}"]`]);
            if (noteListArray[i].favorite) {
                noteItem.innerHTML = `<div class="note-wrapper"><div class="content-wrapper"><h3>${noteListArray[i].title}</h3><p>${plainTextBody}</p></div><div class="info-wrapper"><div class="tag-wrapper"><p>#food</p></div><div class="date-wrapper"><p>${noteListArray[i].date}</p></div></div></div><div class="toolbar-wrapper"><button><i class="fas fa-star"></i></button></div>`;
            } else if (noteListArray[i].favorite) {
                noteItem.innerHTML = `<div class="note-wrapper"><div class="content-wrapper"><h3>${noteListArray[i].title}</h3><p>${plainTextBody}</p></div><div class="info-wrapper"><div class="tag-wrapper"><p>#food</p></div><div class="date-wrapper"><p>${noteListArray[i].date}</p></div></div></div><div class="toolbar-wrapper"><button><i class="far fa-star"></i></button></div>`;
            }

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

/* NON-EDITOR CODE */

// Miscellaneous

function getDate() {
    let dateObj = new Date();
    let day = dateObj.getDate();
    let month = dateObj.getMonth() + 1;
    let year = dateObj.getFullYear();

    return `${day}/${month}-${year}`;
}

// show editor when hidden and clicking on a note
//
//


//////////////////////////////////////////////////////////////////////////////////
// Light & Dark Theme

var checkbox = document.querySelector('input[name=onoffswitch]');

checkbox.addEventListener('change', function() {
    if(this.checked) {
        trans()
        document.documentElement.setAttribute('data-theme', 'dark')
    } else {
        trans()
        document.documentElement.setAttribute('data-theme', 'light')
    }
})

let trans = () => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
        document.documentElement.classList.remove('transition')
    }, 1000)
}




/* Selector for modal container */

const msgContainer = document.querySelector('#content');
// Window onload function
window.onload = function () {

    // check localstorage if message has already been seen

    let checked = localStorage.getItem('checked');

    if (checked === 'true') {
        msgContainer.style.display = "none";

        // selector for msg button
        
            

        } else {
            msgContainer.style.display = "block"
        }
        localStorage.setItem('checked', 'true');
    }

// Eventlistener for ok button

btnMsg.addEventListener('click', () => {
    msgContainer.style.display = 'none';
})
