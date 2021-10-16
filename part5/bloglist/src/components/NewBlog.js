/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

const NewBlog = (props) => {

  const [createBlogVisible, setCreateBlogVisible] = useState(false)

  const hideWhenVisible = { display: createBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: createBlogVisible ? '' : 'none' }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={(e) => setCreateBlogVisible(true)}>Create a blog</button>
      </div>
      <form onSubmit={props.createBlogHandler} style={showWhenVisible}>
        <h3>Create new blog</h3>
        title: <input type='input' name='title' value={props.title} onChange={props.titleChangeHandler} /><br />
        author: <input type='input' name='author' value={props.author} onChange={props.authorChangeHandler} /><br />
        url: <input type='input' name='url' value={props.url} onChange={props.urlChangeHandler} /><br />
        <button type='submit'>Submit</button>
      </form>
      <div style={showWhenVisible}>
        <button onClick={(e) => setCreateBlogVisible(false)}>Cancel</button>
      </div>
    </div>

  )
}

NewBlog.propTypes = {
  createBlogHandler: PropTypes.func.isRequired,
  showWhenVisible: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  titleChangeHandler: PropTypes.func.isRequired,
  authorChangeHandler: PropTypes.func.isRequired,
  urlChangeHandler: PropTypes.func.isRequired,
}

export default NewBlog