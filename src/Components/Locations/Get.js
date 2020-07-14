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
import EditLocation from "./EditLocation";

  const Get = () => {

    const { loading, error, data } = useQuery(GET_LOCATIONS);
    const [deleteLocation] = useMutation(DELETE_LOCATIONS);

    if (loading) return <tbody><tr><td>Loading...</td></tr></tbody>;
    if (error) return <tbody><tr><td>Errror, are you logged in?</td></tr></tbody>;


    return data.locations.map(({ id, slug, gps }) => (
        <tbody key={id}>
            <tr>
              <td>{slug}</td>
              <td>{gps}</td>
              <td>
              <button className="danger" onClick={() => deleteLocation({variables: {id}, refetchQueries: [{query: GET_LOCATIONS}]})}>
                Delete Location
              </button>
              <Router>
                <Link to={"/EditLocation"}>Edit</Link>
              </Router>
              <Switch>
                <Route path="/EditLocation" component={EditLocation}/>
              </Switch>
              </td>
            </tr>
          </tbody>
    ));
  };

export default Get;


