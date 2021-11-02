import React from 'react'
import ErrorMessage from './ErrorMessage'
import { Form, Button } from 'react-bootstrap'
import styled from 'styled-components'

const StyledSubmitBtn = styled.div`
  margin-top:10px;
`

const StyledContainer = styled.div`
  margin-top:30px;
  margin-left:40px;
`

const LoginForm = (props) => {

  const errorToShow = props.alertBox ?
    <ErrorMessage message={props.alertBox} /> :
    null

  return (
    <StyledContainer>
      <Form onSubmit={props.loginHandler}>
        <Form.Group>
          <h2>Login to the application</h2>
          {errorToShow}
          <Form.Label>username:</Form.Label>
          <Form.Control id='username' type='text' value={props.username} name='username' onChange={props.usernameChangeHandler} />
          <Form.Label>password:</Form.Label>
          <Form.Control id='password' type='password' value={props.password} name='password' onChange={props.passwordChangeHandler} />
          <StyledSubmitBtn><Button variant='primary' type='submit'>Submit</Button></StyledSubmitBtn>
        </Form.Group>
      </Form>
    </StyledContainer>

  )
}

export default LoginForm