/* eslint-disable no-unused-vars */
import React, { useState, useImperativeHandle } from 'react'
import { Button } from 'react-bootstrap'

import styles from './ToggleVisible.module.css'

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
    <div className={styles.wholediv}>
      <div style={hideWhenVisible}>
        <Button variant='secondary' onClick={(e) => toggleVisible()}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <div>
          <Button className={styles.cancelbutton} variant='secondary' onClick={(e) => toggleVisible()}>Cancel</Button>
        </div>
      </div>
    </div>

  )
}

const ToggleVisible = React.forwardRef(toggleBody)

export default ToggleVisible