# Bookstore project
[<img src="https://img.shields.io/github/license/mashape/apistatus.svg">]()
## Introduction
- Database in this project is in ***books.json***
- This project covers some API
	- API get all books (HTTP action GET)
	- API get a book info (HTTP action GET)
	- API search all books by title,author, year,... (HTTP action GET)
	- API update a book info (HTTP action PUT)
	- API create new book (HTTP action POST)
	- API delete a book (HTTP action DELETE)

## Main functions

### Get all books

### Get books by title
- Create a utility function to get a book by title
```js
function findBooksByTitile(title) {
    return dbBooks.filter(it => it.title === title)
}
```
- Create a new API for getting a book by title
```js
app.get('/books/:title', (req, res) => {
	return res.send({title: req.params.title})
}
```
- Use the function in the new API
```js
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
```

### Post books
- Add package get request body ""
```js
let bodyParser = require('body-parser')
...
app.use(bodyParser.json({
    type:'application/json'
}))
...

```
   > **Note**: Run `npm install body-parser` to install the package!

- Create new utility function for adding a book to DB
```js
function addBook(book) {
    dbBooks.push(book)
}
```

- Create a POST API on server
```js
app.post('/books', (req, res) => {
    console.log(req.body)
    return res.send({
        message: 'Hello POST!'
    })
})
```
- Use the utility function to the new API
```js
app.post('/books', (req, res) => {
    addBook(req.body);
    return res.send({
        message: 'The book is added successfully!'
    })
})
```
- Check book's title in request body
```js
app.post('/books', (req, res) => {
    if (!req.body.title || req.body.title.trim().length < 1) {
        res.status = 400;
        return res.send({
            message: "Missing or invalid title!"
        })
    }
    addBook(req.body);
    ...
})
```
- Add logic check if the book is already

### Tips
1. Use ***nodemon*** to save the time
    > `npm install -g nodemon`