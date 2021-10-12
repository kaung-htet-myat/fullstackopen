const { TestWatcher } = require('@jest/core')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')

const app = require('../app')
const { deleteMany } = require('../models/user')
const api = supertest(app)
const User = require('../models/user')

describe('when there is 1 user in the database', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('pa$$word', 10)
        const user = new User({
            username: 'kaung_htet',
            passwordHash: passwordHash
        })

        await user.save()
    })

    test('creating new user is successful', async () => {
        const initUsers = await User.find({})

        const newUser = {
            username: 'christopher',
            password: '01234'
        }

        const savedUser = await api
            .post('/api/users')
            .send(newUser)
            .expect(200)

        const updatedUsers = await User.find({})
        expect(updatedUsers.length).toBe(initUsers.length+1)
        expect(savedUser.body.username).toBe(newUser.username)
    })

    test('creating existing username must fail with a message', async () => {
        const initUsers = await User.find({})

        const newUser = {
            username: 'kaung_htet',
            password: '01234'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        expect(result.body.error).toContain("expected `username` to be unique.")
    })

    test('creating a user without a username must fail', async () => {
        const newUser = {
            password: '01234'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        expect(result.body.error).toContain("`username` is required.")
    })

    test('creating a user without a password must fail', async () => {
        const newUser = {
            username: "kaung_htet_01",
            name: "Kaung Htet"
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        expect(result.body.error).toBe('Password is required')
    })

    test('creating a user with username less than 3 characters must fail' , async () => {
        const newUser = {
            username: "ka",
            name: "Kaung Htet",
            password: "01234"
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        expect(result.body.error).toContain('minimum allowed length (3)')
    })

    test('creating a user with password less than 3 characters must fail', async () => {
        const newUser = {
            username: "kaung_htet_01",
            name: "Kaung Htet",
            password: "01"
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        expect(result.body.error).toBe('Password must be at least 3 characters long')
    })
})

afterAll(() => {
    mongoose.connection.close()
})