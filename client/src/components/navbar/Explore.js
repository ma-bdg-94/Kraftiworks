import React from 'react'
import { Card, Row, Col, CardTitle, Container } from 'reactstrap'
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined'
import LocalAtmOutlinedIcon from '@material-ui/icons/LocalAtmOutlined'
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined'
import BusinessOutlinedIcon from '@material-ui/icons/BusinessOutlined'
import EcoOutlinedIcon from '@material-ui/icons/EcoOutlined'
import MenuBookOutlinedIcon from '@material-ui/icons/MenuBookOutlined'
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined'
import BookOutlinedIcon from '@material-ui/icons/BookOutlined'

const Explore = () => {
  return (
    <Container>
      <Row xs="1" sm="2" md="4" className="row-3" noGutters>
        <Col>
          <Card body className="text-center card">
            <CardTitle tag="h5">
              <MenuBookOutlinedIcon className="card-icon" />
              <br />
              About Kraftiworks
            </CardTitle>
          </Card>
        </Col>
        <Col>
          <Card body className="text-center card">
            <CardTitle tag="h5">
              <AccountBoxOutlinedIcon className="card-icon" />
              <br />
              Technician Profile
            </CardTitle>
          </Card>
        </Col>
        <Col>
          <Card body className="text-center card">
            <CardTitle tag="h5">
              <LocalAtmOutlinedIcon className="card-icon" />
              <br />
              Contracts & Billing
            </CardTitle>
          </Card>
        </Col>
      </Row>
      <Row xs="1" sm="2" md="4" className="row-3" noGutters>
        <Col>
          <Card body className="text-center card">
            <CardTitle tag="h5">
              <ThumbUpOutlinedIcon className="card-icon" />
              <br />
              Technician Support
            </CardTitle>
          </Card>
        </Col>
        <Col>
          <Card body className="text-center card">
            <CardTitle tag="h5">
              <BusinessOutlinedIcon className="card-icon" />
              <br />
              Business Support
            </CardTitle>
          </Card>
        </Col>
        <Col>
          <Card body className="text-center card">
            <CardTitle tag="h5">
              <EcoOutlinedIcon className="card-icon" />
              <br />
              Social Responsability
            </CardTitle>
          </Card>
        </Col>
      </Row>
      <Row xs="1" sm="2" md="4" className="row-3" noGutters>
        <Col>
          <Card body className="text-center card">
            <CardTitle tag="h5">
              <WorkOutlineOutlinedIcon className="card-icon" />
              <br />
              Indoor Career
            </CardTitle>
          </Card>
        </Col>
        <Col>
          <Card body className="text-center card">
            <CardTitle tag="h5">
              <BookOutlinedIcon className="card-icon" />
              <br />
              The Encyclopedia
            </CardTitle>
          </Card>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  )
}

export default Explore
