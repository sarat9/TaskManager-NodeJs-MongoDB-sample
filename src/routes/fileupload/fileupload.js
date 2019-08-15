const express = require('express')
const router = express.Router();
const multer = require('multer')


const multerProps = multer({
    dest: 'src/assets/images',
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

router.post('/upload', multerProps.single('imageupload'), (req, res) => {
    // locally store to assets/images
    try {
        console.log('file upload api invoked')
        res.send("Image uploaded")
    } catch (error) {
        res.status(400).send('Image upload Failed')
    }

})


module.exports = router