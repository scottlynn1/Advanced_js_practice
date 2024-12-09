const myLibrary = [];
const table = document.querySelector('tbody');
const form = document.querySelector('form');

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    return book
}

function add_read_button(newrow) {
    let readButton = document.createElement('button');
    readButton.setAttribute('type', 'button');
    readButton.innerText = 'Read';
    newrow.appendChild(readButton);
    let readstatus = readButton.previousElementSibling;
    readButton.addEventListener('click', ()=>{
        console.log("hello, World");
        console.log(readstatus.textContent);
        if (readstatus.textContent == 'True') {
            readstatus.textContent = 'False';
            console.log(readstatus.textContent);
        } else {
            readstatus.textContent = 'True';
            console.log(readstatus.textContent);
        }
    })
}

function displayLibrary() {
    for (let i in myLibrary) {
        const row = document.createElement("tr");
        row.setAttribute("data-booknumber", i+1);
        table.appendChild(row);
        for (let j of myLibrary[i]) {
            let cell = document.createElement('td');
            let text = document.createTextNode(j);
            cell.appendChild(text);
            row.appendChild(cell);
        }
        add_read_button(row);
    }
}


const title = document.querySelector('#Book_Title');
const author = document.querySelector('#Book_Author');
const pages = document.querySelector('#Number_of_Pages');
const read = document.querySelector('#Book_Read');
const dialog = document.querySelector("dialog");

const showButton = document.querySelector("#showButton");
showButton.addEventListener("click", ()=>{dialog.showModal();});
const formSubmit = document.querySelector("#formSubmit");

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    book = addBookToLibrary(title.value, author.value, pages.value, read.value);
    let newrow = document.createElement('tr');
    newrow.setAttribute('data-booknumber', myLibrary.length);
    table.appendChild(newrow);
    for (let i in book) {
        let cell = document.createElement('td');
        let text = document.createTextNode(book[i]);
        cell.appendChild(text);
        newrow.appendChild(cell);
    }
    add_read_button(newrow);
    let removeButton = document.createElement('button');
    removeButton.setAttribute('type', 'button');
    removeButton.innerText = 'Remove';
    newrow.appendChild(removeButton);
    removeButton.addEventListener('click', (e)=>{
        let row = e.target.parentElement;
        let number = row.dataset.booknumber;
        myLibrary.splice(number-1, 1);
        while (row.nextElementSibling) {
            row = row.nextElementSibling;
            row.setAttribute('data-booknumber', row.dataset.booknumber-1);
        }
        e.target.parentElement.remove();
    })
    form.reset();
    dialog.close();
});



