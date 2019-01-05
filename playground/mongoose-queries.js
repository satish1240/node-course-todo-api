const { ObjectID } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose.js');
const { todo } = require('./../server/models/todo.js');
const { user } = require('./../server/models/user.js');

var id = '5c2ebefde3ca092779c7eb45';

// if (!ObjectID.isValid(id)) {
//     console.log('ID not valid');

// };

// todo.find({
//     _id: id
// }).then((todolists) => {
//     console.log('Todos:', todolists);

// });

// todo.findOne({
//     _id: id
// }).then((todolists) => {
//     console.log('Todo find one:', todolists);

// });

// todo.findById(id).then((todolists) => {
//     if (!todolists) {
//         return console.log('Id not found');
//     }
//     console.log('Todo By ID:', todolists);

// }).catch((e) => console.log(e));

user.findById(id).then((users) => {
    if (!users) {
        return console.log('user not found');
    }
    console.log('user By ID:', users.email);

}).catch((e) => console.log(e));