const bcrypt = require('bcrypt')

const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response, next) => {
    try{
        const users = await User.find({}).populate('blogs', {title: 1, author: 1})
        return response.json(users)
    }
    catch (error) {
        next(error)
    }
})

userRouter.post('/', async (request, response, next) => {
    const body = request.body

    if (!body.password) {
        return response.status(400).json({error: 'Password is required'})
    }

    if (body.password.length < 4) {
        return response.status(400).json({error: 'Password must be at least 3 characters long'})
    }

    try{
        const passwordHash = await bcrypt.hash(body.password, 10)
        const newUser = new User({
            username: body.username,
            name: body.name,
            passwordHash: passwordHash
        })
    
        const savedUser = await newUser.save()
        return response.json(savedUser)
    }
    catch (error) {
        next(error)
    }
})

module.exports = userRouter