const { Blog, User } = require('../models')
const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')

const tokenExtractor = (req, res) => {
    const authorization = req.get('authorization')
    
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        try {
            console.log(authorization.substring(7))
            req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
        } catch (error) {
            console.log(error)
            return res.status(401).json({ error: 'Invalid token' })
        }
    } else {
        return res.status(401).json({ error: 'Token missing' })
    }
    
}

const userExtractor = async (req, res, next) => {
    console.log("user extractor")
    tokenExtractor(req, res)
    req.user = await User.findByPk(req.decodedToken.id)
    console.log({user: req.user})
    next()
}

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id);
    console.log({blog: req.blog})
    next();
}

const errorHandler = async (err, req, res, next) => {
    res.status(400).send({ message: err.message })
}

module.exports = { blogFinder, errorHandler, userExtractor }