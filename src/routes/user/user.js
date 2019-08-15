const express = require('express')
const { User } = require('../../model/models')
const bcrypt = require('bcrypt')
const router = express.Router();


router.get('/users', (req, res) => {
    User.find({}).then((data) => {
        res.send(data)
    }).catch((err) => {
        res.status(400).send(error)
    })
})

router.get('/users/:id', (req, res) => {
    var _id = req.params.id;
    User.findById(_id).then((data) => {
        if (data) {
            res.status(400).send("User not found");
            return;
        }
        res.send(data)
    }).catch((err) => {
        res.status(400).send(error)
    })
})
router.patch('/users/:id', async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every(update => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Update Key Values' })
    }

    try {
        var _id = req.params.id;
        var updateData = req.body;
        if (updateData.password) {
            //Encrypt password if password exists
            updateData.password = await bcrypt.hash(updateData.password, 8);
        }

        var updatedUser = await User.findByIdAndUpdate(_id, updateData, { new: true, runValidators: true })
        if (!updatedUser) {
            return res.send(404).send("User not found with sepecified Id")
        }
        res.send(updatedUser)
    } catch (err) {
        res.send(500).send(err)
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        var _id = req.params.id;
        var deletedUser = await User.delete(_id);
        if (deletedUser) {
            return res.status(400).send("User not found");
        }
        res.send(deletedUser)
    } catch (err) {
        res.status(500).send(err);
    }
})



const multer = require('multer')
const multerProps = multer({
    limits: {
        fileSize: 10000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload file of image type - jpg, jpeg, png '))
        }
        cb.apply(undefined, true);
    }
})

router.post('/users/me/displaypic', multerProps.single('imageupload'), async (req, res) => {
    try {
        req.user.avatar = req.file.buffer;
        req.user.save();
        res.send()
    }
    catch (err) {
        res.status(400).send(err)
    }
})

router.get('/users/me/displaypic', async (req, res) => {
    try {
        const user = req.user.avatar = undefined;
        if (!user || !user.avatar) {
            throw new Error("No Avatar Available")
        }
        res.set('Content-Type', 'image/jpg')
        res.send(user.avatar)
    }
    catch (err) {
        res.status(400).send(err)
    }
})

router.delete('/users/me/displaypic', async (req, res) => {
    try {
        req.user.avatar = undefined;
        req.user.save();
        res.send()
    }
    catch (err) {
        res.status(400).send(err)
    }
})


module.exports = router