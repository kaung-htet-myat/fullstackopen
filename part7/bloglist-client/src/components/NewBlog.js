/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react'
import { Form, Button } from 'react-bootstrap'

import ToggleVisible from './ToggleVisible'
import styles from './NewBlog.module.css'

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
      <Form className='newblog' onSubmit={(e) => createBlogHandler(e)}>
        <Form.Group>
          <Form.Label>
            title:
          </Form.Label>
          <Form.Control className='newblog-title' type='input' name='title' value={title} onChange={titleChangeHandler} />
          <Form.Label>
            author:
          </Form.Label>
          <Form.Control className='newblog-author' type='input' name='author' value={author} onChange={authorChangeHandler} />
          <Form.Label>
            url:
          </Form.Label>
          <Form.Control className='newblog-url' type='input' name='url' value={url} onChange={urlChangeHandler} />
          <Button className={styles.submitbutton} variant="primary" id='submit-button' type='submit'>Submit</Button>
        </Form.Group>
      </Form>
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