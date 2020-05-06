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
                const miles = parseInt(meters) *  0.00062137119;
                
                console.log(miles.toFixed(2));

                dispatch({type: 'totalMilesUpdate', payload: miles.toFixed(2)})
                
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