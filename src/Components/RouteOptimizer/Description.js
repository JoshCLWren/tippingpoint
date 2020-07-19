import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import { GET_ROUTE } from "../../GQL/gql";
import LocationsInRoute from "./LocationsInRoute";


const Description = (props) => {


    // async function getRouteOrder()
    //   {
    //     var gpsCollection = Object.values(data.route.locations);
    //     console.log(gpsCollection);
    //     // gpsCollection.push(startingLocation)
    //     // for(var i = 1; i > locationsObject.length; i++){

    //     // }
    //     // const res = await fetch("https://api.mapbox.com/optimized-trips/v1/mapbox/driving/"+ startingLocation + i + "?access_token=pk.eyJ1Ijoiam9zaGlzcGx1dGFyIiwiYSI6ImNqeTZwNGF1ODAxa2IzZHA2Zm9iOWNhNXYifQ.X0D2p9KD-IXd7keb199nbg")
    //     // const order = await res.json();
    //   }

    //   useEffect(() => {
    //     getRouteOrder()
    //     // eslint-disable-next-line
    // }, [locationID]);

  const passedId = props.id
    const { loading, error, data } = useQuery(GET_ROUTE, {
      variables: {id: passedId}
    });

    // const extractedLocations = (obj) =>{
    //   for(var i = 0; i < obj.length; i++)
    //   {
    //     <p>Location {i}: {obj[i]['slug']}</p>
    //   }



    if (loading) return <p>Loading...</p>;
    if (error) return <p>ERROR: {error.message}</p>;
    if (!data) return <p>Not found</p>;


  return (

    <>
      <p>stops: {JSON.stringify(data.route.locationsCount)}</p>
      <ul>
        Locations
        <LocationsInRoute
          id ={passedId}
          data ={data}
        />
      </ul>

    </>


  )



};


export default Description;