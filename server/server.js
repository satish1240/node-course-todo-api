const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://18.220.60.82:27017/TodoApp', { useNewUrlParser: true });

var Todo = mongoose.model('Todo', {
    text: {
        type: String
    },
    completed: {
        type: Boolean
    },
    completedAt: {
        type: Number
    }
});

var newTodo = new Todo({
    text: 'Cook lunch',
    completed: true,
    completedAt: 123
});

newTodo.save().then((doc) => {
    console.log(JSON.stringify(doc, undefined, 2));

}, (e) => {
    console.log('Unable to save todo');

})

// app.listen(3000, () => {
//     console.log(`Server started on port 3000`);
// });

// module.exports.app = app;
// app.disable('etag');