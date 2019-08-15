const jwt = require('jsonwebtoken')
const { User } = require('../../model/models')

validateXAuthToken = async (req, res, next) => {
    // Validating x-auth-token 
    try {
        var token = req.header('x-auth-token');
        var decoded = jwt.verify(token, 'secret-key');
        const user = await User.findById(decoded._id)
        if (!user) {
            throw new Error('Invalid authentication token');
        }
        req.user = user;
        next()
    } catch (err) {
        res.status(500).send('Invalid authentication token')
    }
}

module.exports = validateXAuthToken;