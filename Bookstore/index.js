let express = require('express');
let bodyParser = require('body-parser')

let app = express();

app.use(bodyParser.json({
    type:'application/json'
}))

let dbBooks = require('./books.json');

// UTILITIES
function findBooksByTitile(title) {
    return dbBooks.filter(it => it.title === title);
}

function addBook(book) {
    dbBooks.push(book);
}

function isBookAlready(title){
    return dbBooks.find(title)
}

function updateBook(book, newInfo) {
    Object.assign(book, newInfo);
}

function deleteBook(book) {
    dbBooks = dbBooks.filter(it => it !== book)
}

// GET
// Re-direction
app.get('/', (req, res) => {
    return res.redirect('/books');
})

app.get('/books', (req, res) => {
    res.status(200);
    return res.send(dbBooks);
})



app.get('/books/:title', (req, res) => {
    let books = findBooksByTitile(req.params.title)
    if (books.length < 1) {
        res.status = 404;
        return res.send({
            message: 'Not found the book!'
        });
    }
    return res.send({
        message: "Found the book!",
        payload: books.pop()
    })
})

// POST
app.post('/books', (req, res) => {
    if (!req.body.title || req.body.title.trim().length < 1) {
        return res.status(400).send({
            message: "Missing or invalid title!"
        })
    }
    
    if (isBookAlready(title)){
        return res.status(400).send({
            message: "The book is already in the bookstore!"
        })
    }

    addBook(req.body);
    return res.status(200).send({
        message: 'The book is added successfully!'
    })
})

// PUT
// Update a book title
app.put('/books/:title', (req, res) => {

    // If can find the title
    let books = findBooksByTitile(req.params.title);

    if (books.length >= 1) {

        updateBook(books[0], req.body);

        return res.status(200).send({
            message: 'The book is updated successfully!'
        })
    }

    // Return could not find the book
    return res.status(404).send({
        message: `Couldn't find the book!`
    })
})

// DELETE
app.delete('/books/:title', (req, res) => {
    if (!req.params.title || req.params.title.trim().length < 1) {
        return res.status(400).send({
            message: "Missing or invalid title!"
        })
    }

    let books = findBooksByTitile(req.params.title)
    if (books.length < 1) {
        res.status = 404;
        return res.send({
            message: 'Not found the book!'
        });
    }

    deleteBook(books.pop());

    return res.status(200).send({
        message: 'The book is deleted successfully!'
    })
})

// START SERVER
app.listen(8000, () => {
    console.log('Server started at: localhost:8000');
});