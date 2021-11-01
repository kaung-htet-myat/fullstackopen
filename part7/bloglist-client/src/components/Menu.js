import React from 'react'
import { Link } from 'react-router-dom'
import { Nav, Navbar } from 'react-bootstrap'

import styles from './Menu.css'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="light">
        <Navbar.Brand href="#home"><h1 className={styles.brand}>BlogList</h1></Navbar.Brand>
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