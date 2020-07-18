import React, {useState} from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ROUTES, DELETE_ROUTE } from "../../GQL/gql";
import { useMileDispatch, useMileState } from '../TripCalculator/MileContext';
import AddLocationCheckbox from "./AddLocationCheckbox";
import { useForm } from "react-hook-form"
import AddLocationsToRouteButton from "./AddLocationsToRouteButton"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AddLocationsToRoute from "./AddLocationsToRoute";

  const GetRoutes = (props) => {

    // const [checked, setChecked] = useState(false);
    // const handleClick = () => setChecked(!checked)

    // const { register,  errors } = useForm();

    // const [locations, setLocations] = useState([]);

    // function checkedLocations(checkedId) {
    //   if (!locations.includes(checkedId)) {
    //     locations.push(checkedId)

    //   } else {
    //     const filteredLocations = locations.filter((locationId) => {
    //       if (locationId !== checkedId){
    //         return true
    //       }
    //     })

    //     setLocations(filteredLocations);
    //   }
    //   console.log(locations);
    //   console.log(filteredLocations);
    // }

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



    const { loading, error, data } = useQuery(GET_ROUTES);
    const [deleteRoute] = useMutation(DELETE_ROUTE);

    if (loading) return <tbody><tr><td>Loading...</td><td></td><td></td></tr></tbody>;
    if (error) return <tbody><tr><td>Errror, are you logged in?</td><td></td><td></td></tr></tbody>;


    return data.routes.map(({ id, name, description }) => (
      <tbody key={id}>
        <tr>
          <td>{id}</td>
          <td>{name}</td>
          <td>{description}</td>
          <td>
            <Router>
              <AddLocationsToRouteButton
                id={id}
                name={name}
                description={description}
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