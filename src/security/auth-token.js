
const jwt = require('jsonwebtoken')
const utils = require('../utils/utils')

function generateXAuthToken(_id) {
    // Generating x-auth-token to send in response headers on login
    const token = jwt.sign({ _id: _id }, utils.envProps.getProperty('JWT_SECRET_KEY'));
    console.log("x-auth-token", token)
    //jwt.verify(token, 'secret-key')
    return token;
}
module.exports = generateXAuthToken;