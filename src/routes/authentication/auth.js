
const express = require('express')
const router = express.Router();
const { User } = require('../../model/models')
const generateXAuthToken = require('../../security/auth-token')

router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        //setting x-auth-token in response headers
        res.setHeader('x-auth-token', await generateXAuthToken(user._id))
        res.send(user)
    }
    catch (err) {
        res.status(400).send(err)
    }
})

router.post('/signup', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const saved = await newUser.save();
        res.send(saved)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/about', (req, res) => {
    res.send("Task Manager")
})



module.exports = router