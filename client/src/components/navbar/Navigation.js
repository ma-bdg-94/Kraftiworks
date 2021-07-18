import { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

// UI components & style
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

// components
import Explore from './Explore'

// actions
import { signOut } from '../../actions/authActions'

const Navigation = ({ auth: { authenticated, loading }, signOut }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [modal, setModal] = useState(false)

  const toggle = () => setIsOpen(!isOpen)
  const toggleModal = () => setModal(!modal)

  const isConnected = (
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
            <ModalBody>
              <Explore />
            </ModalBody>
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
              Dashboard
            </Link>
          </NavItem>
          <NavItem className="nav-item">
            <Link to="/join" className="nav-item-link">
              Contact
            </Link>
          </NavItem>
        </Nav>
        <div className="button-container">
          
            <Button color="primary" className="button" onClick={signOut}>
              Sign Out
            </Button>
          
        </div>
      </Collapse>
    </Navbar>
  )

  const notConnected = (
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
            <ModalBody>
              <Explore />
            </ModalBody>
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
  )

  return (
    <div>
      {!loading && (
        <Fragment>{authenticated ? isConnected : notConnected}</Fragment>
      )}
    </div>
  )
}

Navigation.propTypes = {
  auth: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  auth: state.authReducer,
})

export default connect(mapStateToProps, { signOut })(Navigation)
