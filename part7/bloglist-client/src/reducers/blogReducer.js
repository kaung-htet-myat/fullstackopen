import blogServices from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT-BLOGS':
    return action.data.blogs
  case 'CREATE-BLOGS':
    state = state.concat(action.data.blog)
    return state
  case 'UPDATE-BLOGS':
    state = state.map(s => s.id !== action.data.blog.id ? s : action.data.blog)
    return state
  case 'REMOVE-BLOGS':
    state = state.filter(s => s.id !== action.data.blog.id)
    return state
  default:
    return state
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogServices.getAll()
    dispatch({
      type: 'INIT-BLOGS',
      data: {
        blogs
      }
    })
  }
}

export const createBlog = (blogObject) => {
  return async dispatch => {
    const newBlog = await blogServices.create(blogObject)
    dispatch({
      type: 'CREATE-BLOGS',
      data: {
        blog: newBlog
      }
    })
  }
}

export const updateBlog = (blog) => {
  return async dispatch => {
    const updatedBlog = await blogServices.likeBlog(blog)
    dispatch({
      type: 'UPDATE-BLOGS',
      data: {
        blog: updatedBlog
      }
    })
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    const status = await blogServices.removeBlog(blog)
    if (status === 204) {
      dispatch({
        type: 'REMOVE-BLOGS',
        data: {
          blog
        }
      })
    }
  }
}

export default reducer