import React from 'react'
import { Table } from 'react-bootstrap'

import Blog from './Blog'

const Blogs = (props) => {
  return (
    <Table striped>
      {props.blogs.map(blog =>
        <tr key={blog.id}>
          <td>
            <Blog
              // key={blog.id}
              blog={blog}
              likeHandler={(e) => props.likeHandler(e, blog)}
              removeBlogHandler={(e) => props.removeBlogHandler(e, blog)}
            />
          </td>
        </tr>
      )}
    </Table>
  )
}

export default Blogs