var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose.js');
var { todo } = require('./models/todo.js');
var { user } = require('./models/user.js');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var posttodo = new todo(req);

    posttodo.save().then((doc) => {
        res.status(200).send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});



app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});

module.exports.app = app;
app.disable('etag');