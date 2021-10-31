/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog, likeHandler, removeBlogHandler }) => {
  const [blogVisible, setBlogVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
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
      <div><Link to={`/${blog.id}`}>{blog.title}</Link> <button className='view-button' onClick={(e) => toggleVisible()}>view</button></div>
      <div className="toggleContent" style={visibleStyle}>
        <div className='author'>{blog.author}</div>
        <div className='url'>{blog.url}</div>
        <div className='likes'>{blog.likes} </div>
        <div>
          <button className='remove-button' onClick={removeBlogHandler}>remove</button>
          <button className='like-button' onClick={likeHandler}>like</button>
        </div>
      </div>
    </div >
  )
}

export default Blog