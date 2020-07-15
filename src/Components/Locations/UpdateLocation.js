import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useAuth0 } from "@auth0/auth0-react";
import { useForm } from "react-hook-form"
import "./main.css";
import {GET_LOCATIONS, UPDATE_LOCATION} from "../../GQL/gql";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Locations from "./Locations";

  const UpdateLocation = () => {
    const { isAuthenticated } = useAuth0();
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = data => updateLocation({
      variables: {id: data.id, slug: data.slug, gps: data.gps},
      refetchQueries: [{query: GET_LOCATIONS}]
    });

    const { loading, error, data } = useQuery(GET_LOCATIONS);
    const [updateLocation] = useMutation(UPDATE_LOCATION);

    if (loading) return <tbody><tr><td>Loading...</td><td></td><td></td></tr></tbody>;
    if (error) return <tbody><tr><td>Errror, are you logged in?</td><td></td><td></td></tr></tbody>;


    return data.locations.map(({ id, slug, gps }) => (
        <tbody key={id}>
            <tr>
              <form onSubmit={handleSubmit(onSubmit)}>
                <td>{id}</td>

                  <input
                    name="slug"
                    placeholder={slug}
                    ref={register({ required: true, maxLength: 20 })}
                  />


                  <input
                    name="gps"
                    placeholder={gps}
                    ref={register({ required: true, minLength: 7, pattern: { value: /^([-]?)([\d]{1,2})(((\.)(\d+)(,)))(([-]?)([\d]{1,3})((\.)(\d+))?)$/g} })}
                  />


                  <input type="submit" />

              </form>
              <td>
              {/* <Router>
                <Link to={"/locations"}>
                  <button className="danger">
                    View Locations
                  </button>
                </Link>
              </Router>
              <Switch>
                <Route path="locations" component={Locations} />
              </Switch> */}

              </td>
            </tr>
          </tbody>
    ));
  };

export default UpdateLocation;


