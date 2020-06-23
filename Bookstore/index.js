let express = require('express');
let bodyParser = require('body-parser')

let app = express();

app.use(bodyParser.json({
    type:'application/json'
}))

const dbBooks = require('./books.json');

// UTILITIES
function findBooksByTitile(title) {
    return dbBooks.filter(it => it.title === title)
}

function addBook(book) {
    dbBooks.push(book)
}

function isBookAlready(title){
    return dbBooks.find(title)
}

// GET
app.get('/books', (req, res) => {
    return res.send(dbBooks);
})

app.get('/books', (req, res) => {
    return res.send('You want to get all books');
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
        res.status = 400;
        return res.send({
            message: "Missing or invalid title!"
        })
    }
    console.log('Length: ')
    addBook(req.body);
    return res.send({
        message: 'The book is added successfully!'
    })
})

// START SERVER
app.listen(8000, () => {
    console.log('Server started at: localhost:8000');
});