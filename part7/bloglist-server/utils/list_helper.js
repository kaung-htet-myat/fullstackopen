const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let likes = 0
    if (blogs) {
        if (blogs.length === 1) {
            likes = blogs[0].likes
        } else {
            likes = blogs.reduce((sum, blog) => {
                return sum + blog.likes
            }, 0)
        }
    }
    return likes
}

const favoriteBlog = (blogs) => {
    const sortedBlogs = blogs.sort((a, b) => {
        if (b.likes > a.likes) {
            return 1
        } else {
            return -1
        }
    })

    return sortedBlogs[0]
}

const mostBlogs = (blogs) => {
    /*
        1. group blogs by author
        2. count blogs in each author group
    */
    const result = _.groupBy(blogs, (o) => o.author)
    blogsByAuthor = Object.keys(result)
        .map(key => {
            return {
                author: key.toString(),
                blogs: result[key].length
            }
        })
        .sort((a,b) => b.blogs>a.blogs ? 1 : -1)
    return blogsByAuthor[0]
}

const mostLikes = (blogs) => {
    /*
        1. group by author
        2. calculate total likes in each author group
    */
    const result = _.groupBy(blogs, (o) => o.author)
    blogsByAuthor = Object.keys(result)
        .map(key => {
            return {
                author: key.toString(),
                likes: result[key].reduce((sum, r) => sum + r.likes, 0)
            }
        })
        .sort((a,b) => b.likes>a.likes ? 1 : -1)

    return blogsByAuthor[0]
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}