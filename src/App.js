import './App.css';
import React from 'react';
import axios from 'axios';
import Map from './components/Map.js'
import AlertMessage  from './components/AlertMessage.js';
import Weather from './components/Weather';

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
      showWeather: false
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

      let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_API_KEY}&center=${this.state.locationObj.lat},${this.state.locationObj.lon}&zoom=12`;
      this.setState({
        mapImg: mapURL
      });

      //Edited await to only include City Name in the search query
      let allWeatherArr = await axios.get(`http://localhost:3001/weather?searchQuery=${this.state.cityName}`);
      console.log(allWeatherArr);

      this.setState({
        weatherData: allWeatherArr.data,
        showWeather: true
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
      {
          this.state.showWeather && this.state.weatherData.map((el) => 
          <Weather date={el.date} description={el.description} />)
        }
      

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
