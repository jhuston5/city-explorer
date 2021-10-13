import React from 'react';
import Card from 'react-bootstrap/Card';

class Map extends React.Component {

  render() {
    return (
      <>
        <div className="m-2">
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={this.props.mapImg} />
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