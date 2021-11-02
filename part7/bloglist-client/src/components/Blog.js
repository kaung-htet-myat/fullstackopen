/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import styled from 'styled-components'

const StyledBlog = styled.div`
  padding-top: 10;
  padding-left: 2;
  margin-bottom: 5;
`

const StyledToggle = styled.div`
  display: ${props => props.blogVisible ? '' : 'none'};
`

const StyledViewBtn = styled.span`
  padding: 0;
  float:right;
  margin-right:5px;
`

const StyledRemoveBtn = styled.span`
  margin-right:4px;
`

const Blog = ({ blog, likeHandler, removeBlogHandler }) => {

  const [blogVisible, setBlogVisible] = useState(false)

  const toggleVisible = () => {
    setBlogVisible(!blogVisible)
  }

  return (
    <StyledBlog className='blog'>
      <div><Link to={`/${blog.id}`}>{blog.title}</Link> <StyledViewBtn><Button className='viewBtn' variant='info' onClick={(e) => toggleVisible()}>view</Button></StyledViewBtn></div>
      <StyledToggle className="toggleContent" blogVisible={blogVisible}>
        <div className='author'>{blog.author}</div>
        <div className='url'>{blog.url}</div>
        <div className='likes'>{blog.likes} </div>
        <div>
          <StyledRemoveBtn><Button className='removeBtn' variant='warning' onClick={removeBlogHandler}>remove</Button></StyledRemoveBtn>
          <Button varinat='primary' className='like-button' onClick={likeHandler}>like</Button>
        </div>
      </StyledToggle>
    </StyledBlog >
  )
}

export default Blog