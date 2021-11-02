import React from 'react'
import { Form, Button } from 'react-bootstrap'
import styled from 'styled-components'

const StyledContainer = styled.div`
  margin-top:70px;
  margin-left:14px;
`

const StyledBlogTitle = styled.div`
  font-size:40px;
`

const StyledUser = styled.p`
  font-size:20px;
  margin-top:12px;
`

const StyledUrl = styled.p`
  margin-top:12px;
  font-size:20px;
`

const LikeBtn = styled.span`
  margin-left:12px;
`

const CommentTitle = styled.p`
  margin-top:40px;
  font-size:30px;
  color:darkgray;
`

const CommentBtn = styled.div`
  margin-top:10px;
  margin-bottom:20px;
`

const IndiUserView = ({ blog, likeHandler, comment, onCommentChangeHandler, onCommentSubmitHandler }) => {

  return (
    <StyledContainer>
      <StyledBlogTitle>{blog.title}</StyledBlogTitle>
      {blog.user ? <StyledUser>by {blog.user.username}</StyledUser> : <StyledUser>by anonymous</StyledUser>}
      <p>{blog.likes} <LikeBtn><Button variant='primary' onClick={likeHandler}>like</Button></LikeBtn></p>
      <StyledUrl>{blog.url}</StyledUrl>
      <CommentTitle>Comments</CommentTitle>
      <Form>
        <Form.Group>
          <Form.Control type='text' name='comment' value={comment} onChange={onCommentChangeHandler} />
          <CommentBtn><Button variant='primary' onClick={onCommentSubmitHandler}>comment</Button></CommentBtn>
        </Form.Group>
      </Form>

      {blog.comments ?
        <ul>
          {blog.comments.map(comment => <li key={blog.id}>{comment}</li>)}
        </ul> :
        null
      }
    </StyledContainer>
  )
}

export default IndiUserView