let express = require('express');
let app = express();

app.get('/', (req, res) => {
    return res.send('Hello World');
})

app.listen(8000, () => {
    console.log('Server started at: localhost:8000');
});