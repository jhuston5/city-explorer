import React from 'react';
import Card from 'react-bootstrap/Card';

class Movie extends React.Component {

  render() {
    return (
      
      <>
        <div className="m-2">
          <Card style={{ width: '18rem' }} align-items-md-center>
            <Card.Img variant="top" src={this.props.imageURL} />
            <Card.Body>
              <Card.Title>{this.props.title}</Card.Title>
              <Card.Text>
                <p>Overview: {this.props.overview}</p>
                <p>Release Date: {this.props.releasedOn}</p>
                <p>Average Votes: {this.props.averageVotes}</p>
                <p>Total Votes: {this.props.totalVotes}</p>
                <p>Popularity: {this.props.popularity}</p>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

      </>

    )
  }
}


export default Movie;