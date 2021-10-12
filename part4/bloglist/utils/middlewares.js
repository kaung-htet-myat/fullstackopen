const loggers = require('../utils/loggers')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
    loggers.info('Method:', request.method)
    loggers.info('Path:  ', request.path)
    loggers.info('Body:  ', request.body)
    loggers.info('---')
    next()
}

const userExtractor = async (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        const token = authorization.substring(7)

        if (!token) {
            return response.status(401).send({
                error: "Missing token"
            })
        }

        try {
            decodedToken = jwt.verify(token, process.env.SIGNATURE)
            const user = await User.findById(decodedToken.id)
            request.user = user
        }
        catch (error) {
            next(error)
        }
    }
    next()
}

const errorHandler = (error, request, response, next) => {
    if (error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message })
    }
    else if (error.name === 'JsonWebTokenError') {
        return response.status(401).send({ error: "invalid token" })
    }
    next(error)
}

module.exports = {
    requestLogger,
    errorHandler,
    userExtractor
}