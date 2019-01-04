// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://18.220.60.82:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('connected to MongoDB server successfully');
    const db = client.db('TodoApp');


    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5c2ea63705fb7c66ad338864')
    // }, {
    //     $set: {
    //         completed: false
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);

    // });


    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5c2e99ac574fdf24877998db')
    }, {
        $set: {
            name: 'satja'
        },
        $inc: {
            age: 2
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    }, (err) => {
        console.log('Unable to fetch todos', err);

    });

    client.close();
});