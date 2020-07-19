import React from 'react'
import {
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