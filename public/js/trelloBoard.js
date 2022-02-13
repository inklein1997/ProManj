let list_items = document.querySelectorAll('.list-item');
let lists = document.querySelectorAll('.list');
const trelloBoard = document.querySelectorAll('#trelloBoard')[0].children;
let addTaskButton = document.querySelectorAll('.addTaskButton')
let container = document.querySelectorAll('#trelloBoard')[0]

const movableTaskText = document.querySelector('#moveableTasksH6');
const movableListText = document.querySelector('#moveableListsH6');

// toggle.checked == true
// enable List movement and disable item movement
// toggle.checked == false
const toggle = document.querySelector('#draggableToggle');



let draggedItem = null;


// USER CLICKS ADD NEW LIST AND A NEW LIST APPENDS TO PAGE
const addList = () => {
    const newList = document.createElement('div');
    newList.innerHTML = `<div class="d-flex justify-content-between align-items-center moveList"><h3 class="text-white listTitle">Click to edit</h3><img src="./img/pencil_icon.png" id="editListButton"></div><div class="taskList"></div><h5 class="text-white addTaskButton"><span class="bold">+</span> Add task</h5>`
    newList.classList.add('list', 'd-flex', 'flex-column', 'gap-2')

    if (toggle.checked == true) {
        newList.setAttribute('draggable', 'true');
    } else {
        newList.setAttribute('draggable', 'false');
    }

    if (textToggle.checked == true) {
        newList.children[0].children[0].setAttribute('contenteditable', 'false')
    } else {
        newList.children[0].children[0].setAttribute('contenteditable', 'true')
    }

    document.querySelector('#trelloBoard').appendChild(newList)

    //ADD EVENT LISTENER TO NEWLY ADDED LIST'S ADD TASK BUTTON
    newList.children[2].addEventListener('click', appendTask)

    // IF TOGGLE FOR DRAGGING LISTS IS ENABLED THEN ADD DRAG EVENT LISTENER TO NEWLY ADDED LIST ELEMENT
    // IF TOGGLE FOR DRAGGING LISTS IS DISABLED THEN ADD DRAG EVENT LISTENER TO NEWLY ADDED LIST ELEMENT
    if (toggle.checked == false) {
        makeDraggable()
    }
    // })
    if (toggle.checked == true) {
        listDrag();
    }
}


function addTask() {
    console.log('click')
    // for (let k = 0; k < addTaskButton.length; k++) {
    const taskButton = addTaskButton[list_items.length - 1]
    console.log(taskButton)
    taskButton.addEventListener('click', function () {
        const newTask = document.createElement('div');
        newTask.innerHTML = 'Click to enter text'
        newTask.classList.add('list-item')
        newTask.setAttribute('draggable', 'true');
        if (textToggle.checked == true) {
            newTask.setAttribute('contenteditable', 'false');
        } else {
            newTask.setAttribute('contenteditable', 'true');
        }
        taskButton.previousElementSibling.append(newTask);
        list_items = document.querySelectorAll('.list-item');
        console.log(list_items);
        if (toggle.checked == false) {
            console.log('box is unchecked')
            // makeDraggable();
        };
    });
    // };
};

const textToggle = document.querySelector('#editTextToggle');


function appendTask() {
    for (let z = 0; z < addTaskButton.length; z++) {
        const newTask = document.createElement('div');
        newTask.innerHTML = 'Click to enter text'
        newTask.classList.add('list-item')
        newTask.setAttribute('draggable', 'true');
        if (textToggle.checked == true) {
            newTask.setAttribute('contenteditable', 'false');
        } else {
            newTask.setAttribute('contenteditable', 'true');
        }
        console.log(this)
        this.previousElementSibling.append(newTask);
    }
}




function makeDraggable() {
    // list_items = document.querySelectorAll('.list-item');
    for (let i = 0; i < list_items.length; i++) {
        const item = list_items[i];

        item.addEventListener('dragstart', function (e) {
            draggedItem = item;
            lists = document.querySelectorAll('.list');

            setTimeout(function () {
                draggedItem.style.display = 'none'
            }, 0)
        });

        item.addEventListener('dragend', function () {
            setTimeout(function () {
                draggedItem.style.display = 'block';
                draggedItem = null;
            })
        }, 0)

        for (let j = 0; j < lists.length; j++) {
            const list = lists[j];

            list.addEventListener('dragover', function (e) {
                e.preventDefault();
            })

            list.addEventListener('dragenter', function (e) {
                e.preventDefault()
                // this.style.backgroundColor = '#37478586'
            })

            list.addEventListener('dragleave', function (e) {
                // this.style.backgroundColor = '#374790'
            })
            list.addEventListener('drop', function (e) {
                this.children[1].appendChild(draggedItem);
                // this.style.backgroundColor = '#374790'
            })
        }
    }
}

