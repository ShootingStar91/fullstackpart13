const router = require('express').Router()
const { Blog, User } = require('../models')
const { blogFinder, userExtractor } = require('../util/middleware')

router.get('/api/blogs', blogFinder, async (req, res) => {
    const blogs = await Blog.findAll({
        attributes: { exclude: ['userId']},
        include: {
            model: User,
            attributes: ['name']
        }
    })
    res.json(blogs)
})

router.delete('/api/blogs/:id', [blogFinder, userExtractor], async (req, res) => {    
    if (req.user.id === req.blog.userId) {
        await req.blog.destroy()
    } else {
        throw new Error("Only creator of blog can delete it")
    }
    res.json(req.blog)
})

router.post('/api/blogs', [blogFinder, userExtractor], async (req, res) => {
    const newBlog = await Blog.create({ title: req.body.title, author: req.body.author, url: req.body.url, userId: req.user.id })
    res.json(newBlog)
})

router.put('/api/blogs/:id', blogFinder, async (req, res) => {
    req.blog.likes = req.body.likes
    await req.blog.save();
    res.status(200).send();
})

module.exports = router;