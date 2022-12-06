const { User, Blog } = require('../models')
const router = require('express').Router()

router.get('/api/users', async (req, res) => {
    const users = await User.findAll({ include: { model: Blog } })

    res.json(users)
})

router.post('/api/users', async (req, res) => {
    const newUser = await User.create({
        username: req.body.username,
        name: req.body.name
    })
    res.json(newUser)
})


router.put('/api/users/:username', async (req, res) => {
    const user = await User.findOne({ username: req.params.username });
    if (user) {
        user.name = req.body.name
    }
    await user.save();
    res.status(200).send();
})

module.exports = router;
