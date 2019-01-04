// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://18.220.60.82:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('connected to MongoDB server successfully');
    const db = client.db('TodoApp');


    // delete Many
    // db.collection('Todos').deleteMany({
    //     text: 'eating luch'
    // }).then((result) => {
    //     console.log(result.result);
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);

    // });

    db.collection('Users').deleteMany({
        name: 'Andres'
    }).then((result) => {
        console.log(result.result);
    }, (err) => {
        console.log('Unable to fetch Users', err);

    });

    // delete one
    // db.collection('Todos').deleteOne({
    //     text: 'eating dinner'
    // }).then((result) => {
    //     console.log(result.result);
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);

    // });

    //find one and delte

    db.collection('Users').findOneAndDelete({
        _id: new ObjectID('5c2eaa40495d6825e3ae0cd8')
    }).then((result) => {
        console.log(result);
    }, (err) => {
        console.log('Unable to fetch todos', err);

    });


    db.collection('Users').find().toArray().then((docs) => {
        console.log('Users');
        console.log(`Users  count : ${docs.length}`);
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch Users', err);

    });
    client.close();
});