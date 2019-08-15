const express = require('express')

const { Task } = require('../../model/models')
const router = express.Router();

router.post('/tasks', (req, res) => {
    const newTask = new Task({ ...req.body, owner: req.user._id })
    console.log('newTask', newTask)
    newTask.save().then((response) => {
        res.send(newTask)
    }).catch((err) => {
        res.status(400).send(error)
    })
})

//GET /tasks?completed=true - filtering
//GET /tasks?limit=10&skip=20 - pagination
//GET /tasks?sortBy=createdAt:desc - sorting a key by value
router.get('/tasks', async (req, res) => {
    //Returning all tasks of a user

    const matchFilter = {}
    const sort = {}

    if (req.query.completed) {
        matchFilter.completed = (req.query.completed === 'true')
    }

    if (req.query.sortBy) {
        const sortpair = req.query.sortBy.split(':');
        sort[sortpair[0]] = (sortpair[1] === 'desc' ? -1 : 1);
    }

    try {
        const tasks = await Task.find({ owner: req.user._id, ...matchFilter })
            .setOptions({ limit: parseInt(req.query.limit), skip: parseInt(req.query.skip), sort })
        // Another approach with foriegn key
        // await req.user.populate('tasks').execPopulate();
        // const tasks = req.user.tasks;
        if (!tasks) {
            return res.status(400).send("No tasks of user")
        }
        res.send(tasks)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/tasks/:id', async (req, res) => {
    try {
        var taskId = req.params.id;
        var task = await Task.findOne({ _id: taskId, owner: req.user._id })
        if (!task) {
            return res.send("No task found with specified Id of the User");
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/tasks/:id', async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every(update => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Update Key Values' })
    }

    try {
        var _id = req.params.id;
        var updateData = req.body;
        var updatedTask = await Task.findByIdAndUpdate(_id, updateData, { new: true, runValidators: true })
        if (!updatedTask) {
            return res.send(404).send("User not found with sepecified Id")
        }
        res.send(updatedTask)
    } catch (err) {
        res.send(500).send(err)
    }
})

router.delete('/tasks/:id', async (req, res) => {
    try {
        var taskId = req.params.id;
        var deletedTask = await Task.findOneAndDelete({ _id: taskId, owner: req.user._id });
        if (deletedTask) {
            return res.status(400).send("Task not found");
        }
        res.send(deletedTask)
    } catch (err) {
        res.status(500).send(err);
    }
})

module.exports = router;