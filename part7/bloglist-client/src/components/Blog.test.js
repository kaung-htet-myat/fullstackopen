import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

import Blog from './Blog'
import NewBlog from './NewBlog'

describe('Blog Tests', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Christopher',
    url: 'testtoday.blog',
    likes: 10
  }

  let blogComponent
  let likeHandler

  beforeEach(() => {
    likeHandler = jest.fn()

    blogComponent = render(
      <Router>
        <Blog blog={blog} likeHandler={likeHandler} />
      </Router>
    )
  })

  test('render blogs', () => {
    const toggleDiv = blogComponent.container.querySelector('.toggleContent')
    expect(blogComponent.container).toHaveTextContent(
      'Test Blog'
    )
    expect(toggleDiv).toHaveStyle('display: none')
  })

  test('render url and likes after clicking view', () => {
    const toggleDiv = blogComponent.container.querySelector('.toggleContent')

    const toggleButton = blogComponent.getByText('view')
    fireEvent.click(toggleButton)
    expect(toggleDiv).not.toHaveStyle('display: none')
  })

  test('click like twice, call like twice', () => {

    const likeButton = blogComponent.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(likeHandler.mock.calls).toHaveLength(2)
  })
})

describe('form tests', () => {
  let newBlogComponent
  let createBlog

  beforeEach(() => {
    createBlog = jest.fn()

    newBlogComponent = render(
      <Router>
        <NewBlog createBlog={createBlog} />
      </Router>
    )
  })

  test('form submit test', () => {

    const titleInput = newBlogComponent.container.querySelector('.newblog-title')
    const authorInput = newBlogComponent.container.querySelector('.newblog-author')
    const urlInput = newBlogComponent.container.querySelector('.newblog-url')
    const form = newBlogComponent.container.querySelector('.newblog')

    fireEvent.change(titleInput, {
      target: {
        value: 'testing of author id form'
      }
    })

    fireEvent.change(authorInput, {
      target: {
        value: 'Christopher'
      }
    })

    fireEvent.change(urlInput, {
      target: {
        value: 'testing.blog'
      }
    })

    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog).toHaveBeenCalled()
    console.log(createBlog.mock.calls[0][0])
    expect(createBlog.mock.calls[0][0].title).toBe('testing of author id form')
    expect(createBlog.mock.calls[0][0].author).toBe('Christopher')
    expect(createBlog.mock.calls[0][0].url).toBe('testing.blog')
  })
})


