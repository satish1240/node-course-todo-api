// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://18.220.60.82:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('connected to MongoDB server successfully');
    const db = client.db('TodoApp');


    // db.collection('Todos').find({
    //     _id: new ObjectID('5c2ea63705fb7c66ad338864')
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);

    // });

    db.collection('Users').find({
        name: 'Andres'
    }).toArray().then((docs) => {
        console.log('Users');
        console.log(`users  count : ${docs.length}`);
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err);

    });
    db.collection('Todos').find().count().then((count) => {
        console.log(`Todos count : ${count}`);

    }, (err) => {
        console.log('Unable to fetch todos', err);

    });

    client.close();
});