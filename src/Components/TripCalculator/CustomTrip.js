/* eslint-disable no-debugger, no-console */
import React, {useContext, useEffect } from 'react'
import { COORDS } from "../../unUsedComponents/coords"
import { useMileDispatch, useMileState } from './MileContext';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import LocationOptions from "./LocationOptions";


    const CustomTrip = () => {
      const {locationOne, locationTwo} = useMileState()
      const dispatch = useMileDispatch()



      async function fetchDistance()
            {

                const res = await fetch("https://api.mapbox.com/directions-matrix/v1/mapbox/driving/" + locationOne + ";" + locationTwo + "?sources=1&annotations=distance&access_token=pk.eyJ1Ijoiam9zaGlzcGx1dGFyIiwiYSI6ImNqeTZwNGF1ODAxa2IzZHA2Zm9iOWNhNXYifQ.X0D2p9KD-IXd7keb199nbg")
                const mapBoxObject = await res.json();
                const meters = mapBoxObject.distances[0];
                const miles = (parseInt(meters) *  0.00062137119);
                const roundtrip = 2 * miles;
                dispatch({type: 'totalMilesUpdate', payload: roundtrip.toFixed(2)})

            }

        useEffect(() => {
            fetchDistance()
        }, [locationOne, locationTwo]);

      const LOCATIONS = gql`
        {
          locations {
            id
            slug
            gps
          }
        }
        `;
      const { loading, error, data } = useQuery(LOCATIONS);


      if (loading) return <p>Loading...</p>;
      if (error) return <p>Please Log in</p>;

      return (
        <div>
          <h3>Customize your trip</h3>
            Mileage will be calculated as a round trip.
            <br/>
            Select your starting point

            <select value={locationOne} onChange={(event) => dispatch({type: 'locationOneChange', payload: event.target.value})}>
            {
              <LocationOptions />
            }
            </select>

            Select your destination
            <select value={locationTwo} onChange={(event) => dispatch({type: 'locationTwoChange', payload: event.target.value})}>
            {
              <LocationOptions />
            }
            </select>
        </div>
      )
    };

export default CustomTrip;


