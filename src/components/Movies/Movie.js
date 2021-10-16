import React from 'react';
import Card from 'react-bootstrap/Card';
import { ListGroup } from 'react-bootstrap';
import { ListGroupItem } from 'react-bootstrap';

class Movie extends React.Component {

  render() {
    return (
      
      <>
        <div className="m-2">
          <Card style={{ width: '18rem', marginLeft: 'auto', marginRight:'auto', marginTop:'1rem' }}>
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
            <ListGroup className="list-group-flush">
                    <ListGroupItem>Rating: {this.props.ave}</ListGroupItem>
                    <ListGroupItem>Released: {this.props.release}</ListGroupItem>
                </ListGroup>
          </Card>
        </div>

      </>

    )
  }
}


export default Movie;