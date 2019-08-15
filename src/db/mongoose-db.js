
const mongoose = require('mongoose')

const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager-db'

mongoose.connect(connectionUrl + '/' + databaseName, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})



