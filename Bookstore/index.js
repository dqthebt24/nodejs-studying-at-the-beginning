let express = require('express');
let app = express();

const dbBooks = require('./books.json');

app.get('/books', (req, res) => {
    return res.send(dbBooks);
})

app.get('/books', (req, res) => {
    return res.send('You want to get all books');
})

app.get('/books/:title', (req, res) => {
    return res.send(req.params);
})

app.listen(8000, () => {
    console.log('Server started at: localhost:8000');
});