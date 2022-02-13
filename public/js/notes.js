const noteContainer = document.querySelector('#messagesList');
const addMessageButton = document.querySelector('#addMessageIcon');
const deleteNoteButton = document.querySelector('#deleteNoteButton')

function appendNote() {
    const divEl = document.createElement('div');
    content = `<div class="d-flex justify-content-between align-items-center messageListing collapsible">
    <h3 class="messageContact collapsible" contenteditable='true'>Click to Edit</h3><img id='deleteNoteButton' src="/img/bin.png"></div><div class="noteContent"><h3 contenteditable='true'>Click to edit</h3></div>`
    divEl.innerHTML = content
    divEl.classList.add('d-flex', 'flex-column')

    // ADDS COLLAPSIBLE EVENT LISTENER TO NEWLY ADDED NOTES (NEED!)
    divEl.addEventListener('click', (e) => {
        if (e.target.classList.value.includes('messageListing')) {
            let target = e.target.nextElementSibling
            console.log(target)
            if (!target.style.display) {
                target.style.display = 'block'
            // } else if (target.style.display === 'block') {
            //     target.style.display = 'none'
            } else if (target.style.display === 'none') {
                target.style.display = 'block'
            }
        }
    })

    // ADDS COLLAPSIBLE EVENT LISTENER TO NEWLY ADDED NOTES (NEED!)
    divEl.addEventListener('click', (e) => {
        if (e.target.classList.value.includes('messageListing')) {
            e.target.classList.toggle("active");
            var content = e.target.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        }
    })

    noteContainer.appendChild(divEl)

    const deleteNoteButton = document.querySelector('#deleteNoteButton')
    console.log(deleteNoteButton)
}


addMessageButton.addEventListener('click', appendNote);



// MAKES ALL INITIALLY LOADED NOTES COLLAPSIBLE!!!
let collapsible = document.getElementsByClassName("collapsible");

for (let i = 0; i < collapsible.length; i++) {
    collapsible[i].addEventListener('click', function (e) {
        console.log(this.nextElementSibling)
        console.log(e.target.nextElementSibling)
        // console.log(collapsible[i].nextElementSibling)
        if (e.target.classList.value.includes('messageListing')) {
            let target = collapsible[i].nextElementSibling
            console.log(target)
            if (!target.style.display) {
                target.style.display = 'block'
            } else if (target.style.display === 'none') {
                target.style.display = 'block'
            }
        }
    })
}

for (i = 0; i < collapsible.length; i++) {
    collapsible[i].addEventListener("click", function (e) {
        if (e.target.classList.value.includes('messageListing')) {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        }
    });
}