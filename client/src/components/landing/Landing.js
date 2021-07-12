import React from 'react'
// import PropTypes from 'prop-types'

import { Container, Row, Col, Button } from 'reactstrap'
import './landing.css'
import Section1 from './Section1'

const Landing = (props) => {
  return (
    <div style={{ margin: 0 }}>
      <Container style={{ height: '100%' }}>
        <Row xs="1" sm="1" md="2" lg="2" xl="2" className="row-1">
          <Col>
            <h3 className="greeting-msg">Welcome to the Craftsmen's Community!</h3>
            <p className="greeting-p">This the place where talents in craftworks and maintenance work independently</p>
          </Col>
        </Row>
        <Row xs="1" sm="1" md="2" lg="2" xl="2">
          <Col>
            <Button color="primary" className="button">
                Hire A Talent
              </Button>
          </Col>
        </Row>
      </Container>
      <Section1 />
    </div>
  )
}

Landing.propTypes = {}

export default Landing
