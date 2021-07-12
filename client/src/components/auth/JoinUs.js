import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { Container, Row, Col, Button } from 'reactstrap'
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';

import './joinUs.css'

const JoinUs = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isTech, setIsTech] = useState(null)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    isTech: null
  })

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleStatusChange = ev => {
    setIsTech(ev.target.value)
  }

  return (
    <Container className="join-container" fluid>
      <Row className="join-greeting">Join Kraftiworks For Free</Row>
      <Row>
        <Col className="submit-col">
        <label for="email" className="label">Email Address:</label>
          <input type="text" id="email" className="submit-text"></input>
          <label for="password" className="label">Password:</label>
          <div style={{ display: 'flex'}}>
           <input type={showPassword ? "text" : "password"} id="password" className="submit-text password"></input>
           <button className="password-button" onClick={toggleShowPassword}>{showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}</button> 
          </div>
        </Col>
        <Col className="submit-col">
          <div className="submit-container">
            <input type="radio" id="tech" className="submit" onChange={handleStatusChange} value="true"></input>
            <label for="tech">I would like to join as a technician</label>
          </div>
          <div className="submit-container">
            <input type="radio" id="biz" className="submit"></input>
            <label for="biz">I would like to join as a business</label>
          </div>
        </Col>
      </Row>
      <Row className="join-greeting">
        <Button className="auth-button">Register Now!</Button>
      </Row>
      <Row style={{ marginTop: '1%' }}>
        <Link to="/login" className="switch-link">If you have already an account, Please sign in</Link>
      </Row>
    </Container>
  )
}

export default JoinUs
