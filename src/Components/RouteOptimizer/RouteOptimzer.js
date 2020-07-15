import React from 'react'
import { useForm } from "react-hook-form"
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_LOCATIONS, CREATE_ROUTE } from "../../GQL/gql";
import Table from 'react-bootstrap/Table';
import RouteLocationsSelector from './RouteLocationsSelector';

  const RouteOptimzer = () => {
    const { isAuthenticated } = useAuth0();

    const [createRoute] = useMutation(CREATE_ROUTE)
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = data => createRoute({
          variables: {name: data.name, description: data.description}
        });

    return isAuthenticated && (
      <>
        <h3>Create a Route and Optimize it!</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Route Name </label>
            <input
              name="name"
              placeholder="Route Name"
              ref={register({ required: true, maxLength: 20 })}
            />
          {errors.slug && <p>Route name is required and should be no more than 20 characters.</p>}


          <label>Description</label>
            <input
              name="description"
              ref={register({ required: true, maxLength: 50 })}
              placeholder="Tell me about this route"
            />
          {errors.gps && <p>Description can't be blank and can't esceed 50 characters.</p>}


          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID#</th>
                <th>Location Name</th>
                <th>GPS Coordinates</th>
                <th>Options</th>
              </tr>
            </thead>
           <RouteLocationsSelector />
          </Table>
          <input type="submit" />
        </form>
      </>

    )
  };

  export default RouteOptimzer;