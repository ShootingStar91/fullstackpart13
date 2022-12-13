const { ReadingList } = require('../models')
const router = require('express').Router()

router.post('/api/readinglists', async (req, res) => {
    const readinglistAddition = await ReadingList.create({
        blogId: req.body.blog_id,
        userId: req.body.user_id
    })
    res.json(readinglistAddition)
})


module.exports = router;
