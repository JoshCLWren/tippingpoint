import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ROUTES, DELETE_ROUTE } from "../../GQL/gql";
import AddLocationsToRouteButton from "./AddLocationsToRouteButton"
import {
  BrowserRouter as Router,
} from "react-router-dom";
import Description from "./Description";

  const GetRoutes = (props) => {


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
            <Router>
              <AddLocationsToRouteButton
                id={id}
                name={name}
                description={description}
                locations={locations}
              />
            </Router>

            <button className="danger" onClick={() => deleteRoute({variables: {id}, refetchQueries: [{query: GET_ROUTES}]})}>
                Delete Route
              </button>
            {/* <AddLocationCheckbox
              checkedLocations = {props.checkedLocations}
              ref={register({ required: true, maxLength: 12 })}
              id = {id}
              // pass the function through a prop that's not an event listener.
            /> */}

          </td>
        </tr>
      </tbody>
    ))
  };

  export default GetRoutes;