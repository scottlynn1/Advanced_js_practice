const myLibrary = [];
const table = document.querySelector('tbody');

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

function displayLibrary() {
    const table = document.querySelector("tbody");
    for (const book of myLibrary) {
        const tr = document.createElement("tr");
        table.appendChild(tr);
        for (const data of book) {
            const td = document.createElement("td").innerHTML(data);
            tr.appendChild(td);
        }
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
const form = document.querySelector('form');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    book = addBookToLibrary(title.value, author.value, pages.value, read.value);
    let newrow = document.createElement('tr');
    table.appendChild(newrow);
    for (let i in book) {
        let cell = document.createElement('td');
        let text = document.createTextNode(book[i]);
        cell.appendChild(text);
        newrow.appendChild(cell);
    }
});

//formSubmit.addEventListener('click', addBookToLibrary(document.querySelector('#Book_Title').value, document.querySelector('#Book_Author').value, document.querySelector('#Number_of_Pages').value, document.querySelector('#Book_Read').value));


