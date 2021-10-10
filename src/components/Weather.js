import React from 'react';

class Weather extends React.Component {

  render() {
    console.log(this.props.weatherData)
    return (
      <>
        <div className="m-2">
          <h3>{this.props.cityName}</h3>
          <p>{this.props.weatherData}</p>
        </div>

      </>

    )
  }
}


export default Weather;