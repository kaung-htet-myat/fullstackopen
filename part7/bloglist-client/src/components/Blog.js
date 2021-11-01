/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

import styles from './Blog.module.css'

const Blog = ({ blog, likeHandler, removeBlogHandler }) => {
  const [blogVisible, setBlogVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5
  }

  const visibleStyle = {
    display: blogVisible ? '' : 'none'
  }

  const toggleVisible = () => {
    setBlogVisible(!blogVisible)
  }

  return (
    <div className='blog' style={blogStyle}>
      <div><Link to={`/${blog.id}`}>{blog.title}</Link> <Button className={styles.viewbutton} variant='info' onClick={(e) => toggleVisible()}>view</Button></div>
      <div className="toggleContent" style={visibleStyle}>
        <div className='author'>{blog.author}</div>
        <div className='url'>{blog.url}</div>
        <div className='likes'>{blog.likes} </div>
        <div>
          <Button className={styles.removebutton} variant='warning' onClick={removeBlogHandler}>remove</Button>
          <Button varinat='primary' className='like-button' onClick={likeHandler}>like</Button>
        </div>
      </div>
    </div >
  )
}

export default Blog