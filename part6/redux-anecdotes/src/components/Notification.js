import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {

  const style = props.notification ?
    {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    } :
    {
      display: 'none'
    }

  return (
    <div style={style}>
      {props.notification}
    </div >
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.noti
  }
}

export default connect(mapStateToProps)(Notification)