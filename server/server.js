var express = require('express');
var bodyParser = require('body-parser');

const { ObjectID } = require('mongodb');
var { mongoose } = require('./db/mongoose.js');
var { todo } = require('./models/todo.js');
var { user } = require('./models/user.js');

var app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var posttodo = new todo({
        text: req.body.text
    });

    posttodo.save().then((doc) => {
        return res.status(200).send(doc);
    }, (e) => {
        return res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    todo.find().then((todoslist) => {
        return res.send({ todoslist });
    }, (e) => {
        return res.status(400).send(e);
    });


});

app.get('/todos/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {

        return res.status(400).send({
            error: `todos ID ${req.params.id} not valid`
        });

    };
    todo.findById(req.params.id).then((todoid) => {
        if (!todoid) {
            return res.status(404).send({
                error: `todos ID ${req.params.id} not found`
            });
        };
        return res.status(200).send({ todoid });
    }, (e) => {
        return res.status(400).send(e);
    });


});

app.delete('/todos/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {

        return res.status(400).send({
            error: `todos ID ${req.params.id} not valid`
        });

    };
    todo.findByIdAndRemove(req.params.id).then((todoid) => {
        if (!todoid) {
            return res.status(404).send({
                error: `todos ID ${req.params.id} not found`
            });
        };
        return res.status(200).send({ todoid });
    }, (e) => {
        return res.status(400).send(e);
    });


});


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

module.exports.app = app;
app.disable('etag');