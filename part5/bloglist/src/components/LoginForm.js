import React from 'react'

const LoginForm = (props) => {
  return (
    <form onSubmit={props.loginHandler}>
      <h2>Login to the application</h2>
      <div>
            username: <input type='text' value={props.username} name='username' onChange={props.usernameChangeHandler} />
      </div>
      <div>
            password: <input type='password' value={props.password} name='password' onChange={props.passwordChangeHandler} />
      </div>
      <button type='submit'>Submit</button>
    </form>
  )
}

export default LoginForm