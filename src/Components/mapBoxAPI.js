import React, { Component } from 'react'
import { COORDS } from "./coords"
import {locationOne, locationTwo} from "./TippingPoint"

    const CustomTrip = ({ locationOne, locationTwo, onLocationOneChange, onLocationTwoChange }) => {
      return (
        <div>
          <center><h1>Customize your trip</h1></center>
            Select your starting point
            <select value={locationOne} onChange={onLocationOneChange}>
                <option value={COORDS.mwc}>MWC</option>
                <option value={COORDS.alb}>ALB</option>
            </select>
            Select your destination - mileage will be calculated as a round trip.
            <select value={locationTwo} onChange={onLocationTwoChange}>
                <option value={COORDS.bao}>BAO</option>
                <option value={COORDS.tul}>TUL</option>
            </select>
        </div>
      )
    };

export default CustomTrip;


//use fetch.then innstead of component did mount...
// need %'s in url to urlize it or something work on that

    // componentDidMount() {
    //   fetch(`https://api.mapbox.com/directions-matrix/v1/mapbox/driving/${this.state.locationOne};${this.state.locationTwo}?sources=1&annotations=distance&access_token=pk.eyJ1Ijoiam9zaGlzcGx1dGFyIiwiYSI6ImNqeTZwNGF1ODAxa2IzZHA2Zm9iOWNhNXYifQ.X0D2p9KD-IXd7keb199nbg`)
    //   .then(res => res.json())
    //   .then((data) => {
    //     this.setState({ totalMiles: data.distance[1].toFixed(0) })
    //   })
    //   .catch(console.log)
    // };