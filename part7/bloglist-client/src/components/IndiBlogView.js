import React from 'react'
import { Button } from 'react-bootstrap'

const IndiUserView = ({ blog, likeHandler, comment, onCommentChangeHandler, onCommentSubmitHandler }) => {

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.url}</p>
      <p>{blog.likes} <Button variant='primary' onClick={likeHandler}>like</Button></p>
      {blog.user ? <p>added by {blog.user.username}</p> : <p>added by anonymous</p>}
      <h3>Comments</h3>
      <input name='comment' value={comment}  onChange={onCommentChangeHandler}/>
      <Button variant='primary' onClick={onCommentSubmitHandler}>comment</Button>
      {blog.comments ?
        <ul>
          {blog.comments.map(comment => <li key={blog.id}>{comment}</li>)}
        </ul> :
        null
      }
    </div>
  )
}

export default IndiUserView