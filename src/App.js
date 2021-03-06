import './App.css';
import React from 'react';
import axios from 'axios';
import Map from './components/Map.js'
import AlertMessage  from './components/AlertMessage.js';
import Weather from './components/WeatherDay/Weather';
import Movie from './components/Movies/Movie';
import Row from 'react-bootstrap/Row';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cityName: '',
      locationObj: {},
      weatherData: [],
      mapImg: '',  
      errorCode: '',   
      errorAlert: false,
      showWeather: false,
      movieData: [],
      showMovie: false
    }
    //functions
  }


  onErrorClose = () => {
    this.setState({errorAlert:false})
  }

  getLocation = async (event) => {
    event.preventDefault()

    let URL = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_API_KEY}&q=${this.state.cityName}&format=json`;


    try {

      let locData = await axios.get(URL);
      this.setState({
        locationObj: locData.data[0]
      });

      let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_API_KEY}&center=${this.state.locationObj.lat},${this.state.locationObj.lon}&zoom=12&size=500x500`;
      this.setState({
        mapImg: mapURL
      });

      //Edited await to only include City Name in the search query
      let allWeatherArr = await axios.get(`http://localhost:3001/weather?lat=${this.state.locationObj.lat}&lon=${this.state.locationObj.lon}`);
      console.log(allWeatherArr);
      this.setState({
        weatherData: allWeatherArr.data,
        showWeather: true
      })

      let allMovieArr = await axios.get(`http://localhost:3001/movie?cityName=${this.state.cityName}`);
      this.setState({
        movieData: allMovieArr.data,
        showMovie: true
      })

     console.log(this.state.weatherData);

    }
    //If there is an error in the try
    catch (error) {
    
      this.setState({errorCode: error.message})
      this.setState({errorAlert: true})
    }

  }
 

  
  


  render() {



  return (
    <>
      <h1>Enter A City!</h1>
      
      
      <form>
        <fieldset>
          <label>City</label> <input onChange={(e) => {this.setState({ cityName: e.target.value })}} type="text" id="city" name="city" placeholder="Your City"></input>
        </fieldset>
        <button type="submit" 
          onClick={this.getLocation}
        >Explore!</button>
      </form>

      <Map 
        cityName={this.state.cityName}
        mapImg={this.state.mapImg}
        locationObj={this.state.locationObj}
        />

      {/* {this.props.weatherData.map} */}
      <h4>Weather Data</h4>
      {
          this.state.showWeather && this.state.weatherData.map((el) => 
          <Weather date={el.date} description={el.description} />)
        }

      <h4>Movie Data</h4>
      <Row xs={1} md={4} className="g-4">
      {
          this.state.showMovie && this.state.movieData.map((el) => 
          <Movie 
          title= {el.title}
          overview= {el.overview}
          averageVotes= {el.averageVotes}
          totalVotes= {el.totalVotes}
          imageURL= {el.imageURL}
          popularity= {el.popularity}
          releasedOn= {el.releasedOn}
          
         />)
        }
       </Row>

      <AlertMessage 
        errorCode={this.state.errorCode}
        errorAlert={this.state.errorAlert}
        onErrorClose={this.onErrorClose}
        />
    </>
  );
}
}

export default App;
