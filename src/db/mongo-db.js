//Connecting Directly to MongoDB Server

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const utils = require('../utils/utils')


const connectionUrl = utils.envProps.getProperty('DB_CONNECTION_URL')
const databaseName = utils.envProps.getProperty('DATABASE_NAME')

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
