import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
} from 'reactstrap'
import './navigation.css'

const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <div>
      <Navbar light expand="md" className="navbar">
        <NavbarBrand href="/" className="navbar-brand">
          Kraftiworks
        </NavbarBrand>
        <NavbarToggler onClick={toggle} className="toggler" />
        <Collapse isOpen={isOpen} navbar className="collapse">
          <Nav className="mr-auto nav" pill="true">
            <NavItem className="nav-item">
              <Link to="/service" className="nav-item-link">
                Service
              </Link>
            </NavItem>
            <NavItem className="nav-item">
              <Link to="/talents" className="nav-item-link">
                Talents
              </Link>
            </NavItem>
            <NavItem className="nav-item">
              <Link to="/join" className="nav-item-link">
                Join Us
              </Link>
            </NavItem>
          </Nav>
          <div className="button-container">
            <Link to="/login">
              <Button color="primary" className="button">
                Sign In
              </Button>
            </Link>
          </div>
        </Collapse>
      </Navbar>
    </div>
  )
}

export default Navigation
