import React from 'react'
import ErrorMessage from './ErrorMessage'

const LoginForm = (props) => {

  const errorToShow = props.alertBox ?
    <ErrorMessage message={props.alertBox} /> :
    null

  return (
    <form onSubmit={props.loginHandler}>
      <h2>Login to the application</h2>
      {errorToShow}
      <div>
            username: <input id='username' type='text' value={props.username} name='username' onChange={props.usernameChangeHandler} />
      </div>
      <div>
            password: <input id='password' type='password' value={props.password} name='password' onChange={props.passwordChangeHandler} />
      </div>
      <button type='submit'>Submit</button>
    </form>
  )
}

export default LoginForm