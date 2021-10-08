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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}