import React, { useState, useImperativeHandle } from 'react'

const toggleBody = (props, ref) => {
  const [blogVisible, setBlogVisible] = useState(false)
  const visibleStyle = { display: blogVisible ? '' : 'none' }

  const toggleVisible = () => {
    setBlogVisible(!blogVisible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisible
    }
  })

  return (
    <div style={visibleStyle}>
      {props.children}
    </div>
  )
}

const ToggleVisible = React.forwardRef(toggleBody)

export default ToggleVisible