import React from 'react'
import { useForm } from "react-hook-form"
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from '@apollo/react-hooks';
import { GET_ROUTES, CREATE_ROUTE } from "../../GQL/gql";
import Table from 'react-bootstrap/Table';
import GetRoutes from './GetRoutes';


  const RouteOptimzer = (props) => {
    const { isAuthenticated } = useAuth0();

    const [createRoute] = useMutation(CREATE_ROUTE)
    const { register, handleSubmit, errors } = useForm();

    // function loopOverLocations(locations, routeDesignator){
    //   for(var i = 1; i > locations.length; i++){
    //     createRouteLocation(
    //       {
    //         variables: {
    //           routeId: routeDesignator,
    //           locationId: i
    //         }
    //       }
    //     )
    //   }
    // }

    const onSubmit = data => createRoute({variables: {name: data.name, description: data.description},refetchQueries: [{query: GET_ROUTES}],});


    // const onSubmit = data => createRoute({
    //       variables: {name: data.name, description: data.description, ids: props.locations}
    //     });

    // const onSubmit = locations => console.log(locations)

    // function checkedLocations(checkedId) {

    //   // we're getting somewhere. The function runs at render but is alos runs each time it's clicked. How do we get it to not run at render?
    //     if (!locations.includes(checkedId)) {
    //     locations.push(checkedId)

    //   } else {
    //     const filteredLocations = locations.filter((locationId) => {
    //       if (locationId !== checkedId){
    //         return true
    //       }
    //     })

    //     setLocations(filteredLocations);
    //   }
    //   console.log(checkedId);
    //   console.log(locations)
    // }



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
          <input type="submit" />

          <p>Now add some locations to your Route.</p>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID#</th>
                <th>Route Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <GetRoutes />
           {/* <RouteLocationsSelector
              checkedLocations = {checkedLocations}
              name="ids"
              ref={register({ required: true, maxLength: 12 })}
              ids={locations}
           /> */}
          </Table>

        </form>
      </>

    )
  };

  export default RouteOptimzer;