/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react'
import ToggleVisible from './ToggleVisible'
import PropTypes from 'prop-types'

const NewBlog = (props) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const titleChangeHandler = (event) => {
    setTitle(event.target.value)
  }

  const authorChangeHandler = (event) => {
    setAuthor(event.target.value)
  }

  const urlChangeHandler = (event) => {
    setUrl(event.target.value)
  }

  const createBlogHandler = (event) => {
    event.preventDefault()
    // console.log(event.target)
    props.createBlog({
      title,
      author,
      url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <ToggleVisible buttonLabel="Create a Blog" ref={props.refProp}>
      <h3>Create new blog</h3>
      <form className='newblog' onSubmit={(e) => createBlogHandler(e)}>
        title: <input className='newblog-title' type='input' name='title' value={title} onChange={titleChangeHandler} /><br />
        author: <input className='newblog-author' type='input' name='author' value={author} onChange={authorChangeHandler} /><br />
        url: <input className='newblog-url' type='input' name='url' value={url} onChange={urlChangeHandler} /><br />
        <button id='submit-button' type='submit'>Submit</button>
      </form>
    </ToggleVisible>
  )
}

// NewBlog.propTypes = {
//   createBlogHandler: PropTypes.func.isRequired,
//   title: PropTypes.string.isRequired,
//   author: PropTypes.string.isRequired,
//   url: PropTypes.string.isRequired,
//   titleChangeHandler: PropTypes.func.isRequired,
//   authorChangeHandler: PropTypes.func.isRequired,
//   urlChangeHandler: PropTypes.func.isRequired,
// }

export default NewBlog