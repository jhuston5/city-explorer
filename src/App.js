import './App.css';
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cityName: '',
      locationObj: {},
      mapImg: ''      
    }
    //functions
  }

  getLocation = async (event) => {
    event.preventDefault()
    console.log('button pushed', this.state.cityName);
    
    console.log(process.env.REACT_APP_LOCATION_API_KEY);
    let URL = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_API_KEY}&q=${this.state.cityName}&format=json`;

    console.log(URL);

    try {
      let locData = await axios.get(URL);
      // Set state with city data from JSON file
      this.setState({
        locationObj:
          locData.data[0],

      });


      let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_API_KEY}&center=${this.state.locationObj.lat},${this.state.locationObj.lon}&zoom=5`;
      let mapObj = await axios.get(mapURL);


      //Response obj.data
      console.log(locData.data[0])
      console.log(mapURL);
      //Set it to setate
      this.setState({
        
        mapImg: mapObj.data

      });
      console.log(this.state.locationObj);
      console.log(mapObj);
    }
    //If there is an error in the try
    catch (error) {
      console.log('there was an error:', error);
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

      
      <div>
        <h3>{this.state.cityName}</h3>
        <p>Latitude: {this.state.locationObj.lat}</p>
        <p>Longitude: {this.state.locationObj.lon}</p>
        <p>{this.state.mapImg}</p>
        <img src={this.state.mapImg} alt='map'></img>
      </div>
    </>
  );
}
}

export default App;
