const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

blogs = [
    {
        title: "Hello World Blog",
        author: "Kaung Htet",
        url: "http://helloworld.blog",
        likes: 0
    },
    {
        title: "Formula 1 sets out to Turkey this week",
        author: "Kaung Htet",
        url: "http://racingnews.blog",
        likes: 0
    },
    {
        title: "Machines can learn!",
        author: "Kaung Htet",
        url: "http://aitoday.blog",
        likes: 0
    }
]

test('get request returns status 200', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('id is to be defined', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('there are three blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(blogs.length)
})

test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)
    expect(titles).toContain(
        'Formula 1 sets out to Turkey this week'
    )
})

test('valid post request', async () => {
    const newBlog = {
        title: "JS is cool",
        author: "Kaung Htet",
        url: "http://technews.blog",
        likes: 1
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(blogs.length + 1)

    const titles = response.body.map(r => r.title)
    expect(titles).toContainEqual(
        'JS is cool'
    )
})

test('likes set to zero when likes is not sent', async () => {
    const newBlog = {
        title: "No Likes",
        author: "Kaung Htet",
        url: "http://nolikes.blog"
    }

    const response = await api
        .post('/api/blogs')
        .send(newBlog)

    console.log(response.body)
    expect(response.body.likes).toBe(0)
})

test('invalid post request', async () => {
    const newBlog = {
        author: "Kaung Htet",
        url: "http://technews.blog",
        likes: 1,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(blogs.length)
})

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = blogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

afterAll(() => {
    mongoose.connection.close()
})