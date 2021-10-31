import React from 'react'

const ErrorMessage = ({ message }) => {
  const boxStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }
  return (
    <div id='error-message' style={boxStyle}>
      {message}
    </div>
  )
}

export default ErrorMessage