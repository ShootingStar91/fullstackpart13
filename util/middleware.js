const { Blog } = require('../models')

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id);
    console.log(req.blog)
    next();
}

const errorHandler = async (err, req, res, next) => {
    res.status(400).send({ message: err.message })
}

module.exports = { blogFinder, errorHandler }