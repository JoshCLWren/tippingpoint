import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ROUTES, DELETE_ROUTE, CREATE_ROUTE_LOCATION } from "../../GQL/gql";
import { useMileDispatch, useMileState } from '../TripCalculator/MileContext';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";
import Description from "./Description";
// import AddLocationsToRoute from "./AddLocationsToRoute";
import LocationIDs from "./LocationIDs"

  const GetRoutes = (props) => {
    const {locationID} = useMileState()
    const dispatch = useMileDispatch()
    const [createRouteLocation] = useMutation(CREATE_ROUTE_LOCATION)


    const [deleteRoute] = useMutation(DELETE_ROUTE);
    const { loading, error, data } = useQuery(GET_ROUTES);

    if (loading) return <tbody><tr><td>Loading...</td><td></td><td></td></tr></tbody>;
    if (error) return <tbody><tr><td>Errror, are you logged in?</td><td></td><td></td></tr></tbody>;


    return data.routes.map(({ id, name, description, locations }) => (
      <tbody key={id}>
        <tr>
          <td>{id}</td>
          <td>{name}</td>
          <td>
            <Description
              id={id}
            />
          </td>
          <td>
          <select value={locationID} onChange={(event) => dispatch({type: 'addLocationID', payload: event.target.value})}>
            {
              <LocationIDs />
            }
          </select>
          <button onClick={() => createRouteLocation(
            {
            variables: {
              routeId: parseInt(id),
              locationId: locationID
            },
            refetchQueries: [{query: GET_ROUTES}]
          })}>Add Location to Route</button>


          <p>location id ={locationID}</p>
          <p>route id = {props.id}</p>

          <button className="danger" onClick={() => deleteRoute({variables: {id}, refetchQueries: [{query: GET_ROUTES}]})}>
              Delete Route
          </button>
          </td>
        </tr>
      </tbody>
    ))
  };

  export default GetRoutes;