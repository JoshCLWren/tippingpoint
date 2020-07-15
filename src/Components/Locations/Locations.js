import React from 'react';
import "./main.css";
import Table from 'react-bootstrap/Table';
import Get from "./Get";
import Post from "./Post";
import { useAuth0 } from "@auth0/auth0-react";
import Header from "../NavBar/Header";
import RouteOptimzer from '../RouteOptimizer/RouteOptimzer';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";
// import UpdateLocation from "./UpdateLocation";


const Locations = () => {
  const { isAuthenticated } = useAuth0();

  if(!isAuthenticated) {
    return <Header />
  }

  return (

    <>
      <Post />

      {/* <Router>
        <Link to={"/updateLocation"}>
          <button className="danger">
            Update Locations
          </button>
        </Link>
        <Switch>
          <Route path="/updateLocation" component={UpdateLocation} />
        </Switch>
      </Router> */}
      <h3>Location Database</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID#</th>
            <th>Location Name</th>
            <th>GPS Coordinates</th>
            <th>Options</th>
          </tr>
        </thead>
        <Get />
      </Table>

    </>
  )
}

export default Locations;