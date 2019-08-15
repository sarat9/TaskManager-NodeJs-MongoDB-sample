require('./db/mongoose-db')
const PropertiesReader = require('properties-reader');
const configProps = PropertiesReader('config.properties');
const express = require('express')
const app = express();
const route = require('./routes/route')
const authRoute = require('./routes/authentication/auth')
const validateXAuthToken = require('./middleware/security/auth-filter')

app.use(express.json())
app.use('/api', validateXAuthToken)

app.use('/auth', authRoute)
app.use('/api', route)



app.listen(3000, () => {
    var appName = configProps.get('APP_NAME');
    console.log(appName + ' - TaskManager App running on port 3000')
})