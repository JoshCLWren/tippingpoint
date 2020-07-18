import React, {useState} from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ROUTES, DELETE_ROUTE, CREATE_ROUTE_LOCATION } from "../../GQL/gql";
import { useMileDispatch, useMileState } from '../TripCalculator/MileContext';
import AddLocationCheckbox from "./AddLocationCheckbox";
import AddLocationsToRouteButton from "./AddLocationsToRouteButton"
import LocationIDs from "./LocationIDs"

const AddLocationsToRoute = (props) => {
  const {locationID} = useMileState()
  const dispatch = useMileDispatch()
  const [createRouteLocation] = useMutation(CREATE_ROUTE_LOCATION)


      // const onSubmit = data => createRouteLocation({
      //       variables: {routeId: data.routeId, locationId: data.locationId}
      //     });

  return (
    <>
      <select value={locationID} onChange={(event) => dispatch({type: 'addLocationID', payload: event.target.value})}>
            {
              <LocationIDs />
            }
      </select>
      <button onClick={() => createRouteLocation(
        {
        variables: {
          routeId: props.id,
          locationId: locationID
        }
      })}>Add Location to Route</button>


      <p>location id ={locationID}</p>
      <p>route id = {props.id}</p>
    </>
  )

}

export default AddLocationsToRoute;