const loggers = require('../utils/loggers')

const requestLogger = (request, response, next) => {
    loggers.info('Method:', request.method)
    loggers.info('Path:  ', request.path)
    loggers.info('Body:  ', request.body)
    loggers.info('---')
    next()
}