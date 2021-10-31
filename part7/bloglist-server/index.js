const http = require('http')

const configs = require('./utils/config')
const loggers = require('./utils/loggers')
const app = require('./app')

const server = http.createServer(app)

const PORT = configs.PORT
server.listen(PORT, () => {
  loggers.info(`Server running on port ${PORT}`)
})