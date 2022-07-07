//Add item
const addForm = document.querySelector('.add-item');

//To do list
const toDoList = document.querySelector('.todos-items');

//Done list
const doneList = document.querySelector('.done-items');

//Search input
const search = document.querySelector('.search input');

//Search input
const searchForm = document.querySelector('.search');

//Btn toggle theme
const toggleThemeBtn = document.querySelector('.toggle-light-theme-btn');

//localStorage todo array
let itemsArrayToDo = localStorage.getItem('itemsToDo') ? JSON.parse(localStorage.getItem('itemsToDo')) : [];
//

//localStorage done array
let itemsArrayDone = localStorage.getItem('itemsDone') ? JSON.parse(localStorage.getItem('itemsDone')) : [];
//

//Add DONE element

const generateTemplateDone = (done) => {

    const html = `
    <li class="drag-item">
        <span>${done}</span>
        <div class="item-btn-box">
            <button class="done-item-btn"></button>
            <i class="delete-item fa fa-trash" aria-hidden="true"></i>
        </div>
    </li>
    `;

    doneList.innerHTML += html;
}

//Add TODO element

const generateTemplateToDo = (todo) => {

    const html = `
    <li class="drag-item">
        <span>${todo}</span>
        <div class="item-btn-box">
            <button class="done-item-btn"></button>
            <i class="delete-item fa fa-trash" aria-hidden="true"></i>
        </div>
    </li>
    `;

    toDoList.innerHTML += html;
}

//SUBMIT

addForm.addEventListener('submit', (e) => {

    e.preventDefault();
    const todoItem = addForm.add.value.trim();

    if(todoItem.length) {
        addForm.reset();

        itemsArrayToDo.push(todoItem);
        localStorage.setItem('itemsToDo', JSON.stringify(itemsArrayToDo));
        generateTemplateToDo(todoItem);
        todo.value = "";
    }

});

itemsArrayToDo.forEach(item => {
    generateTemplateToDo(item);
});


//Delete items function (TODO UL)

toDoList.addEventListener('click', (e) => {
    if(e.target.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove();
        
        //local storage remove item
        const currentItem = e.target.parentElement.parentElement.querySelector('span').textContent;

        itemsArrayToDo = itemsArrayToDo.filter(e =>  e !== currentItem);
        localStorage.setItem('itemsToDo', JSON.stringify(itemsArrayToDo)); 
    }
});

//Delete items function (DONE UL)

doneList.addEventListener('click', (e) => {
    if(e.target.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove();

        //local storage remove item
        const currentItem = e.target.parentElement.parentElement.querySelector('span').textContent;

        itemsArrayDone = itemsArrayDone.filter(e =>  e !== currentItem);
        localStorage.setItem('itemsDone', JSON.stringify(itemsArrayDone));
    }
});

//Done items function (todo UL)

toDoList.addEventListener('click', (e) => {
    if(e.target.classList.contains('done-item-btn')) {
        e.target.closest('li').remove();

        //local storage set item to done
        const currentItem = e.target.parentElement.parentElement.querySelector('span').textContent;
        itemsArrayToDo = itemsArrayToDo.filter(e => e !== currentItem);
        localStorage.setItem('itemsToDo', JSON.stringify(itemsArrayToDo));

        itemsArrayDone.push(currentItem);
        localStorage.setItem('itemsDone', JSON.stringify(itemsArrayDone));

        generateTemplateDone(currentItem);
    }
});

itemsArrayDone.forEach(item => {
    generateTemplateDone(item);
});

//Return items function (done UL)
doneList.addEventListener('click', (e) => {
    if(e.target.classList.contains('done-item-btn')) {
        e.target.closest('li').remove();

        //local storage set item to done
        const currentItem = e.target.parentElement.parentElement.querySelector('span').textContent;

        itemsArrayDone = itemsArrayDone.filter(e => e !== currentItem);
        localStorage.setItem('itemsDone', JSON.stringify(itemsArrayDone));

        itemsArrayToDo.push(currentItem);
        localStorage.setItem('itemsToDo', JSON.stringify(itemsArrayToDo));

        generateTemplateToDo(currentItem);
    }
});

//

const filterTodos = (term) => {

   Array.from(toDoList.children)
   .filter((todo) => !todo.textContent.toLowerCase().includes(term))
   .forEach((todo) => todo.classList.add('filtered-item'));

   Array.from(toDoList.children)
   .filter((todo) => todo.textContent.toLowerCase().includes(term))
   .forEach((todo) => todo.classList.remove('filtered-item'));

};

//Search on keyup event
search.addEventListener('keyup', (e) => {
    e.preventDefault();

    const term = search.value.trim().toLowerCase();
    filterTodos(term);
});

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const term = search.value.trim().toLowerCase();
    filterTodos(term);
});

//DRAG and DROP
// new Sortable(toDoList, {
//     group: 'shared', // set both lists to same group
//     animation: 150
// });

// new Sortable(doneList, {
//     group: 'shared',
//     animation: 150
// });

//Toggle Theme

const toggleTheme = document.querySelector('.toggle-theme');

toggleThemeBtn.addEventListener('click', (e) => {
    
    if(toggleThemeBtn.textContent === "Light mode") {
        toggleThemeBtn.textContent = "Dark mode";
    } else {
        toggleThemeBtn.textContent = "Light mode";
    }

    toggleTheme.classList.toggle("light-theme");

    //localStorage toggle theme
    if (toggleTheme.classList.contains('light-theme')) {
        localStorage.setItem('toggleTheme', toggleTheme.className);
    } else {
        localStorage.removeItem('toggleTheme');
    }
 
});

window.onload = function() {
    if(localStorage.getItem("toggleTheme") !== null) {
        toggleTheme.classList.toggle("light-theme");
        toggleThemeBtn.textContent = "Dark mode";
    }
};
