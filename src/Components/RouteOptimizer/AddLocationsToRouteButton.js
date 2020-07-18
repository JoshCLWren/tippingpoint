import React, {useState} from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ROUTES } from "../../GQL/gql";
import { useMileDispatch, useMileState } from '../TripCalculator/MileContext';
import { useForm } from "react-hook-form"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AddLocationsToRoute from "./AddLocationsToRoute";

const AddLocationsToRouteButton = (props) =>

{

  return (

    <>

        <Link to="/addLocationsToRoute">
          Add Locations
        </Link>
        <Switch>
          <Route path="/addLocationsToRoute" component={() => <AddLocationsToRoute id={props.id}/>}/>
        </Switch>

    </>


  )


};


export default AddLocationsToRouteButton;