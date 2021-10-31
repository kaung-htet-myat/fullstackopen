const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
        return response.json(blogs)
    }
    catch (error) {
        next(error)
    }
})

blogRouter.post('/', async (request, response, next) => {

    try {
        const user = request.user

        const tempBlog = {
            ...request.body,
            user: user._id
        }

        let blog = new Blog(tempBlog)

        if (!request.body.likes) {
            blog = new Blog({ ...tempBlog, likes: 0 })
        }

        const savedNote = await blog.save()
        user.blogs = user.blogs.concat(savedNote._id)
        await User.findByIdAndUpdate(user._id, user, {new: true})
        return response.status(201).json(savedNote)
    }
    catch (error) {
        next(error)
    }
})

blogRouter.delete('/:id', async (request, response, next) => {
    const blogId = request.params.id

    const user = request.user
    const blog = await Blog.findById(blogId)

    if (user._id.toString() === blog.user.toString()) {
        try{
            await Blog.findByIdAndRemove(blogId)
            return response.status(204).end()
        }
        catch (error) {
            next(error)
        }
    }

    return response.status(401).send({
        error: "token mismatched"
    })
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