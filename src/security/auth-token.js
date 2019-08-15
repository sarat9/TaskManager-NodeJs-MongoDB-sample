
const jwt = require('jsonwebtoken')

function generateXAuthToken(_id) {
    // Generating x-auth-token to send in response headers on login
    const token = jwt.sign({ _id: _id }, 'secret-key');
    console.log("x-auth-token", token)
    //jwt.verify(token, 'secret-key')
    return token;
}
module.exports = generateXAuthToken;