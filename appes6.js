class Book{
    constructor (title,author,isbn){
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}

class UI{
    addBook(book){
        const list = document.getElementById('book-list')
        // create tr 
        const row = document.createElement('tr')
        // insert cols
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X<a></td>`
        list.appendChild(row)
    }
    showAlert(msg,className){
        const div = document.createElement('div')
        div.className = `alert ${className}`
        div.appendChild(document.createTextNode(msg))
        // get parent
        const container = document.querySelector('.container')
        const form = document.querySelector('#book-form')
        // insert in DOM
        container.insertBefore(div, form)

        // time interval
        if (className === 'error') {
            setTimeout(function () {
                document.querySelector('.alert').remove()
            }, 3000)
        } else {
            setTimeout(function () {
                document.querySelector('.alert').remove()
            }, 1000)
        }
    }
    deleteBook(target){
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove()
        }
    }
    clearFields(){
        document.getElementById('title').value = ''
        document.getElementById('author').value = ''
        document.getElementById('isbn').value = ''
    }
}
document.getElementById('book-form').addEventListener('submit', function (e) {
    // console.log("Test")
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value
    // console.log(author,title,isbn)

    const book = new Book(title, author, isbn)
    // console.log(book)

    const ui = new UI()

    // validate
    if (title === '' || author === '' || isbn === '') {
        ui.showAlert('Please fill in all fields', 'error')
    }
    else {
        ui.addBook(book)
        // clear fields
        ui.showAlert('Book added!', 'success')
        ui.clearFields()
    }
    e.preventDefault()
})

// Event Listener for delete 
document.getElementById('book-list').addEventListener('click', function (e) {
    // console.log(e.target)
    const ui = new UI

    ui.deleteBook(e.target)
    ui.showAlert("Book Removed!", 'success')
    e.preventDefault();
})