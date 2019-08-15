const express = require('express')
const router = express.Router();

const UserRoute = require('./user/user');
const TaskRoute = require('./task/task');
const LocalFileUploadRoute = require('./fileupload/fileupload');

router.use(UserRoute)
router.use(TaskRoute)
router.use(LocalFileUploadRoute)

module.exports = router;