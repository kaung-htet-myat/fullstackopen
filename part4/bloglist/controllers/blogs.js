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

blogRouter.delete('/:id', async (request, response, next) => {
    const id = request.params.id

    try{
        await Blog.findByIdAndRemove(id)
        return response.status(204).end()
    }
    catch (error) {
        next(error)
    }
})

blogRouter.put('/:id', async (request, response, next) => {
    const id = request.params.id
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    try{
        const result = await Blog.findByIdAndUpdate(id, blog, {new: true})
        return response.json(result)
    }
    catch (error) {
        next(error)
    }

})

module.exports = blogRouter