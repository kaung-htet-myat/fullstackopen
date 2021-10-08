const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({})
        return response.json(blogs)
    }
    catch (error) {
        next(error)
    }
})

blogRouter.post('/', async (request, response, next) => {
    let blog = new Blog(request.body)

    if (!request.body.likes) {
        blog = new Blog({ ...request.body, likes: 0 })
    }

    try {
        const result = await blog.save()
        return response.status(201).json(result)
    }
    catch (error) {
        next(error)
    }

})

module.exports = blogRouter