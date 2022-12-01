const router = require('express').Router()
const { Blog } = require('../models')
const { blogFinder } = require('../util/middleware')

router.get('/api/blogs', blogFinder, async (req, res) => {
    const blogs = await Blog.findAll()
    res.json(blogs)
})

router.delete('/api/blogs/:id', blogFinder, async (req, res) => {
    await req.blog.destroy()
    res.json(req.blog)
})

router.post('/api/blogs', blogFinder, async (req, res) => {
    const newBlog = await Blog.create({ title: req.body.title, author: req.body.author, url: req.body.url })
    res.json(newBlog)
})

router.put('/api/blogs/:id', blogFinder, async (req, res) => {
    req.blog.likes = req.body.likes
    await req.blog.save();
    res.status(200).send();
})

module.exports = router;