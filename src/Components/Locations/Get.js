import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import "./main.css";
import {GET_LOCATIONS, DELETE_LOCATIONS} from "../../GQL/gql";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import UpdateLocation from "./UpdateLocation";

  const Get = () => {

    const { loading, error, data } = useQuery(GET_LOCATIONS);
    const [deleteLocation] = useMutation(DELETE_LOCATIONS);

    if (loading) return <tbody><tr><td>Loading...</td><td></td><td></td></tr></tbody>;
    if (error) return <tbody><tr><td>Errror, are you logged in?</td><td></td><td></td></tr></tbody>;


    return data.locations.map(({ id, slug, gps }) => (
        <tbody key={id}>
            <tr>
              <td>{id}</td>
              <td>{slug}</td>
              <td>{gps}</td>
              <td>
              <button className="danger" onClick={() => deleteLocation({variables: {id}, refetchQueries: [{query: GET_LOCATIONS}]})}>
                Delete Location
              </button>
              <Router>
                <Link to={"/updateLocation"}>
                  <button className="danger">
                    Update Locations
                  </button>
                </Link>
                <Switch>
                  <Route path="/updateLocation" component={UpdateLocation} />
                </Switch>
              </Router>
              </td>
            </tr>
          </tbody>
    ));
  };

export default Get;


