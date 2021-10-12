const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')

const app = require('../app')
const loginRouter = require('../controllers/logins')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const login = async () => {
    const loginUser = {
        username: 'kaung-htet',
        password: 'pa$$word'
    }

    const user = await User.findOne({ username: loginUser.username })

    const result = await api
        .post('/api/login')
        .send(loginUser)
        .expect(200)

    return { user, result }
}

describe('When there is 1 blog in the database', () => {

    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('pa$$word', 10)
        const newUser = new User({
            username: 'kaung-htet',
            name: 'Kaung Htet',
            passwordHash
        })

        await newUser.save()

        const testUser = await User.findOne({ username: newUser.username })

        await Blog.deleteMany({})

        const newBlog = new Blog({
            title: "Hello World Blog",
            author: "Kaung Htet",
            url: "http://helloworld.blog",
            likes: 0,
            user: testUser._id
        })

        await newBlog.save()
    }, 10000)

    test('id is to be defined', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })

    test('valid post request', async () => {

        const { user, result } = await login()

        const newBlog = {
            title: "JS is cool",
            author: "Kaung Htet",
            url: "http://technews.blog",
            likes: 1
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${result.body.token}`)
            .send(newBlog)
            .expect(201)

        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(2)

        const titles = response.body.map(r => r.title)
        expect(titles).toContainEqual(
            'JS is cool'
        )
        const userIds = response.body.map(r => r.user._id.toString())
        expect(userIds).toContainEqual(
            user._id.toString()
        )
    })

    test('likes set to zero when likes is not sent', async () => {

        const { user, result } = await login()

        const newBlog = {
            title: "No Likes",
            author: "Kaung Htet",
            url: "http://nolikes.blog"
        }

        const response = await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${result.body.token}`)
            .send(newBlog)
            .expect(201)

        // console.log(response.body)
        expect(response.body.likes).toBe(0)
    })

    test('invalid post request', async () => {

        const { user, result } = await login()

        const newBlog = {
            author: "Kaung Htet",
            url: "http://technews.blog",
            likes: 1
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${result.body.token}`)
            .send(newBlog)
            .expect(400)

        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(1)
    })

    test('invalid token', async () => {
        const { user, result } = await login()

        const newBlog = {
            title: "JS is cool",
            author: "Kaung Htet",
            url: "http://technews.blog",
            likes: 1
        }

        const token = result.body.token.substring(7)

        const response = await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(401)

        const newBlogs = await api.get('/api/blogs')
        expect(newBlogs.body).toHaveLength(1)

        expect(response.body.error).toContain('invalid token')
    })

    test('missing token', async () => {

        const newBlog = {
            title: "JS is cool",
            author: "Kaung Htet",
            url: "http://technews.blog",
            likes: 1
        }

        const response = await api
            .post('/api/blogs')
            .set('Authorization', `bearer`)
            .send(newBlog)
            .expect(401)

        expect(response.body.error).toContain('Missing token')
    })
})

describe('When there are 3 blogs in the database', () => {
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

    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('pa$$word', 10)
        const newUser = new User({
            username: 'kaung-htet',
            name: 'Kaung Htet',
            passwordHash
        })

        await newUser.save()

        const testUser = await User.findOne({ username: newUser.username })

        await Blog.deleteMany({})

        const blogObjects = blogs.map(blog => new Blog({ ...blog, user: testUser._id }))
        const promiseArray = blogObjects.map(blog => blog.save())
        await Promise.all(promiseArray)
    }, 10000)

    test('get request returns status 200', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
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

    test('can delete one object', async () => {

        const { user, result } = await login()

        let response = await api.get('/api/blogs')
        const blogToDelete = response.body[0]
        const id = blogToDelete.id

        await api
            .delete(`/api/blogs/${id}`)
            .set('Authorization', `bearer ${result.body.token}`)
            .expect(204)

        response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(blogs.length - 1)

        const titles = response.body.map(r => r.title)
        expect(titles).not.toContainEqual(
            blogToDelete.title
        )
    })

    test('can update one object', async () => {
        let response = await api.get('/api/blogs')
        const blogToUpdate = response.body[0]
        const id = blogToUpdate.id

        const blog = {
            title: "New Title",
            author: "New Author",
            url: "http://newurl.blog",
            likes: 0
        }

        const result = await api
            .put(`/api/blogs/${id}`)
            .send(blog)

        expect(result.body.title).toEqual(blog.title)
    })

})

afterAll(() => {
    mongoose.connection.close()
})