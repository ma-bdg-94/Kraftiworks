import { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

// UI components & style
import { Container, Row, Col, Button } from 'reactstrap'
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined'
import './joinUs.css'

// actions
import { signIn } from '../../actions/authActions'

const Login = ({ authenticated, signIn }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleFormChange = (ev) => {
    setFormData({
      ...formData,
      [ev.target.name]: ev.target.value,
    })
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    signIn({ email, password })
  }

  // redirect when authenticated
  if (authenticated) {
    return <Redirect to="/" />
  }

  return (
    <Container className="join-container" fluid>
      <Row className="join-greeting">Log into the account</Row>
      <Row>
        <Col className="submit-col">
          <label for="email" className="label">
            Email Address:
          </label>
          <input
            type="text"
            id="email"
            className="submit-text"
            name="email"
            value={email}
            onChange={(e) => handleFormChange(e)}
          ></input>
          <label for="password" className="label">
            Password:
          </label>
          <div style={{ display: 'flex' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="submit-text password"
              name="password"
              value={password}
              onChange={(e) => handleFormChange(e)}
            ></input>
            <button className="password-button" onClick={toggleShowPassword}>
              {showPassword ? (
                <VisibilityOffOutlinedIcon />
              ) : (
                <VisibilityOutlinedIcon />
              )}
            </button>
          </div>
        </Col>
        <Col className="submit-col"></Col>
      </Row>
      <Row className="join-greeting">
        <Button className="auth-button" onClick={(e) => handleSubmit(e)}>
          Login Now!
        </Button>
      </Row>
      <Row style={{ marginTop: '1%' }}>
        <Link to="/join" className="switch-link">
          If you don't have an account yet, Please create one for free
        </Link>
      </Row>
    </Container>
  )
}

Login.propTypes = {
  signIn: PropTypes.func.isRequired,
  authenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  authenticated: state.authReducer.authenticated,
})

export default connect(mapStateToProps, { signIn })(Login)
