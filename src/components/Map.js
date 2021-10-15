import React from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

class Map extends React.Component {

  render() {
    return (
      <>
        <Container fluid>
          <Row>
            <Col xs={6} md={4}>
              <Image src={this.props.mapImg} roundedCircle fluid/>
            </Col>
          </Row>
        </Container>
        <div className="m-2">
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>{this.props.cityName}</Card.Title>
              <Card.Text>
                <p>Latitude: {this.props.locationObj.lat}</p>
                <p>Longitude: {this.props.locationObj.lon}</p>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </>

    )
  }
}


export default Map;