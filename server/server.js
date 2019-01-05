var express = require('express');
var bodyParser = require('body-parser');

const { ObjectID } = require('mongodb');
var { mongoose } = require('./db/mongoose.js');
var { todo } = require('./models/todo.js');
var { user } = require('./models/user.js');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var posttodo = new todo({
        text: req.body.text
    });

    posttodo.save().then((doc) => {
        res.status(200).send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    todo.find().then((todoslist) => {
        res.send({ todoslist });
    }, (e) => {
        res.status(400).send(e);
    });


});

app.get('/todos/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {

        res.status(400).send({
            error: `todos ID ${req.params.id} not valid`
        });

    };
    todo.findById(req.params.id).then((doc) => {
        if (!doc) {
            res.status(404).send({
                error: `todos ID ${req.params.id} not found`
            });
        };
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