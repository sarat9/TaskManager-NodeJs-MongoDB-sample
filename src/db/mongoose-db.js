const mongoose = require('mongoose')
const utils = require('../utils/utils')

const connectionUrl = utils.envProps.getProperty('DB_CONNECTION_URL').toString()
const databaseName = utils.envProps.getProperty('DATABASE_NAME').toString()

mongoose.connect(connectionUrl + '/' + databaseName, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})



