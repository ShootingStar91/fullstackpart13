require('dotenv').config()
const express = require('express')
require('express-async-errors')
const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const authorsRouter = require('./controllers/authors')
const readinglistsRouter = require('./controllers/readinglists')
const { errorHandler } = require('./util/middleware')
const { connectToDatabase } = require('./util/db')
const app = express()

app.use(express.json())
app.use(blogRouter)
app.use(usersRouter)
app.use(loginRouter)
app.use(authorsRouter)
app.use(readinglistsRouter)
app.use(errorHandler)

const PORT = process.env.PORT || 3001

const start = async () => {
    await connectToDatabase()

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
    
}

start()
