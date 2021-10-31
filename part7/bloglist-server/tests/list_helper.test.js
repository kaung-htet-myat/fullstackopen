const listHelper = require('../utils/list_helper')

test('dummy', () => {
    const blogs = []
    expect(listHelper.dummy(blogs)).toBe(1)
})

describe('when there is 1 blog in the database', () => {
    const blog = {
        "id": "615dd021e59a96c40dc81a75",
        "title": "Hello World Blog",
        "author": "Kaung Htet",
        "url": "http://helloworld.blog",
        "likes": 10
    }

    test('of empty list is zero', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })
    test('of list with one blog is likes of that blog', () => {
        expect(listHelper.totalLikes([blog])).toBe(blog.likes)
    })
})

describe('more than 1 blog from a single author', () => {
    const blogs = [
        {
            "id": "615dd021e59a96c40dc81a75",
            "title": "Hello World Blog",
            "author": "Kaung Htet",
            "url": "http://helloworld.blog",
            "likes": 10,
        },
        {
            "id": "615dd021e59453535dc81a75",
            "title": "F1 Blog",
            "author": "Kaung Htet",
            "url": "http://racingnews.blog",
            "likes": 15,
        },
        {
            "id": "12535d021e59453535dc81a75",
            "title": "Fitness Blog",
            "author": "Kaung Htet",
            "url": "http://fitness.blog",
            "likes": 15,
        },
    ]

    test('of list with more than one blog is total likes of all blogs', () => {
        const totalLikes = blogs.reduce((sum, blog) => sum + blog.likes, 0)
        expect(listHelper.totalLikes(blogs)).toBe(totalLikes)
    })

})

describe('more than 1 blog from 2 authors', () => {
    const blogs = [
        {
            "id": "615dd021e59a96c40dc81a75",
            "title": "Hello World Blog",
            "author": "Christopher",
            "url": "http://helloworld.blog",
            "likes": 20,
        },
        {
            "id": "615dd021e59453535dc81a75",
            "title": "F1 Blog",
            "author": "Christopher",
            "url": "http://racingnews.blog",
            "likes": 15,
        },
        {
            "id": "12535d021e59453535dc81a75",
            "title": "Fitness Blog",
            "author": "Kaung Htet",
            "url": "http://fitness.blog",
            "likes": 40,
        },
    ]

    test('favorite blog is with 20 likes', () => {
        expect(listHelper.favoriteBlog(blogs)).toEqual({
            "id": "12535d021e59453535dc81a75",
            "title": "Fitness Blog",
            "author": "Kaung Htet",
            "url": "http://fitness.blog",
            "likes": 40,
        })
    })

    test('most blogs', () => {
        expect(listHelper.mostBlogs(blogs)).toEqual({
            author: "Christopher",
            blogs: 2
        })
    })

    test('most likes', () => {
        expect(listHelper.mostLikes(blogs)).toEqual({
            author: "Kaung Htet",
            likes: 40
        })
    })
})