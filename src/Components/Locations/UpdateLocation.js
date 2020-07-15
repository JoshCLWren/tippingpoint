// import React, {useState} from 'react';
// import { useQuery, useMutation } from '@apollo/react-hooks';
// import { useAuth0 } from "@auth0/auth0-react";
// import { useForm } from "react-hook-form"
// import "./main.css";
// import {GET_LOCATIONS, UPDATE_LOCATION} from "../../GQL/gql";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";
// import Locations from "./Locations";
// import LocationOptions from "../TripCalculator/LocationOptions"
// import { gql } from 'apollo-boost';
// import { useMileDispatch, useMileState } from './MileContext';


//   const UpdateLocation = () => {
//     const { isAuthenticated } = useAuth0();
//     const { register, handleSubmit, errors } = useForm();

//     const onSubmit = data => updateLocation({
//       variables: {id: data.id, slug: data.slug, gps: data.gps},
//       refetchQueries: [{query: GET_LOCATIONS}]
//     });

//     const LOCATIONS = gql`
//         {
//           locations {
//             id
//             slug
//             gps
//           }
//         }
//       `;
//     const { loading, error, data } = useQuery(LOCATIONS);

//     // const { loading, error, data } = useQuery(GET_LOCATIONS);
//     const [updateLocation] = useMutation(UPDATE_LOCATION);

//     const {locationUpdateValue} = useMileState()
//     const dispatch = useMileDispatch()


//     if (loading) return <tbody><tr><td>Loading...</td><td></td><td></td></tr></tbody>;
//     if (error) return <tbody><tr><td>Errror, are you logged in?</td><td></td><td></td></tr></tbody>;


//     return (

//           <form onSubmit={handleSubmit(onSubmit)}>
//             <select value={data} onChange={(event) => dispatch({type: 'locationUpdateValue', payload: event.target.value})}>
//             {
//               data.locations.map(({ id, slug, gps }) => (

//                 <option key={slug} value={gps}>
//                   {slug}
//                 </option>

//               ))
//             }
//             </select>



//                   <input
//                     name="slug"
//                     placeholder={slug}
//                     ref={register({ required: true, maxLength: 20 })}
//                   />


//                   <input
//                     name="gps"
//                     placeholder={locationUpdateValue}
//                     ref={register({ required: true, minLength: 7, pattern: { value: /^([-]?)([\d]{1,2})(((\.)(\d+)(,)))(([-]?)([\d]{1,3})((\.)(\d+))?)$/g} })}
//                   />


//                   <input type="submit" />



//               <Router>
//                 <Link to={"/locations"}>
//                   <button className="danger">
//                     View Locations
//                   </button>
//                 </Link>
//               </Router>
//               <Switch>
//                 <Route path="locations" component={Locations} />
//               </Switch>



//             </form>


//     )
//   };

// export default UpdateLocation;


