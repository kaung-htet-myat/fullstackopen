/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react'
import ToggleVisible from './ToggleVisible'

const Blog = ({ blog, likeHandler, removeBlogHandler }) => {

  const blogRef = useRef()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>{blog.title} <button onClick={(e) => blogRef.current.toggleVisible()}>view</button></div>
      <ToggleVisible ref={blogRef}>
        {blog.author}<br/>
        {blog.url}<br/>
        {blog.likes} <button onClick={likeHandler}>like</button>
        <button onClick={removeBlogHandler}>remove</button>
      </ToggleVisible>
    </div >
  )
}

export default Blog