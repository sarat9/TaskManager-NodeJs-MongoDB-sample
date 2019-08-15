const app = require('./app')
const utils = require('./utils/utils')

app.listen(3000, () => {
    console.log(utils.envProps.getProperty('APP_NAME'))
    console.log('TaskManager App running on port 3000')
})