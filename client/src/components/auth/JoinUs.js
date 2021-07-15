import { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

// UI components & style
import { Container, Row, Col, Button } from 'reactstrap'
import { Radio, RadioGroup, FormControlLabel } from '@material-ui/core'
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined'
import './joinUs.css'

// actions
import { signUp } from '../../actions/authActions'

const JoinUs = ({ authenticated, signUp }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    account: '',
  })

  const { email, password, account } = formData

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
    signUp({ email, password, account })
    console.log({ email, password, account })
  }

  // redirect when authenticated
  if (authenticated) {
    return <Redirect to="/" />
  }

  return (
    <Container className="join-container" fluid>
      <Row className="join-greeting">Join Kraftiworks For Free</Row>
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
        <Col className="submit-col">
          <div className="submit-container">
            <RadioGroup
              aria-label="gender"
              name="account"
              value={account}
              onChange={(e) => handleFormChange(e)}
              className="label"
            >
              <FormControlLabel
                value="technician"
                control={<Radio />}
                label="I would join as a technician"
              />
              <FormControlLabel
                value="business"
                control={<Radio />}
                label="I would join as a business"
              />
            </RadioGroup>
          </div>
        </Col>
      </Row>
      <Row className="join-greeting">
        <Button className="auth-button" onClick={(e) => handleSubmit(e)}>
          Register Now!
        </Button>
      </Row>
      <Row style={{ marginTop: '1%' }}>
        <Link to="/login" className="switch-link">
          If you have already an account, Please sign in
        </Link>
      </Row>
    </Container>
  )
}

JoinUs.propTypes = {
  signUp: PropTypes.func.isRequired,
  authenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  authenticated: state.authReducer.authenticated,
})

export default connect(mapStateToProps, { signUp })(JoinUs)
