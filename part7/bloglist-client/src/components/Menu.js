import React from 'react'
import { Link } from 'react-router-dom'
import { Nav, Navbar } from 'react-bootstrap'
import styled from 'styled-components'

const Brand = styled.h1`
  color:darkgray
`

const Menu = () => {

  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="light">
        <Link to='/'><Navbar.Brand><Brand className='brand'>BlogList</Brand></Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to='/'>blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to='/users'>users</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>


    </div>
  )
}

export default Menu