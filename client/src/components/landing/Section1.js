import React from 'react'
import { Card, Row, Col, CardText, CardTitle } from 'reactstrap'
import InsertChartOutlinedOutlinedIcon from '@material-ui/icons/InsertChartOutlinedOutlined';
import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import FitnessCenterOutlinedIcon from '@material-ui/icons/FitnessCenterOutlined';
import HeadsetMicOutlinedIcon from '@material-ui/icons/HeadsetMicOutlined';
import EcoOutlinedIcon from '@material-ui/icons/EcoOutlined';
import './landing.css'

const Section1 = () => {
  return (
    <div
      className="section-1"
    >
      <Row xs="1" sm="2" md="4" className="row-3" noGutters>
        <Col>
          <Card body className="text-center card">
            <CardTitle tag="h5"><InsertChartOutlinedOutlinedIcon className="card-icon" /><br /> Follow Up</CardTitle>
            <CardText>
              We have a rigorous system of following-up the technicians that promote their visiblity and ouput
            </CardText>
          </Card>
        </Col>
        <Col>
        <Card body className="text-center card">
            <CardTitle tag="h5"><VerifiedUserOutlinedIcon className="card-icon" /><br />Insurance</CardTitle>
            <CardText>
              All technicians have guaranteed insurance protecting their rights when performing their tasks
            </CardText>
          </Card>
        </Col>
        <Col>
        <Card body className="text-center card">
            <CardTitle tag="h5"><MonetizationOnOutlinedIcon className="card-icon" /><br />Billing</CardTitle>
            <CardText>
              The billing system depends on the technician's profile, as well as the complexity of the task
            </CardText>
          </Card>
        </Col>
      </Row>
      <Row xs="1" sm="2" md="4" className="row-3" noGutters>
        <Col>
          <Card body className="text-center card">
            <CardTitle tag="h5"><FitnessCenterOutlinedIcon className="card-icon" /><br />Training</CardTitle>
            <CardText>
              Our experts are dedicated to give all training support to technicians throught out training sessions.
            </CardText>
          </Card>
        </Col>
        <Col>
        <Card body className="text-center card">
            <CardTitle tag="h5"><HeadsetMicOutlinedIcon className="card-icon" /><br />Continuous Support</CardTitle>
            <CardText>
              Our help center and experts work 24h/day and 7d/week to give all consulting support to businesses
            </CardText>
          </Card>
        </Col>
        <Col>
        <Card body className="text-center card">
            <CardTitle tag="h5"><EcoOutlinedIcon className="card-icon" /><br />Social Activity</CardTitle>
            <CardText>
              We are socially responsible. We are engaged in social projects and encourage technicians to do
            </CardText>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Section1