function listDrag() {
    let lists = document.querySelectorAll('.list');
    lists.forEach(list => {
        list.addEventListener('dragstart', () => {
            list.classList.add('dragging')
        });
        list.addEventListener('dragend', () => {
            list.classList.remove('dragging')
        });
    });

    lists.forEach(list => {
        list.addEventListener('dragstart', () => {
            list.classList.add('dragging')
        });
        list.addEventListener('dragend', () => {
            list.classList.remove('dragging')
        });
    })

}

function dropList(e) {
    e.preventDefault()
    const afterElement = getDragAfterElement(container, e.clientX);
    // console.log(afterElement)
    const list = document.querySelector('.dragging');
    // container.appendChild(list)
    if (afterElement == null) {
        container.appendChild(list)
    } else {
        container.insertBefore(list, afterElement)
    }
}

function getDragAfterElement(container, x) {
    const draggableElements = [...container.querySelectorAll('.list:not(.dragging)')]
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = x - box.left - box.width / 2
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest
        }

    }, { offset: Number.NEGATIVE_INFINITY }).element
}

listDrag();
makeDraggable();
document.querySelector('#addListButton').addEventListener('click', addList)

const editTextOn = document.querySelector('#editTextOn');
const editTextOff = document.querySelector('#editTextOff');
// const textToggle = document.querySelector('#editTextToggle');

textToggle.addEventListener('click', () => {
    console.log(lists)
    list_items = document.querySelectorAll('.list-item');
    lists = document.querySelectorAll('.list');
    if (textToggle.checked == true) {
        list_items.forEach(item => item.setAttribute('contenteditable', 'false'))
        lists.forEach(list => list.children[0].children[0].setAttribute('contenteditable', 'false'))
        editTextOn.style.opacity = '50%';
        editTextOff.style.opacity = '100%';
    } else {
        list_items.forEach(item => item.setAttribute('contenteditable', 'true'))
        lists.forEach(list => list.children[0].children[0].setAttribute('contenteditable', 'true'))
        editTextOn.style.opacity = '100%';
        editTextOff.style.opacity = '50%';
    }

})

// EVENT LISTENER FOR TOGGLING DRAG
// IF CHECK == TRUE, THEN DISABLE MOVING TASKS AND ENABLE MOVING LISTS
// IF CHECK == FALSE, THEN ENABLE MOVING TASKS AND DISABLE MOVING LISTS
toggle.addEventListener('click', () => {
    if (toggle.checked == true) {

        movableTaskText.style.opacity = '50%';
        movableListText.style.opacity = '100%';

        lists = document.querySelectorAll('.list');
        // Columns are draggable
        lists.forEach(list => {
            list.setAttribute('draggable', 'true');
        });
        // List_items are NOT draggable
        list_items.forEach(list_item => {
            list_item.setAttribute('draggable', 'false');
        })

        container.addEventListener('dragover', dropList)
        listDrag()
    } else if (toggle.checked == false) {

        movableTaskText.style.opacity = '100%';
        movableListText.style.opacity = '50%';

        // Columns are NOT draggable
        lists.forEach(list => {
            list.setAttribute('draggable', 'false')
        })
        // List_items are draggable
        list_items.forEach(list_item => {
            list_item.setAttribute('draggable', 'true');
        })

        container.removeEventListener('dragover', dropList)
        makeDraggable()
    }
})

// EVENT LISTENER FOR TOGGLING EDIT TEXT
// IF CHECK == TRUE, THEN DISABLE TEXT EDITING
// IF CHECK == FALSE, THEN ENABLE TEXT EDITING
textToggle.addEventListener('click', () => {
    //NEED TO RE-ESTABLISH NODES (list_items and lists) JUST IN CASE ANY NEW ONES WERE ADDED
    list_items = document.querySelectorAll('.list-item');
    lists = document.querySelectorAll('.list');

    if (textToggle.checked == true) {

        editTextOn.style.opacity = '50%';
        editTextOff.style.opacity = '100%';

        list_items.forEach(item => item.setAttribute('contenteditable', 'false'))
        lists.forEach(list => list.children[0].children[0].setAttribute('contenteditable', 'false'))
    } else if (textToggle.checked == false) {

        editTextOn.style.opacity = '100%';
        editTextOff.style.opacity = '50%';

        list_items.forEach(item => item.setAttribute('contenteditable', 'true'))
        lists.forEach(list => list.children[0].children[0].setAttribute('contenteditable', 'true'))
    }

}) 
