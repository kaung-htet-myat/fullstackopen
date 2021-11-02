/* eslint-disable no-unused-vars */
import React, { useState, useImperativeHandle } from 'react'
import { Button } from 'react-bootstrap'
import styled from 'styled-components'

const StyledBody = styled.div`
  margin: 20px 0px;
`

const StyledCancBtn = styled.div`
  margin: 10px 0px;
`

const toggleBody = (props, ref) => {

  const [createBlogVisible, setCreateBlogVisible] = useState(false)

  const hideWhenVisible = { display: createBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: createBlogVisible ? '' : 'none' }

  const toggleVisible = () => {
    setCreateBlogVisible(!createBlogVisible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisible
    }
  })

  return (
    <StyledBody>
      <div style={hideWhenVisible}>
        <Button variant='secondary' onClick={(e) => toggleVisible()}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <StyledCancBtn>
          <Button className='newBlogCancelBtn' variant='secondary' onClick={(e) => toggleVisible()}>Cancel</Button>
        </StyledCancBtn>
      </div>
    </StyledBody>
  )
}

const ToggleVisible = React.forwardRef(toggleBody)

export default ToggleVisible