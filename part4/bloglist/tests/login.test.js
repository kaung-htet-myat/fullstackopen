const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

describe('when there is 1 user in the database', () => {

    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('pa$$word', 10)
        const newUser = new User({
            username: 'kaung-htet',
            name: 'Kaung Htet',
            passwordHash
        })

        await newUser.save()
    })
    test('login successful', async () => {

        const loginUser = {
            username: 'kaung-htet',
            password: 'pa$$word'
        }

        const result = await api
            .post('/api/login')
            .send(loginUser)
            .expect(200)

        const testUser = await User.findOne({username: loginUser.username})

        const userForToken = {
            username: testUser.username,
            id: testUser._id
        }
    
        const token = jwt.sign(userForToken, process.env.SIGNATURE)
        expect(token).toBe(result.body.token)
    })

    test('invalid username', async () => {
        const loginUser = {
            username: 'kaung',
            password: 'pa$$word'
        }

        const result = await api
            .post('/api/login')
            .send(loginUser)
            .expect(401)

        expect(result.body.error).toContain('invalid username or password')
    })

    test('invalid password', async () => {
        const loginUser = {
            username: 'kaung-htet',
            password: 'pa$$'
        }

        const result = await api
            .post('/api/login')
            .send(loginUser)
            .expect(401)

        expect(result.body.error).toContain('invalid username or password')
    })
})

afterAll(() => {
    mongoose.connection.close()
})