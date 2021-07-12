import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
  Modal,
  ModalBody,
} from 'reactstrap'
import './navigation.css'
import '../service/service.css'
import Explore from './Explore'

const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [modal, setModal] = useState(false)

  const toggle = () => setIsOpen(!isOpen)
  const toggleModal = () => setModal(!modal)

  return (
    <div>
      <Navbar light expand="md" className="navbar">
        <NavbarBrand href="/" className="navbar-brand">
          Kraftiworks
        </NavbarBrand>
        <NavbarToggler onClick={toggle} className="toggler" />
        <Collapse isOpen={isOpen} navbar className="collapse">
          <Nav className="mr-auto nav" pill="true">
            <NavItem className="nav-item" onClick={toggleModal}>
                Explore
            </NavItem>
            <Modal isOpen={modal} toggle={toggleModal} size="xl">
              {/* <ModalHeader toggle={toggleModal}>Modal title</ModalHeader> */}
              <ModalBody>
                <Explore />
              </ModalBody>
              {/* <ModalFooter>
                <Button color="primary" onClick={toggleModal}>
                  Do Something
                </Button>{' '}
                <Button color="secondary" onClick={toggleModal}>
                  Cancel
                </Button>
              </ModalFooter> */}
            </Modal>
            <NavItem className="nav-item">
              <Link to="/service" className="nav-item-link">
                Services
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
            <NavItem className="nav-item">
              <Link to="/join" className="nav-item-link">
                Contact
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
