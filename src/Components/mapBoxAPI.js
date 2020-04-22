import React, { useState, useEffect } from 'react'
import { COORDS } from "./coords";


    const CustomTrip = ({ locationOne, locationTwo, onLocationOneChange, onLocationTwoChange, onTotalMilesComputed }) => {
        
            async function fetchDistance()
            {
                const res = await fetch("https://api.mapbox.com/directions-matrix/v1/mapbox/driving/" + locationOne + ";" + locationTwo + "?sources=1&annotations=distance&access_token=pk.eyJ1Ijoiam9zaGlzcGx1dGFyIiwiYSI6ImNqeTZwNGF1ODAxa2IzZHA2Zm9iOWNhNXYifQ.X0D2p9KD-IXd7keb199nbg")
                const mapBoxObject = await res.json()
                
                
                const meters = mapBoxObject.distances[0];
                const miles = parseInt(meters) *  0.00062137119;
                onTotalMilesComputed(miles.toFixed(2));

                
                
            }         
            
        useEffect(() => {
            fetchDistance()
        }, [locationOne, locationTwo])

      return (
        <div>
          <h3>Customize your trip</h3>
            Mileage will be calculated as a round trip.
            <br/>
            Select your starting point
            <select value={locationOne} onChange={onLocationOneChange}>
            {
                Object.entries(COORDS).map(([campus, longLatt]) => (
                <option key={campus} value={longLatt}>
                {campus}
                </option>
            ))}
            </select>
            Select your destination
            <select value={locationTwo} onChange={onLocationTwoChange}>
            {
                Object.entries(COORDS).map(([campus, longLatt]) => (
                <option key={campus} value={longLatt}>
                {campus}
                </option>
            ))}
            </select>
        </div>
      )
    };

export default CustomTrip;


