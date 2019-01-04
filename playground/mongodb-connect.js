const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://18.220.60.82:27017/Todos', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('connected to MongoDB server successfully');
    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log(' Unable to insert todo', err);
    //     };
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    db.collection('Users').insertOne({
        name: 'Andres',
        age: 23,
        location: 'PHI'
    }, (err, result) => {
        if (err) {
            return console.log(' Unable to insert user', err);
        };
        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    client.close();
});