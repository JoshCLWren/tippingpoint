import React, {useContext, useEffect } from 'react'
import { COORDS } from "./coords"
import { useMileDispatch, useMileState } from './MileContext';


    const CustomTrip = () => {
      const {locationOne, locationTwo} = useMileState()
      const dispatch = useMileDispatch()


      async function fetchDistance()
            {
              
                const res = await fetch("https://api.mapbox.com/directions-matrix/v1/mapbox/driving/" + locationOne + ";" + locationTwo + "?sources=1&annotations=distance&access_token=pk.eyJ1Ijoiam9zaGlzcGx1dGFyIiwiYSI6ImNqeTZwNGF1ODAxa2IzZHA2Zm9iOWNhNXYifQ.X0D2p9KD-IXd7keb199nbg")
                console.log(res);
                const mapBoxObject = await res.json();
                console.log(mapBoxObject);
                const meters = mapBoxObject.distances[0];
                console.log(meters);
                const miles = (parseInt(meters) *  0.00062137119);
                const roundtrip = 2 * miles;
                
                console.log(miles.toFixed(2));

                dispatch({type: 'totalMilesUpdate', payload: roundtrip.toFixed(2)})
                
            }         
            
        useEffect(() => {
            fetchDistance()
        }, [locationOne, locationTwo]);

      return (
        <div>
          <h3>Customize your trip</h3>
            Mileage will be calculated as a round trip.
            <br/>
            Select your starting point
            <select value={locationOne} onChange={(event) => dispatch({type: 'locationOneChange', payload: event.target.value})}>
            {
                Object.entries(COORDS).map(([campus, coordinates]) => (
                <option key={campus} value={coordinates}>
                {campus}
                </option>
            ))}
            </select>
            Select your destination
            <select value={locationTwo} onChange={(event) => dispatch({type: 'locationTwoChange', payload: event.target.value})}>
          
            {
                Object.entries(COORDS).map(([campus, coordinates]) => (
                <option key={campus} value={coordinates}>
                {campus}
                </option>
            ))}
            </select>
        </div>
      )
    };

export default CustomTrip;


