/* eslint-disable no-debugger, no-console */
import React, { useEffect } from 'react'
import { useMileDispatch, useMileState } from './MileContext';
import RouteOptions from "./RouteOptions";
import { useQuery } from '@apollo/react-hooks';
import { GET_ROUTE } from "../../GQL/gql";


    const CustomRoute = () => {
      const {selectedRoute} = useMileState()
      const dispatch = useMileDispatch()

      const { loading, error, data} = useQuery(GET_ROUTE, {
        variables: {id: parseInt(selectedRoute)},
      });



      async function fetchRouteDistance()
            {
              const route = await data
              console.log(route)
              if(route){
                const routeLocationArray = Object.values(route.route.locations);
                console.log(routeLocationArray);
                const coordinates = routeLocationArray.map(a => a.gps)
                console.log(coordinates);
                const routeLocations = coordinates.join(";")
                console.log(routeLocations)
                if(routeLocations){
                  const optimizedObject = await fetch("https://api.mapbox.com/optimized-trips/v1/mapbox/driving/" + routeLocations +"?access_token=pk.eyJ1Ijoiam9zaGlzcGx1dGFyIiwiYSI6ImNqeTZwNGF1ODAxa2IzZHA2Zm9iOWNhNXYifQ.X0D2p9KD-IXd7keb199nbg")
                  const mapboxObject = await optimizedObject.json();
                  console.log(mapboxObject.trips[0].distance)
                  const meters = mapboxObject.trips[0].distance;
                  const miles = (parseInt(meters) *  0.00062137119);
                  console.log(miles);
                  console.log("dispatc");
                  dispatch({type: 'totalMilesUpdate', payload: miles.toFixed(2)})
                }
              }
              // why is this sometimes undefined?


              // const mapBoxObject = await res.json();
              // const meters = mapBoxObject.distances[0];
              // const miles = (parseInt(meters) *  0.00062137119);
              // const roundtrip = 2 * miles;
              // dispatch({type: 'totalMilesUpdate', payload: roundtrip.toFixed(2)})

            }

        useEffect(() => {
            fetchRouteDistance()
            // eslint-disable-next-line
        }, [selectedRoute]);




      if (loading) return <p>Loading...</p>;
      if (error) return <p>Please Log in</p>;

      return (
        <div>
          <h3>Or Choose a Route</h3>
            Route will be optimized with the first location as the starting point
            <br/>
            Select your Route

            <select value={selectedRoute} onChange={(event) => dispatch({type: 'routeChange', payload: event.target.value})}>
            {
              <RouteOptions />
            }
            </select>
          {/* why isn't the select changing? */}

        </div>
      )
    };

export default CustomRoute;


