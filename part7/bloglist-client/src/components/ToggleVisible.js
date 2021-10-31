/* eslint-disable no-unused-vars */
import React, { useState, useImperativeHandle } from 'react'

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
    <div>
      <div style={hideWhenVisible}>
        <button onClick={(e) => toggleVisible()}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <div>
          <button onClick={(e) => toggleVisible()}>Cancel</button>
        </div>
      </div>
    </div>

  )
}

const ToggleVisible = React.forwardRef(toggleBody)

export default ToggleVisible