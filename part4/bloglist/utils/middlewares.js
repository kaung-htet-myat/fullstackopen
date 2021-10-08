const loggers = require('../utils/loggers')

const requestLogger = (request, response, next) => {
    loggers.info('Method:', request.method)
    loggers.info('Path:  ', request.path)
    loggers.info('Body:  ', request.body)
    loggers.info('---')
    next()
}

const errorHandler = (error, request, response, next) => {
    if (error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message })
    }
    next(error)
}

module.exports = {
    requestLogger,
    errorHandler
}