// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;

}

// UI Constructor
function UI() {

}
// Add Book to List
// let a = 0;

UI.prototype.addBookToList = function(book) {
        const list = document.getElementById('book-list');
        // a += 1;
        // Create tr element
        const row = document.createElement('tr');
        // Insert Cols
        row.innerHTML = `
        <td class="count"></td>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href = "https://libgen.is/search.php?req=${book.isbn}&open=0&res=25&view=simple&phrase=1&column=identifier" class = "button">LibGen</a></td>
        <td><a href = "#" class = "delete">X</a></td>
        `;
        // Append Child
        list.appendChild(row);
    }
    // Show Alert
UI.prototype.showAlert = function(message, className) {
    // Create Div
    const div = document.createElement('div');
    // Add Class
    div.className = `alert ${className}`;
    // Add Text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    // Insert Alert
    container.insertBefore(div, form);
    // Timeout after 3sec
    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 3000);
}

// Delete Book
UI.prototype.deleteBook = function(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        } else {

        }
    }
    // Clearfields
UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}




// Event Listeners for Adding
document.getElementById('book-form').addEventListener('submit', function(e) {

    // Get form values
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value


    // Instantiate Book
    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI();
    // Validate
    if (title === '' || author === '' || isbn === '') {
        // Error Alert
        ui.showAlert('Please Fill in All Fields', 'error');
    } else {
        // Add Books to List
        ui.addBookToList(book);
        // Show success
        ui.showAlert('Book Added!', 'success');

        // Clear Fields
        ui.clearFields();
    }

    e.preventDefault()
});

// Event Listener for delete
document.getElementById('book-list').addEventListener('click', function(e) {
    // Instantiate UI
    const ui = new UI();
    if (e.target.className === 'delete') {
        ui.deleteBook(e.target);
        // Show Alert
        ui.showAlert('Book Removed', 'error');
        e.preventDefault();
    }
})