const { ObjectID } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose.js');
const { todo } = require('./../server/models/todo.js');
const { user } = require('./../server/models/user.js');


todo.deleteMany({}).then((result) => {
    console.log(result);

});