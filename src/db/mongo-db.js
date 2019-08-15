//Connecting Directly to MongoDB Server

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager-db'

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        console.log("Unable to connect Database\n", error)
        return;
    }
    console.log("Connected to Database")
    const db = client.db(databaseName)
    // db.collection('users').insert({
    //     name: 'Sarat',
    //     age: 26
    // })

    // db.collection('tasks').insertMany([{
    //     description: "Shopping at mall",
    //     completed: false
    // }], (error, data) => {
    //     if (error) {
    //         console.log("Error Inserting colections Tasks")
    //         return;
    //     }
    //     console.log("Inserted data to Colletion tasks", data);
    // });

    // db.collection('tasks').findOne({
    //     completed: false
    // }, (error, data) => {
    //     if (error) {
    //         console.log("Error Inserting colections Tasks")
    //         return;
    //     }
    //     console.log("Inserted data to Colletion tasks", data);
    // });

    db.collection('tasks').find({
        completed: true
    }).toArray((error, data) => {
        if (error) {
            console.log("Error Inserting colections Tasks")
            return;
        }
        console.log("Inserted data to Colletion tasks", data);
    });

})
