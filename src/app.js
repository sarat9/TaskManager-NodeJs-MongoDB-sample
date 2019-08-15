require('./db/mongoose-db')
const express = require('express')
const app = express();
const route = require('./routes/route')
const authRoute = require('./routes/authentication/auth')
const validateXAuthToken = require('./middleware/security/auth-filter')

app.use(express.json())
app.use('/api', validateXAuthToken)

app.use('/auth', authRoute)
app.use('/api', route)


module.exports = app;