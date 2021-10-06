const http = require('http')
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')

const configs = require('./utils/config')
const loggers = require('./utils/loggers')
const blogRouter = require('./controllers/blogs')

const mongoUrl = configs.MONGO_URL

mongoose.connect(mongoUrl).then(result => {
    loggers.info("connected to the database")
}).catch(error => {
    loggers.info('Cannot connect to the database', error)
})

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)

const PORT = configs.PORT
app.listen(PORT, () => {
  loggers.info(`Server running on port ${PORT}`)
})