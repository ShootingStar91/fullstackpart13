require('dotenv').config()
const express = require('express')
require('express-async-errors')
const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const { errorHandler } = require('./util/middleware')
const app = express()

app.use(express.json())
app.use(blogRouter)
app.use(usersRouter)
app.use(loginRouter)
app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
