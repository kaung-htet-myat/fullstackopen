const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/logins')
const configs = require('./utils/config')
const loggers = require('./utils/loggers')
const middlewares = require('./utils/middlewares')

const app = express()
app.use(cors())
app.use(express.json())
app.use(middlewares.requestLogger)

const mongoUrl = configs.MONGO_URL

mongoose.connect(mongoUrl).then(result => {
    loggers.info("connected to the database")
}).catch(error => {
    loggers.info('Cannot connect to the database', error)
})

app.use('/api/blogs', middlewares.userExtractor, blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
if (process.env.NODE_ENV === 'test') {
    const cypressRouter = require('./controllers/cypress')
    app.use('/api/testing', cypressRouter)
  }
  
app.use(middlewares.errorHandler)

module.exports = app