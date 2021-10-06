const listHelper = require('../utils/list_helper')

test('dummy', () => {
    const blogs = []
    expect(listHelper.dummy(blogs)).toBe(1)
})

describe('total likes', () => {
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
    test('of empty list is zero', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })
    test('of list with one blog is likes of that blog', () => {
        expect(listHelper.totalLikes([blogs[0]])).toBe(10)
    })
    test('of list with more than one blog is total likes of all blogs', () => {
        expect(listHelper.totalLikes(blogs)).toBe(40)
    })

})