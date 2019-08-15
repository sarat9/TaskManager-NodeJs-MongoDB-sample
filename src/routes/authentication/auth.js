
const express = require('express')
const router = express.Router();
const { User } = require('../../model/models')
const generateXAuthToken = require('../../security/auth-token')

router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        //setting x-auth-token in response headers
        res.setHeader('x-auth-token', generateXAuthToken(user._id))
        res.send(user)
    }
    catch (err) {
        res.status(400).send(err)
    }
})

router.post('/signup', (req, res) => {
    const newUser = new User(req.body);
    newUser.save().then((response) => {
        res.send(newUser)
    }).catch((error) => {
        res.status(400).send(error)
    })
})


module.exports = router